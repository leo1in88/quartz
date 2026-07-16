Các lệnh cần đưa vào file .conf của lxc

lxc.cgroup2.devices.allow: c 195:* rwm  
lxc.cgroup2.devices.allow: c 234:* rwm  
lxc.cgroup2.devices.allow: c 237:* rwm  
lxc.mount.entry: /dev/nvidia0 dev/nvidia0 none bind,optional,create=file  
lxc.mount.entry: /dev/nvidiactl dev/nvidiactl none bind,optional,create=file  
lxc.mount.entry: /dev/nvidia-uvm dev/nvidia-uvm none bind,optional,create=file  
lxc.mount.entry: /dev/nvidia-uvm-tools dev/nvidia-uvm-tools none bind,optional,create=file  
lxc.mount.entry: /dev/dri dev/dri none bind,optional,create=dir  
lxc.mount.entry: /dev/nvidia-modeset dev/nvidia-modeset none bind,optional,create=file  
lxc.apparmor.profile: unconfined

Nếu vẫn chưa được làm tiếp bước này:

### Bước 2: Ngăn Xorg gọi nhầm module GBM của NVIDIA (Thực hiện trong LXC)

Việc chúng ta cần làm là "cất" file cấu hình định tuyến GBM của NVIDIA đi. Điều này giúp XFCE vẽ giao diện desktop cơ bản bằng phần mềm (chạy mượt mà trên RDP), trong khi các trình duyệt web bên trong LXC vẫn hoàn toàn có thể tự do gọi `/dev/nvidia0` để tăng tốc phần cứng.

Truy cập vào shell của **LXC** bằng quyền root và chạy lệnh sau:

Bash

`# Tim va doi ten file GBM cua nvidia de xorg khong goi nham gay crash  
find /usr/share/ -name "*nvidia_gbm.json" -exec mv {} {}.bak \;

# Khoi dong lai dich vu remote desktop mot lan nua

systemctl restart xrdp xrdp-sesman`

Bây giờ bạn hãy mở lại Remote Desktop Connection trên Windows và kết nối. Chắc chắn giao diện XFCE sẽ hiển thị lên ngay lập tức mà không còn bị văng nữa!

Nếu tiếp tục gặp lỗi.

Tim va loc ra cac dong chua ma loi (EE) trong file log cua user minh

grep -i "(EE)" /home/minh/.xorgxrdp.*.log

---

---

---

---

Chào bạn, combo E5 2680 v4 và RTX 3060 là một hệ thống rất mạnh mẽ và lý tưởng cho các tác vụ máy chủ. Khác với Virtual Machine (VM) sử dụng PCIe passthrough nguyên cụm, LXC (Linux Container) chia sẻ chung kernel với Proxmox host. Do đó, nguyên tắc cốt lõi ở đây là: **Cài driver trên Host -> Đẩy device nodes vào cấu hình LXC -> Cài lại đúng bản driver đó trong LXC nhưng bỏ qua kernel module.**

Việc cấu hình thành công sẽ giúp các công cụ duyệt web và các luồng tự động hóa chạy trong LXC tận dụng được khả năng tăng tốc phần cứng của RTX 3060 để render cực kỳ nhanh và mượt.

Dưới đây là các bước chi tiết để thực hiện.

### 1. Chuẩn bị trên Proxmox Host

Đầu tiên, bạn cần cập nhật hệ thống và cài đặt các header tương ứng với phiên bản kernel `6.17.2-1-pve` của bạn, sau đó vô hiệu hóa driver mã nguồn mở `nouveau` mặc định.

Truy cập shell của Proxmox host và chạy:

Bash

`# Cap nhat he thong va cai dat cac goi can thiet  
apt update && apt upgrade -y

# Cai dat pve-headers tuong ung voi kernel hien tai cung cac cong cu build

apt install pve-headers-$(uname -r) build-essential dkms -y`

Vô hiệu hóa `nouveau`:

Bash

`# Tao file de vo hieu hoa nouveau  
echo "blacklist nouveau" > /etc/modprobe.d/blacklist-nouveau.conf  
echo "options nouveau modeset=0" >> /etc/modprobe.d/blacklist-nouveau.conf

# Cap nhat lai initramfs de ap dung thay doi

update-initramfs -u

# Khoi dong lai he thong host

reboot`

### 2. Cài đặt NVIDIA Driver trên Host

Sau khi Proxmox khởi động lại, truy cập trang chủ NVIDIA để lấy link tải bản driver `.run` chính thức cho Linux 64-bit (ví dụ bản 550.x hoặc mới nhất).

Bash

`# Tai file cai dat driver tu server Nvidia (thay link bang phien ban ban chon)  
wget [https://us.download.nvidia.com/XFree86/Linux-x86_64/550.54.14/NVIDIA-Linux-x86_64-550.54.14.run](https://us.download.nvidia.com/XFree86/Linux-x86_64/550.54.14/NVIDIA-Linux-x86_64-550.54.14.run)

# Cap quyen thuc thi cho file cai dat

chmod +x NVIDIA-Linux-x86_64-550.54.14.run

# Chay trinh cai dat

./NVIDIA-Linux-x86_64-550.54.14.run`

_Lưu ý:_ Cứ nhấn "Yes" hoặc "OK" cho các câu hỏi mặc định trong trình cài đặt. Nếu nó hỏi có muốn cài NVIDIA 32-bit compatibility libraries không, bạn có thể chọn Yes.

Kiểm tra xem driver đã nhận chưa bằng lệnh: `nvidia-smi`.  
Đảm bảo các module đã được nạp đầy đủ (rất quan trọng để passthrough):

Bash

`# Nap module uvm vao kernel de ho tro render modprobe nvidia-uvm`

### 3. Xác định Device ID của GPU

Bạn cần kiểm tra Major ID của card đồ họa trên host để cấp quyền cho LXC. Chạy lệnh:

Bash

`# Kiem tra danh sach thiet bi nvidia tren he thong ls -al /dev/nvidia*`

Kết quả trả về sẽ có dạng tương tự như thế này:  
`crw-rw-rw- 1 root root 195, 0 May 11 09:00 /dev/nvidia0crw-rw-rw- 1 root root 195, 255 May 11 09:00 /dev/nvidiactlcrw-rw-rw- 1 root root 511, 0 May 11 09:00 /dev/nvidia-uvm`

Hãy ghi nhớ các con số đứng trước dấu phẩy (ở ví dụ trên là **195** và **511**). Máy của bạn có thể sẽ có các số major khác cho `nvidia-uvm` (thường là 238, 505 hoặc 511).

Sau đó chạy lệnh

chmod 666 /dev/nvidia*  
chmod 666 /dev/dri/*

## Cách để không phải chạy lại lệnh này sau mỗi lần Reboot

Để máy host tự động tạo các file này và cấp quyền 666 mỗi khi khởi động, bạn nên thiết lập **udev rules**. Điều này cực kỳ quan trọng nếu bạn muốn các container LXC luôn có GPU để dùng mà không cần bạn can thiệp thủ công.

**Bước A: Tự động nạp module**  
Thêm tên các module vào file `/etc/modules-load.d/nvidia.conf`:

Bash

`echo -e "nvidia\nnvidia_uvm\nnvidia_modeset" > /etc/modules-load.d/nvidia.conf`

**Bước B: Tự động cấp quyền 666**  
Tạo một file quy tắc mới: `nano /etc/udev/rules.d/70-nvidia.rules` và dán nội dung sau vào:

Plaintext

`# Tu dong set quyen 666 cho cac thiet bi Nvidia khi moi khoi tao KERNEL=="nvidia*", MODE="0666" KERNEL=="nvidia_uvm", MODE="0666" KERNEL=="nvidia_modeset", MODE="0666" KERNEL=="renderD*", MODE="0666"`

Lưu lại và từ giờ trở đi, máy **ttfy** sẽ luôn sẵn sàng GPU cho bạn.

Sau khi chạy các lệnh `modprobe` ở Bước 1, bạn thử chạy lại `nvidia-smi` xem bảng thông số đã hiện lên lại chưa nhé?

### 4. Cấu hình file LXC để Passthrough

Giả sử ID của LXC bạn định tạo/đã tạo là `100`. Mở file cấu hình của LXC đó từ Proxmox host:

`nano /etc/pve/lxc/100.conf`

Thêm các dòng sau vào cuối file (thay `195` và `511` bằng những số Major ID bạn vừa lấy ở Bước 3):

Plaintext

lxc.cgroup2.devices.allow: c 195:* rwm  
lxc.cgroup2.devices.allow: c 234:* rwm  
lxc.cgroup2.devices.allow: c 237:* rwm  
lxc.mount.entry: /dev/nvidia0 dev/nvidia0 none bind,optional,create=file  
lxc.mount.entry: /dev/nvidiactl dev/nvidiactl none bind,optional,create=file  
lxc.mount.entry: /dev/nvidia-uvm dev/nvidia-uvm none bind,optional,create=file  
lxc.mount.entry: /dev/nvidia-uvm-tools dev/nvidia-uvm-tools none bind,optional,create=file  
lxc.mount.entry: /dev/dri dev/dri none bind,optional,create=dir  
lxc.mount.entry: /dev/nvidia-modeset dev/nvidia-modeset none bind,optional,create=file  
lxc.apparmor.profile: unconfined  
lxc.cap.drop:  
lxc.mount.auto: sys:rw

Lưu lại và thoát (Ctrl+O -> Enter -> Ctrl+X).

### 5. Cài đặt driver trong LXC Container

Khởi động LXC của bạn (`pct start 100`) và truy cập vào shell của nó (`pct enter 100`).

Tại đây, bạn **bắt buộc phải tải lại đúng file `.run` có phiên bản y hệt** như đã cài trên host. Nếu lệch phiên bản, giao tiếp giữa container và host sẽ thất bại.

Bash

`# copy cung phien ban driver nhu tren host pct push 104 NVIDIA-Linux-x86_64-595.71.05.run root/NVIDIA-Linux-x86_64-595.71.05.run`

`# copy chrome sang container`

pct push 104 google-chrome-stable_current_amd64.deb root/google-chrome-stable_current_amd  
64.deb

TREN LXC CAI DAT

`apt update && apt upgrade -y

# Cap quyen thuc thi

chmod +x NVIDIA-Linux-x86_64-595.71.05.run`

Cài đặt các gói phụ thuộc còn thiếu

Bạn cần cài đặt `pkg-config` và các thư viện phát triển của `libglvnd`. Chạy lệnh sau trong terminal:

Bash

`apt update && apt upgrade -y

# Cai dat cac goi ho tro lap trinh do hoa va quan ly thu vien

apt install -y pkg-config libglvnd-dev libglvnd0 libx11-6 libxext6`

### 2. Cài đặt thêm các Header cho Xorg (Khuyên dùng)

Vì bạn đang cố gắng chạy Chrome với GPU, việc có đầy đủ các header của Xorg sẽ giúp bộ cài tạo ra các file thư viện `.so` cần thiết (như `nvidia_drv.so`) một cách chuẩn xác nhất:

Bash

apt install -y xserver-xorg-core xserver-xorg-dev

### 3. Chạy lại bộ cài NVIDIA

Sau khi cài xong các gói trên, bạn hãy chạy lại file `.run` của NVIDIA.

- **Nếu bạn đang ở trong LXC:** Hãy nhớ thêm tham số `-no-kernel-module` để tránh lỗi xung đột với máy Host.

Bash

`# Thay ten file bang ten chinh xac cua ban (595.71.05) sh ./NVIDIA-Linux-x86_64-595.71.05.run --no-kernel-module`

apt install -y nvidia-vaapi-driver

apt install -y \  
libnvidia-egl-wayland1 \  
mesa-utils \

apt install -y libnvidia-gl-595

Cấp quyền

```jsx
chmod 666 /dev/nvidia* /dev/dri/*
```

sudo nvidia-xconfig

Lệnh này sẽ tự động tạo một file `/etc/X11/xorg.conf` chuẩn cho card Nvidia của bạn. Sau đó, bạn cần khởi động lại máy ảo (hoặc khởi động lại service giao diện như `sudo systemctl restart lightdm`).

Có thể bỏ qua bước bên dưới

nano /etc/X11/xorg.conf

Section "ServerFlags"  
Option "AutoAddDevices" "False"  
EndSection

Section "Device"  
Identifier "Device0"  
Driver "nvidia"  
VendorName "NVIDIA Corporation"

# THAY THE CON SO DUOI DAY BANG BUSID BAN VUA TIM DUOC

BusID "PCI:3:0:0"  
Option "AllowEmptyInitialConfiguration" "True"  
EndSection

Section "Screen"  
Identifier "Screen0"  
Device "Device0"  
DefaultDepth 24  
Option "UseDisplayDevice" "none"  
Option "ConnectedMonitor" "DFP"  
SubSection "Display"  
Virtual 1920 1080  
Depth 24  
EndSubSection  
EndSection

Tạo/Sửa file `/etc/X11/Xwrapper.config`:

echo "allowed_users=anybody" > /etc/X11/Xwrapper.config  
echo "needs_root_rights=yes" >> /etc/X11/Xwrapper.config

Thêm biến môi trường cho nvidia

nano /etc/environment

```jsx
# bien moi truong nvidia
__GLX_VENDOR_LIBRARY_NAME=nvidia
__NV_PRIME_RENDER_OFFLOAD=1
__VK_LAYER_NV_optimus=NVIDIA_only
LIBVA_DRIVER_NAME=nvidia
```

Sau khi hoàn tất cài đặt trong LXC, hãy gõ `nvidia-smi` ngay bên trong LXC. Nếu bảng thông số của RTX 3060 hiện lên kèm mức tiêu thụ RAM và nhiệt độ, xin chúc mừng, bạn đã passthrough thành công. Hệ điều hành và các trình duyệt web bên trong LXC lúc này đã có thể truy cập trực tiếp vào phần cứng để tăng tốc độ xử lý!

kiêm trả trong lxc xem đã nhận GPU nvidia chưa.

ls -l /dev/nvidia*

và lệnh

nvidia-smi

lệnh này phải có thông số trên host và lxc giống nhau.

install chrome  
`apt install ./google-chrome-stable_current_amd64.deb`

uninstall chrome

sudo apt-get purge google-chrome-stable  
sudo apt-get autoremove  
rm -rf ~/.config/google-chrome/  
edit timezone

`*timedatectl set-timezone Asia/Ho_Chi_Minh*`

check time zone list

timedatectl list-timezones

Bạn chỉ cần cài các thư viện cần thiết để chạy ứng dụng (ví dụ: `va-driver-all`, `clinfo`).

sudo apt install clinfo

`apt install mesa-va-drivers`

Chú ý khi lỗi giao diện trong xfce có thể dùng lệnh này để reset lại XFCE

Để ép các cửa sổ hiển thị lên ngay lập tức mà không cần quan tâm đến lỗi 3D/GLX, bạn hãy chạy lệnh `xfwm4` nhưng tắt tính năng compositor đi:

Bash

`xfwm4 --compositor=off --replace &`

Nếu lệnh này thành công, các viền cửa sổ sẽ xuất hiện trở lại (dù trông có vẻ hơi "phẳng" và không có bóng đổ).