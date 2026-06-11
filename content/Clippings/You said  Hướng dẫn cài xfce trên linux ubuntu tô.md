---
title: "You said  Hướng dẫn cài xfce trên linux ubuntu tô..."
source: "https://gemini.google.com/app/ac60bbd31df22d6c"
author:
published:
created: 2026-04-11
description: "Gemini conversation with 2 messages"
tags:
  - "clippings"
---
**You**

Hướng dẫn cài xfce trên linux ubuntu tôi đã cài trên lxc proxmox

---

**Gemini**

Việc cài đặt giao diện đồ họa (GUI) trên LXC Ubuntu trong Proxmox rất hữu ích khi bạn cần một môi trường làm việc trực quan nhưng vẫn muốn tiết kiệm tài nguyên. XFCE là lựa chọn tuyệt vời nhất vì nó cực kỳ nhẹ.

Dưới đây là hướng dẫn từng bước để bạn cài đặt và truy cập vào XFCE thông qua Remote Desktop (RDP).

---

## Bước 1: Cập nhật hệ thống

Trước khi cài đặt bất kỳ thứ gì, hãy đảm bảo các gói phần mềm của bạn đều ở phiên bản mới nhất. Truy cập vào **Console** của LXC trên Proxmox và chạy:

```
apt update && apt upgrade -y
```

## Bước 2: Cài đặt XFCE4

Bạn có hai lựa chọn: cài bản tối giản hoặc bản đầy đủ (kèm các công cụ như trình chỉnh sửa văn bản, máy tính, v.v.).

- **Bản tiêu chuẩn (Khuyên dùng):**
	```
	apt install xfce4 xfce4-goodies -y
	```
- **Bản cực nhẹ (Chỉ có lõi XFCE):**
	```
	apt install xfce4 -y
	```

## Bước 3: Cài đặt XRDP (Để kết nối từ xa)

LXC thường không có màn hình vật lý, vì vậy cách dễ nhất để thấy giao diện là dùng giao thức Remote Desktop (RDP).

1. **Cài đặt XRDP:**
	```
	apt install xrdp -y
	```
2. **Cho phép XRDP khởi động cùng hệ thống:**
	```
	systemctl enable xrdp
	systemctl start xrdp
	```
3. **Cấu hình XRDP sử dụng XFCE:** Bạn cần báo cho XRDP biết là khi đăng nhập vào thì phải mở XFCE lên.
	```
	echo "startxfce4" > ~/.xsession
	```
4. **Khởi động lại dịch vụ:**
	```
	systemctl restart xrdp
	```

## Bước 4: Tạo người dùng mới (Đã làm khi tạo lxc)

Bạn **không nên** đăng nhập giao diện đồ họa bằng quyền `root` vì lý do bảo mật và một số ứng dụng sẽ không chạy. Hãy tạo một người dùng bình thường:

```
# Thay 'ten_cua_ban' bằng tên bạn muốn
adduser ten_cua_ban

# Cấp quyền sudo cho người dùng này
usermod -aG sudo ten_cua_ban
```


---

## Một số lưu ý quan trọng cho LXC

Khi chạy GUI trên LXC, bạn có thể gặp một vài thông báo lỗi nhỏ, hãy xử lý như sau:

### 1\. Lỗi "Color Manager" (Xác thực hệ thống)

Khi đăng nhập, nếu hệ thống liên tục hỏi mật khẩu để "Create a color managed device", hãy tạo file sau để tắt nó:

```
nano /etc/polkit-1/localauthority/50-local.d/45-allow-colord.pkla
```

Dán nội dung này vào:

```
[Allow Colord]
Identity=unix-user:*
Action=org.freedesktop.color-manager.create-device;org.freedesktop.color-manager.create-profile;org.freedesktop.color-manager.delete-device;org.freedesktop.color-manager.delete-profile;org.freedesktop.color-manager.modify-device;org.freedesktop.color-manager.modify-profile
ResultAny=no
ResultInactive=no
ResultActive=yes
```

### 2\. Tăng tốc đồ họa

Nếu bạn thấy giao diện hơi lag, đó là do LXC đang sử dụng CPU để xử lý đồ họa. Nếu máy chủ Proxmox của bạn có card đồ họa (GPU) hoặc iGPU (Intel), bạn có thể tìm hiểu thêm về **GPU Passthrough** để tăng tốc độ mượt mà cho LXC.

> **Mẹo nhỏ:** XFCE tiêu tốn rất ít RAM (chỉ khoảng 300MB - 500MB sau khi khởi động), nên bạn có thể đặt giới hạn RAM cho LXC khoảng 2GB là chạy cực kỳ thoải mái rồi!

Bạn có gặp khó khăn ở bước kết nối IP không?