Các đơn giản là sử dụng các python script đồng bộ thông qua github.
1. script python lắng nghe khi nào obsidian mở sẽ copy các thư mục mới từ gihub về
2. sử dụng xong sẽ làm sạch note chuyển ảnh lên R2 (script python 2) sau đó sẽ đồng bộ hoàn toàn từ máy đang soạn thảo lên github (ghi đè)
3. Dữ liệu trên github sẽ được sync qua nền tảng Blog quartz online, để theo dõi thường xuyên ở bất kỳ đâu, kể cả trên mobile
4. Trên mobile để gửi note thì chỉ cần dùng Telegram bot kết nối đến cloudflare worker, rồi worker này kết nối đến github action.
Để mở obsidian trên windows ta dùng file .vbs, còn bên Mac thì sẽ dùng Automator.

[Launch_Obsidian.vbs](https://drive.ttfy.cc/20261012151826_Launch_Obsidian.vbs)
[sync_r2.py](https://drive.ttfy.cc/20261012151827_sync_r2.py)
[obsidian_workflow.py](https://drive.ttfy.cc/20261012151828_obsidian_workflow.py)

```Shell script
# Nap bien moi truong de Automator nhan dien Homebrew va Python
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

# Chay script python bang duong dan co dau ngoac kep
python3 "/Users/destiny/Library/Mobile Documents/iCloud~md~obsidian/Documents/Learningnewthings/obsidian_workflow.py"
```

![Pasted image 20261012151014.png](https://drive.ttfy.cc/20261012151022_Pasted_image_20261012151014.png)

Nhớ thay các biến đường dẫn ở các file khi xài trên máy mới.
