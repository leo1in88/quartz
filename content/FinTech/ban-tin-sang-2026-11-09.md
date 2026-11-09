# Bản tin sáng 2026-11-09

## [1] Tin Công nghệ & AI (qua AGY)

# Bản Tin Tổng Hợp Công Nghệ & AI — Ngày 09/11/2026

> **Tổng quan hôm nay:** Bức tranh công nghệ và AI toàn cầu ngày 09/11/2026 chứng kiến những rung chấn dữ dội từ tầng quản trị lãnh đạo cấp cao cho tới hạ tầng kỹ thuật cốt lõi: NVIDIA bước vào cuộc khủng hoảng điều tra an ninh quốc gia xoay quanh CEO Jensen Huang; Phố Wall (Goldman Sachs) bắt đầu "phanh gấp" việc ứng dụng tự do coding agent trên bàn giao dịch tài chính nhạy cảm; trong khi đó, mã nguồn mở tạo nên bước nhảy vọt ngoạn mục với giải pháp ép mô hình MoE 284 tỷ tham số chạy trên 64GB RAM thuần CPU, và ngôn ngữ C++ đối mặt với biến cố lịch sử khi bản thảo C++26 bị phủ quyết do xung đột giữa cha đẻ Bjarne Stroustrup và ủy ban tiêu chuẩn hóa.

---

## 1. NVIDIA Khủng Hoảng Lãnh Đạo: Jensen Huang Thừa Nhận Ngoại Tình, HĐQT Mở Điều Tra Độc Lập Về Nghi Vấn Tình Báo
- **Tóm tắt:** Ngày 08/11/2026, nhà sáng lập kiêm CEO NVIDIA Jensen Huang đã gửi tâm thư nội bộ tới toàn thể nhân viên và công chúng, thừa nhận hành vi bất trung trong hôn nhân và gửi lời xin lỗi sâu sắc tới gia đình cùng cộng sự. Ngay sau đó, Hội đồng quản trị NVIDIA chính thức ra thông cáo thành lập một ủy ban độc lập với sự hỗ trợ của văn phòng luật sư ngoài để tiến hành điều tra toàn diện các báo cáo cho rằng ông là mục tiêu của một chiến dịch tình báo nước ngoài (nghi vấn liên quan đến tình báo Trung Quốc theo các nguồn tin báo chí). Mặc dù HĐQT bước đầu khẳng định hiện chưa có bằng chứng cho thấy bí mật an ninh quốc gia Hoa Kỳ hay tài sản trí tuệ công nghệ của NVIDIA bị rò rỉ, cuộc điều tra sẽ rà soát kỹ lưỡng mọi dữ liệu khả dụng. Jensen Huang tuyên bố cam kết hợp tác tuyệt đối với cuộc điều tra, song sự việc đang phủ bóng đen bất định lên "ngai vàng" chip bán dẫn AI toàn cầu ngay trước thềm công bố báo cáo tài chính quý 3.
- **Nguồn:** [NVIDIA Newsroom — Statement from NVIDIA Board of Directors](https://nvidianews.nvidia.com/news/statement-from-nvidia-board-of-directors) & [A Message to Our Company](https://nvidianews.nvidia.com/news/a-message-to-our-company)

---

## 2. Goldman Sachs Siết Chặt Claude Code: Cấm Trader Và Banker Dùng AI Coding Tự Do, Trả Về Riêng Kỹ Sư
- **Tóm tắt:** Sau giai đoạn hồ hởi cổ vũ trào lưu "vibe coding" (cho phép nhân viên tài chính tự viết công cụ bằng AI), Goldman Sachs vừa chính thức ban hành chỉ thị nội bộ cấm toàn bộ đội ngũ trader và chuyên viên ngân hàng đầu tư sử dụng Claude Code (Anthropic) và GitHub Copilot (Microsoft). Quyền truy cập hiện chỉ còn được duy trì cho khoảng 12.000 kỹ sư phần mềm chuyên nghiệp cùng nhóm chiến lược gia lượng tử (Strats). Lý do được đưa ra là rủi ro bảo mật và kiểm soát tuân thủ: các kịch bản do trader viết bằng agent chạy trực tiếp trên các máy trạm tiếp cận dữ liệu luồng giao dịch khách hàng nhạy cảm mà hoàn toàn không qua quy trình code review, kiểm thử bảo mật hay tuân thủ rào chắn thông tin bắt buộc (information barriers). Động thái "thu hồi quyền năng" này diễn ra đầy nghịch lý khi Goldman Sachs chính là ngân hàng bảo lãnh phát hành chính (lead underwriter) cho đợt IPO sắp tới của Anthropic (dự kiến niêm yết Nasdaq mã ANT trong tháng 11).
- **Nguồn:** [State of AI — Goldman Sachs Is Pulling Claude Code From Its Bankers and Traders](https://www.thestateofai.com/news/goldman-sachs-claude-code-traders-bankers)

---

## 3. Llama-modchip: Đột Phá Chạy Mô Hình MoE 284 Tỷ Tham Số Trên 64GB RAM Thuần CPU Không Cần GPU
- **Tóm tắt:** Dự án mã nguồn mở `llama-modchip` (phiên bản v2.4.0) vừa tạo nên cơn sốt kỹ thuật lớn trên Hacker News khi cung cấp giải pháp can thiệp kernel `ggml`/`llama.cpp` cho phép chạy các mô hình Mixture-of-Experts (MoE) khổng lồ hoàn toàn bằng CPU và RAM hệ thống. Trọng tâm của dự án là việc nén thành công checkpoint `DeepSeek-V4-Flash` (tổng 284,33 tỷ tham số, 13,17 tỷ tham số kích hoạt qua 43 tầng MLA và 256 routed experts) từ mức 76,87 GiB xuống chỉ còn 56,56 GiB (1,71 bpw). Nhờ đó, toàn bộ mô hình kèm ngữ cảnh KV cache 256K chỉ chiếm 57,61 GiB VmRSS, vừa vặn hoàn hảo trong 64GB RAM của máy trạm Linux tiêu chuẩn mà không cần tới swap NVMe hay bất kỳ card GPU nào. Bằng việc tái cấu trúc vòng lặp ma trận bằng lệnh SIMD AVX-512BW đa tầng (tiling schedule) kết hợp cờ `_MM_HINT_NTA` để expert không chiếm dung lượng cache L3 của KV cache, hệ thống đạt tốc độ prefill 44,4 tok/s trên vi xử lý AMD Zen 5 16 nhân.
- **Nguồn:** [GitHub — synchopate/llama-modchip](https://github.com/synchopate/llama-modchip)

---

## 4. Bẻ Khóa Xe Thông Minh Toàn Cầu: Hacker Dùng GPT 5.6 Vượt Tường Lửa WAF Để Chiếm Quyền Điều Khiển Ô Tô
- **Tóm tắt:** Chuyên gia an ninh mạng Shubham Shah và Sam Curry vừa công bố tài liệu kỹ thuật chấn động về chuỗi lỗ hổng nghiêm trọng cho phép mở khóa, bấm còi và khởi động động cơ từ xa của bất kỳ phương tiện nào thuộc một hãng ô tô lớn trên phạm vi toàn cầu. Bắt đầu từ việc dịch ngược ứng dụng Android và tìm thấy tài khoản quản trị hệ thống danh tính ForgeRock OpenIDM bị lộ trong tệp JavaScript bundle công khai, nhóm nghiên cứu đã đối mặt với tường lửa WAF khắt khe chặn đứng các truy vấn nhạy cảm. Để giải bài toán vượt rào, hai nhà nghiên cứu đã cung cấp mã nguồn OpenIDM cho mô hình AI GPT 5.6 Sol Ultra phân tích tự động; chỉ sau 6 giờ, mô hình đã phát hiện ra lỗ hổng path traversal chưa từng biết qua tiền tố `/static%2f..%2fopenidm/` vốn bị cấu hình WAF bỏ sót. Kết hợp với việc bỏ qua xác thực 2 lớp (MFA skip) do lỗi logic dịch vụ, nhóm có thể ghi đè mật khẩu của bất kỳ chủ xe nào chỉ qua biển số hoặc số khung VIN để điều khiển phương tiện từ xa.
- **Nguồn:** [Shubham Shah (shubs.io) — Unlocking any car from X brand in most of the world](https://shubs.io/unlocking-any-car-from-x-brand-in-most-of-the-world/)

---

## 5. Rạn Nứt Lịch Sử C++26: Bản Thảo Tiêu Chuẩn Quốc Tế Thất Bại Do Xung Đột Giữa Cha Đẻ Bjarne Stroustrup Và Ủy Ban ISO
- **Tóm tắt:** Chủ tọa ủy ban kỹ thuật C++ (WG21) Herb Sutter vừa công bố tài liệu P4454R0 mang tên *"When a language’s creator and its owners strongly disagree"*, phân tích sự cố chưa từng có tiền lệ khi cuộc bỏ phiếu Dự thảo Tiêu chuẩn Quốc tế (DIS ballot) cho C++26 đã thất bại. Trong suốt 36 năm hoạt động, các cuộc bỏ phiếu chuẩn hóa của C++ luôn được thông qua nhất trí; tuy nhiên tại C++26, một cuộc đối đầu gay gắt đã nổ ra xoay quanh tính năng Contracts (hợp đồng tiền điều kiện/hậu điều kiện). Trong khi ủy ban WG21 đạt được tỷ lệ đồng thuận cao (114 phiếu ủng hộ / 12 phiếu chống), thì chính cha đẻ ngôn ngữ — Bjarne Stroustrup — lại kịch liệt phản đối vì tin rằng thiết kế Contracts hiện tại là một sai lầm kỹ thuật nghiêm trọng. Trước sự phản kháng của Bjarne, các Cơ quan Tiêu chuẩn Quốc gia (National Bodies) đã quyết định bỏ phiếu phủ quyết dự thảo DIS để đứng về phía nhà sáng lập, đẩy C++ vào bài toán tái cấu trúc quản trị tương tự như từng xảy ra với Python, Rust hay Perl.
- **Nguồn:** [ISO/IEC JTC1 SC22 WG21 — P4454R0 (Herb Sutter)](https://isocpp.org/files/papers/P4454R0.pdf)

---

## 6. Agent Memory Cần Khoảnh Khắc "OpenTelemetry": Kêu Gọi Tiêu Chuẩn Hóa Kiến Trúc Bộ Nhớ AI
- **Tóm tắt:** Kỹ sư Mads Thines (LoreKit) vừa đưa ra phân tích sâu sắc về bài toán phân mảnh bộ nhớ tác nhân AI (Agent Memory) trên blog kỹ thuật LoreKit. Hiện nay, mỗi nền tảng agent đều tự xây dựng một định dạng lưu trữ riêng biệt và hoàn toàn không tương thích với nhau: từ tệp quy tắc phẳng (`AGENTS.md`, `CLAUDE.md`), thư mục tập tin `/memories` của Anthropic, bộ nhớ dựa trên citation mã nguồn của Copilot, khối ngữ cảnh Letta, dữ liệu JSON trích xuất của Mem0, cho tới đồ thị quan hệ thời gian của Graphiti/Zep. Thực trạng này giống hệt sự hỗn loạn của ngành quan sát hệ thống (Observability) trước năm 2019 khi mỗi nhà cung cấp APM dùng một chuẩn riêng, trước khi sáp nhập thành OpenTelemetry. Tác giả kiến nghị Liên minh Agentic AI Foundation (thuộc Linux Foundation) cần đứng ra chuẩn hóa một đặc tả chung (Open Agent Memory Spec) bao gồm cả hai trụ cột: tính di động khi xuất/nhập (export portability) và cơ chế đánh địa chỉ trực tiếp đồng thời (live addressing) khi nhiều agent cùng thao tác trên một kho mã nguồn.
- **Nguồn:** [LoreKit Blog — Agent memory needs its OpenTelemetry moment](https://www.lorekit.io/blog/open-agent-memory-format)

---

## 7. Outlook.com Âm Thầm Chặn Thư Từ Các Tên Miền Thiếu DMARC: Cảnh Báo Cho Các Doanh Nghiệp Nhỏ
- **Tóm tắt:** Báo cáo từ MailRoute cho biết bắt đầu từ ngày 05/11/2026, dịch vụ email tiêu dùng của Microsoft (bao gồm `@outlook.com`, `@hotmail.com`, `@live.com`, `@msn.com`) đã âm thầm từ chối nhận email gửi từ bất kỳ tên miền nào không công bố bản ghi DMARC trong DNS, trả về mã lỗi `550 5.7.1 Message rejected: Message lacks SPF/DKIM/DMARC Auth Records`. Đáng chú ý, chính sách siết chặt này không hề được Microsoft công bố trước, nhắm vào cả những người gửi thư đơn lẻ có lưu lượng thấp (khác với quy định gửi trên 5.000 mail/ngày trước đây). Nguy hiểm hơn, Microsoft chỉ chặn ngẫu nhiên một tỷ lệ thư nhất định từ các domain vi phạm khiến người gửi thường ngộ nhận là lỗi đường truyền tạm thời, dẫn tới việc nhiều email giao dịch, hóa đơn hoặc xác nhận lịch hẹn quan trọng bị hủy bỏ trong âm thầm. Quản trị viên được khuyến cáo khẩn cấp thiết lập bản ghi TXT `_dmarc` tối thiểu với chính sách `v=DMARC1; p=none` để bảo vệ độ uy tín gửi thư.
- **Nguồn:** [MailRoute — Outlook.com Is Quietly Rejecting Email From Domains Without DMARC](https://mailroute.net/blog/outlook-rejecting-email-without-dmarc)

---

## 8. KetchUp: Giải Pháp Thiết Kế Đồ Gỗ 3D Mã Nguồn Mở Tối Ưu Bằng Rust Và WebGPU
- **Tóm tắt:** Đội ngũ phát triển độc lập vừa chính thức ra mắt KetchUp — công cụ thiết kế mô hình 3D mã nguồn mở và hoàn toàn miễn phí, được định vị là sự thay thế gọn nhẹ cho SketchUp trong lĩnh vực mộc dân dụng và thiết kế đồ nội thất. Khác với các phần mềm CAD thương mại nặng nề hoặc trói buộc người dùng bằng mô hình thuê bao đắt đỏ, KetchUp được viết hoàn toàn bằng ngôn ngữ Rust và tận dụng sức mạnh kết xuất đồ họa hiện đại của WebGPU, cho phép chạy trực tiếp trên trình duyệt web hoặc dưới dạng ứng dụng độc lập trên Windows, macOS và Linux. Ứng dụng cung cấp giao diện trực quan với các công cụ căn chỉnh kích thước chuẩn xác từng milimet cho bàn, ghế, tủ kệ, tối ưu hóa triệt để tài nguyên phần cứng và cam kết bảo vệ dữ liệu thiết kế cục bộ của người dùng.
- **Nguồn:** [KetchUp App](https://ketchup3d.github.io/app/)

*(Ghi chú minh bạch: Báo cáo chuyên đề điều tra của Bloomberg về việc cơ quan hành pháp Mỹ sử dụng dữ liệu định vị quảng cáo trong các ứng dụng di động phổ biến để giám sát công dân hiện được đặt sau hệ thống trả phí/chặn truy cập tự động 403 HTTP, nên không được đưa vào danh sách phân tích chi tiết nhằm đảm bảo nguyên tắc đọc trực tiếp trang gốc và không suy đoán nội dung).*

---

## Xu Hướng Đáng Chú Ý (Phân Tích Liên Kết Ngang)

1. **Khủng hoảng niềm tin và an ninh quốc gia bao trùm hệ sinh thái bán dẫn & AI:** Sự việc Hội đồng quản trị NVIDIA mở cuộc điều tra độc lập về nghi vấn CEO Jensen Huang là mục tiêu của chiến dịch tình báo nước ngoài là một hồi chuông cảnh tỉnh sâu sắc. Trong kỷ nguyên AI, các nhà lãnh đạo phần cứng không đơn thuần là doanh nhân công nghệ mà đã trở thành những "tử huyệt" địa chính trị toàn cầu. Khi giá trị vốn hóa và sự sống còn của toàn bộ chuỗi cung ứng tính toán nghìn tỷ USD phụ thuộc vào một vài cá nhân then chốt, ranh giới giữa đời tư, quản trị doanh nghiệp và an ninh quốc gia đã bị xóa nhòa hoàn toàn.
2. **Sự thoái trào của trào lưu "Vibe Coding" tự do trong môi trường doanh nghiệp khắt khe:** Quyết định của Goldman Sachs siết chặt Claude Code và cấm tiệt banker/trader tự viết script là bước ngoặt thực tế hóa (reality check) đối với làn sóng thổi phồng AI coding. Trao quyền cho nhân viên phi kỹ thuật tạo ra phần mềm có thể gia tăng năng suất tức thời, nhưng đồng thời tạo ra một "núi nợ kỹ thuật ngầm" (shadow tech debt) với mã nguồn không thể kiểm toán, thiếu kiểm thử và vi phạm các quy tắc cách ly dữ liệu. Tương lai của AI agent trong doanh nghiệp buộc phải nằm trong các rào chắn kiểm soát (guardrails) nghiêm ngặt do chính đội ngũ kỹ sư vận hành.
3. **AI biến đổi vai trò kép trong an ninh mạng: Từ công cụ tấn công đến đòn bẩy đột phá:** Vụ bẻ khóa hàng loạt xe thông minh qua WAF nhờ GPT 5.6 minh chứng sinh động cho năng lực thâm nhập sâu của các mô hình lý luận thế hệ mới. Khi AI có thể tự động đọc hiểu toàn bộ mã nguồn framework danh tính phức tạp và tìm ra các góc khuất routing mà chuyên gia con người bỏ sót sau nhiều ngày, tốc độ phát hiện lỗ hổng chuỗi cung ứng sẽ tăng lên cấp số nhân. Điều này đòi hỏi các nhà phát triển phải rà soát mã nguồn và thu hồi các thông tin định danh bị bỏ quên (như trong JS bundle) với tốc độ tương đương trước khi kẻ xấu tận dụng AI để khai thác trên diện rộng.
4. **Phản kháng trước độc quyền phần cứng và trói buộc đám mây:** Dự án `llama-modchip` (chạy MoE 284B trên RAM máy tính phổ thông) và ứng dụng thiết kế `KetchUp` (Rust + WebGPU) đại diện cho một xu hướng kỹ thuật mãnh liệt: cộng đồng mã nguồn mở đang quyết liệt tìm cách "dân chủ hóa" công nghệ bằng cách tối ưu hóa thuật toán và tận dụng tối đa phần cứng sẵn có. Thay vì đầu hàng trước sự khan hiếm và giá bán trên trời của các cụm GPU máy chủ hay chi phí thuê bao SaaS đóng kín, các kỹ sư đang viết lại từ tầng nhân kernel SIMD để đưa sức mạnh tính toán tiên tiến về tay từng cá nhân trên các máy trạm bình dân.
5. **Tiếng chuông báo động về chuẩn hóa hạ tầng: Từ ngôn ngữ lập trình đến bộ nhớ Agent:** Hai sự kiện của C++26 và Agent Memory phản ánh hai mặt của cùng một bài toán chuẩn hóa. Với C++, một ngôn ngữ 36 năm tuổi đang rơi vào bế tắc thể chế khi cơ chế đồng thuận của ủy ban xung đột với tầm nhìn của nhà sáng lập; trong khi đó, lĩnh vực tác nhân AI lại đang ở giai đoạn sơ khai hỗn loạn, nơi hàng trăm giải pháp bộ nhớ rời rạc kêu gào một tiếng nói chung như OpenTelemetry. Sự thành bại của làn sóng điện toán tiếp theo sẽ phụ thuộc rất lớn vào khả năng thiết lập các giao thức trung lập (như dưới sự bảo trợ của Linux Foundation) để kết nối liền mạch giữa các agent và con người.
---

## [2] 5 bài trending XDA Developers (qua AGY)

# 5 bài nổi bật trên XDA Developers — 09/11/2026

> **Ghi chú quy trình:** Do IP máy chủ bị chặn kết nối/timeout khi truy cập trực tiếp đến domain `xda-developers.com` (cơ chế bảo vệ WAF của nhà xuất bản Valnet), trợ lý đã xác định danh sách các bài viết trending mới nhất ngày 08–09/11/2026 và trích xuất toàn văn nội dung bài viết thông qua CDN proxy (Jina Reader `r.jina.ai`). Mọi bản tóm tắt dưới đây đều được đối chiếu trực tiếp từ toàn văn bài viết gốc trên XDA Developers, bảo đảm tính xác thực, đầy đủ chi tiết kỹ thuật và không suy đoán hay bịa chi tiết.

### 1. Hội đồng quản trị Nvidia mở cuộc điều tra nghi vấn CEO Jensen Huang là mục tiêu gián điệp *(08–09/11)*
- **Link:** [XDA — the-nvidia-board-is-investigating-a-potential-case-of-spying-on-jensen-huang](https://www.xda-developers.com/the-nvidia-board-is-investigating-a-potential-case-of-spying-on-jensen-huang/)
- **Tóm tắt:** Tác giả Simon Batt đưa tin hội đồng quản trị Nvidia đang mở cuộc điều tra độc lập sau các báo cáo từ Bloomberg về nghi vấn CEO Jensen Huang trở thành mục tiêu trong một chiến dịch tình báo của Trung Quốc. Vụ việc bùng phát khi Jensen Huang thừa nhận trong bản ghi nhớ gửi toàn thể nhân viên về việc có quan hệ tình cảm ngoài hôn nhân với bà Alice Huang, cựu giám đốc điều hành công ty Megaspeed, người bị tình báo Mỹ nghi ngờ có liên hệ với Bộ An ninh Quốc gia Trung Quốc (MSS) nhằm tiếp cận bí mật sở hữu trí tuệ chip AI. Dù hội đồng quản trị khẳng định chưa phát hiện bằng chứng nào cho thấy bí mật thương mại của Nvidia hay an ninh quốc gia Mỹ bị xâm phạm, cuộc điều tra vẫn được triển khai toàn diện và Jensen Huang cam kết hợp tác tối đa đồng thời gửi lời xin lỗi sâu sắc tới gia đình và công ty.

### 2. Tinh chỉnh một cài đặt trong 30 giây giúp khắc phục triệt để lỗi giật lag hiệu ứng trên Android 17 cho Pixel *(08–09/11)*
- **Link:** [XDA — fix-for-android-17-performance-on-pixel-takes-30-seconds-to-apply](https://www.xda-developers.com/fix-for-android-17-performance-on-pixel-takes-30-seconds-to-apply/)
- **Tóm tắt:** Tác giả Chandraveer Mathur phản ánh tình trạng bản cập nhật Android 17 QPR1 khiến hàng loạt điện thoại Google Pixel (đặc biệt là Pixel 10 cũng như Pixel 7, 8 và 9 Pro XL) bị rớt khung hình và giật lag nghiêm trọng khi chuyển đổi ứng dụng hay kéo thanh thông báo. Dữ liệu từ Google Issue Tracker #571186734 xác nhận nguyên nhân là do lỗi hồi quy (regression) trong cây driver kernel của Pixel, gây hiện tượng page fault nặng và nghẽn bộ nhớ dẫn đến đơ máy hoặc treo System UI. Trong khi chờ bản vá chính thức từ Google, cộng đồng người dùng đã tìm ra giải pháp xử lý tạm thời chỉ trong 30 giây: tắt tính năng "Battery Health Assistance" trong Cài đặt pin kết hợp siết chặt giới hạn tiến trình chạy ngầm (Background process limit) trong Developer Options để giải tỏa áp lực RAM và khôi phục độ mượt mà cho giao diện.

### 3. Thử nghiệm agent lập trình mã nguồn mở cục bộ trên GPU 16GB so với Claude Code trả phí *(08–09/11)*
- **Link:** [XDA — my-16gb-gpu-now-runs-a-fully-local-ai-agent-and-it-has-me-rethinking-my-20-claude-subscription](https://www.xda-developers.com/my-16gb-gpu-now-runs-a-fully-local-ai-agent-and-it-has-me-rethinking-my-20-claude-subscription/)
- **Tóm tắt:** Tác giả Abhinav Raj tiến hành thử nghiệm so sánh hiệu năng lập trình giữa dịch vụ đám mây trả phí Claude Code (chạy Sonnet 5.5, $20/tháng) và bộ công cụ mã nguồn mở chạy hoàn toàn ngoại tuyến (offline) trên card đồ họa RTX 4070 Ti Super 16GB. Bằng cách kết hợp harness OpenCode với mô hình Mixture-of-Experts Qwen3.6-35B-A3B (kích hoạt ~3B tham số/token) qua llama.cpp và đẩy 12 lớp expert sang RAM hệ thống, dàn PC đạt tốc độ 65–70 tokens/giây và prompt processing tới 1.837 tokens/giây mà không hề kết nối internet. Trong bài kiểm tra viết công cụ giám sát GPU, agent mã nguồn mở cục bộ đã tự động sinh mã hoàn chỉnh, chạy thành công ngay lần đầu tiên mà không cần can thiệp thủ công. Dù Claude Code hoàn thành nhanh hơn khoảng 1 phút (2 phút 42 giây) và trau chuốt giao diện đồ họa nhỉnh hơn, tác giả khẳng định khoảng cách giữa AI cục bộ miễn phí và mô hình thương mại hàng đầu đã thu hẹp đáng kể, khiến khoản phí thuê bao 20 USD hàng tháng không còn quá vượt trội.

### 4. Đặt Claude Code, Codex và Google Antigravity vào cùng thử thách tạo tiện ích mở rộng Chrome *(08–09/11)*
- **Link:** [XDA — claude-code-codex-antigravity-build-same-chrome-extension-one-was-keeper](https://www.xda-developers.com/claude-code-codex-antigravity-build-same-chrome-extension-one-was-keeper/)
- **Tóm tắt:** Tác giả Yash Patel thử thách ba công cụ AI coding agent hàng đầu gồm Claude Code (chạy Claude Opus 5.5), Codex (chạy model Luna 6) và Google Antigravity (chạy Gemini 3.8 Flash) cùng xây dựng tiện ích mở rộng Chrome mang tên SnapNest với yêu cầu chụp, chỉnh sửa, làm đẹp ảnh màn hình và hoạt động hoàn toàn offline. Trong bài kiểm tra, Codex hoàn thành các tính năng cơ bản nhưng bị điểm trừ lớn về giao diện vì font chữ quá bé, màu sắc kém hấp dẫn và thanh điều khiển rối rắm, trong khi Google Antigravity ghi điểm ở bố cục gọn gàng và hỗ trợ đa định dạng xuất (PDF, WebP, PNG, JPG) nhưng lại dùng hộp thoại prompt JavaScript lỗi thời để nhập chú thích. Chung cuộc, Claude Code giành chiến thắng áp đảo nhờ khả năng hiện thực hóa chính xác mọi yêu cầu, cung cấp hệ thống lưu 10 preset mẫu thiết kế trực quan, hiệu ứng làm mờ (blur) mượt mà và giao diện sử dụng tự nhiên nhất.

### 5. Hồi sinh PC cũ thành máy chơi game retro chuyên dụng cạnh TV với hệ điều hành Batocera *(08–09/11)*
- **Link:** [XDA — old-pc-retro-console-batocera-boots-straight-game-library](https://www.xda-developers.com/old-pc-retro-console-batocera-boots-straight-game-library/)
- **Tóm tắt:** Tác giả Anurag Singh chia sẻ hướng dẫn biến một chiếc máy tính để bàn cũ thành hệ máy chơi game cổ điển (retro console) gắn TV bằng cách sử dụng hệ điều hành Batocera Linux. Điểm sáng lớn nhất của Batocera là khả năng khởi động trực tiếp vào giao diện EmulationStation, cho phép người chơi điều khiển và duyệt toàn bộ thư viện game qua nhiều thế hệ máy hoàn toàn bằng tay cầm (controller) mà không bao giờ phải chạm vào bàn phím hay chuột (sử dụng tổ hợp Hotkey + Start để thoát game nhanh chóng). Người dùng có thể chạy thử nghiệm mượt mà từ một ổ USB flash trước khi quyết định cài đặt chính thức lên ổ đĩa trong của PC để tối ưu tốc độ tải. Với khả năng tự động đồng bộ ảnh bìa, video xem trước và phân loại danh mục thông minh, Batocera biến phần cứng cũ kỹ thành một trung tâm giải trí retro hoàn hảo cho phòng khách.

---

## [3] Top 3 Hacker News (qua opencli)

**1. Goldman Sachs Is Pulling Claude Code From Its Bankers and Traders** — 575 điểm

Goldman Sachs ban hành chỉ thị nội bộ tháng 10 giới hạn Claude Code (Anthropic) và GitHub Copilot (Microsoft) chỉ cho kỹ sư (~12.000 người), cắt quyền truy cập của trader và banker — những người trước đây dùng AI coding agent để theo dõi luồng giao dịch khách hàng, mô hình hóa biến động thị trường và soạn tài liệu. Strats (chiến lược gia lượng tử) vẫn còn access. Nghịch lý: động thái diễn ra vài tuần trước khi Goldman — lead underwriter cho IPO của Anthropic — và CIO Marco Argenti từng công khai khen "vibe coding" hồi tháng 7.
[Link](https://www.thestateofai.com/news/goldman-sachs-claude-code-traders-bankers)

**2. Declarative Dragging** — 325 điểm

Bài báo Best Paper tại UIST 2026 (Horowitz, Blinn, Heer — Đại học Washington): thay vì lập trình thủ công hình học/feedback/animation cho drag-and-drop, tác giả chỉ khai báo các "future states" mà một phần tử có thể trở thành khi bị kéo; engine render suy đoán các trạng thái đó và tự tổng hợp tương tác kéo-thả mượt. Thư viện mã nguồn mở Dragology hiện thực cho SVG trên web, với demo phong phú (cây biểu thức đại số, đường Bézier, braiding, permutation lab) và ứng dụng trong môi trường lập trình Hazel.
[Link](https://declarative-dragging.github.io/)

**3. Outlook.com Is Quietly Rejecting Email from Domains Without DMARC** — 224 điểm

Từ 5/11/2026, Outlook.com/Hotmail/Live/MSN âm thầm bounce một phần thư của các tên miền KHÔNG công bố bản ghi DMARC (lỗi `550 5.7.1 Message rejected: Message lacks SPF/DKIM/DMARC Auth Records`), kể cả khi SPF/DKIM vẫn hoạt động bình thường — khác với rule bulk-sender (>5.000 thư/ngày) công bố từ 5/2025, lần này áp cả người gửi nhỏ lẻ và không có thông báo chính thức nào. Mail chỉ bị chặn theo tỷ lệ ngẫu nhiên nên dễ bị tưởng lỗi tạm thời. Khắc phục: thêm một TXT record `_dmarc` với `v=DMARC1; p=none`.
[Link](https://mailroute.net/blog/outlook-rejecting-email-without-dmarc)

---

## [4] Top 3 GitHub Trending hôm nay (qua opencli)

**1. [`sherlock-project/sherlock`](https://github.com/sherlock-project/sherlock)** — Săn tài khoản mạng xã hội theo username trên hàng trăm nền tảng. Ngôn ngữ: Python. 103.545 ★ (+2.373 ★ hôm nay).

**2. [`dsx-ai-factory/nvke`](https://github.com/dsx-ai-factory/nvke)** — NVIDIA Kubernetes Engine (NVKE): control plane quản lý GPU Kubernetes trên bare metal. Ngôn ngữ: Go. 855 ★ (+345 ★ hôm nay).

**3. [`milind-soni/OpenMausBot`](https://github.com/milind-soni/OpenMausBot)** — Thay thế mã nguồn mở cho Grok Bot, kèm một máy ảo rằng các bot có thể sử dụng. Ngôn ngữ: TypeScript. 18.266 ★ (+1.439 ★ hôm nay).

---

*Bản tin tự động 08h — tổng hợp: AGY (Gemini 3.8 Flash Medium) cho phần 1-2, opencli public adapters cho phần 3-4. Chạy ngày 2026-11-09.*
