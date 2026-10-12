Các đơn giản là sử dụng các python script đồng bộ thông qua github.
1. script python lắng nghe khi nào obsidian mở sẽ copy các thư mục mới từ gihub về
2. sử dụng xong sẽ làm sạch note chuyển ảnh lên R2 (script python 2) sau đó sẽ đồng bộ hoàn toàn từ máy đang soạn thảo lên github (ghi đè)
3. Dữ liệu trên github sẽ được sync qua nền tảng Blog quartz online, để theo dõi thường xuyên ở bất kỳ đâu, kể cả trên mobile
4. Trên mobile để gửi note thì chỉ cần dùng Telegram bot kết nối đến cloudflare worker, rồi worker này kết nối đến github action.
Để mở obsidian trên windows ta dùng file .vbs, còn bên Mac thì sẽ dùng Automator.

```Shell script
# Nap bien moi truong de Automator nhan dien Homebrew va Python
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

# Chay script python bang duong dan co dau ngoac kep
python3 "/Users/destiny/Library/Mobile Documents/iCloud~md~obsidian/Documents/Learningnewthings/obsidian_workflow.py"
```
Nhớ thay các biến đường dẫn ở các file khi xài trên máy mới.
