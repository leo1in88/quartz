# Ví dụ script tối ưu XFCE

Tạo file:

`nano optimize-xfce.sh`

Dán vào:

`#!/bin/bash`  
  
`echo "Optimizing XFCE..."`  
  
`sudo apt remove xfce4-screensaver -y`  
  
`xfconf-query -c xfwm4 -p /general/use_compositing -s false`  
`xfconf-query -c xfce4-session -p /general/SaveOnExit -s false`  
  
`sudo systemctl disable bluetooth`  
`sudo systemctl disable cups`  
`sudo systemctl disable avahi-daemon`  
`sudo systemctl disable ModemManager`  
  
`rm -f /etc/xdg/autostart/xfce4-screensaver.desktop`  
`rm -f /etc/xdg/autostart/blueman.desktop`  
`rm -f /etc/xdg/autostart/print-applet.desktop`  
  
`echo "Done. XFCE optimized."`

Cho phép chạy

`chmod +x optimize-xfce.sh`

Chạy:

`./optimize-xfce.sh`

Sau đó **không cần chạy lại nữa**.
## tắt thông báo
Đôi khi XFCE sẽ văng ra các thông báo cập nhật hệ thống (Update Notifier) che đè lên trình duyệt. Tuy Seleniumbase xử lý mã DOM rất tốt, nhưng nếu một cửa sổ hệ thống đè lên chỗ Playwright định tiến hành mô phỏng click chuột (Clicking simulation), hành động click sẽ rớt vào cửa sổ hệ thống kia.
*   **Hành động:** Tắt các gói thông báo không cần thiết của Ubuntu.
    ```bash
    sudo apt-get remove update-notifier
    ```
## Tắt Trình Bảo Vệ Màn Hình & Chế Độ Ngủ (Screensaver / Sleep)
Kẻ thù số 1 của Automation trên môi trường Desktop là việc màn hình tự khóa. Khi XFCE tự động Lock-screen hoặc chuyển sang chế độ Sleep, quy trình vẽ (render) nội dung của trình duyệt sẽ bị hệ điều hành đóng băng để tiết kiệm điện. Script của bạn sẽ bị "time out" (quá thời gian chờ) vì không tìm thấy nút bấm.
*   **Hành động:** Mở Terminal trên XFCE và gõ:
    ```bash
    xset s off -dpms
    ```
*   Hoặc vào cài đặt *Power Manager* của XFCE > Chuyển tất cả thời gian tắt màn hình (Display power management) về `Never` (Không bao giờ).