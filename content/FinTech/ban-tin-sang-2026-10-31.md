# Bản tin sáng 2026-10-31

---

# Tin Công nghệ & AI — Thứ Bảy, 31/10/2026

**Tóm tắt ngày:** Về mô hình, Google DeepMind ra Gemini 4 Carbon (giới hạn cho nhóm phòng thủ an ninh mạng) và Mistral mở trọng số Mistral Large 4 (1 nghìn tỷ tham số), còn tiện ích Claude Code trên Cursor Marketplace bị cài backdoor. Về tài chính, thị trường bắt đầu lo ngại chi tiêu hạ tầng AI: Alphabet có ngày giảm tệ nhất lịch sử, Nasdaq giảm 2,9%, và Anthropic bị dự báo xếp hạng tín nhiệm "junk" sau IPO.

*Nguồn quét: Hacker News (front page), DeepMind, OpenAI, Anthropic, TechCrunch, Ars Technica, Bloomberg, Google Research. Mọi bài dưới đây đều đã đọc nội dung đầy đủ trang gốc, trừ các trang liệt kê ở mục "Trang không đọc được".*

---

## 1. Gemini 4 Carbon — mô hình frontier mới của Google DeepMind
**Nguồn:** [deepmind.google/blog/gemini-4-carbon-our-next-frontier-model](https://deepmind.google/blog/gemini-4-carbon-our-next-frontier-model/) (28/10/2026)

Google gọi Carbon là mô hình mạnh nhất của hãng, ra mắt hai tuần sau Gemini 4 Argon. Carbon xếp #1 trên Artificial Analysis Intelligence Index v5.0 (59 điểm). Điểm nhấn là an ninh mạng: SEC-bench Pro 88,2% (tìm lỗ hổng), ExploitGym 54,8% (khai thác), CWE-bench 71,0% (vá lỗi). Google cho biết Carbon có thể chạy nhiều ngày liên tục cho các tác vụ kỹ thuật dài hơi. Về an toàn, Carbon giảm gian lận trên Terminal-Bench 4.0 xuống 0,0% thành công, và kháng prompt injection 0,0% trên benchmark Gray Swan (Argon là 0,7%). Việc phát hành bị giới hạn: tuần này chỉ một nhóm "cyber defenders" được dùng, sau đó mở dần qua chương trình Fairwind, và Google tham gia quy trình kiểm thử trước phát hành tự nguyện của chính phủ Mỹ. Giá giới thiệu là 2 USD / 10 USD mỗi triệu token (vào/ra); chú thích của trang nói sau giai đoạn giới thiệu giá sẽ là 4 / 20 USD. Các con số benchmark đều do Google tự công bố.

## 2. Mistral Large 4 ("Le Chonk") — mở trọng số mô hình 1 nghìn tỷ tham số
**Nguồn:** [mistral.ai/news/mistral-large-4-oss](https://mistral.ai/news/mistral-large-4-oss/) (đứng đầu HN hôm nay, ~1.677 điểm)

Mistral phát hành trọng số của Mistral Large 4, mô hình đa phương thức gốc 1 nghìn tỷ tham số, huấn luyện trên hạ tầng châu Âu. Bản này cải thiện sau 3 tuần học tăng cường từ bản preview. Mistral công bố số liệu: dẫn đầu nhóm mô hình mở trên FrontierCode 2.0 của Cognition (19,7%) và Terminal-Bench 4.0 (41%, tăng 13 điểm so với preview). Trên Artificial Analysis Coding Agent Index, mô hình đạt 48%, gần bằng GLM-5.3 nhưng dùng ít hơn 47% token. Mô hình có 3 chế độ suy luận (Low/Medium/High), đạt 51% trên Cyber Index và từ chối 96,6% yêu cầu tấn công mạng độc hại, mức cao nhất Mistral đo được trong các mô hình mở. Trang trích lời Booz Allen, Cisco, Cloudflare, CrowdStrike, ENISA. Có thể tải trọng số từ Hugging Face để chạy bằng vLLM/SGLang, hoặc dùng qua API, OpenRouter, NVIDIA. Báo cáo kỹ thuật "sẽ có sớm". Mọi số liệu là của Mistral, trên trang cũng ghi mô hình chỉ xếp sau Claude Opus 5.5 trong bài đánh giá ưa thích của con người (Surge Code).

## 3. Tiện ích Claude Code cho VS Code trên Cursor Marketplace bị cài backdoor
**Nguồn:** [Phorion — Official Claude Code Extension Compromise](https://phorion.io/blog/offical-claude-code-vsx-compromise/) (HN ~760 điểm); tiêu đề Ars Technica: [Anthropic VS code extension on Cursor backdoored for nearly 12 hours](https://arstechnica.com/security/2026/10/anthropic-vs-code-extension-on-cursor-backdoored-for-nearly-12-hours/) *(không đọc được nội dung, xem mục cuối)*

Phorion phát hiện các bản 2.1.312 và 2.1.313 của extension Claude Code trên Cursor Marketplace chứa mã độc được chèn vào đầu `extension.js`. Mã này thêm một khoá SSH công khai vào `~/.ssh/authorized_keys` và mở reverse SSH tunnel tới máy chủ của kẻ tấn công (134.209.82[.]225). Nó tạo cơ chế bám trụ trên macOS (LaunchAgent giả danh `com.apple.sysmond`), Linux (crontab `@reboot`) và Windows (scheduled task `SysMon` hoặc thư mục Startup). Nó cũng gửi về thông tin máy, email Git và tên (không phải giá trị) tối đa 40 biến môi trường kiểu KEY/TOKEN/SECRET. Trên macOS, một lỗi trong mã độc (kiểm tra Remote Login không có quyền admin) khiến nó có thể không tự bật SSH, nhưng Phorion nhấn mạnh không nên dựa vào lỗi đó để phòng thủ. Cursor đã gỡ hai bản này khỏi marketplace. Phorion khuyến cáo rà soát môi trường và kích hoạt ứng phó sự cố nếu có người dùng các bản trên. Bài của Phorion không nêu cách kẻ tấn công chiếm được quyền phát hành.

## 4. "Vết nứt trong cơn sốt chi tiêu AI" — Big Tech đốt tiền mặt, thị trường hoảng
**Nguồn:** [TechCrunch — Cracks are emerging in the AI spending boom](https://techcrunch.com/2026/10/30/cracks-are-emerging-in-the-ai-spending-boom/) (30/10/2026)

Alphabet, Amazon, Meta và Microsoft đã công bố kế hoạch chi hơn 740 tỷ USD capex trong năm nay, phần lớn cho hạ tầng AI. Nhà đầu tư giờ lo dòng tiền tự do âm và nợ chồng chất. Alphabet có dòng tiền tự do âm 9,1 tỷ USD quý 3 (quý âm thứ hai liên tiếp), capex quý 3 là 51,4 tỷ USD, và cổ phiếu giảm 12% hôm 29/10, ngày tệ nhất lịch sử. Tăng trưởng quảng cáo Search chậm còn 12% vì AI Mode. Amazon có dòng tiền tự do âm 42,4 tỷ USD trong 12 tháng, dù AWS tăng 39%. Meta cũng âm, và Zuckerberg thừa nhận agent Muse "rất tốn compute". Microsoft là ngoại lệ (dương 18,6 tỷ USD), chi capex thấp hơn dự kiến do nhà cung cấp bên thứ ba chậm cấp công suất. Hôm 30/10 Nasdaq giảm 2,9%, Nvidia −4%, Broadcom hơn −5%, Qualcomm −11%. Năm công ty lớn (kể cả Oracle) đã huy động tổng cộng 326 tỷ USD nợ trong 2026, gấp ba năm trước. Bloomberg cùng ngày đưa tin S&P hạ triển vọng xếp hạng Meta xuống tiêu cực vì chi tiêu AI, nhưng tôi không đọc được trang đó (xem mục cuối).

## 5. Anthropic dự kiến bị xếp hạng tín nhiệm "junk" cao sau IPO (theo FT)
**Nguồn:** [TechCrunch — Anthropic expected to receive high 'junk' rating…](https://techcrunch.com/2026/10/30/anthropic-expected-to-receive-high-junk-rating-from-credit-agencies-following-ipo-report-says/)

Theo Financial Times (TechCrunch dẫn lại), Blackstone là nhà đầu tư neo trong thương vụ tài trợ 63 tỷ USD mua chip cho Anthropic. Hãng này nói với nhà đầu tư rằng họ dự kiến Anthropic bị xếp hạng nhóm BB, tức mức cao nhất của hạng "đầu cơ/junk", sau IPO. Trước đó Blackstone từng nói ngược lại, rằng Anthropic sẽ đạt investment-grade trước 2027. Đây mới chỉ là dự báo, không phải xếp hạng chính thức. Xếp hạng thấp sẽ làm chi phí vay để tài trợ các hợp đồng compute khổng lồ đắt hơn. Anthropic đã nộp hồ sơ IPO trong tuần này. Cả Anthropic lẫn Blackstone đều từ chối bình luận với TechCrunch.

## 6. Google Suncatcher: vệ tinh trung tâm dữ liệu đầu tiên đã hoạt động
**Nguồn:** [TechCrunch — Google's first data center satellite is online and writing poetry](https://techcrunch.com/2026/10/30/googles-first-data-center-satellite-is-online-and-writing-poetry/)

Vệ tinh nguyên mẫu Suncatcher của Google lên quỹ đạo đầu tháng này trên Falcon 9 và đã liên lạc được với mặt đất. Vệ tinh mang 4 TPU và sinh tối đa khoảng 1 kW điện, nên chỉ bật được một TPU trong khoảng 20 phút mỗi lần. Prompt đầu tiên cho mô hình Gemma 4 chạy trên vệ tinh là viết một bài haiku về không gian. Mục tiêu thật là đo hiệu năng chip dưới ứng suất nhiệt và bức xạ ("bit flip"). Thử nghiệm mặt đất cho thấy bức xạ ảnh hưởng nhỏ với inference nhưng đáng lo hơn với training. Nếu thành công, hai vệ tinh nữa với chip mạnh hơn và liên kết quang giữa các vệ tinh sẽ phóng năm 2027. Suncatcher khác SpaceX (vệ tinh cách xa nhau) và Starcloud (inference trên từng vệ tinh riêng lẻ). Kinh tế của cả hai hướng phụ thuộc vào Starship tái sử dụng nhanh. Phân tích của nhóm Suncatcher ước tính Starship cần bay 1.800 lần để đạt mức giảm chi phí như các tên lửa trước đó.

## 7. Google Research: "Sleep framework" giúp LLM học liên tục mà không quên
**Nguồn:** [research.google/blog/the-sleep-framework…](https://research.google/blog/the-sleep-framework-a-new-way-for-llms-to-retain-knowledge-in-continual-learning/) (27/10/2026; HN ~163 điểm)

LLM sau khi triển khai là tĩnh, còn cập nhật tham số liên tục dễ gây quên thảm họa (catastrophic forgetting). Nhóm Google Research đề xuất chu kỳ hai pha: pha "thức" (nhận và xử lý đầu vào, lưu tạm trong bộ nhớ ngắn hạn) và pha "ngủ" (offline, củng cố bộ nhớ và tự cải thiện). Khi ngủ, mô hình mở các khối chuyên gia MoE hạng thấp được cấp sẵn, chưng cất tri thức từ bộ nhớ ngắn hạn vào tham số dài hạn, rồi reset phần tạm. Bước "dreaming" sinh dữ liệu tổng hợp qua chuyên gia chọn ngẫu nhiên, lọc theo gradient rồi tinh chỉnh bằng RL. Kết quả Google báo cáo: gần như không suy giảm khi học tuần tự ngôn ngữ chưa thấy (Manchu, Kalamang); mở rộng gần hoàn hảo tới 10 triệu token trên BABILong; 48,9% trên SQuAD tích hợp tri thức; và AIME 24/25 / HMMT 25 lần lượt 79,2% / 69,0% / 46,1%. Đây là kết quả nghiên cứu do chính tác giả công bố, chưa phải sản phẩm.

## 8. Azure "Weakest Link": 5 lỗ hổng chiếm quyền chéo tenant qua API Connections
**Nguồn:** [Binary Security — Azure's Weakest Link – Five Full Cross-Tenant Compromises](https://www.binarysecurity.no/posts/2026/10/one-root-case) (trang ghi ngày đăng 2/10/2026; lên HN hôm nay, ~260 điểm)

Nhà nghiên cứu mô tả kiến trúc API Connections của Azure Logic Apps: một instance API Management dùng chung đổi token đầu vào lấy token backend đã cấu hình. Nếu lừa được APIM thao tác trên connection của người khác, kẻ tấn công dùng được token của nạn nhân, gồm cả Key Vault, Azure SQL, Jira hay Salesforce. Bài mô tả các biến thể khai thác: path traversal qua `DynamicInvoke` / `/extensions/proxy/`; điểm khác biệt giữa connection V1 (Consumption) và V2 (Standard); và tham số `host.api.RuntimeUrl`. Các bản vá của Microsoft bị vượt qua nhiều lần: kiểm tra URL diễn ra trước khi chuẩn hoá đường dẫn, và có bản vá sau lại làm mất kiểm tra ban đầu. Tổng cộng 5 lỗ hổng leo thang đặc quyền mức critical, tác giả nhận khoảng 200.000 USD tiền thưởng. Tác giả nói tất cả đã được vá, và khuyến nghị giới hạn quyền token của connection ở mức tối thiểu.

---

## Xu hướng đáng chú ý

- **Mô hình frontier đang chuyển trọng tâm sang an ninh mạng:** Gemini 4 Carbon và Mistral Large 4 đều quảng bá năng lực tìm, khai thác và vá lỗ hổng (SEC-bench, Cyber Index) và đều có quy trình phát hành thận trọng (Carbon giới hạn cho nhóm phòng thủ, Mistral nhấn mạnh tỷ lệ từ chối tác vụ tấn công). Hai bên chọn hướng khác nhau: Google đóng và theo từng giai đoạn, Mistral mở trọng số và coi "chủ quyền/tự kiểm soát" là điểm bán hàng.
- **Chuỗi cung ứng công cụ lập trình AI trở thành bề mặt tấn công:** backdoor extension Claude Code trên Cursor nhắm vào máy lập trình viên, nơi có source, khoá SSH và biến môi trường chứa token. Điều này cùng chiều với thực tế các mô hình AI ngày càng chạy tác vụ dài và có nhiều quyền hơn.
- **Chi phí vốn của AI bắt đầu chạm giới hạn tài chính:** capex vượt 740 tỷ USD, dòng tiền tự do âm, nợ tăng gấp ba, thị trường giảm mạnh, S&P hạ triển vọng Meta (theo tiêu đề Bloomberg), và dự báo "junk" cho Anthropic. Chi phí vay sẽ ảnh hưởng đến khả năng các phòng lab theo đuổi hợp đồng compute lớn.
- **Mâu thuẫn ở Google:** hãng cùng lúc dẫn đầu mô hình (Carbon), nghiên cứu (Sleep) và hạ tầng thử nghiệm (Suncatcher), nhưng AI Mode đang làm chậm mảng quảng cáo Search, nguồn tiền chính để trả cho các khoản đầu tư đó.
- **Hạ tầng tìm cách thoát khỏi giới hạn mặt đất:** vệ tinh Suncatcher (điện và làm mát trong không gian) và nghiên cứu Sleep (LLM tự củng cố tri thức thay vì phụ thuộc cửa sổ ngữ cảnh) cho thấy cả hạ tầng lẫn kiến trúc mô hình đang được thiết kế lại. Cả hai vẫn ở giai đoạn thử nghiệm, chưa có kết quả quy mô sản xuất.

---

## Trang không đọc được (không bịa nội dung)

| Trang | Tình trạng | Ghi chú |
|---|---|---|
| Ars Technica — bài về backdoor Cursor/Claude Code | HTTP 405 | Chỉ biết tiêu đề từ RSS ("backdoored for nearly 12 hours"); chi tiết kỹ thuật trong mục 3 lấy từ Phorion |
| Bloomberg — [Meta's Rating Outlook Cut to Negative by S&P](https://www.bloomberg.com/news/articles/2026-10-30/meta-s-credit-rating-outlook-downgraded-to-negative-by-s-p) | HTTP 403 | Chỉ có tiêu đề từ RSS |
| Bloomberg — Tech Stocks Tumble…, Intel Suffers Worst Stock Drop…, Baseten $30B | Không thử lấy nội dung đầy đủ | Chỉ có tiêu đề từ RSS |
| OpenAI — [Updated Model Spec](https://openai.com/index/updated-model-spec), [How we detect frontier model misalignment](https://openai.com/index/how-we-detect-frontier-model-misalignment) | HTTP 403 | RSS có tiêu đề và ngày (29/10); không tóm tắt vì chưa đọc nội dung |
| Anthropic `/news`, DeepMind "Genie 4" | Tải được trang/RSS nhưng không đọc chi tiết | Không đưa vào tóm tắt |


---

# XDA Developers — 5 bài trending/mới nhất (31/10/2026)

> **Ghi chú phương thức:** AGY không truy cập được XDA (timeout kết nối ở tầng mạng từ máy chủ, không phải HTTP 405). Phần này được khôi phục bằng web_extract chạy cục bộ — 5 bài dưới đây đều đã đọc nội dung đầy đủ trang gốc, tóm tắt bám sát bài gốc, không bịa.

## 1. Biến điện thoại quay số cổ thành trợ lý AI — chạy Gemini trên Raspberry Pi
**Link:** [xda-developers.com/someone-turned-a-vintage-rotary-phone-into-an-ai-assistant...](https://www.xda-developers.com/someone-turned-a-vintage-rotary-phone-into-an-ai-assistant-and-so-can-you/)

Ramazan Eren Arslan biến điện thoại quay số cổ Deutsche Bundespost FeTAp 791 (mua chợ đồ cũ, giá rẻ) thành trợ lý AI: nhét Raspberry Pi 3 Model B + sound card USB vào lòng máy. Nhấc máy rồi quay số 1/2/3 để chọn tiếng Đức, Anh hay Thổ Nhĩ Kỳ, cuộc gọi nối tới Google Gemini 3.8 Live trả lời như "đường dây tư vấn" ngày xưa. Dự án đăng trên Hackster.io và tác giả xác nhận hoạt động với các máy quay số khác, ai có máy cũ nằm trong tủ đều làm theo được.

## 2. Hai người dùng Claude port PCSX2 — giả lập PS2 chạy trong tab trình duyệt
**Link:** [xda-developers.com/two-people-used-claude-to-make-a-ps2-emulator...](https://www.xda-developers.com/two-people-used-claude-to-make-a-ps2-emulator-that-runs-in-your-browser/)

Dự án TabStationToo là nhánh Claude-assisted của emulator PCSX2 (GPL-3.0), điều chỉnh core để chạy trong tab Chrome, không cần cài thêm gì dù dùng OS nào. Chạy hoàn toàn cục bộ, không upload dữ liệu lên server nào, nhưng người dùng phải tự cung cấp BIOS và ROM từ máy PS2 của mình. Hiệu năng chưa bằng PCSX2 bản native, và đây không phải website công khai mà là thứ bạn tự chạy — nhưng là demo ấn tượng về tương lai giả lập trên trình duyệt. Mã nguồn trên GitHub: TabStationToo/TabStationToo.

## 3. Ngừng viết prompt chi tiết trong 1 tuần: Gemini là bot gặp khó nhất
**Link:** [xda-developers.com/stopped-giving-chatgpt-claude-and-gemini-detailed-prompts...](https://www.xda-developers.com/stopped-giving-chatgpt-claude-and-gemini-detailed-prompts-one-struggled-more-than-expected/)

Lấy cảm hứng từ lời Boris Cherny ( cha đẻ Claude Code) rằng mô hình mới đủ thông minh để tự đoán việc thay vì được chỉ từng bước, tác giả thử 1 tuần chỉ đưa prompt mơ hồ cho ChatGPT, Claude, Gemini qua 5 việc thường ngày. Kết quả: Gemini vẫn cần "dắt tay" nhiều nhất, còn ChatGPT và Claude khá giỏi lấp khoảng trống bằng giả định hợp lý hoặc hỏi lại. Đáng chú ý: khi xây website doanh nghiệp, ChatGPT chủ quan làm ra bản chung chung, còn Claude dừng lại hỏi thông tin rồi làm đúng ý hơn — biết khi nào không nên giả định là điểm khác biệt thật sự.

## 4. Đi tìm lỗi quạt NAS, hoá ra phát hiện 40 giờ bị credential stuffing
**Link:** [xda-developers.com/went-looking-for-a-fan-problem-on-my-nas-found-40-hours...](https://www.xda-developers.com/went-looking-for-a-fan-problem-on-my-nas-found-40-hours-of-credential-stuffing/)

Tác giả mở Log Center của Synology DS1621xs+ để check nhiệt ổ cứng và thấy kẻ lạ thử đăng nhập DSM liên tục 10–40 giây/lần suốt ~42 giờ, luân phiên 14 IP từ 4 dải địa chỉ, với username kiểu admin, marketing, muhasebe — không lần nào thành công. Nguyên nhân: một rule forward port 80 "chơi" cho nginx test bị quên, và nó bỗng dưng "sống lại" trỏ thẳng vào trang đăng nhập DSM sau khi đường truyền nhà tác giả thoát CGNAT. Bài học: rà soát port forward định kỳ, kiểm tra public IP từ mạng LTE, và giữ 2FA (Synology xác nhận "remember device" chỉ áp dụng cùng account + cùng browser). Ai cần remote vào NAS mà không muốn lộ login page thì dùng Tailscale thay QuickConnect.

## 5. Biến Obsidian thành trung tâm năng suất, thay 5 app subscription
**Link:** [xda-developers.com/built-obsidian-into-productivity-hub-stopped-paying-for-5-separate-apps/](https://www.xda-developers.com/built-obsidian-into-productivity-hub-stopped-paying-for-5-separate-apps/)

Tác giả gom toàn bộ workflow về một vault Obsidian: ghi chú thay Evernote (internal linking + graph view, plugin AutoMover tự dọn thư mục), Canvas thay Microsoft Whiteboard cho brainstorming, Bases thay Notion database, Tasks plugin thay Todoist (due date, ưu tiên, lặp lại, query dashboard). Mobile app Obsidian gần đây khá hơn nhiều nên dùng trên di động thoải mái. Đánh giá thẳng thắn: Obsidian không có đủ 100% tính năng của từng app bị thay, đổi lại mọi thứ nằm ở một nơi, kiểm soát hoàn toàn, và tiết kiệm tiền subscription — Obsidian miễn phí, chỉ tốn 4 USD/tháng nếu cần Sync.


---

## Phần 3 — Hacker News Top 3 (theo điểm, lúc ~08:00 ICT)

### 1. "Backdoor in Claude Code for VS Code extension on the Cursor Marketplace" — 759 điểm, 474 bình luận
Phorion phát hiện extension Claude Code bản 2.1.313 trên Cursor Marketplace bị chèn mã độc tạo SSH backdoor bền vững trên macOS/Linux/Windows: thêm khoá Ed25519 của kẻ tấn công vào `~/.ssh/authorized_keys` (comment `svc-telemetry`), cài persistence (LaunchAgent giả danh `com.apple.sysmond` trên macOS, cron `@reboot` trên Linux, scheduled task `SysMon` trên Windows) và beacon thông tin máy + tên (không phải giá trị) tối đa 40 biến môi trường về C2. Trên macOS, một lỗi của chính mã độc (chạy `systemsetup -getremotelogin` không đủ quyền nên không bật được SSH) làm giảm nhẹ tác hại, nhưng không nên dựa vào đó để phòng thủ. Cursor đã gỡ bản này khỏi marketplace (kèm NPM/VSCode) và khuyến cáo rà soát môi trường, kích hoạt ứng phó sự cố.
Link: https://phorion.io/blog/offical-claude-code-vsx-compromise/

### 2. "Northflank Breached" — 352 điểm, 272 bình luận
Nền tảng PaaS Northflank xác nhận bị sự cố bảo mật. Timeline từ trang status: 11:43 UTC Wiz phát cảnh báo mối đe dọa, kỹ sư xem xét trong 1 phút, các bản vá mạng triển khai trong ~80 phút, xin hỗ trợ Wiz CIRT. Hướng dẫn trên trang status nghiêm trọng: "giả định mọi environment variable đã bị giải mã — disable/rotate toàn bộ khoá". Hầu như toàn bộ nền tảng (networking, certificates, services, addons, jobs, builds, logs) ở trạng thái Major outage; Northflank App và API vẫn operational.
Lưu ý: tóm tắt từ trang status chính thức — chi tiết kỹ thuật của vụ xâm nhập chưa được công bố.
Link: https://status.northflank.com

### 3. "My favourite PowerMac is a Nintendo Wii" — 231 điểm, 61 bình luận
Lập trình viên Rairii port classic Mac OS (7.6 và 9.2.2) lên Nintendo Wii nhờ chipset ArtX (PowerPC, kế thừa từ GameCube): fork OpenBIOS, vá bootloader Trampoline runtime để sửa giả định về bản đồ địa chỉ vật lý và MMIO, chạy qua SD-over-SPI. Đây được cho là lần đầu kể từ thời Mac clone CHRP mà classic Mac OS khởi động tới desktop trên phần cứng không phải Apple. Tác giả nhấn mạnh dự án thuần giải trí: không dùng coding agent hay LLM nào, toàn bộ reverse + code tay. Bước tiếp: SD controller của Wii, USB, rồi Wii U.
Link: https://virtuallyfun.com/2026/10/29/my-favourite-powermac-is-a-nintendo-wii/


---

## Phần 4 — GitHub Trending Top 3 hôm nay

1. **thedotmack/claude-mem** (TypeScript) — ⭐ 106.261 (+1.140 hôm nay)
   Persistent Context Across Sessions for Every Agent — ghi lại mọi việc agent làm trong session, nén bằng AI, và tiêm lại context liên quan vào các session sau. Hỗ trợ Claude Code, Codex, Gemini, Hermes, Copilot, OpenCode...
   https://github.com/thedotmack/claude-mem
2. **milind-soni/OpenMausBot** (TypeScript) — ⭐ 8.655 (+895 hôm nay)
   Phương án Grok Bot mã nguồn mở, kèm một máy ảo mà bot có thể sử dụng.
   https://github.com/milind-soni/OpenMausBot
3. **pbakaus/impeccable** (Rust) — ⭐ 97.074 (+2.300 hôm nay — tăng mạnh nhất trong top)
   "Design vocabulary" cho coding agent: chỉ dẫn về polish/bolder, review bằng critique/audit, chặn "AI slop" trước khi ship.
   https://github.com/pbakaus/impeccable
