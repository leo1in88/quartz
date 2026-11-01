# Bản tin sáng 2026-11-01

---

# Tin Công nghệ & AI — Chủ nhật 01/11/2026

## Tóm tắt trong ngày

Cuối tuần ít bản tin chính thức mới, nhưng nổi bật là hai mảng: **bảo mật** (lỗ hổng nhân Linux CVSS 9.8 do mô hình Claude của Anthropic dựng exploit, lỗi chiếm tài khoản ChatGPT, và extension Claude trên Cursor bị cài backdoor) và **tài chính hạ tầng AI** (OpenAI hạ mục tiêu gọi vốn, Nvidia cân nhắc bảo lãnh nợ cho trung tâm dữ liệu của Nscale, cổ phiếu Big Tech giảm vì lo ngại chi tiêu AI). Về mô hình, Google DeepMind vừa ra mắt Gemini 4 Carbon và Genie 4 trong tuần.

> Ghi chú về "hôm nay": 01/11 là Chủ nhật nên các nguồn chính thức mới nhất là từ 27–31/10. Mỗi bài đều ghi ngày đăng.

---

## 1. Gemini 4 Carbon — mô hình tiên phong mới của Google DeepMind (28/10)

Google DeepMind giới thiệu **Gemini 4 Carbon**, mô hình mạnh nhất của hãng, tập trung vào an ninh mạng và các tác vụ "tầm xa" (long-horizon). Carbon đứng #1 trên Artificial Analysis Intelligence Index v5.0 (điểm 59). Về bảo mật, Carbon đạt 88,2% trên SEC-bench Pro (tìm lỗ hổng), 54,8% trên ExploitGym (khai thác) và 71,0% trên CWE-bench (vá lỗi). Theo DeepMind, đội Chrome báo cáo Carbon tạo bản vá chất lượng cao tốt hơn "hơn 10 lần" so với một mô hình tiên phong của phòng lab khác. Về an toàn, hãng nêu tỷ lệ gian lận thành công trên Terminal-Bench 4.0 giảm còn 0,0% và tỷ lệ tấn công prompt injection thành công trên bộ Gray Swan là 0,0%. Đây là số liệu do chính DeepMind công bố. Mô hình **chưa phát hành đại trà**: tuần này chỉ cấp cho một nhóm người làm phòng thủ mạng qua chương trình Fairwind, trong khi hãng tham gia quy trình thử nghiệm tự nguyện trước phát hành của chính phủ Mỹ. Giá giới thiệu là 2 USD/triệu token đầu vào và 10 USD/triệu token đầu ra, sau đó tăng gấp đôi.

🔗 https://deepmind.google/blog/gemini-4-carbon-our-next-frontier-model/ *(đã đọc đầy đủ)*

## 2. Genie 4 — mô hình thế giới tương tác có âm thanh gốc (27/10)

**Genie 4** là mô hình thế giới (world model) mới của DeepMind. Điểm mới là đa phương thức gốc: nó sinh ra cả âm thanh môi trường, nhạc và **hội thoại tương tác theo thời gian thực** cùng với thế giới mô phỏng. Genie 4 kế thừa năng lực từ họ Gemini: Gemini Omni neo hình ảnh và hành vi thực tế, còn các mô hình Gemini khác lo suy luận để giữ mô phỏng nhất quán. Người dùng điều khiển bằng bàn phím và ra lệnh bằng văn bản để đổi thời tiết, góc máy, thêm người hoặc vật thể. Ứng dụng nêu ra gồm môi trường huấn luyện cho robot và tác tử, tạo nguyên mẫu game và mô phỏng tình huống. Hãng thừa nhận Genie 4 vẫn ở giai đoạn nghiên cứu: chi tiết và tính bền vững của vật thể có thể trôi theo thời gian, và các tương tác vật lý phức tạp hay chữ đọc được vẫn còn hạn chế. Toàn bộ video và âm thanh đều gắn SynthID. Hiện chỉ có bản research preview cho tester tin cậy, sắp tới đến người dùng Google AI Ultra (Project Genie) và đối tác truy cập sớm Gemini API / AI Studio.

🔗 https://deepmind.google/blog/genie-4-a-new-generation-of-world-simulation/ *(đã đọc đầy đủ)*

## 3. CVE-2026-98432 — lỗ hổng TCP use-after-free trong nhân Linux, CVSS 9.8 (cập nhật 31/10)

Bài phân tích của Atlas (đang ở top Hacker News, ~313 điểm) về lỗi use-after-free trong bước bắt tay TCP IPv4 của nhân Linux, mà kẻ tấn công từ xa không cần xác thực có thể kích hoạt. Lỗi có từ Linux 4.4. Bản vá chỉ 4 dòng, đã phát hành từ 11–18/10 (ví dụ 6.12.113, 6.6.159, 6.1.190, 7.3). Vấn đề là các bản phân phối: tính đến 17:15 CDT ngày 31/10, Ubuntu (mọi phiên bản) và RHEL 8/9/10 vẫn chưa có bản sửa; Red Hat đã nâng mức độ lên Critical ngày 30/10. Đáng chú ý, lỗi do nhà nghiên cứu của Anthropic báo cáo, và Anthropic cho biết mô hình Claude đã dựng được exploit chạy lệnh root từ xa, không cần thông tin đăng nhập, trên máy chủ có listener multipath TCP (bài tường thuật cách làm của chính Anthropic, chưa công bố mã). Theo Go Security Team, chương trình Go từ 1.24 mở listener MPTCP mặc định nên phạm vi ảnh hưởng rộng hơn dự đoán. Bài kèm lệnh kiểm tra và biện pháp tạm thời (chặn gói TCP IPv4 có option bằng nftables/iptables). Đã có ít nhất 6 repo GitHub tự nhận có PoC hoặc race trigger, nhưng CVE chưa nằm trong danh mục KEV của CISA.

🔗 https://atlasum.net/blog/cve-2026-98432-linux-ipv4-tcp-uaf *(đã đọc đầy đủ)*

## 4. "Do the Math" — chiếm tài khoản ChatGPT chỉ bằng một đường link chia sẻ (đăng 28/10)

Nhóm nghiên cứu Parameter mô tả chuỗi khai thác biến một cuộc hội thoại ChatGPT công khai (share link) thành JavaScript chạy với danh tính `chatgpt.com` trong phiên đăng nhập của nạn nhân; nạn nhân chỉ cần mở link, thậm chí có thể tự động chạy Preview. Chuỗi gồm: (1) thư viện MathLive nhận `postMessage` từ mọi origin và gán layout bàn phím vào `innerHTML`; (2) chèn `iframe srcdoc` không sandbox, kế thừa origin chatgpt.com; (3) vượt CSP bằng endpoint oEmbed của YouTube hỗ trợ JSONP callback, vốn được CSP cho phép. Mã chạy được có thể liệt kê hội thoại và đọc nội dung chat riêng tư rồi gửi ra máy chủ ngoài. Nhóm báo cáo cho OpenAI ngày 18/10, độ nghiêm trọng được nâng lên P1, OpenAI sửa xong ngày 26/10 và trả thưởng 5.000 USD. Bài học chính là lỗi nằm ở "kẽ hở" giữa các tính năng (chia sẻ, Preview, MathLive, CSP), không phải ở một thành phần riêng lẻ. Đây là tường thuật của nhóm nghiên cứu, chưa có xác nhận độc lập trong trang đã đọc ngoài mốc thời gian họ nêu.

🔗 https://www.parameter.ai/labs/we-found-a-gap-at-openai *(đã đọc đầy đủ)*

## 5. Extension Claude của Anthropic trên Cursor bị cài backdoor gần 12 giờ (30/10)

⚠️ **Chỉ đọc được phần trích từ RSS của Ars Technica** (trang đầy đủ trả mã lỗi 405), không đọc được toàn bài. Theo phần trích: phiên bản độc hại 2.1.313 của extension VS Code chính thức của Claude xuất hiện trên chợ Cursor và ảnh hưởng "tối đa 5.000 người dùng" (theo Cursor). Anthropic đẩy bản 2.1.314 vài giờ sau đó, theo nhà nghiên cứu Kevin Beaumont. Cả Beaumont và CTO Phorian Luke Roberts cho biết bản độc hại được phát hành qua tài khoản chính thức của Anthropic trên Cursor, tức là một vụ tấn công chuỗi cung ứng. Cursor mặc định tự cập nhật extension. Cho đến thời điểm đăng, chưa rõ kẻ tấn công chiếm tài khoản bằng cách nào, và Anthropic chưa cảnh báo khách hàng. Một đề mục trong phần trích ("In search of cloud credentials") gợi ý mã độc nhắm tới thông tin xác thực cloud, nhưng tôi không đọc được chi tiết về hành vi mã độc.

🔗 https://arstechnica.com/security/2026/10/anthropic-vs-code-extension-on-cursor-backdoored-for-nearly-12-hours/ *(chỉ đọc phần trích RSS)*

## 6. OpenAI hạ mục tiêu gọi vốn xuống 20 tỷ USD (31/10)

TechCrunch tổng hợp từ Financial Times và Wall Street Journal: OpenAI trước đó được cho là gọi 30 tỷ USD ở mức định giá 1,4 nghìn tỷ, rồi 1,25 nghìn tỷ USD, nay mục tiêu giảm còn **20 tỷ USD**, với đợt đóng đầu tiên thấp hơn nữa. Vòng này do nhóm nhà đầu tư từ UAE dẫn dắt; một đợt bán lẻ cho người giàu có thể đưa tổng lên 20 tỷ. WSJ cho biết OpenAI đã huy động được 11 tỷ USD và một số nhà đầu tư lớn phản ứng "hờ hững". TechCrunch gắn diễn biến này với việc Phố Wall ngại chi tiêu hạ tầng AI, gây đợt bán tháo cổ phiếu công nghệ, và nhắc rằng kế hoạch IPO của Anthropic cũng có thể gặp khó. Bloomberg cùng ngày đưa tin tương tự (tiêu đề nêu mục tiêu giảm 10 tỷ USD theo FT) nhưng tôi **không đọc được bài Bloomberg** (bị chặn bằng trang xác minh bot), nên chỉ dựa vào bài TechCrunch. OpenAI chưa phản hồi theo bài.

🔗 https://techcrunch.com/2026/10/31/openai-reportedly-lowers-funding-target-for-new-round/ *(đã đọc đầy đủ)*
🔗 Bloomberg: https://www.bloomberg.com/news/articles/2026-10-31/openai-funding-goal-cut-by-10-billion-as-ai-stocks-dip-ft-says *(không đọc được, chỉ thấy tiêu đề)*

## 7. Nvidia cân nhắc bảo lãnh nợ cho trung tâm dữ liệu Anthropic của Nscale (30/10)

Theo The Information (Bloomberg đối chiếu lại), Nvidia đang đàm phán bảo lãnh hàng tỷ USD nợ cho trung tâm dữ liệu AI của Nscale tại West Virginia, nơi Anthropic đã ký hợp đồng 44,6 tỷ USD chỉ riêng cho tòa nhà đầu tiên (460 MW, dự kiến dùng chip Vera Rubin) theo hồ sơ IPO của Nscale. Hình thức là "bảo lãnh giá trị còn lại": nếu Nscale vỡ nợ khoản thanh toán xây dựng, Nvidia sẽ tạm tiếp quản cơ sở và tìm người mua và khách thuê mới. Trước đây Nvidia chủ yếu hỗ trợ tiền thuê và mua chip, chưa hỗ trợ chi phí xây dựng. Bối cảnh rủi ro: Nscale có khoảng 25.000 chip chạy hồi tháng 8 so với kế hoạch gần 500.000, cổ phiếu CoreWeave, Nebius, IREN giảm hơn 30% trong tháng 10, Microsoft rút khỏi một địa điểm của Nscale ở Anh vì điện lưới bị đẩy sang thập niên 2030. Bài cũng nêu Blackstone cảnh báo Anthropic có thể nhận xếp hạng tín dụng dưới mức đầu tư sau IPO. Tổng hỗ trợ Nvidia dành cho các neocloud và khách hàng lớn ước tính khoảng 170 tỷ USD.

🔗 https://techcrunch.com/2026/10/30/nvidia-weighs-playing-the-cosigner-for-nscales-ai-data-center-in-west-virginia/ *(đã đọc đầy đủ)*

## 8. Project Suncatcher — câu trả lời đầu tiên từ TPU trên quỹ đạo (30/10)

Google nhận phản hồi đầu tiên từ vệ tinh nguyên mẫu Project Suncatcher, phóng ngày 1/10 để thử nghiệm ý tưởng chạy tính toán AI trong không gian. Sau vài tuần hoàn tất danh mục chạy thử, họ đạt mốc "Hello World": phản hồi AI đầu tiên từ một **TPU cấp trung tâm dữ liệu trên quỹ đạo**. Google gửi lệnh lên mô hình mở Gemma 4 trên vệ tinh, yêu cầu viết một bài haiku về không gian; bài thơ được tải xuống khi vệ tinh bay qua trạm mặt đất ở Svalbard, Na Uy. Tiếp theo là các thử nghiệm hiệu năng TPU dưới áp lực nhiệt và bức xạ, rồi mốc tiếp theo là cặp vệ tinh liên kết với nhau vào năm 2027. Bài ngắn và chỉ nêu cột mốc, không có số liệu về hiệu năng, chi phí hay năng lượng.

🔗 https://blog.google/innovation-and-ai/models-and-research/google-research/project-suncatcher-satellite-response/ *(đã đọc đầy đủ)*

---

## Xu hướng đáng chú ý

- **AI trở thành công cụ tấn công và phòng thủ ở quy mô công nghiệp, cả hai chiều cùng lúc.** Gemini 4 Carbon được định vị quanh phát hiện, khai thác và vá lỗ hổng, và nhóm của Anthropic báo cáo CVE nhân Linux 9.8 mà Claude dựng được exploit root từ xa. Cùng lúc, bản vá phân phối chậm (Ubuntu, RHEL chưa có) và đã có repo PoC xuất hiện. Khoảng cách giữa "tìm ra lỗi nhanh bằng AI" và "vá lên hệ thống thật" đang là rủi ro chính.
- **Chuỗi cung ứng và ranh giới cô lập của chính các công cụ AI đang là mục tiêu.** Extension Claude trên Cursor (tài khoản phát hành chính thức bị chiếm) và chuỗi khai thác ChatGPT qua share link cho thấy cùng một mẫu: lỗ hổng nằm ở chỗ nối giữa các thành phần (kênh phân phối, `postMessage`, CSP, iframe) hơn là ở bản thân mô hình.
- **Cách phát hành mô hình mạnh đang chuyển sang truy cập theo tầng.** Carbon chỉ mở cho người làm phòng thủ mạng đã kiểm duyệt và có thử nghiệm trước phát hành của chính phủ Mỹ; Genie 4 cũng chỉ cho tester tin cậy. Các lab coi năng lực an ninh mạng là lý do chính để mở dần thay vì phát hành đồng loạt.
- **Tài chính hạ tầng AI đang căng.** OpenAI hạ mục tiêu gọi vốn, Big Tech bị bán tháo vì chi tiêu AI, neocloud giảm mạnh, và Nvidia phải cân nhắc đứng ra bảo lãnh nợ cho khách hàng của mình (Anthropic/Nscale). Chip, điện và tiền xây dựng đang là nút thắt, và vòng "nhà cung cấp chip tài trợ cho khách hàng mua chip" làm rủi ro tập trung vào vài tên tuổi. (Tiêu đề Bloomberg cùng ngày về việc Altman gặp Samsung vì thiếu bộ nhớ cũng đi theo hướng này, nhưng tôi không đọc được bài.)
- **Tính toán đang mở rộng ra ngoài trung tâm dữ liệu truyền thống.** Suncatcher (TPU trên quỹ đạo) đi cùng áp lực về điện lưới ở mặt đất (Microsoft rút khỏi dự án Nscale ở Anh). Genie 4 cho thấy mô hình thế giới đang trở thành hạ tầng mô phỏng cho robot và tác tử, nhưng cả hai vẫn ở giai đoạn rất sớm.

---

## Nguồn không đọc được / giới hạn

- **Bloomberg** (cả hai bài về OpenAI funding và Altman–Samsung): trả về trang "Are you a robot?" (HTTP 403). Chỉ dùng tiêu đề từ RSS, không tóm tắt nội dung.
- **OpenAI blog** (Model Spec cập nhật 29/10, "How we detect frontier model misalignment" 29/10): trả về 403, không đọc được nội dung nên không đưa vào danh sách chọn.
- **Ars Technica**: trang đầy đủ trả về 405; bài số 5 chỉ dựa vào phần trích RSS.
- **Anthropic**: trang Claude Opus 5.5 hiển thị ngày 22/09/2026 (không phải tin hôm nay) nên không đưa vào. Các bài Anthropic khác (Cyber Mission, chính sách sử dụng, chống distillation) đọc được nhưng không xác định được ngày đăng, nên không đưa vào danh sách.
- **Hacker News**: bài "Anthropic blocks users for anything touching training larger models" chỉ là link Twitter/X, không đọc được nên bỏ qua.

---

# XDA Trending — Chủ nhật 01/11/2026

> Ghi chú nguồn: AGY không truy cập được XDA (timeout kết nối từ mạng này, không phải HTTP 405) nên AGY không lấy được bài nào. Bản dưới đây được thu thập trực tiếp từ RSS feed + trang chủ + bài gốc XDA qua web_extract phía trợ lý; mỗi bài lấy từ URL gốc XDA (trừ bài số 3 chỉ có tóm tắt RSS).

## 1. Sam Altman: "quá tệ" khi RAM còn hạn chế nằm trong PC của người dùng
Sam Altman, trong một podcast (Cheeky Pint, dẫn theo IGN), cho rằng xét theo "phân bổ toàn cầu", việc mỗi người giữ một phần nguồn cung DRAM khan hiếm trong máy cá nhân — thứ chỉ được dùng ~5% thời gian — là "quite terrible"; RAM nên nằm trong data center để đạt mức tận dụng tối đa trong thời kì thiếu hụt. Bài XDA bình luận rằng phát biểu này lộ rõ định hướng ưu tiên cloud hơn người dùng cuối, dù bản thân tác giả thừa nhận đây chỉ là suy đoán từ một buổi phỏng vấn. Bối cảnh: giá RAM tăng mạnh trong vòng một năm một phần do các công ty AI mua DRAM theo lô lớn. (đăng 31/10)
🔗 https://www.xda-developers.com/sam-altman-says-its-quite-terrible-that-people-have-ram-in-their-pcs-during-a-shortage/

## 2. Anthropic có vẻ đang thử chặn các bản port game "vibe-coded" từ game có sẵn
XDA phát hiện một hướng dẫn mới ("Do build original games... Don't build a recreation of a specific existing game, even if it is renamed") được Anthropic đẩy qua kênh cấu hình từ xa "tengu_heron_brook" trong Claude Code, và xác nhận độc lập hướng dẫn này nằm trong binary v2.1.314. Có thêm một cơ chế riêng (original_games_guidance + opus_5_5_prompt_bundle) cho thấy hạn chế áp cho Opus 5.5 trong khi Opus 5 trong một phiên thử vẫn nói mình không bị ràng buộc và đồng ý hỗ trợ decompilation hợp pháp. Hạn chế không cấm rõ decompilation/static recompilation, nhưng tạo rủi ro cho các dự án như port Zelda Wind Waker HD hay lớp tương thích chạy game Switch trên Mac. Chưa rõ mức độ triển khai rộng và phạm vi "recreation" được định nghĩa thế nào. (đăng 30/10)
🔗 https://www.xda-developers.com/anthropic-testing-potential-crackdown-on-vibe-coded-ports-of-existing-games/

## 3. Ai đó đã chạy được Pokémon Pokopia trên PS5 với Linux
Bài viết kể về việc cộng đồng homebrew đưa tựa game Pokémon Pokopia chạy trên PS5 cài Linux — tác giả bày tỏ "không biết tin nữa". Lưu ý: AGY bị chặn truy cập bài này nên chỉ có tóm tắt 1 câu từ RSS; chưa đọc đủ nội dung bài gốc, không nêu thêm chi tiết để tránh bịa. (đăng 30/10)
🔗 https://www.xda-developers.com/someone-got-pokemon-pokopia-running-on-a-ps5-with-linux-on-it-and-i-dont-know-what-to-believe-anymore/

## 4. KDE Plasma 6.8 vừa đến tay người dùng kèm mảng vá lỗi lớn
Plasma 6.8 phát hành 14/10 và đang lan tới người dùng ngoài nhánh LTS, kéo theo các regression như thông báo hiện sai góc trên-trái, panel clone quên màn hình, và crash khi có hơn 16 màn hình/desktop/activity rồi mở launcher bằng phím tắt. Cộng đồng KDE đã vá các regression này, rồi chuyển sang lỗi cũ: 6.8.2 sửa 3 cách Discover crash khi cập nhật hệ thống và lỗi remote desktop crash khi chạy từ Flatpak; một số sửa đổi dời sang 6.9 (trong đó nút Full Screen của widget Web Browser thực sự vào chế độ toàn màn hình). Ai đang bị 6.8 phá tính năng thì nên cập nhật. (trên trang chủ XDA hiện tại)
🔗 https://www.xda-developers.com/kde-plasma-gets-a-ton-of-bug-fixes-as-68-begins-landing-on-peoples-computers/

## 5. Anti-cheat Linux v2 của Epic yêu cầu TPM 2.0 và một loạt cấu hình bảo mật
Epic công bố Easy Anti-Cheat Linux v2 (blog 14/10) nhằm đưa mức bảo vệ gần "ngang Windows"; không dùng kernel module mà dùng hạt nhân đã ký, Secure Boot, Measured Boot, IOMMU, Kernel Lockdown integrity, BPF LSM, tắt kexec — và bắt buộc TPM 2.0 (lý do là PCRs tạo boot log chống giả mạo), bỏ lại người dùng TPM 1.2. EAC v2 là systemd service chỉ nạp khi game được bảo vệ chạy; Steam Deck vẫn chưa tương thích. Bài kèm 5 lệnh shell để tự kiểm tra máy trong ~5 phút (mokutil --sb-state, cat /sys/class/tpm/tpm0/tpm_version_major...). (trên trang chủ XDA hiện tại)
🔗 https://www.xda-developers.com/epic-linux-anti-cheat-tpm-2/

---

# Phần 3 — Hacker News Top 3 (theo điểm)

## 1. HackerTube: YouTube built from videos recommended by HN — 641 điểm
Karpathy (OpenAI/co-founder) dựng hackertube.org chỉ trong ~2 giờ với Claude Opus 5.5: tải toàn bộ comment HN, lọc bằng workflow Sonnet để lấy 40K comment đề xuất video, cho ra 6.454 video được HN khuyến nghị từ 2007–2026 theo 150 chủ đề. Giao diện kiểu YouTube với thumbnail 50% (tránh thumbnail nhảm), gợi ý "ForYou" không cần tài khoản (state lưu trong trình duyệt), phím tắt và export dữ liệu để agent khác tự dựng phiên bản. Link bài gốc: https://karpathy.bearblog.dev/hacker-tube/ — thảo luận: https://news.ycombinator.com/item?id=50319510

## 2. TCP Use-After-Free: CVE-2026-98432 / CVSS 9.8 — 313 điểm
Lỗ hổng use-after-free trong bước bắt tay TCP IPv4 của nhân Linux, kẻ tấn công từ xa không cần xác thực có thể kích hoạt, lỗi có từ Linux 4.4; bản vá chỉ 4 dòng đã phát hành 11–18/10 (6.12.113, 6.6.159, 6.1.190, 7.3) nhưng tính đến 31/10 Ubuntu và RHEL 8/9/10 vẫn chưa có bản sửa, Red Hat đã nâng lên Critical. Đáng chú ý: lỗi do nhà nghiên cứu của Anthropic báo cáo và mô hình Claude đã dựng được exploit root từ xa trên máy chủ có listener multipath TCP (Go 1.24 mở listener MPTCP mặc định nên phạm vi rộng hơn dự đoán). Bài kèm lệnh kiểm tra và biện pháp tạm thời (chặn gói TCP IPv4 có option bằng nftables/iptables). Link bài gốc: https://atlasum.net/blog/cve-2026-98432-linux-ipv4-tcp-uaf — thảo luận: https://news.ycombinator.com/item?id=50319143

## 3. It's the memory latency, stupid — 114 điểm
Blog Pivot (28/10) giải thích vì sao CPU 100% vẫn có thể chậm: DRAM chậm hơn ~100–400 lần so với tốc độ nội bộ CPU (1 lần truy cập RAM ≈ 400–800 lệnh), nên GROUP BY với HashTable 17 triệu nhóm gần như toàn "cold hit" vào RAM — perf cho thấy 50,1% thời gian CPU stall vì bộ nhớ và chỉ 16,1% thực sự chạy lệnh. Giải pháp radix partitioning: tách keys thành 4096 phân vùng theo 12 bit cao của hash rồi aggregate từng phân vùng, nhờ đó HashMap làm việc đủ nhỏ để nằm trong cache — kết quả 3.6s → 2.7s trên dataset ClickBench 99 triệu dòng, và số lượng DRAM fetch giảm từ 4.5GB xuống 1.5GB. Engine Pivot của họ đạt 1848ms cho 1 core, 171ms cho 16 cores. Link bài gốc: https://pivotlake.io/blog/its-the-memory-latency-stupid/ — thảo luận: https://news.ycombinator.com/item?id=50318720

# Phần 4 — GitHub Trending Top 3 hôm nay (theo rank)

## 1. thedotmack/claude-mem — 107.881 ⭐ (+1.723 sao hôm nay), TypeScript, 9.466 forks
"Persistent Context Across Sessions for Every Agent" — ghi lại toàn bộ hoạt động của agent trong các phiên làm việc, nén bằng AI rồi inject ngữ cảnh liên quan vào các phiên tương lai. Hỗ trợ Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot, OpenCode và nhiều agent khác.
🔗 https://github.com/thedotmack/claude-mem

## 2. mattpocock/skills — 308.394 ⭐ (+883 sao hôm nay), Shell, 25.948 forks
"Skills for Real Engineers" — bộ kỹ năng (agents) từ thư mục .agents của Matt Pocock (TypeScript Tooling Team), dành cho kỹ sư làm việc với AI coding agent.
🔗 https://github.com/mattpocock/skills

## 3. Donchitos/Claude-Code-Game-Studios — 31.183 ⭐ (+742 sao hôm nay), Shell, 4.272 forks
Biến Claude Code thành một game studio hoàn chỉnh: 49 AI agent + 72 workflow skills + hệ điều phối mô phỏng cấu trúc studio game thực (producer, designer, dev, QA...).
🔗 https://github.com/Donchitos/Claude-Code-Game-Studios
