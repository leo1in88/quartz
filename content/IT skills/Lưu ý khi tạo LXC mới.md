**Mặc định, SSH không cho phép đăng nhập bằng tài khoản `root` kèm mật khẩu** vì lý do bảo mật.

Trong Console của Proxmox bạn vào được là vì đó là truy cập trực tiếp (TTY), còn Bitvise đang cố gắng kết nối qua giao diện mạng (SSH).

Bạn chỉ cần thực hiện 3 bước sau để mở khóa:
### Bước 1: Sửa cấu hình SSH

Tại cửa sổ Console của LXC (nơi bạn đã đăng nhập thành công), gõ lệnh sau:

Bash

```
nano /etc/ssh/sshd_config
```

### Bước 2: Tìm và sửa dòng PermitRootLogin

Sử dụng phím mũi tên đi xuống để tìm dòng: `#PermitRootLogin prohibit-password` (hoặc tương tự).
Hãy xóa dấu `#` ở đầu và sửa nội dung thành: **`PermitRootLogin yes`**

--
### Bước 3: Lưu và Khởi động lại dịch vụ SSH

1. Nhấn `Ctrl + O`, rồi `Enter` để lưu file.
    
2. Nhấn `Ctrl + X` để thoát trình soạn thảo.
    
3. Chạy lệnh sau để thay đổi có hiệu lực:
Bash

```
systemctl restart ssh
```