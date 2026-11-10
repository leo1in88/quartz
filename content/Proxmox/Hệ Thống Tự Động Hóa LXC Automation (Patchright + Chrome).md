
Tài liệu này hướng dẫn cách tạo máy LXC hàng loạt trên Proxmox, tối ưu hóa cho việc chạy Automation trình duyệt với Google Chrome gốc, sử dụng X11 Forwarding và báo cáo tự động qua Google Sheets.

## 1. Giai đoạn 1: Tạo "Khuôn" (Template ID 900)

Mục tiêu là cài đặt sẵn các thư viện đồ họa hệ thống, Python, và Patchright để các máy con sau này không phải tải lại, giúp tăng tốc độ triển khai.

### Script: `create_template_900.sh`
[template900.sh](https://drive.ttfy.cc/20260418111015_template900.sh)  (updated version)
Bash

```
#!/bin/bash
# Script tạo Template cơ sở ID 900

TEMP_ID=900
TEMP_NAME="ubuntu-22-template-automation"
STORAGE="Msi500"
OS_IMAGE="local:vztmpl/ubuntu-22.04-standard_22.04-1_amd64.tar.zst"

pct create $TEMP_ID "$OS_IMAGE" --hostname "$TEMP_NAME" --storage $STORAGE \
  --rootfs "$STORAGE:8" --cores 2 --memory 2048 \
  --password "binhminh" --net0 name=eth0,bridge=vmbr0,ip=dhcp \
  --unprivileged 1 --features nesting=1

pct start $TEMP_ID
sleep 15

# Tối ưu mạng & Đổi Mirror FPT (Tránh lỗi treo IPv6)
pct exec $TEMP_ID -- bash -c "echo 'Acquire::ForceIPv4 \"true\";' > /etc/apt/apt.conf.d/99force-ipv4"
pct exec $TEMP_ID -- sed -i 's/archive.ubuntu.com/mirror.fpt.vn/g' /etc/apt/sources.list
pct exec $TEMP_ID -- sed -i 's/security.ubuntu.com/mirror.fpt.vn/g' /etc/apt/sources.list

# Cài đặt thư viện hệ thống & Đồ họa (Mesa, Vulkan, X11)
pct exec $TEMP_ID -- bash -c "export DEBIAN_FRONTEND=noninteractive && apt update && apt install -y \
    locales xauth x11-apps openssh-server python3-venv python3-pip wget \
    libgl1-mesa-dri libglx-mesa0 mesa-utils libegl1 libgles2 libgl1-mesa-glx \
    libvulkan1 mesa-vulkan-drivers"

# Cài đặt Patchright & Gspread vào hệ thống
pct exec $TEMP_ID -- bash -c "python3 -m pip install --upgrade pip"
pct exec $TEMP_ID -- bash -c "python3 -m pip install patchright gspread google-auth"

# Cấu hình X11 & Locale
pct exec $TEMP_ID -- bash -c "locale-gen en_US.UTF-8 && update-locale LANG=en_US.UTF-8"
pct exec $TEMP_ID -- bash -c "sed -i 's/#X11Forwarding no/X11Forwarding yes/' /etc/ssh/sshd_config"
pct exec $TEMP_ID -- bash -c "sed -i 's/#X11UseLocalhost yes/X11UseLocalhost no/' /etc/ssh/sshd_config"

pct stop $TEMP_ID
# Chuyển thành Template
pct template $TEMP_ID
```

---

## 2. Giai đoạn 2: Xuất Template thành File nén

Để dùng lệnh `pct create` giải nén máy mới hoàn toàn (thay vì clone), cần xuất ID 900 ra file `.tar.zst`.

**Lệnh chạy trên Proxmox Host:**

Bash

```
vzdump 900 --compress zstd --dumpdir /var/lib/vz/template/cache/ --mode stop
# Sau khi xong, hãy đổi tên file trong /var/lib/vz/template/cache/ thành template-900.tar.zst
```

---

## 3. Giai đoạn 3: Script triển khai hàng loạt (`setup_lxc.sh`)

Script này sẽ tạo máy mới từ file nén 900, cài Google Chrome bản mới nhất, tạo User ngẫu nhiên và báo cáo về Google Sheets.

### Script: `setup_lxc.sh`
[setup_lxc.sh](https://drive.ttfy.cc/20260418111018_setup_lxc.sh) (updated version)
Bash

```
#!/bin/bash
CT_ID=$1
[ -z "$CT_ID" ] && CT_ID=$(pvesh get /cluster/nextid)

CUSTOM_TEMPLATE="local:vztmpl/template-900.tar.zst"
LXC_STORAGE="Msi500"
PASSWORD="binhminh"
SHEET_ID="10AZQaDbuUwIzATC8GKe3Kaw9dEP9IHcjs-iR5u6_Y8A"

# Tạo tên ngẫu nhiên
NAMES=("eagle" "falcon" "hawk" "owl" "apple" "banana" "cherry" "phoenix")
RANDOM_NAME="${NAMES[$RANDOM % ${#NAMES[@]}]}-$((RANDOM % 9000 + 1000))"

# 1. Tạo mới hoàn toàn từ file 900
pct create $CT_ID "$CUSTOM_TEMPLATE" --hostname "$RANDOM_NAME" --storage $LXC_STORAGE \
  --rootfs "$LXC_STORAGE:8" --cores 2 --memory 2048 \
  --password "$PASSWORD" --net0 name=eth0,bridge=vmbr0,ip=dhcp \
  --unprivileged 1 --features nesting=1
pct start $CT_ID
sleep 15

# 2. Cài đặt Google Chrome Stable mới nhất
pct exec $CT_ID -- bash -c "echo 'Acquire::ForceIPv4 \"true\";' > /etc/apt/apt.conf.d/99force-ipv4"
pct exec $CT_ID -- bash -c "wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -P /tmp/ && apt update && apt install -y /tmp/google-chrome-stable_current_amd64.deb && rm /tmp/google-chrome-stable_current_amd64.deb"

# 3. Thiết lập User & Venv
pct exec $CT_ID -- bash -c "useradd -m -s /bin/bash $RANDOM_NAME && echo '$RANDOM_NAME:$PASSWORD' | chpasswd && usermod -aG sudo $RANDOM_NAME"
pct exec $CT_ID -- bash -c "echo '$RANDOM_NAME ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers"

VENV_PATH="/home/$RANDOM_NAME/venv"
pct exec $CT_ID -- sudo -u $RANDOM_NAME bash -c "python3 -m venv $VENV_PATH && $VENV_PATH/bin/pip install patchright gspread google-auth"

# 4. Copy tài nguyên (Key Google API và Script Automation)
pct push $CT_ID "/root/key.json" "/home/$RANDOM_NAME/key.json"
pct push $CT_ID "/root/chrome.py" "/home/$RANDOM_NAME/chrome.py"
pct exec $CT_ID -- chown -R "$RANDOM_NAME:$RANDOM_NAME" "/home/$RANDOM_NAME/"

# 5. Báo cáo Google Sheet (IP, User, ID)
IP_ADDR=$(pct exec $CT_ID -- ip -4 addr show eth0 | grep -oP '(?<=inet\s)\d+(\.\d+){3}' | head -n 1)
pct exec $CT_ID -- sudo -u $RANDOM_NAME bash -c "cat << EOF > /home/$RANDOM_NAME/report.py
import gspread, time, random
from google.oauth2.service_account import Credentials
time.sleep(random.uniform(1, 5))
creds = Credentials.from_service_account_file('/home/$RANDOM_NAME/key.json', scopes=['https://www.googleapis.com/auth/spreadsheets'])
sheet = gspread.authorize(creds).open_by_key('$SHEET_ID').get_worksheet(0)
sheet.append_row([None, None, '$IP_ADDR', '$RANDOM_NAME', '$CT_ID'])
EOF"
pct exec $CT_ID -- sudo -u $RANDOM_NAME bash -c "$VENV_PATH/bin/python3 /home/$RANDOM_NAME/report.py && rm /home/$RANDOM_NAME/report.py"

pct stop $CT_ID
```

---
## Code để deploy tự động nhiều máy ảo:
[deploy.sh](https://drive.ttfy.cc/20260418111019_deploy.sh)
## 4. Giai đoạn 4: Script Automation trình duyệt (`chrome.py`)

Sử dụng Patchright để điều khiển Chrome gốc, kế thừa profile đã đăng nhập bằng tay qua X11.

### Script: `chrome.py`

Python

```
import patchright.sync_api as p
import os
import getpass

def main():
    # Lấy tên User tự động để trỏ đúng thư mục Profile
    current_user = getpass.getuser()
    user_data_dir = f"/home/{current_user}/.config/google-chrome"
    
    with p.sync_playwright() as pw:
        # Khởi chạy trình duyệt kế thừa Profile
        context = pw.chromium.launch_persistent_context(
            user_data_dir,
            executable_path="/usr/bin/google-chrome-stable",
            headless=False,
            no_viewport=True,
            args=[
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--use-gl=angle',
                '--use-angle=swiftshader' # Sử dụng đồ họa phần mềm SwiftShader
            ]
        )
        
        page = context.pages[0]
        page.goto("https://bot.sannysoft.com")
        
        input("Kiểm tra Profile xong nhấn Enter để thoát...")
        context.close()

if __name__ == "__main__":
    main()
```

---

## 5. Những lưu ý quan trọng (Troubleshooting)

1. **Lỗi treo 0% khi cài đặt:** Luôn sử dụng lệnh `Acquire::ForceIPv4` để bỏ qua IPv6.
    
2. **Lỗi `Executable doesn't exist`:** Patchright không tự tìm thấy Chrome gốc, phải chỉ định `executable_path="/usr/bin/google-chrome-stable"`.
    
3. **Lỗi `Profile in use`:** Chrome chỉ cho phép 1 chương trình mở Profile tại một thời điểm. Hãy chạy `pkill -9 chrome` trước khi khởi động script Python.
    
4. **X11 Forwarding:** Để thấy được màn hình trình duyệt từ LXC, bạn cần kết nối SSH bằng MobaXterm và đảm bảo biến môi trường `DISPLAY` đã được thiết lập.

# Source: https://gemini.google.com/u/1/app/9c8eef1690a1ee92