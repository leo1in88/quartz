---
title: "Hướng dẫn tôi tạo wireguard config trên Mikrotik ..."
source: "https://gemini.google.com/app/5b9093bc188231fb"
author:
  - "[[Gemini]]"
published:
created: 2026-02-04
description: "Meet Gemini, Google’s AI assistant. Get help with writing, planning, brainstorming, and more. Experience the power of generative AI."
tags:
  - "clippings"
  - "router"
  - "wireguard"
---
Hướng dẫn tôi tạo wireguard config trên Mikrotik Router để tôi có thể sử dụng config này kết nối đến mạng ở nhà đang sử dụng Mikrotik Router

---

Việc thiết lập WireGuard trên MikroTik là một giải pháp tuyệt vời để truy cập mạng nội bộ từ xa vì nó nhanh, bảo mật và cực kỳ nhẹ tải.

Để cấu hình thành công, chúng ta sẽ thực hiện qua 3 giai đoạn chính: Thiết lập Server (Router), cấu hình Peer (thiết bị khách), và mở luồng tường lửa.

---

## 1\. Cấu hình WireGuard Server trên MikroTik

Đầu tiên, bạn cần tạo một "interface" WireGuard để đóng vai trò là cổng chờ kết nối.

1. Vào mục **WireGuard** trên menu chính.
2. Nhấn dấu **+** để tạo interface mới.
	- **Name:**`wireguard-vpn`
	- **Listen Port:**`13231` (Bạn có thể đổi cổng tùy ý).
3. Nhấn **OK**. MikroTik sẽ tự động tạo **Private Key** và **Public Key** cho bạn. Hãy copy **Public Key** này lại vì bạn sẽ cần nó cho thiết bị khách.

## 2\. Gán địa chỉ IP cho Interface WireGuard

Bạn cần một dải mạng riêng cho các thiết bị VPN. Ví dụ: `192.168.100.0/24`.

1. Vào **IP** -> **Addresses**.
2. Nhấn dấu **+**.
	- **Address:**`192.168.100.1/24`
	- **Interface:**`wireguard-vpn` (interface bạn vừa tạo ở bước 1).

## 3\. Tạo Peer (Thiết bị khách - Điện thoại/Laptop)

Bây giờ, hãy chuẩn bị thông tin cho thiết bị bạn dùng để kết nối về nhà.

1. Trong cửa sổ **WireGuard**, chuyển sang tab **Peers**.
2. Nhấn dấu **+**.
	- **Interface:**`wireguard-vpn`.
	- **Public Key:** (Dán Public Key từ ứng dụng WireGuard trên điện thoại/máy tính của bạn vào đây).
	- **Allowed Address:**`192.168.100.2/32` (Đây là IP tĩnh cấp riêng cho thiết bị này).

## 4\. Mở tường lửa (Firewall)

Để Router có thể nhận dữ liệu từ internet gửi đến cổng WireGuard:

1. Vào **IP** -> **Firewall** -> **Filter Rules**.
2. Thêm quy tắc mới:
	- **Chain:**`input`
	- **Protocol:**`udp`
	- **Dst. Port:**`13231` (Cổng bạn đã chọn ở bước 1).
	- **Action:**`accept`
3. Đưa quy tắc này lên trên cùng của danh sách.

---

## 5\. File cấu hình cho thiết bị khách (Client Config)

Bạn hãy tạo một file hoặc nhập thủ công vào ứng dụng WireGuard trên thiết bị khách với nội dung sau:

Ini, TOML

```
[Interface]
PrivateKey = <Private Key của thiết bị khách>
Address = 192.168.100.2/24
DNS = 1.1.1.1 (hoặc IP LAN của MikroTik)

[Peer]
PublicKey = <Public Key của MikroTik Server>
Endpoint = <IP_WAN_Cua_Nha_Ban>:13231
AllowedIPs = 0.0.0.0/0 (để dùng VPN cho toàn bộ traffic) hoặc 192.168.88.0/24 (chỉ truy cập mạng nội bộ)
PersistentKeepalive = 25
```

> \[!NOTE\] Nếu nhà bạn không có IP tĩnh (Static IP), hãy sử dụng tính năng **IP** -> **Cloud** trên MikroTik để lấy tên miền DDNS (ví dụ: `xxxx.sn.mynetname.net`) và điền vào mục **Endpoint**.

---

**Bạn có muốn tôi hướng dẫn cách cài đặt ứng dụng WireGuard trên điện thoại và quét mã QR để kết nối nhanh hơn không?**

---

nếu tôi muốn kết nối cùng lúc 2 thiết bị tôi phải làm sao?

---

Để kết nối cùng lúc 2 thiết bị (ví dụ: 1 điện thoại và 1 laptop), nguyên tắc quan trọng nhất là: **Mỗi thiết bị phải có một cặp Key (Public/Private Key) riêng và một địa chỉ IP nội bộ VPN riêng.**

Bạn không nên dùng chung một file cấu hình cho cả 2 máy vì chúng sẽ bị xung đột và không thể kết nối đồng thời.

Dưới đây là các bước để thêm thiết bị thứ hai:

### Bước 1: Tạo Peer mới trên MikroTik

1. Vào mục **WireGuard** -> tab **Peers**.
2. Nhấn dấu **+** để thêm máy thứ hai:
	- **Interface**: Chọn cái cũ (`wireguard-vpn`).
	- **Public Key**: Dán Public Key của **thiết bị thứ hai** vào đây.
	- **Allowed Address**: Cấp một IP khác. Ví dụ nếu máy 1 là `192.168.100.2/32`, thì máy này bạn để là `192.168.100.3/32`.
3. Nhấn **OK**.

### Bước 2: Cấu hình trên thiết bị thứ hai (Client)

Bạn tạo cấu hình cho máy thứ hai như sau:

Ini, TOML

```
[Interface]
PrivateKey = <Private Key riêng của máy thứ 2>
Address = 192.168.100.3/24
DNS = 1.1.1.1

[Peer]
PublicKey = <Vẫn là Public Key của MikroTik Router>
Endpoint = <IP_WAN_Hoặc_DDNS>:13231
AllowedIPs = 0.0.0.0/0
PersistentKeepalive = 25
```

### Một số lưu ý quan trọng:

- **IP không được trùng:** Máy 1 là `.2`, máy 2 là `.3`, máy 3 là `.4`,...
- **Allowed IPs trên MikroTik:** Phải dùng đuôi `/32` (ví dụ `192.168.100.3/32`) để MikroTik hiểu rằng đó là địa chỉ IP tĩnh cụ thể cho thiết bị đó.
- **Không cần mở thêm port:** Cổng `13231` (UDP) bạn đã mở ở Firewall trước đó sẽ dùng chung cho tất cả các thiết bị kết nối vào. Bạn có thể kết nối hàng chục thiết bị chỉ với duy nhất một cổng này.

**Mẹo nhỏ:** Nếu bạn sử dụng điện thoại làm thiết bị thứ hai, cách dễ nhất là tải app WireGuard, chọn "Create from scratch" để lấy Public Key, sau đó điền vào MikroTik. Hoặc nếu bạn muốn tôi hướng dẫn cách dùng script tạo mã QR để quét cho nhanh, hãy cho tôi biết nhé!