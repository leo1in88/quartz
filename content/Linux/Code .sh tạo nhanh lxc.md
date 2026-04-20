```
#!/bin/bash

# --- CAU HINH ---
# Nhan ID tu tham so thu nhat ($1)
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

# --- RANDOM TEN ---
NAMES=("eagle" "falcon" "hawk" "owl" "penguin" "apple" "banana" "cherry" "mango" "orange" "kiwi" "phoenix")
# Lấy ngẫu nhiên 1 tên và 1 số từ 1000 đến 9999
RANDOM_NAME="${NAMES[$RANDOM % ${#NAMES[@]}]}-$((RANDOM % 9000 + 1000))"

echo "--- 1. Tao LXC: $RANDOM_NAME (ID: $CT_ID) ---"
# Sua: Them dau \ de noi dong va dau $ vao cac tham so
pct create $CT_ID "$TEMPLATE" --hostname "$RANDOM_NAME" --storage $LXC_STORAGE \
  --rootfs "$LXC_STORAGE:$DISK_SIZE" --cores $CPU_CORES --memory $MEMORY \
  --password "$PASSWORD" --net0 name=eth0,bridge=$BRIDGE,ip=dhcp \
  --unprivileged 1 --features nesting=1

pct start $CT_ID
echo "Doi he thong khoi dong (15s)..."
sleep 15

# --- 2. CAI DAT HE THONG ---
echo "--- 2. Cai dat He thong, X11 & Driver Do hoa ---"

pct exec $CT_ID -- bash -c "apt update && apt install -y locales"
pct exec $CT_ID -- bash -c "locale-gen en_US.UTF-8 && update-locale LANG=en_US.UTF-8"

echo "--- Cai dat Google Chrome Stable ---"
pct exec $CT_ID -- bash -c "wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -P /tmp/"
pct exec $CT_ID -- bash -c "apt install -y /tmp/google-chrome-stable_current_amd64.deb"
pct exec $CT_ID -- bash -c "rm /tmp/google-chrome-stable_current_amd64.deb"

echo "--- Thiet lap User ---"
# Sua: Them $ vao RANDOM_NAME, CT_ID va PASSWORD
pct exec $CT_ID -- bash -c "useradd -m -s /bin/bash $RANDOM_NAME && echo '$RANDOM_NAME:$PASSWORD' | chpasswd && usermod -aG sudo $RANDOM_NAME"
pct exec $CT_ID -- bash -c "echo '$RANDOM_NAME ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers"

echo "--- Cai dat thu vien Do hoa & Python ---"
pct exec $CT_ID -- bash -c "apt install -y xauth x11-apps openssh-server python3-venv python3-pip libgl1-mesa-dri libglx-mesa0 mesa-utils libegl1 libgles2 libgl1-mesa-glx libvulkan1 mesa-vulkan-drivers"

# Cau hinh SSH
pct exec $CT_ID -- bash -c "sed -i 's/#X11Forwarding no/X11Forwarding yes/' /etc/ssh/sshd_config"
pct exec $CT_ID -- bash -c "sed -i 's/#X11UseLocalhost yes/X11UseLocalhost no/' /etc/ssh/sshd_config"
pct exec $CT_ID -- systemctl restart ssh

# --- 3. THIET LAP VENV & PATCHRIGHT ---
VENV_PATH="/home/$RANDOM_NAME/venv"
echo "--- 3. Khoi tao Venv & Cai dat Patchright ---"
pct exec $CT_ID -- sudo -u $RANDOM_NAME bash -c "python3 -m venv $VENV_PATH"
pct exec $CT_ID -- sudo -u $RANDOM_NAME bash -c "$VENV_PATH/bin/pip install --upgrade pip"
pct exec $CT_ID -- sudo -u $RANDOM_NAME bash -c "$VENV_PATH/bin/pip install patchright gspread google-auth"

# --- 4. COPY FILE VAO LXC ---
if [ -f "$JSON_HOST_PATH" ]; then
    echo "--- 4.1 Copying key.json ---"
    pct push $CT_ID "$JSON_HOST_PATH" "/home/$RANDOM_NAME/key.json"
    pct exec $CT_ID -- chown "$RANDOM_NAME:$RANDOM_NAME" "/home/$RANDOM_NAME/key.json"
fi

if [ -f "$CHROME_PY_HOST" ]; then
    echo "--- 4.2 Copying chrome.py ---"
    pct push $CT_ID "$CHROME_PY_HOST" "/home/$RANDOM_NAME/chrome.py"
    pct exec $CT_ID -- chown "$RANDOM_NAME:$RANDOM_NAME" "/home/$RANDOM_NAME/chrome.py"
fi

# --- 5. GOOGLE SHEET REPORT ---
IP_ADDR=$(pct exec $CT_ID -- ip -4 addr show eth0 | grep -oP '(?<=inet\s)\d+(\.\d+){3}' | head -n 1)

echo "--- 5. Dang gui bao cao len Google Sheet ---"
# Sua: Khong dung dau nhay don quanh EOF de bien Bash ($IP_ADDR, $VENV_PATH...) co the vao duoc Python
pct exec $CT_ID -- sudo -u $RANDOM_NAME bash -c "cat << EOF > /home/$RANDOM_NAME/report.py
import gspread
from google.oauth2.service_account import Credentials
import datetime

try:
    scope = ['https://www.googleapis.com/auth/spreadsheets']
    creds = Credentials.from_service_account_file('/home/$RANDOM_NAME/key.json', scopes=scope)
    client = gspread.authorize(creds)
    sheet = client.open_by_key('$SHEET_ID').get_worksheet(0)
    
    col_c_values = sheet.col_values(3)
    next_row = len(col_c_values) + 1

    data = [
        None,           # Cot A
        None,           # Cot B
        '$IP_ADDR',     # Cot C
        '$RANDOM_NAME', # Cot D
        '$VENV_PATH',   # Cot E
    ]

    cell_range = f'A{next_row}:G{next_row}'
    sheet.update(range_name=cell_range, values=[data])
    print(f'✅ Da cap nhat Sheet vao hang {next_row} thanh cong.')
except Exception as e:
    print(f'❌ Loi Sheet: {e}')
EOF"

pct exec $CT_ID -- sudo -u $RANDOM_NAME bash -c "$VENV_PATH/bin/python3 /home/$RANDOM_NAME/report.py"
pct exec $CT_ID -- sudo -u $RANDOM_NAME bash -c "rm /home/$RANDOM_NAME/report.py"

echo "------------------------------------------------"
echo "HOAN TAT SETUP CHO: $RANDOM_NAME"
echo "IP: $IP_ADDR"
echo "Venv: $VENV_PATH"
echo "File chrome.py da nam tai: /home/$RANDOM_NAME/chrome.py"
echo "------------------------------------------------"
```