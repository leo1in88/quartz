---
title: "Xray Proxy Setup Guide"
source: "https://chatgpt.com/c/69b39a36-4d00-8323-9971-b63ac793ada4"
author:
  - "[[ChatGPT]]"
published:
created: 2026-03-13
description: "ChatGPT is your AI chatbot for everyday use. Chat with the most advanced AI to explore ideas, solve problems, and learn faster."
tags:
  - "clippings"
---
Ok Minh, mình gom lại toàn bộ cuộc trao đổi và **lọc hết phần sai / thừa** để đưa ra **quy trình chuẩn cuối cùng**. Mục tiêu của hệ thống này là:

- Ubuntu chạy **Xray làm proxy gateway**
- Có **2 proxy outbound khác nhau**
	- Proxy 1 → **WireGuard**
		- Proxy 2 → **SOCKS5 (NiceProxy)**
- Ubuntu mở **2 cổng local**
	- `10808` → đi WireGuard
		- `10809` → đi NiceProxy
- Chrome dùng **SwitchyOmega** để:
	- Website A → Proxy 1
		- Website B → Proxy 2

Sơ đồ hệ thống:

Chrome  
   │  
SwitchyOmega rules  
   │  
Ubuntu (Xray)  
   ├── 10808 → WireGuard → Internet  
   └── 10809 → SOCKS5 (NiceProxy) → Internet

## Cài đặt wireguard
sudo apt update  
sudo apt install wireguard -y
Cài resolvconf
sudo apt install resolvconf -y
Sau đó enable service:
`sudo systemctl enable resolvconf`  
`sudo systemctl start resolvconf`
Chỉnh sửa cấu hình wg:
sudo nano /etc/wireguard/wg0.conf
Dán config vào
`[Interface]`
`PrivateKey = OCEMnkBXgJCcVBMORHc9YoZNorccGiQF8ageFnR5oWE=`
`Address = 192.168.6.214/32`
`DNS = 1.1.1.1`

`[Peer]`
`PublicKey = c3FKBnHbWdUiKTysPZglk5WeBCbRlbTvdN1JBuSP3W8=`
`Endpoint = usa6.vpnjantit.com:1024`
`AllowedIPs = 0.0.0.0/0, ::/0`
`PersistentKeepalive = 25`
Start Wireguard
sudo wg-quick up wg0
Kiểm tra
wg

sẽ thấy kết quả
interface: wg0
peer: c3FKBnHb...
latest handshake: ...

Tự động bật wg:
sudo systemctl enable wg-quick@wg0

#### Mình khuyên thêm 1 dòng vào `wg0.conf`:

Table = off

để **WireGuard không override routing table**. Xray kiểm xoát hệ thống tốt hơn.
# 1\. Cài đặt Xray trên Ubuntu

Chạy lần lượt:

Bash

curl \-L \-o install-xray.sh https://github.com/XTLS/Xray-install/raw/main/install-release.sh  
chmod +x install-xray.sh  
sudo ./install-xray.sh

Sau khi cài xong, các file quan trọng:

xray binary:  
/usr/local/bin/xray  
  
config:  
/usr/local/etc/xray/config.json  
  
logs:  
/var/log/xray/

---

# 2\. Tạo file cấu hình Xray

Mở file config:

Bash

sudo nano /usr/local/etc/xray/config.json

Dán toàn bộ nội dung sau:

JSON

`{`
  `"log": {`
    `"loglevel": "warning"`
  `},`

  `"inbounds": [`
    `{`
      `"tag": "socks-wireguard",`
      `"listen": "0.0.0.0",`
      `"port": 10808,`
      `"protocol": "socks",`
      `"settings": {`
        `"udp": true`
      `}`
    `},`

    `{`
      `"tag": "socks-niceproxy",`
      `"listen": "0.0.0.0",`
      `"port": 10809,`
      `"protocol": "socks",`
      `"settings": {`
        `"udp": true`
      `}`
    `}`
  `],`

  `"outbounds": [`

    `{`
      `"tag": "wireguard-out",`
      `"protocol": "freedom",`
      `"streamSettings": {`
        `"sockopt": {`
          `"interface": "wg0"`
        `}`
      `}`
    `},`

    `{`
      `"tag": "niceproxy-out",`
      `"protocol": "socks",`
      `"settings": {`
        `"servers": [`
          `{`
            `"address": "niceproxy.io",`
            `"port": 17521,`
            `"users": [`
              `{`
                `"user": "proxy_usa_bv0X-country-US-ssid-dp4z3sRx2x",`
                `"pass": "binhminh123"`
              `}`
            `]`
          `}`
        `]`
      `}`
    `}`

  `],`

  `"routing": {`
    `"rules": [`

      `{`
        `"type": "field",`
        `"inboundTag": [`
          `"socks-wireguard"`
        `],`
        `"outboundTag": "wireguard-out"`
      `},`

      `{`
        `"type": "field",`
        `"inboundTag": [`
          `"socks-niceproxy"`
        `],`
        `"outboundTag": "niceproxy-out"`
      `}`

    `]`
  `}`
`}`

Lưu:

CTRL + O  
ENTER  
CTRL + X

---

# 3\. Khởi động Xray

Bash

sudo systemctl daemon-reload  
sudo systemctl restart xray  
sudo systemctl enable xray

Kiểm tra trạng thái:

Bash

sudo systemctl status xray

Nếu thấy:

active (running)

→ OK.

---

# 4\. Test proxy trên Ubuntu

Test WireGuard:

Bash

curl \-L \-x socks5h://127.0.0.1:10808 https://ifconfig.me

Test NiceProxy:

Bash

curl \-L \-x socks5h://127.0.0.1:10809 https://ifconfig.me

Kết quả:

10808 → IP VPNjantit  
10809 → IP NiceProxy

---

# 5\. Cho phép LAN sử dụng proxy

Mở firewall Ubuntu:

Bash

sudo ufw allow 10808/tcp  
sudo ufw allow 10809/tcp

Kiểm tra:

Bash

sudo ufw status

---

# 6\. Tìm IP Ubuntu

Bash

ip a

Ví dụ:

192.168.1.15

---

# 7\. Cài SwitchyOmega trên Chrome

Cài extension:

Proxy SwitchyOmega

Chrome store:

https://chrome.google.com/webstore/detail/proxy-switchyomega

---

# 8\. Tạo 2 proxy profile

### Proxy 1 (WireGuard)

Protocol: SOCKS5  
Server: 192.168.1.15  
Port: 10808

---

### Proxy 2 (NiceProxy)

Protocol: SOCKS5  
Server: 192.168.1.15  
Port: 10809

---

# 9\. Tạo rule phân luồng website

Trong **Auto Switch**

Ví dụ:

google.com        → Proxy 1  
openai.com        → Proxy 2  
\*.tiktok.com      → Proxy 2

Default:

Direct

---

# 10\. Kết quả cuối cùng

Chrome sẽ tự động:

Website A → Ubuntu:10808 → WireGuard → Internet  
Website B → Ubuntu:10809 → NiceProxy → Internet  
Website khác → Direct

---

# 11\. Bonus (cực hay)

Ubuntu giờ đã thành **proxy gateway cho cả mạng LAN**.

Bất kỳ máy nào trong mạng đều có thể dùng:

SOCKS5  
IP: 192.168.1.15  
PORT: 10808 or 10809

---

💡 Nếu Minh muốn, mình có thể chỉ thêm một bước **rất mạnh**:

**Xray routing theo domain trực tiếp trên server**

Tức là:

tiktok → proxy 2  
amazon → proxy 1  
google → direct

→ Chrome **không cần SwitchyOmega nữa**.

Cái này là cách **pro nhất khi chạy proxy server**.