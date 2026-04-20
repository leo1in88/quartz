```
#!/bin/bash

# --- 1. CAU HINH BAN DAU ---
CT_ID=$1
if [ -z "$CT_ID" ]; then
    CT_ID=$(pvesh get /cluster/nextid)
fi

TEMPLATE="local:vztmpl/ubuntu-22.04-standard_22.04-1_amd64.tar.zst"
LXC_STORAGE="Msi500"
DISK_SIZE="8"
CPU_CORES="2"
MEMORY="2048"
PASSWORD="binhminh"
JSON_HOST_PATH="/root/key.json"
CHROME_PY_HOST="/root/chrome.py"
SHEET_ID="10AZQaDbuUwIzATC8GKe3Kaw9dEP9IHcjs-iR5u6_Y8A"
BRIDGE="vmbr0"

# Random tên: Tên-4Số
NAMES=("eagle" "falcon" "hawk" "owl" "penguin" "apple" "banana" "cherry" "mango" "orange" "kiwi" "phoenix")
RANDOM_NAME="${NAMES[$RANDOM % ${#NAMES[@]}]}-$((RANDOM % 9000 + 1000))"

echo "--- BẮT ĐẦU TẠO LXC: $RANDOM_NAME (ID: $CT_ID) ---"
pct create $CT_ID "$TEMPLATE" --hostname "$RANDOM_NAME" --storage $LXC_STORAGE \
  --rootfs "$LXC_STORAGE:$DISK_SIZE" --cores $CPU_CORES --memory $MEMORY \
  --password "$PASSWORD" --net0 name=eth0,bridge=$BRIDGE,ip=dhcp \
  --unprivileged 1 --features nesting=1

pct start $CT_ID
echo "Đợi hệ thống khởi động..."
sleep 15

# --- 2. CÀI ĐẶT HỆ THỐNG & ĐỒ HỌA ---
echo "--- Cài đặt Locales & Google Chrome Stable ---"
pct exec $CT_ID -- bash -c "echo 'Acquire::ForceIPv4 \"true\";' > /etc/apt/apt.conf.d/99force-ipv4"
pct exec $CT_ID -- bash -c "apt update && apt install -y locales"
pct exec $CT_ID -- bash -c "locale-gen en_US.UTF-8 && update-locale LANG=en_US.UTF-8"

# Cài Chrome gốc (Để Patchright sử dụng)
pct exec $CT_ID -- bash -c "wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -P /tmp/"
pct exec $CT_ID -- bash -c "apt install -y /tmp/google-chrome-stable_current_amd64.deb"
pct exec $CT_ID -- bash -c "rm /tmp/google-chrome-stable_current_amd64.deb"

echo "--- Cài đặt Thư viện Đồ họa & SSH ---"
# Tích hợp các gói bạn yêu cầu (Đã sửa lỗi thiếu $)
pct exec $CT_ID -- bash -c "apt install -y \
    xauth x11-apps openssh-server \
    python3-venv python3-pip \
    libgl1-mesa-dri libglx-mesa0 mesa-utils \
    libegl1 libgles2 libgl1-mesa-glx \
    libvulkan1 mesa-vulkan-drivers"

# Thiết lập User
pct exec $CT_ID -- bash -c "useradd -m -s /bin/bash $RANDOM_NAME && echo '$RANDOM_NAME:$PASSWORD' | chpasswd && usermod -aG sudo $RANDOM_NAME"
pct exec $CT_ID -- bash -c "echo '$RANDOM_NAME ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers"

# Cấu hình X11 Forwarding
pct exec $CT_ID -- bash -c "sed -i 's/#X11Forwarding no/X11Forwarding yes/' /etc/ssh/sshd_config"
pct exec $CT_ID -- bash -c "sed -i 's/#X11UseLocalhost yes/X11UseLocalhost no/' /etc/ssh/sshd_config"
pct exec $CT_ID -- systemctl restart ssh

# --- 3. VENV & FILE ---
VENV_PATH="/home/$RANDOM_NAME/venv"
pct exec $CT_ID -- sudo -u $RANDOM_NAME bash -c "python3 -m venv $VENV_PATH"
pct exec $CT_ID -- sudo -u $RANDOM_NAME bash -c "$VENV_PATH/bin/pip install --upgrade pip"
pct exec $CT_ID -- sudo -u $RANDOM_NAME bash -c "$VENV_PATH/bin/pip install patchright gspread google-auth"

# Copy file key.json và chrome.py
[ -f "$JSON_HOST_PATH" ] && pct push $CT_ID "$JSON_HOST_PATH" "/home/$RANDOM_NAME/key.json" && pct exec $CT_ID -- chown "$RANDOM_NAME:$RANDOM_NAME" "/home/$RANDOM_NAME/key.json"
[ -f "$CHROME_PY_HOST" ] && pct push $CT_ID "$CHROME_PY_HOST" "/home/$RANDOM_NAME/chrome.py" && pct exec $CT_ID -- chown "$RANDOM_NAME:$RANDOM_NAME" "/home/$RANDOM_NAME/chrome.py"

# --- 4. BÁO CÁO & TẮT MÁY ---
IP_ADDR=$(pct exec $CT_ID -- ip -4 addr show eth0 | grep -oP '(?<=inet\s)\d+(\.\d+){3}' | head -n 1)

echo "--- Gửi báo cáo & Tắt máy ---"
pct exec $CT_ID -- sudo -u $RANDOM_NAME bash -c "cat << EOF > /home/$RANDOM_NAME/report.py
import gspread
from google.oauth2.service_account import Credentials
import time, random

try:
    time.sleep(random.uniform(1, 5))
    scope = ['https://www.googleapis.com/auth/spreadsheets']
    creds = Credentials.from_service_account_file('/home/$RANDOM_NAME/key.json', scopes=scope)
    client = gspread.authorize(creds)
    sheet = client.open_by_key('$SHEET_ID').get_worksheet(0)

    # Xuất: IP (C), User (D), ID (E)
    data = [None, None, '$IP_ADDR', '$RANDOM_NAME', '$CT_ID']
    sheet.append_row(data)
    print('✅ Sheet updated.')
except Exception as e:
    print(f'❌ Error: {e}')
EOF"

pct exec $CT_ID -- sudo -u $RANDOM_NAME bash -c "$VENV_PATH/bin/python3 /home/$RANDOM_NAME/report.py"
pct exec $CT_ID -- bash -c "rm /home/$RANDOM_NAME/report.py"

echo "HOÀN TẤT: $RANDOM_NAME (ID: $CT_ID) - Đang tắt máy..."
pct stop $CT_ID
```