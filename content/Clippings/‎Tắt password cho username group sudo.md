---
title: ‎Google Gemini
source: https://gemini.google.com/u/1/app/0643112f4800e574?pageId=none
author:
published:
created: 2026-04-29
description: Meet Gemini, Google’s AI assistant. Get help with writing, planning, brainstorming, and more. Experience the power of generative AI.
tags:
  - clippings
  - linux
---
Chào bạn, việc tắt yêu cầu mật khẩu cho nhóm `sudo` sẽ giúp bạn thực thi các lệnh quản trị nhanh hơn, nhưng **lưu ý rằng điều này sẽ làm giảm đi một lớp bảo mật quan trọng của hệ thống**. Bất kỳ ai có quyền truy cập vào tài khoản của bạn đều có thể thực hiện các thay đổi hệ thống sâu sắc mà không bị chặn lại.

Nếu bạn vẫn muốn tiếp tục, dưới đây là cách an toàn nhất để thực hiện thông qua công cụ `visudo`:

### Các bước thực hiện:

1. **Mở Terminal:** Bạn có thể dùng tổ hợp phím `Ctrl + Alt + T`.
2. **Mở file cấu hình sudoers:** Bạn **luôn luôn** phải sử dụng lệnh `visudo` để chỉnh sửa file này thay vì dùng các trình soạn thảo text thông thường. `visudo` sẽ kiểm tra lỗi cú pháp trước khi lưu, giúp bạn không bị mất quyền sudo nếu gõ sai.
	Bash
	```
	# Mo file sudoers bang visudo
	sudo visudo
	```
3. **Tìm dòng cấu hình của nhóm sudo:** Kéo xuống dưới để tìm dòng thiết lập quyền cho `%sudo` (dấu `%` đại diện cho một group). Nó thường trông giống thế này:
	Plaintext
	```
	# Dong cau hinh mac dinh
	%sudo   ALL=(ALL:ALL) ALL
	```
4. **Chỉnh sửa để tắt mật khẩu:** Bạn thêm `NOPASSWD:` vào ngay trước chữ `ALL` ở cuối cùng. Dòng đó sẽ trở thành:
	Plaintext
	```
	# Sua lai thanh nhu sau de cho phep chay sudo khong can mat khau
	%sudo   ALL=(ALL:ALL) NOPASSWD: ALL
	```
	*(Lưu ý: Đảm bảo có khoảng trắng giữa `NOPASSWD:` và `ALL`)*
5. **Lưu và thoát:**
	- Nếu `visudo` đang sử dụng trình soạn thảo **nano** (mặc định trên hầu hết các bản Ubuntu): Bấm `Ctrl + O` để lưu, sau đó bấm `Enter` để xác nhận tên file, và cuối cùng bấm `Ctrl + X` để thoát.
		- Nếu trình soạn thảo là **vi/vim**: Bấm phím `Esc`, gõ `:wq` và bấm `Enter`.

Để kiểm tra, bạn có thể đóng Terminal, mở lại một cửa sổ mới và thử chạy một lệnh quản trị, ví dụ:

Bash

```
# Kiem tra xem lenh sudo co con hoi mat khau hay khong
sudo apt update
```

Hệ thống sẽ chạy lệnh ngay lập tức mà không hiện ra dòng nhắc mật khẩu nữa.

source: https://gemini.google.com/u/1/app/0643112f4800e574?pageId=none