```
#!/bin/bash

# --- CẤU HÌNH --- (Giữ nguyên phần cấu hình của bạn)
CT_ID=$(pvesh get /cluster/nextid)
TEMPLATE="local:vztmpl/ubuntu-22.04-standard_22.04-1_amd64.tar.zst"
LXC_STORAGE="Msi500"
DISK_SIZE="8"
CPU_CORES="2"
MEMORY="2048"
PASSWORD="PassWord123@"
JSON_HOST_PATH="/root/key.json"
CHROME_PY_HOST="/root/chrome.py" 
SHEET_ID="10AZQaDbuUwIzATC8GKe3Kaw9dEP9IHcjs-iR5u6_Y8A"
BRIDGE="vmbr0"

# Random tên
NAMES=("eagle" "falcon" "hawk" "owl" "penguin" "apple" "banana" "cherry" "mango" "orange" "kiwi" "phoenix")
RANDOM_NAME="${NAMES[$RANDOM % ${#NAMES[@]}]}-$(date +%s | tail -c 4)"

echo "--- 1. Tạo LXC: $RANDOM_NAME (ID: $CT_ID) ---"
pct create $CT_ID "$TEMPLATE" --hostname "$RANDOM_NAME" --storage $LXC_STORAGE \
  --rootfs "$LXC_STORAGE:$DISK_SIZE" --cores $CPU_CORES --memory $MEMORY \
  --password "$PASSWORD" --net0 name=eth0,bridge=$BRIDGE,ip=dhcp \
  --unprivileged 1 --features nesting=1

pct start $CT_ID
echo "Đợi hệ thống khởi động (15s)..."
sleep 15

# --- 2. Cài đặt Hệ thống, Locale & X11 + ĐỒ HỌA MỀM (GPU Virtualization) ---
echo "--- 2. Cài đặt Hệ thống, X11 & Driver Đồ họa (SwiftShader/Vulkan) ---"
pct exec $CT_ID -- bash -c "apt update && apt install -y locales"
pct exec $CT_ID -- bash -c "locale-gen en_US.UTF-8 && update-locale LANG=en_US.UTF-8"

# Thiết lập User
pct exec $CT_ID -- bash -c "useradd -m -s /bin/bash $RANDOM_NAME && echo '$RANDOM_NAME:$PASSWORD' | chpasswd && usermod -aG sudo $RANDOM_NAME"
pct exec $CT_ID -- bash -c "echo '$RANDOM_NAME ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers"

# Cài đặt các gói cơ bản + THƯ VIỆN ĐỒ HỌA HỆ THỐNG
# Thêm: mesa-utils, libgl1-mesa-dri, libegl1, libgles2, libvulkan1, mesa-vulkan-drivers
pct exec $CT_ID -- bash -c "apt install -y \
    xauth x11-apps openssh-server \
    python3-venv python3-pip \
    libgl1-mesa-dri libglx-mesa0 mesa-utils \
    libegl1 libgles2 libgl1-mesa-glx \
    libvulkan1 mesa-vulkan-drivers"

# Cấu hình SSH X11 Forwarding
pct exec $CT_ID -- bash -c "sed -i 's/#X11Forwarding no/X11Forwarding yes/' /etc/ssh/sshd_config"
pct exec $CT_ID -- bash -c "sed -i 's/#X11UseLocalhost yes/X11UseLocalhost no/' /etc/ssh/sshd_config"
pct exec $CT_ID -- systemctl restart ssh

# --- 3. Thiết lập Venv & Patchright --- (Giữ nguyên)
VENV_PATH="/home/$RANDOM_NAME/venv"
echo "--- 3. Khởi tạo Venv & Cài đặt Patchright ---"
pct exec $CT_ID -- sudo -u $RANDOM_NAME bash -c "python3 -m venv $VENV_PATH"
pct exec $CT_ID -- sudo -u $RANDOM_NAME bash -c "$VENV_PATH/bin/pip install --upgrade pip"
pct exec $CT_ID -- sudo -u $RANDOM_NAME bash -c "$VENV_PATH/bin/pip install patchright gspread google-auth"
pct exec $CT_ID -- sudo -u $RANDOM_NAME bash -c "$VENV_PATH/bin/patchright install --with-deps chromium"

# --- 4. Copy các file cần thiết (Giữ nguyên) ---
# 4.1 Copy key.json vào Home
if [ -f "$JSON_HOST_PATH" ]; then
    echo "--- 4.1 Copying key.json to Home ---"
    pct push $CT_ID "$JSON_HOST_PATH" "/home/$RANDOM_NAME/key.json"
    pct exec $CT_ID -- chown "$RANDOM_NAME:$RANDOM_NAME" "/home/$RANDOM_NAME/key.json"
fi

# 4.2 Copy chrome.py vào Home (Đã sửa theo ý bạn)
if [ -f "$CHROME_PY_HOST" ]; then
    echo "--- 4.2 Copying chrome.py to Home ---"
    pct push $CT_ID "$CHROME_PY_HOST" "/home/$RANDOM_NAME/chrome.py"
    pct exec $CT_ID -- chown "$RANDOM_NAME:$RANDOM_NAME" "/home/$RANDOM_NAME/chrome.py"
else
    echo "⚠️ Cảnh báo: Không tìm thấy file $CHROME_PY_HOST trên Host."
fi

# --- 5. Báo cáo lên Google Sheet ---
IP_ADDR=$(pct exec $CT_ID -- ip -4 addr show eth0 | grep -oP '(?<=inet\s)\d+(\.\d+){3}' | head -n 1)

echo "--- 5. Đang gửi báo cáo lên Google Sheet ---"
pct exec $CT_ID -- sudo -u $RANDOM_NAME bash -c "cat << 'EOF' > /home/$RANDOM_NAME/report.py
import gspread
from google.oauth2.service_account import Credentials
import datetime

try:
    scope = ['https://www.googleapis.com/auth/spreadsheets']
    creds = Credentials.from_service_account_file('/home/$RANDOM_NAME/key.json', scopes=scope)
    client = gspread.authorize(creds)
    sheet = client.open_by_key('$SHEET_ID').get_worksheet(0)
    
    data = [
        None,           # Cột A
        None,           # Cột B
        '$IP_ADDR',     # Cột C
        '$RANDOM_NAME', # Cột D
        '$VENV_PATH',   # Cột E
        str(datetime.datetime.now()), # Cột F
        '$CT_ID'        # Cột G
    ]
    sheet.append_row(data)
    print('✅ Đã cập nhật Sheet thành công.')
except Exception as e:
    print(f'❌ Lỗi Sheet: {e}')
EOF"

pct exec $CT_ID -- sudo -u $RANDOM_NAME bash -c "$VENV_PATH/bin/python3 /home/$RANDOM_NAME/report.py"
pct exec $CT_ID -- sudo -u $RANDOM_NAME bash -c "rm /home/$RANDOM_NAME/report.py"

echo "------------------------------------------------"
echo "HOÀN TẤT SETUP CHO: $RANDOM_NAME"
echo "IP: $IP_ADDR"
echo "Venv: $VENV_PATH"
echo "File chrome.py đã nằm tại: /home/$RANDOM_NAME/chrome.py"
echo "Lệnh chạy test: sudo -u $RANDOM_NAME $VENV_PATH/bin/python3 /home/$RANDOM_NAME/chrome.py"
echo "------------------------------------------------"
```