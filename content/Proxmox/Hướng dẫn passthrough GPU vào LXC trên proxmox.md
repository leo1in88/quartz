---
title: "You said  hướng dẫn passthrough GPU vào LXC trên ..."
source: "https://gemini.google.com/app/d12781fe98afda39"
author:
published:
created: 2026-04-25
description: "Gemini conversation with 5 messages"
tags:
  - "clippings"
---
**You**

hướng dẫn passthrough GPU vào LXC trên proxmox

---

**Gemini**

Việc passthrough GPU vào LXC (Linux Container) trên Proxmox khác với VM. Thay vì ẩn phần cứng khỏi Host, LXC sẽ **chia sẻ** driver trực tiếp từ nhân (kernel) của Host.

Dưới đây là hướng dẫn chi tiết các bước để thực hiện, tập trung vào GPU NVIDIA (phổ biến nhất) và GPU Intel/AMD.

---

## 1\. Chuẩn bị trên Proxmox Host

Trước tiên, bạn cần cài đặt driver cho GPU ngay trên máy chủ Proxmox.

### Đối với NVIDIA:

1. **Cài đặt Build Essential:** `apt update && apt install -y build-essential`
2. **Cài đặt Driver:** Tải bản driver `.run` từ NVIDIA hoặc cài qua kho pve-headers. Quan trọng nhất là sau khi cài, lệnh `nvidia-smi` phải chạy được và hiển thị thông số card.

### Đối với Intel/AMD:

Thường thì driver đã có sẵn trong Kernel. Bạn chỉ cần kiểm tra xem các tệp thiết bị đã tồn tại chưa: `ls -l /dev/dri`

> Thông thường bạn sẽ thấy `card0` và `renderD128`.

---

## 2\. Xác định thông số thiết bị (Major/Minor Numbers)

Để cho phép LXC truy cập vào phần cứng, bạn cần biết mã số định danh của thiết bị đó.

Chạy lệnh sau trên Host:

```
ls -l /dev/nvidia*
# Hoặc với Intel/AMD:
ls -l /dev/dri/*
```

Kết quả sẽ có dạng: `crw-rw-rw- 1 root root 195,   0 Apr 25 10:00 /dev/nvidia0` `crw-rw-rw- 1 root root 195, 255 Apr 25 10:00 /dev/nvidiactl` `crw-rw-rw- 1 root root 226, 128 Apr 25 10:00 /dev/dri/renderD128`

**Lưu ý:** Cặp số `195, 0` hay `226, 128` chính là số **Major** và **Minor**. Bạn sẽ cần chúng ở bước sau.

---

## 3\. Cấu hình file LXC (.conf)

Bạn cần chỉnh sửa file cấu hình của container (ví dụ ID của container là `100`).

1. Mở file: `nano /etc/pve/lxc/100.conf`
2. Thêm các dòng sau vào cuối file (Ví dụ cho NVIDIA):

```
# Cho phép LXC truy cập thiết bị (thay số 195 bằng số Major bạn tìm thấy)
lxc.cgroup2.devices.allow: c 195:* rwm
lxc.cgroup2.devices.allow: c 508:* rwm
lxc.cgroup2.devices.allow: c 10:* rwm

# Mount các file thiết bị vào LXC
lxc.mount.entry: /dev/nvidia0 dev/nvidia0 none bind,optional,create=file
lxc.mount.entry: /dev/nvidiactl dev/nvidiactl none bind,optional,create=file
lxc.mount.entry: /dev/nvidia-uvm dev/nvidia-uvm none bind,optional,create=file
lxc.mount.entry: /dev/nvidia-uvm-tools dev/nvidia-uvm-tools none bind,optional,create=file
```

**Đối với Intel Quicksync (iGPU):**

```
lxc.cgroup2.devices.allow: c 226:* rwm
lxc.mount.entry: /dev/dri dev/dri none bind,optional,create=dir
```

---

## 4\. Cài đặt bên trong LXC Container

Sau khi cấu hình xong, hãy khởi động LXC.

### Đối với NVIDIA (Quan trọng):

Bạn **phải** cài đặt Driver NVIDIA bên trong LXC nhưng **KHÔNG** cài đặt kernel module (vì nó dùng chung với Host).

1. Tải bản driver **cùng phiên bản chính xác** với Host.
2. Chạy trình cài đặt với cờ `--no-kernel-module`: `sh NVIDIA-Linux-x86_64-xxx.xx.run --no-kernel-module`
3. Sau khi cài xong, thử gõ `nvidia-smi`. Nếu hiện bảng thông số là bạn đã thành công.

### Đối với Intel/AMD:

Bạn chỉ cần cài các thư viện cần thiết để chạy ứng dụng (ví dụ: `va-driver-all`, `clinfo`). `apt install mesa-va-drivers`

---

## 5\. Xử lý lỗi quyền truy cập (Permissions)

Nếu bạn chạy `nvidia-smi` bên trong LXC mà bị báo lỗi "Permission denied", hãy kiểm tra quyền của file thiết bị trên Host: `chmod 666 /dev/nvidia*` (Hoặc cấu hình `udev rule` để giữ quyền này sau khi reboot).

> **Lời khuyên:** Nếu bạn dùng LXC cho các phần mềm như **Plex, Jellyfin** hoặc **Transcoding**, hãy ưu tiên dùng LXC thay vì VM vì nó tiêu tốn cực ít tài nguyên và không cần cấp phát cố định RAM cho GPU.

Bạn đang định sử dụng GPU này cho tác vụ cụ thể nào (như encode video hay chạy AI)? Chúc bạn thực hiện thành công!

---

**Gemini**

Dựa trên hình ảnh bạn cung cấp, bạn đang sở hữu một **Intel iGPU** (card onboard) với thông số định danh thiết bị như sau:

- **Major Number:** `226`
- **Minor Numbers:** `1` (cho `card1`) và `128` (cho `renderD128`)

Để passthrough thiết bị này vào LXC, bạn hãy thực hiện các bước cấu hình chính xác theo thông số trên:

---

### 1\. Chỉnh sửa file cấu hình LXC trên Host

Giả sử ID của LXC là `100`, bạn mở file cấu hình bằng lệnh: `nano /etc/pve/lxc/100.conf`

Thêm các dòng sau vào cuối file:

```
# Cho phép truy cập vào nhóm thiết bị 226 (Direct Rendering Infrastructure)
lxc.cgroup2.devices.allow: c 226:* rwm

# Mount cụ thể card1 và renderD128 vào container
lxc.mount.entry: /dev/dri/card1 dev/dri/card1 none bind,optional,create=file
lxc.mount.entry: /dev/dri/renderD128 dev/dri/renderD128 none bind,optional,create=file
```

---

### 2\. Xử lý vấn đề phân quyền (Quan trọng)

Trong ảnh, thiết bị thuộc sở hữu của group `video` và `render`. Nếu container của bạn là **Unprivileged** (mặc định và an toàn hơn), container sẽ không có quyền đọc/ghi vào các file này trừ khi bạn phân quyền lại.

**Cách nhanh nhất (nhưng cần làm lại sau khi reboot host):** Trên Proxmox Host, chạy lệnh:

```
chmod 666 /dev/dri/card1
chmod 666 /dev/dri/renderD128
```

**Cách triệt để (Dùng Udev Rule):** Tạo file `/etc/udev/rules.d/60-dri-permissions.rules` trên Host với nội dung: `KERNEL=="renderD*", MODE="0666"` `KERNEL=="card*", MODE="0666"`

---

### 3\. Kiểm tra bên trong LXC

Sau khi lưu cấu hình và khởi động lại LXC, bạn truy cập vào LXC và kiểm tra:

1. **Kiểm tra thiết bị đã hiện diện chưa:** `ls -l /dev/dri`
	> Bạn sẽ thấy `card1` và `renderD128` xuất hiện với quyền `crw-rw-rw-`.
2. **Cài đặt công cụ kiểm tra:** `apt update && apt install intel-gpu-tools`
3. **Chạy lệnh giám sát:** `intel_gpu_top`
	> Nếu bảng thông số hiện lên và nhảy số khi bạn chạy tác vụ (như transcode video), nghĩa là iGPU đã hoạt động hoàn hảo.

### Một số lưu ý nhỏ:

- Nếu bạn dùng cho **Jellyfin** hoặc **Plex**, hãy đảm bảo user chạy ứng dụng đó (thường là `jellyfin`) đã được thêm vào group `render` hoặc `video` bên trong LXC.
- Nếu bạn thấy `card1` không hoạt động, có thể container đang tìm `card0`. Tuy nhiên, với Intel iGPU hiện đại, `renderD128` mới là thành phần quan trọng nhất cho việc encode/decode video.

Bạn định dùng iGPU này để chạy Plex/Jellyfin hay cho tác vụ nào khác không?

---

**You**

sau khi cài gpu passthrough cho lxc, tôi cài giao diện xfce cho lxc thì bị lỗi sau trong quá trình cài đặt

---

**Gemini**

Đừng quá hoảng loạn khi thấy dòng chữ đỏ rực cả màn hình như vậy. Những lỗi này thực chất là "đặc sản" khi bạn cố gắng cài đặt các gói phần mềm quản lý hệ thống (như `udisks2`) vào trong một Container (LXC).

Dưới đây là phân tích và cách xử lý cho bạn:

### 1\. Tại sao lại có lỗi này?

Lỗi `Permission denied` khi ghi vào `/sys/devices/.../uevent` xảy ra vì **LXC là một container chia sẻ nhân (kernel) với Host**.

- Gói `udisks2` (thường đi kèm khi cài XFCE để quản lý ổ đĩa, USB) cố gắng can thiệp vào các tệp tin hệ thống của nhân để điều khiển phần cứng.
- Proxmox (vì lý do bảo mật) không cho phép container thay đổi cấu hình phần cứng của máy chủ vật lý.

### 2\. Lỗi này có nghiêm trọng không?

**Câu trả lời là: Thường thì KHÔNG.** Đa số trường hợp, tiến trình cài đặt XFCE vẫn sẽ hoàn tất. Các lỗi này chỉ có nghĩa là tính năng "tự động nhận diện ổ đĩa mới" hoặc "quản lý phân vùng" bên trong giao diện XFCE sẽ không hoạt động (điều này cũng hợp lý vì LXC không trực tiếp quản lý ổ cứng vật lý).

---

### 3\. Cách xử lý

#### Bước 1: Kiểm tra xem cài đặt đã xong chưa

Hãy thử chạy lệnh sau để xem các gói đã được cài đặt đúng chưa:

```
dpkg --configure -a
```

Nếu không có lỗi nào khác ngoài cái `udisks2` này, thì hệ thống của bạn đã ổn.

#### Bước 2: Vô hiệu hóa udisks2 (Nếu bạn muốn hết lỗi)

Vì trong LXC bạn không thực sự cần quản lý ổ đĩa vật lý, bạn có thể "vô hiệu hóa" nó để tránh các thông báo lỗi phiền phức:

```
systemctl mask udisks2
```

#### Bước 3: Cấu hình để XFCE chạy được với GPU

Để XFCE thực sự sử dụng được iGPU bạn vừa passthrough, bạn cần đảm bảo container có quyền truy cập vào card đồ họa. Nếu bạn đang sử dụng **Unprivileged Container** (mặc định), hãy kiểm tra lại file `.conf` trên Host (như bước tôi hướng dẫn trước đó) và đảm bảo các dòng `lxc.mount.entry` đã chính xác.

---

### 4\. Một lưu ý nhỏ về việc dùng Giao diện (GUI) trên LXC

Việc cài XFCE vào LXC thường nhằm 2 mục đích, bạn thuộc trường hợp nào?

- **Trường hợp A: Dùng Remote Desktop (Xrdp/VNC):** Bạn cần cài thêm `xrdp`. `apt install xrdp && systemctl enable xrdp` Sau đó bạn dùng Remote Desktop từ Windows để vào.
- **Trường hợp B: Xuất hình trực tiếp ra màn hình cắm vào Proxmox:** Đây là kỹ thuật khó hơn (thường gọi là "Local Display"). Bạn sẽ cần cài thêm gói `xserver-xorg-video-intel` và cấu hình file `/etc/X11/xorg.conf` bên trong LXC để nó nhận iGPU làm card xuất hình chính.

**Lời khuyên:** Nếu mục đích của bạn chỉ là dùng GPU để **Transcode** (cho Plex, Jellyfin) hoặc chạy **Docker/AI**, bạn **không cần cài XFCE**. Giao diện đồ họa chỉ làm container nặng thêm và dễ gây xung đột driver.

Hiện tại sau khi cài xong XFCE, bạn định kết nối vào container này bằng cách nào?

source: https://gemini.google.com/app/d12781fe98afda39