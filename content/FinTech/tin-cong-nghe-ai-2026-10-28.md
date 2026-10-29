# Tin Công nghệ & AI ngày 28/10/2026

**Tóm tắt ngày:** Hôm nay nổi bật là Google DeepMind ra mắt mô hình thế giới **Genie 4**, Anthropic vừa nộp hồ sơ IPO (S-1) và công bố kết quả bước đầu của Claude trong phát triển thuốc, còn bảng xếp hạng Artificial Analysis nâng cấp lên Index v5. Về hạ tầng và bảo mật, Tailscale SSH có lỗ hổng leo thang đặc quyền và firmware UEFI có lỗi thực thi mã. Apple cũng ra MacBook Pro 14 inch dùng chip M6.

> Nguồn được quét: front page Hacker News (lấy qua API), blog Google DeepMind, Anthropic, Artificial Analysis, Tailscale, Apple Newsroom, Axiom. Các bài đều đăng ngày 26–27/10/2026 và nằm trên front page HN sáng 28/10. Bài Ars Technica không đọc được toàn văn (xem mục 6).

---

## 1. Google DeepMind ra mắt Genie 4: mô hình thế giới thời gian thực có âm thanh gốc
Genie 4 là mô hình thế giới mới của DeepMind, đa phương thức tự nhiên. Nó sinh nhạc, tiếng động môi trường và hội thoại tương tác cùng lúc với thế giới mô phỏng, và được DeepMind gọi là mô hình thế giới thời gian thực đầu tiên của hãng sinh âm thanh gốc. Người dùng dùng bàn phím để di chuyển/điều khiển camera và dùng văn bản để thay đổi cảnh ngay khi đang chạy, ví dụ đổi thời tiết hay thêm người/vật thể. Mô hình kế thừa năng lực từ họ Gemini: Gemini Omni neo mô phỏng vào hình dáng và hành vi đời thực. Gemini 3.8 Flash đóng vai tác tử dẫn đường trong vòng lặp, theo dõi khung hình, chia mục tiêu thành các bước và kiểm tra từng bước đã thành công chưa. DeepMind nói rõ đây vẫn là xem trước nghiên cứu: chi tiết hình ảnh và tính bền vật thể có thể trôi dần khi chạy lâu, còn văn bản dễ đọc và các tương tác vật lý phức tạp là vấn đề đang nghiên cứu. Mọi video/âm thanh do Genie 4 tạo đều có watermark SynthID. Hiện chỉ phát hành cho nhóm trusted tester. Sắp tới sẽ mở cho thuê bao Google AI Ultra trong Project Genie và đối tác truy cập sớm Gemini API/Google AI Studio.

Nguồn: https://deepmind.google/blog/genie-4-a-new-generation-of-world-simulation/ (27/10/2026)

## 2. Anthropic nộp hồ sơ S-1 cho đợt IPO
Anthropic, PBC đã nộp tờ khai đăng ký Form S-1 lên Ủy ban Chứng khoán Mỹ (SEC) cho đợt chào bán lần đầu cổ phiếu phổ thông Class A. Công ty dự kiến niêm yết trên Nasdaq Global Select Market với mã **"ANT"**. Số lượng cổ phiếu và khung giá chào bán **chưa được xác định**. Thông cáo nêu Goldman Sachs và Morgan Stanley là các đầu mối nhận bản cáo bạch sơ bộ. Tờ khai đã nộp nhưng chưa có hiệu lực, nên chưa được bán hay nhận lệnh mua. Trang tin của Anthropic còn cho thấy ngày 18/10 công ty cam kết dành một phần cổ phần cho "Anthropic Public Benefit Fund". Các con số tài chính/định giá trên báo chí chưa được kiểm chứng với nguồn gốc nên **không đưa vào bản này**.

Nguồn: https://www.anthropic.com/news/s1-sec (26/10/2026)

## 3. Anthropic: tiến triển bước đầu khi dùng Claude để tăng tốc phát triển thuốc
Trong vài tháng qua, nhóm khoa học đời sống của Anthropic hợp tác sâu với sáu tổ chức: BigHat Biosciences, Bristol Myers Squibb, Divergence Labs, Enveda, Generate Biomedicines và The Column Group. Chiến lược của họ là đưa AI vào mọi khâu của quy trình phát triển thuốc, chứ không chỉ khâu đề xuất phân tử. Một số kết quả:
- **Generate Biomedicines:** sáu nhà khoa học dùng Claude Code đề xuất thiết kế cho liệu pháp CAR-T. Một thiết kế ngắn hơn khoảng 70% so với bản chuẩn, giúp tế bào miễn dịch tạo gấp khoảng 10 lần số thụ thể và diệt tế bào u hiệu quả hơn.
- **Divergence Labs:** Claude, phần lớn tự động, tạo khoảng 35.000 thiết kế kháng thể trong khoảng một tháng cho thuốc trị dị ứng thực phẩm. Kết quả ban đầu có 3 thiết kế gắn IgE và 20 thiết kế làm bong IgE, trong đó 3 thiết kế bong IgE tốt hơn thuốc chuẩn.
- **BigHat:** khoảng 1.010 biến thể được thử trong khoảng 10 tuần. Bản tốt nhất gắn chặt hơn hơn 10 lần, và một bản kết tụ chậm hơn hơn 100 lần.
- **Enveda:** Claude bắt được cả 11 lỗi mà người rà soát phát hiện trong 1.061 trang tài liệu sản xuất, cùng 7 lỗi người bỏ sót. Thời gian rà soát giảm 89%, từ hơn 25 giờ xuống dưới 3 giờ. Một bản nháp hồ sơ pháp lý mất 4 giờ so với khoảng 3 tháng làm tay.

Ngoài ra Anthropic mua lại Mithril Medicine (công ty một người làm thuốc cho hai dạng loạn dưỡng cơ hiếm). Họ kỳ vọng thuốc có thể vào thử nghiệm lâm sàng trên người sớm nhất vào cuối 2028 nếu ứng viên tiếp tục đạt. Bài nhấn mạnh phần lớn công việc vẫn ở giai đoạn tiền lâm sàng.

Nguồn: https://www.anthropic.com/research/early-progress-drug-development (27/10/2026)

## 4. Artificial Analysis ra Intelligence Index v5: 60% đánh giá dùng bộ dữ liệu riêng
Bản nâng cấp lớn nhất kể từ v4 (tháng 1) thêm 2 benchmark mới (FrontierCode 2.0 của Cognition, Terminal-Bench-Science) và nâng cấp 3 benchmark. 60% Index nay dựa trên bộ test riêng hoặc đáp án giữ kín. Kèm theo là Progress Index v1, đặt các mô hình ngôn ngữ từ 11/2022 lên cùng một thang năng lực. Kết quả chính:
- **Claude Opus 5.5 (max)** dẫn đầu với 58 điểm, trên GPT-6 Astra (max, 57) và GPT-6.1 Sol (max, 55). Anthropic và OpenAI giữ top 5. Gemini 4 Argon (high) đứng sau với 50.
- Khoảng cách mô hình trọng số mở với dẫn đầu giãn từ 3 lên 12 điểm. Kimi K3.1 Pro (chưa phát hành trọng số) là mô hình mở đứng đầu với 46. Trong số mô hình đã phát hành trọng số, DeepSeek V4.1 Flash 1017 và GLM-5.3 cao nhất với 32, thấp hơn cả Claude Haiku 5.5 (36).
- Chi phí mỗi tác vụ chênh hơn 13 lần giữa các mô hình hàng đầu, từ 0,96 USD (GPT-6.1 Terra) đến 13,04 USD (Claude Fable 5.1). GPT-6.1 Sol kém Opus 5.5 chưa đến 4 điểm với chi phí khoảng 1/8.
- Số token đầu ra trung vị mỗi tác vụ tăng từ 35k lên 59k, và mức "effort" ảnh hưởng nhiều hơn: Opus 5.5 đạt 35 ở mức low và 58 ở max, chi phí gấp 10 lần.

Nguồn: https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v5 (27/10/2026)

## 5. Axiom số hóa toàn bộ chứng minh Phân loại nhóm đơn hữu hạn (CFSG) bằng Lean
Axiom công bố bản hình thức hóa đầy đủ trong Lean của định lý phân loại nhóm đơn hữu hạn. Đây là một trong những thành tựu tập thể lớn nhất của toán học: bản chứng minh thế hệ thứ nhất dài hàng nghìn trang tạp chí, do khoảng một trăm nhà toán học viết qua nhiều thập kỷ. Theo trang dự án, mọi bước logic đều được kernel của Lean kiểm tra. Quy mô: 43,1 triệu dòng Lean, 2,05 triệu khai báo, 100 mốc và 715 bài báo/sách. Trang có mục "Agent Blueprint" và nhắc tới "các tác tử" nhận bản thiết kế ban đầu, nên công việc có sự tham gia của AI agent. Trang không mô tả chi tiết cách phân công, và bài blog đầy đủ chưa được đọc. Trong quá trình số hóa, nhóm phát hiện phản ví dụ cho một khẳng định đóng (closure) trong một lộ trình đã công bố để chứng minh Unbalanced Group Theorem. Họ đưa ra lập luận thay thế cho trường hợp nhóm đơn, dựa trên lý thuyết 2-thành phần cực đại của Solomon (1976), trong bài 35 trang trên Hexagon (2610.00575). Nhóm cũng đang cùng các nhà lý thuyết nhóm tổng hợp danh sách errata trong tài liệu.

Nguồn: https://cfsg.axiommath.ai/ (đăng HN 27/10/2026)

## 6. Lỗi thực thi mã trong firmware UEFI đe dọa phần lớn máy chủ (Ars Technica) ⚠️ không đọc được trang gốc
**Lưu ý minh bạch:** Ars Technica trả HTTP 405 cho truy cập tự động, nên **không đọc được toàn văn**. Phần dưới dựa trên tiêu đề, trang thảo luận HN và các bản tổng hợp tìm kiếm thứ cấp, **chưa đối chiếu với bài gốc**. Theo các nguồn thứ cấp này, lỗi mang mã CVE-2026-97631 (CVSS 9,5/10), nằm trong driver khởi động mạng (PXE) của TianoCore EDK II, bộ mã tham chiếu mà đa số nhà cung cấp máy chủ dùng để dựng firmware UEFI. Lỗi tràn bộ đệm xảy ra khi xử lý thông điệp lỗi mạng (ICMP quá khổ, cả IPv4 và IPv6) thiếu kiểm tra độ dài. Vì xảy ra ở giai đoạn pre-boot, kẻ tấn công có thể thực thi mã từ xa trước khi Secure Boot hoạt động. Điều kiện khai thác gồm máy phải khởi động qua mạng và kẻ tấn công thường cần biết bản dựng firmware mục tiêu. Các số liệu này **chưa được kiểm chứng** với bài gốc. Trên HN, một bình luận (ý kiến cá nhân, không phải nguồn tin) cho rằng "vá cả hành tinh" khó mở rộng và nên dùng firmware tối thiểu, chuyên biệt.

Nguồn: https://arstechnica.com/security/2026/10/code-execution-flaw-in-uefi-firmware-threatens-most-servers-on-planet-earth/ (thảo luận: https://news.ycombinator.com/item?id=50265393)

## 7. Tailscale cập nhật điều tra lỗ hổng bảo mật Tailscale SSH
Ngày 26/10, Tailscale công bố cập nhật về các lỗ hổng trong Tailscale SSH. Phần lớn là leo thang đặc quyền: người đã được phép kết nối qua Tailscale SSH có thể làm những việc vượt quá quyền của local user được cấu hình, kể cả có thể lên quyền cao hơn. Mức độ khai thác phụ thuộc quyền của người dùng/thiết bị và cấu hình hệ thống, và phạm vi đầy đủ vẫn đang được xác minh. Tailscale đã có bản sửa cho hầu hết vấn đề và nhắm phát hành bản vá client **trước hết ngày 27/10**, tùy kết quả kiểm thử. Họ **không khuyến nghị tắt hẳn** Tailscale SSH. Khuyến nghị tạm thời gồm rà soát chính sách truy cập SSH, đặt `TS_SSH_DISABLE_FORWARDING=1` trong môi trường dịch vụ `tailscaled` nếu không cần SSH forwarding (giảm nhẹ nhiều phát hiện nghiêm trọng hơn), thắt chặt quyền truy cập vào hệ thống nhạy cảm và chuẩn bị cập nhật. Sau khi có bản vá, hãng sẽ đăng security advisory và một bài blog kỹ thuật. Trang tại thời điểm đọc chưa cho thấy bản vá đã phát hành hay chưa.

Nguồn: https://tailscale.com/ssh-investigation-update (26/10/2026)

## 8. Apple ra MacBook Pro 14 inch với chip M6, nhấn mạnh AI trên thiết bị
Theo thông cáo ngày 27/10 (trang Apple Ấn Độ), MacBook Pro 14 inch với M6 có CPU 12 nhân (nhiều hơn 2 nhân so với trước), GPU 12 nhân với Neural Accelerator trong mỗi nhân, và Neural Engine kép 16 nhân. Apple nói GPU nhanh hơn tới 30% về đồ họa và nhanh hơn tới 25% với tác vụ AI so với M5. Theo thông cáo, thời gian tới token đầu tiên (LLM prompt processing) nhanh hơn tới 13 lần so với MacBook Pro 13 inch M1 và tới 1,3 lần so với bản M5. Pin lên tới 24 giờ. Đây đều là số liệu do chính Apple công bố trong thông cáo.

Nguồn: https://www.apple.com/in/newsroom/2026/10/apple-introduces-the-new-14-inch-macbook-pro-with-m6/ (27/10/2026)

---

## Xu hướng đáng chú ý
- **AI chuyển từ trả lời sang làm việc đầu-cuối trong khoa học:** Claude chạy qua nhiều khâu phát triển thuốc (mục 3), agent dựng bản chứng minh Lean cực lớn (mục 5), và Index v5 thêm benchmark nghiên cứu khoa học Terminal-Bench-Science (mục 4). Điểm chung là kết quả đều được kiểm chứng bằng thí nghiệm hoặc bộ kiểm tra hình thức, không chỉ bằng văn bản trôi chảy.
- **Đo lường AI khó hơn, tốn kém hơn:** Index v5 chuyển sang dữ liệu riêng và tác vụ agentic. Token đầu ra tăng hai phần ba và chi phí mỗi tác vụ chênh hơn 13 lần, nên "chi phí trên mỗi điểm" ngày càng quan trọng như độ chính xác. Khoảng cách với mô hình mở cũng giãn ra.
- **Tác tử và mô hình thế giới hội tụ:** Genie 4 đặt Gemini làm tác tử lập kế hoạch/kiểm tra bên trong vòng mô phỏng, hướng tới môi trường huấn luyện cho robot và agent. DeepMind gọi hướng này là "hybrid world models".
- **Hạ tầng bảo mật bị soi kỹ:** Tailscale SSH (lớp truy cập từ xa) và EDK II (lớp firmware) đều là thành phần nền mà nhiều hệ thống tin cậy. Cả hai đều có rủi ro leo thang/thực thi mã. Điều kiện khai thác và việc vá lỗi quyết định rủi ro thực tế, như Tailscale tự nêu.
- **AI vào tài chính đại chúng và thiết bị cá nhân:** Anthropic tiến tới IPO (mã "ANT") trong khi Apple xếp Neural Accelerator trong từng nhân GPU của M6. Cả hai cho thấy AI vừa cần vốn rất lớn vừa được kéo về chạy cục bộ.

---

*Ghi chú phương pháp: các trang gốc ở mục 1–5 và 7–8 được tải trực tiếp và đọc toàn văn (trừ phần acknowledgements/phụ lục). Mục 6 chỉ dựa trên nguồn thứ cấp vì Ars Technica chặn truy cập tự động. Tin về OpenAI/ETH và OpenAI mua chip Google xuất hiện trong kết quả tìm kiếm nhưng chưa đọc được bài gốc đầy đủ nên không đưa vào danh sách chính.*
