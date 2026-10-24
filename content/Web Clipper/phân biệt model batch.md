---
title: "phân biệt model batch"
source: "https://gemini.google.com/u/1/app/90a73f41a952a65f?pageId=none"
tags:
  - "clippings"
---

You said trong openrouter, tôi thấy model sonnet 5.5 patch, nó khác gì với model sonnet 5.5 vậy? trong openrouter, tôi thấy model sonnet 5.5 patch, nó khác gì với model sonnet 5.5 vậy?

###### Gemini said

Từ trong ảnh thực chất là **(batch)** chứ không phải "patch" (bản vá). Đây là cùng một mô hình Claude Sonnet 5.5 của Anthropic, nhưng khác nhau về **phương thức gọi API, thời gian phản hồi và giá cả**.

### Bảng so sánh Claude Sonnet 5.5 và Sonnet 5.5 (batch)

| Đặc điểm | Claude Sonnet 5.5 (Bản thường) | Claude Sonnet 5.5 (batch) |
| --- | --- | --- |
| **Bản chất mô hình** | Cùng mô hình lõi Claude Sonnet 5.5 | Cùng mô hình lõi Claude Sonnet 5.5 |
| **Phương thức gọi** | **Real-time (Đồng bộ):** Gửi yêu cầu và nhận kết quả ngay tức thì qua API/Chat | **Batch API (Bất đồng bộ):** Gửi gom một tập hợp câu hỏi/tác vụ thành một gói (batch) để server xử lý ngầm |
| **Giá token (Input / Output)** | **$2 / $10** mỗi 1M token | **$1 / $5** mỗi 1M token **(giảm 50%)**  JPG |
| **Thời gian trả kết quả** | Vài giây đến vài chục giây | Xử lý hàng đợi, trả kết quả trong vòng vài phút đến tối đa **24 giờ** |
| **Mục đích sử dụng** | Chat trực tiếp, lập trình tương tác (IDE, Cursor, Claude Code), AI agent thời gian thực | Xử lý dữ liệu lớn, gắn nhãn dữ liệu (data labeling), tóm tắt hàng loạt file/tài liệu, chạy kiểm thử (evals) |

### Khi nào nên dùng loại nào?

- **Dùng bản thường (`anthropic/claude-sonnet-5.5`):** Khi bạn cần giao tiếp trực tiếp qua khung chat, làm việc tương tác hàng ngày hoặc tích hợp vào các ứng dụng người dùng cần kết quả trả về ngay.
- **Dùng bản batch (`anthropic/claude-sonnet-5.5:batch`):** Khi bạn viết script/code để chạy một khối lượng lớn công việc không cần kết quả gấp, chấp nhận đợi kết quả sau vài chục phút để **tiết kiệm một nửa chi phí API**.

Gemini is AI and can make mistakes.

source: https://gemini.google.com/u/1/app/90a73f41a952a65f?pageId=none