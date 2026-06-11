# SCRIPT FINAL (SMART SYNC)

## 👉 Tạo file:

nano deploy-smart.sh
```
#!/bin/bash

WG_SOURCE="/root/wg-configs"
WG_TARGET="/etc/wireguard"
XRAY_CONFIG="/usr/local/etc/xray/config.json"

BASE_PORT=11001
BASE_ID=602

echo "🚀 SMART SYNC (STABLE PORT MODE)..."

# =========================
# 1. ADD / UPDATE
# =========================

declare -A SOURCE_SET

for file in $WG_SOURCE/*.conf; do
    [ -e "$file" ] || continue

    ID=$(basename "$file" | grep -o '[0-9]\+')
    IFACE="wg$ID"

    SOURCE_SET[$IFACE]=1

    echo "👉 Sync $IFACE"

    cp "$file" "$WG_TARGET/$IFACE.conf"

    # ensure Table off
    grep -q "Table = off" "$WG_TARGET/$IFACE.conf" || \
    sed -i '/\[Interface\]/a Table = off' "$WG_TARGET/$IFACE.conf"

    # start if not running
    if ! ip link show $IFACE > /dev/null 2>&1; then
        echo "⚡ Start $IFACE"
        wg-quick up $IFACE
        systemctl enable wg-quick@$IFACE
    fi
done

# =========================
# 2. REMOVE DELETED
# =========================

for conf in $WG_TARGET/wg*.conf; do
    [ -e "$conf" ] || continue

    name=$(basename "$conf" .conf)

    if [[ "$name" == "wg0" ]]; then
        continue
    fi

    if [[ -z "${SOURCE_SET[$name]}" ]]; then
        echo "❌ Remove $name"

        wg-quick down $name 2>/dev/null
        systemctl disable wg-quick@$name 2>/dev/null
        rm -f "$WG_TARGET/$name.conf"
    fi
done

# =========================
# 3. GENERATE XRAY CONFIG
# =========================

echo "🧠 Generating Xray config..."

# Khoi tao cac khoi cau hinh tinh (Mac dinh luon co)
INBOUNDS_STR="[
    {
      \"tag\": \"socks-wireguard\",
      \"listen\": \"0.0.0.0\",
      \"port\": 10808,
      \"protocol\": \"socks\",
      \"settings\": { \"udp\": true },
      \"sniffing\": { \"enabled\": true, \"destOverride\": [\"http\", \"tls\", \"quic\"] }
    },
    {
      \"tag\": \"socks-niceproxy\",
      \"listen\": \"0.0.0.0\",
      \"port\": 10809,
      \"protocol\": \"socks\",
      \"settings\": { \"udp\": true },
      \"sniffing\": { \"enabled\": true, \"destOverride\": [\"http\", \"tls\", \"quic\"] }
    }"

OUTBOUNDS_STR="[
    {
      \"tag\": \"wireguard-out\",
      \"protocol\": \"freedom\",
      \"streamSettings\": { \"sockopt\": { \"interface\": \"wg0\" } }
    }"

ROUTING_STR="[
      { \"type\": \"field\", \"inboundTag\": [\"dns-internal\"], \"outboundTag\": \"wireguard-out\" },
      { \"type\": \"field\", \"inboundTag\": [\"socks-wireguard\"], \"outboundTag\": \"wireguard-out\" },
      { \"type\": \"field\", \"inboundTag\": [\"socks-niceproxy\"], \"outboundTag\": \"niceproxy-out\" }"

# Gan dung bien chay cong dynamic tu bien goc BASE_PORT
PORT=$BASE_PORT

# Quet cac card WireGuard dong va noi chuoi
for conf in $(ls $WG_TARGET | grep '^wg[0-9]' | sort); do
    IFACE=${conf%.conf}
    
    # Noi chuoi cho Inbounds dong
    INBOUNDS_STR+=",
    { 
      \"tag\": \"$IFACE-in\", 
      \"listen\": \"0.0.0.0\", 
      \"port\": $PORT, 
      \"protocol\": \"socks\", 
      \"settings\": { \"udp\": true }, 
      \"sniffing\": { \"enabled\": true, \"destOverride\": [\"http\", \"tls\", \"quic\"] } 
    }"
    
    # Noi chuoi cho Outbounds dong
    OUTBOUNDS_STR+=",
    {
      \"tag\": \"$IFACE-out\",
      \"protocol\": \"freedom\",
      \"streamSettings\": { \"sockopt\": { \"interface\": \"$IFACE\" } }
    }"
    
    # Noi chuoi cho Routing rules dong
    ROUTING_STR+=",
      {
        \"type\": \"field\",
        \"inboundTag\": [\"$IFACE-in\"],
        \"outboundTag\": \"$IFACE-out\"
      }"
    
    PORT=$((PORT+1))
done

# Bo sung cac outbounds co dinh khac o cuoi va dong mang JSON
OUTBOUNDS_STR+=",
    {
      \"tag\": \"niceproxy-out\",
      \"protocol\": \"socks\",
      \"settings\": {
        \"servers\": [
          {
            \"address\": \"niceproxy.io\",
            \"port\": 17521,
            \"users\": [
              {
                \"user\": \"proxy_usa_bv0X-country-US-ssid-dp4z3sRx2x\",
                \"pass\": \"binhminh123\"
              }
            ]
          }
        ]
      }
    }
]"

INBOUNDS_STR+=" ]"
ROUTING_STR+=" ]"

# Ghi toan bo cau truc vao file config.json
cat > $XRAY_CONFIG <<EOF
{
  "log": { "loglevel": "warning" },
  "dns": {
    "servers": [
      {
        "address": "https://1.1.1.1/dns-query",
        "tag": "dns-internal"
      }
    ]
  },
  "inbounds": $INBOUNDS_STR,
  "outbounds": $OUTBOUNDS_STR,
  "routing": {
    "domainStrategy": "AsIs",
    "rules": $ROUTING_STR
  }
}
EOF

# =========================
# 4. KHOI DONG LAI DICH VU XRAY
# =========================
echo "♻️ Testing and Reloading Xray..."

# Kiem tra cu phap truoc khi restart de bao dam an toan
if /usr/local/bin/xray -test -config $XRAY_CONFIG > /dev/null 2>&1; then
    echo "✅ Configuration is OK. Restarting Xray..."
    systemctl restart xray
    systemctl status xray --no-pager | grep -E "Active:"
else
    echo "❌ Lỗi: Cấu trúc file JSON sinh ra bị sai! Vui lòng kiểm tra lại cấu hình."
    /usr/local/bin/xray -test -config $XRAY_CONFIG
fi

echo "🏁 ALL PROCESSES DONE!"
```
# 🚀 CÁCH DÙNG

chmod +x deploy-smart.sh  
./deploy-smart.sh

---

# 🎯 HÀNH VI CHUẨN

### ➕ Thêm config

→ copy vào `/root/wg-configs`  
→ chạy script  
→ auto add + mở port

---

### ❌ Xoá config

→ xoá file trong `/root/wg-configs`  
→ chạy script  
→ auto remove WG + proxy

---

### 🔄 Update config

→ sửa file  
→ chạy script  
→ không restart interface cũ
# 1. DASHBOARD MỚI (TABLE + HIỂN THỊ ĐẦY ĐỦ)

👉 Hiển thị:

- WG name
- Endpoint (IP:PORT)
- Local proxy port
- NiceProxy riêng
```
from http.server import BaseHTTPRequestHandler, HTTPServer
import os
import re

WG_DIR = "/etc/wireguard"
START_PORT = 11001

def parse_wg_configs():
    result = []
    port = START_PORT

    files = sorted([f for f in os.listdir(WG_DIR) if f.startswith("wg") and f.endswith(".conf")])

    for f in files:
        if f == "wg0.conf":
            continue

        path = os.path.join(WG_DIR, f)
        endpoint = "N/A"

        with open(path, "r") as file:
            content = file.read()
            match = re.search(r'Endpoint\s*=\s*(.*)', content)
            if match:
                endpoint = match.group(1).strip()

        name = f.replace(".conf", "")
        result.append((name, endpoint, port))
        port += 1

    return result


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        wg_list = parse_wg_configs()

        html = """
        <html>
        <head>
            <title>Proxy Dashboard</title>
            <style>
                body { font-family: Arial; background:#0f172a; color:#e2e8f0; }
                table { border-collapse: collapse; width: 100%; }
                th, td { padding: 10px; border: 1px solid #334155; text-align: left; }
                th { background: #1e293b; }
                tr:hover { background: #1e293b; }
            </style>
        </head>
        <body>

        <h2>🚀 Proxy Dashboard</h2>

        <table>
        <tr>
            <th>Type</th>
            <th>Name</th>
            <th>Endpoint</th>
            <th>Local Port</th>
        </tr>
        """

        # WireGuard rows
        for name, endpoint, port in wg_list:
            html += f"""
            <tr>
                <td>WireGuard</td>
                <td>{name}</td>
                <td>{endpoint}</td>
                <td>127.0.0.1:{port}</td>
            </tr>
            """

        # NiceProxy row
        html += """
        <tr>
            <td>SOCKS5</td>
            <td>niceproxy</td>
            <td>niceproxy.io:17521</td>
            <td>127.0.0.1:10809</td>
        </tr>
        """

        # WG0 row
        html += """
        <tr>
            <td>WireGuard</td>
            <td>wg0 (default)</td>
            <td>system wg0</td>
            <td>127.0.0.1:10808</td>
        </tr>
        """

        html += """
        </table>
        </body>
        </html>
        """

        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(html.encode())


server = HTTPServer(("0.0.0.0", 9999), Handler)
print("Dashboard running at http://0.0.0.0:9999")
server.serve_forever()
```