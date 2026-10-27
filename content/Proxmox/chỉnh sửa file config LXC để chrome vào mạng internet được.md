### Các thiết lập tuyệt vời (Đã sửa đúng bệnh)

- **`features: nesting=1`**: Chuẩn. Đã bật quyền lồng ghép.
    
- **`lxc.apparmor.profile: unconfined`**: Chuẩn. Đã gỡ bỏ lớp khiên chặn Sandbox của trình duyệt.
    
- **`unprivileged: 1`**: Container không có quyền root (an toàn cho Proxmox), nhờ hai cấu hình trên mà trình duyệt vẫn sẽ chạy mượt.
# Mo file cau hinh container tren Proxmox host
```
nano /etc/pve/lxc/100.conf
```