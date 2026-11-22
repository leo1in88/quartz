# Bản tin sáng 2026-11-22

> Tổng hợp tự động: Phần 1 (Tech/AI — AGY, model Gemini 3.8 Flash Medium) · Phần 2 (XDA trending — AGY) · Phần 3 (Hacker News — opencli) · Phần 4 (GitHub trending — opencli).

---

# [1] Công nghệ & AI — 22/11/2026

> **Tổng quan hôm nay:** Thinking Machines Lab phát hành Inkling 2 Mini — mô hình "looped transformer" 26,4B tham số chạy được trên laptop; cộng đồng Lean/Mathlib chính thức chứng thực chứng minh Giả thuyết Riemann bằng Lean; hai lỗ hổng nghiêm trọng (Ghostscript "Upload2Shell" và GPGME) đúng lúc đàm phán LHQ về vũ khí tự động sụp đổ tại Geneva.

## 1. Thinking Machines Lab ra mắt Inkling 2 Mini: MoE "looped transformer" 26,4B chạy trên laptop
Thinking Machines Lab (startup của cựu CTO OpenAI Mira Murati) phát hành trọng số mở Inkling 2 Mini — mô hình MoE 26,4 tỷ tham số tổng, 3,4B tham số hoạt động, nhưng 5,4B "weight activations" mỗi token vì các lớp giữa được chạy lặp 3 lần cho mỗi token. Cơ chế lặp cho phép mô hình suy luận lâu hơn mà không cần viết chuỗi suy nghĩ (CoT) ra ngoài — điểm quan trọng cho khả năng giám sát. Mô hình dẫn đầu mọi mô hình mở dưới 100B tham số trên DeepSWE v1.1 (48,2%) và Vals Index v2.2 (46,5%). Phần lớn trọng số huấn luyện và triển khai native ở NVFP4 (4 lớp cuối MXFP8), tổng dung lượng bộ nhớ khoảng **20 GB** — đủ chạy offline trên MacBook Pro; nhóm nghiên cứu đã cho mô hình chạy trên máy bay và tự dựng một game mô phỏng bay chơi được trong vài phút. Bản biến thể "variable-loop" dùng cho thí nghiệm monitorability: time horizon no-CoT tăng từ 16 giây (1 vòng) lên 37 giây (3 vòng), chất lượng suy luận nối tiếp còn tăng tới 10 vòng.
- Nguồn: [Thinking Machines Lab — Introducing Inkling 2 Mini](https://thinkingmachines.ai/news/inkling-2-mini/) · [Model card trên Hugging Face](https://huggingface.co/thinkingmachines/Inkling-2-Mini)

## 2. LookAtMyQuant công bố trình biên dịch lượng tử hóa: nén Inkling 2 Mini xuống 5,4 GB
Ngay sau khi Inkling 2 Mini ra mắt, dự án mã nguồn mở LookAtMyQuant (ShinMegamiBoson) phát hành bản nâng cấp trình biên dịch lượng tử hóa, nén mô hình MoE 26,4B xuống các mức 5,4 GB / 8,9 GB / 11,2 GB / 12,8 GB. Thay vì lượng tử hóa đồng nhất, dự án dùng mã Trellis kết hợp phân bổ bit theo từng hàng ma trận dựa trên ma trận thông tin Fisher, cộng quy trình fine-tune cận biên (SQYFR) trên 128 chuyên gia. Kết quả: độ phân kỳ KL thấp hơn tới 12 lần so với chuẩn Q4_K_M ở cùng kích thước tệp; bản 5,4 GB (~2,1–2,3 bit/trọng số) vẫn giải được phần lớn bài toán lý luận gần tương đương bản BF16. Tệp được đóng gói cho runtime MLX trên Apple Silicon và llama.cpp.
- Nguồn: [GitHub — ShinMegamiBoson/lookatmyquant](https://github.com/ShinMegamiBoson/lookatmyquant) · [Tài liệu LookAtMyQuant](https://lookatmyquant.pages.dev)

## 3. Cộng đồng Lean & Mathlib chính thức chứng thực chứng minh Giả thuyết Riemann
Ngày 20/11/2026, Levent Alpöge công bố một chứng minh Giả thuyết Riemann dưới dạng thư viện Lean gồm 17 triệu dòng code. Sau một ngày, cộng đồng Lean và Mathlib ra tuyên bố chung (được Lean FRO và Mathlib Initiative bảo trợ) xác nhận cả phát biểu và chứng minh đều đúng, đạt đủ 4 tiêu chí kiểm định: (i) phát biểu khớp định nghĩa chuẩn `RiemannHypothesis` trong Mathlib; (ii) thư viện biên dịch sạch, nhiều người tái lập được cùng một tệp export thô; (iii) có tệp tách riêng phát biểu, so khớp bằng hai công cụ độc lập (`comparator`, `con-leche --compare`); (iv) chứng minh thô được kiểm bởi kernel chính thức của Lean cùng các checker độc lập (`con-leche`, `con-ron`) — hai checker này có chứng minh hình thức rằng chúng không thể chấp nhận một chứng minh sai.
Song song, ngày 20/11, GS. Ravi Vakil (Stanford) đăng "Hurried Announcement" về bản thảo chứng minh **GRH** (Giả thuyết Riemann tổng quát) của Alessandro Masullo: Brian Conrad đã kiểm tra kỹ nhiều tháng và phản hồi đang được đưa vào bản thảo, "cho tới nay trông ổn"; Vakil nhấn mạnh công trình **hoàn toàn do con người làm, không có AI**, và quyết định công bố bản nháp sớm để cộng đồng kiểm tra, hình thức hóa, vá các lỗ hổng nhỏ nếu có. Bản nháp PDF có tên *The Music of the Primes*.
- Nguồn: [Lean community blog — Lean verification of the Riemann Hypothesis](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/) · [Math 216 (Ravi Vakil) — Hurried Announcement: Alessandro Masullo GRH](https://math216.wordpress.com/2026/11/20/hurried-announcement-alessandro-masullo-grh/) · [Bảng kiểm định GRH của Andrew Sutherland (MIT)](https://math.mit.edu/~drew/grh/)

## 4. Upload2Shell (CVE-2026-125396): lỗ hổng use-after-free trong Ghostscript phá sandbox -dSAFER
Nhóm pwn.ai công bố chuỗi tấn công Upload2Shell trong bộ nạp font Type 1 của Ghostscript: lỗi use-after-free ở thủ tục `.putgstringcopy` (`gs_fonts.ps`) cho phép tài liệu PostScript/PDF độc hại vượt cơ chế cách ly `-dSAFER`, ghi đè con trỏ bộ nhớ và chạy lệnh hệ thống với quyền của tiến trình render. Ghostscript nằm dưới nhiều tầng hạ tầng: qua ImageMagick, kẻ tấn công chỉ cần upload một ảnh giả `.png`/`.jpg` là kích hoạt được đường ống chuyển đổi, dẫn tới RCE không cần xác thực trên Google Document Renderer, WordPress Core, Roundcube Webmail, Plesk Obsidian và CUPS trên Debian 13. Artifex đã vá trong Ghostscript 10.08.0.
- Nguồn: [pwn.ai — Upload2Shell (CVE-2026-125396)](https://pwn.ai/upload2shell) · [Artifex bug 709684](https://bugs.ghostscript.com/show_bug.cgi?id=709684)

## 5. Nghiên cứu: LLM đọc, sửa và viết mã máy nhị phân trực tiếp từ hex dump
Hai nhà nghiên cứu George Xenos và Sotiris Giannopoulos công bố "Programming in the Machine Code Space", cho thấy các LLM tiên tiến có thể thao tác trực tiếp trên mã máy x86_64 chỉ qua hex dump — không cần disassembler, compiler hay môi trường thực thi. Mô hình giải thích đúng logic của 5 binary đã strip symbol, phát hiện một bug thật trong mã nguồn upstream của một công cụ thống kê mã nguồn mở, phân tích một mẫu malware chưa từng biết để rút IOC, thêm tính năng vào 3 binary bằng cách sửa byte tại chỗ, và tự viết 3 chương trình từ đầu bằng hex.
- Nguồn: [George Xenos & Sotiris Giannopoulos — Programming in the Machine Code Space](https://sgiannopoulos.github.io/blog/machine-code-programming/)

## 6. Đàm phán LHQ về vũ khí tự động sụp đổ tại Geneva
Tuần đàm phán trong khuôn khổ Công ước CCW của LHQ tại Geneva sụp đổ rạng sáng 21/11/2026 sau một đêm thương lượng bất thành. Hơn 100 quốc gia ủng hộ một văn kiện ràng buộc pháp lý về vũ khí sát thương tự động, nhưng cơ chế đồng thuận tuyệt đối (cần cả 128 nước) đã vô hiệu hóa nỗ lực này; Nga dẫn đầu việc câu giờ thủ tục, trong khi các cường quốc đang đầu tư mạnh vào AI quốc phòng (Mỹ, Anh, Pháp, Đức, Hàn, Nhật, Thổ Nhĩ Kỳ) chỉ ủng hộ thỏa thuận tự nguyện và cho rằng luật nhân đạo quốc tế hiện hành là đủ.
- Nguồn: [The Guardian — UN talks on controlling autonomous weapons collapse](https://www.theguardian.com/technology/2026/nov/21/international-talks-control-ai-autonomous-weapons-collapse)

## 7. GnuPG phát hành GPGME 2.3.1 vá lỗi double-free CVE-2026-129975
Werner Koch và nhóm GnuPG phát hành bản tin an ninh khẩn cùng GPGME 2.3.1 (kèm cập nhật Gpg4win, GnuPG Desktop, VS-Desktop) vá CVE-2026-129975 (nội bộ T8557). Lỗi nằm ở hai hàm đọc dòng trạng thái và danh sách khóa từ tiến trình `gpg`: khi gặp khóa OpenPGP có User ID cực dài được dựng có chủ đích, bộ đệm 1024 byte bị realloc nhưng con trỏ không đồng bộ → double-free, có thể dẫn tới lộ dữ liệu nhạy cảm hoặc leo thang RCE ở ứng dụng xử lý dữ liệu có chữ ký số. Lỗi do Johan Carlsson phát hiện, GitLab cảnh báo sớm, buộc nhóm đẩy lịch công bố sớm hơn 5 ngày.
- Nguồn: [GnuPG announce — security advisory GPGME (CVE-2026-129975)](https://lists.gnupg.org/pipermail/gnupg-announce/2026q4/000517.html)

## 8. Mozilla: vì sao iOS vẫn chưa có trình duyệt nào ngoài WebKit dù đã có DMA
Nhóm chính sách của Mozilla phân tích lý do iPhone vẫn chưa có trình duyệt chạy engine độc lập (Gecko, Blink) dù DMA của EU đã có hiệu lực. DMA có tác dụng bước đầu: màn hình chọn trình duyệt mặc định giúp lượng người dùng Firefox iOS hằng ngày ở EU tăng gấp đôi. Nhưng điều kiện kỹ thuật và hợp đồng của Apple vẫn ngặt: engine thay thế chỉ được phân phối trong 27 nước EU (buộc phải duy trì hai nhánh sản phẩm), cấm tuyệt đối trên iPadOS dù cùng nền tảng, kèm các cam kết pháp lý phức tạp về WebKit. Chi phí vận hành song song hai engine triệt tiêu động lực cạnh tranh thực chất.
- Nguồn: [The Mozilla Blog — Why there are still no non-WebKit browsers on iOS](https://blog.mozilla.org/en/mozilla/internet-policy/apple-ios-browser-engine-rules/)

## Xu hướng đáng chú ý

1. **Kiến trúc "lặp" thay vì tăng tham số để đưa agent AI về máy cá nhân.** Inkling 2 Mini dùng looped transformer (chạy lặp các lớp giữa) để tăng chiều sâu suy luận mà không phình tham số, cộng với NVFP4 native giữ tổng footprint ~20 GB; LookAtMyQuant nén tiếp xuống 5,4 GB với tổn thất KL thấp. Đường đi chung: năng lực suy luận tăng nhờ cấu trúc tính toán, chi phí bộ nhớ giảm nhờ lượng tử hóa thông minh — điều kiện để agent tự hành chạy offline trên laptop.
2. **Toán học bước vào kỷ nguyên "chứng thực hình thức trước, công bố sau".** Cùng một ngày có hai sự kiện: chứng minh RH bằng Lean 17 triệu dòng được cả cộng đồng kiểm định và chứng thực chỉ trong ~1 ngày; và bản thảo GRH 100% do con người làm của Masullo được công bố sớm, kèm lời kêu gọi cộng đồng kiểm tra và hình thức hóa. Trọng tâm dịch chuyển từ "đọc bài báo tin tác giả" sang "chạy kernel/checker độc lập" — và các checker có chứng minh hình thức về tính đúng đắn của chính chúng.
3. **Rủi ro kép với hạ tầng an ninh: thư viện C kế thừa + tự động hóa khai thác bằng AI.** Ghostscript (use-after-free, phá sandbox) và GPGME (double-free) đều là thư viện C hàng chục năm tuổi nằm sâu dưới các luồng xử lý tưởng như vô hại (upload ảnh, xác thực email). Khi LLM đã đọc hiểu và sửa trực tiếp mã máy từ hex dump, tốc độ phát hiện — và cả khai thác — zero-day sẽ tăng vọt, càng thúc ép chuyển các thành phần nhạy cảm sang ngôn ngữ an toàn bộ nhớ.
4. **Quản trị đa phương và chống độc quyền đều bị chặn bởi lợi ích chiến lược.** Đàm phán CCW sụp đổ vì cơ chế đồng thuận + lợi thế quân sự; DMA bị vô hiệu hóa thực chất bằng rào cản kỹ thuật và hợp đồng. Cả hai cho thấy khung pháp lý hiện hành chưa đủ lực trước lợi ích quốc gia và độc quyền nền tảng.

> **Đính chính so với bản nháp AGY:** hai chỗ đã được sửa theo nguồn gốc — (a) Inkling 2 Mini có footprint bộ nhớ ~20 GB (5,4B là *weight activations* mỗi token, không phải RAM); (b) bản thảo GRH của Masullo **không** bị "phát hiện lỗ hổng ở Chương 13/Định lý 12.5.1.1" — blog của Vakil nói ngược lại (đang được Brian Conrad kiểm tra kỹ, "trông ổn"). Các số liệu benchmark (48,2% DeepSWE, 46,5% Vals Index) đã đối chiếu trực tiếp với blog Thinking Machines.

---

# [2] XDA Developers — trending & mới nhất (22/11/2026)

> **Lưu ý kỹ thuật:** Kết nối trực tiếp từ máy chủ đến `xda-developers.com` bị WAF của Valnet chặn (timeout / HTTP 405). Danh sách dưới đây được xác định và trích xuất qua proxy đọc (Jina Reader) trong ngày 22/11/2026 — **chưa đối chiếu trực tiếp trên giao diện gốc**, nội dung lấy nguyên văn từ bản CDN, không suy diễn.

### 1. OpenCode + LLM cục bộ xử lý 80% việc code nhàm chán, chỉ 20% khó đưa cho Claude
- Tiêu đề gốc: *OpenCode and a local LLM handle the boring 80% of my coding, so Claude only gets the hard part* — Abhinav Raj, 21/11/2026
- Link: https://www.xda-developers.com/opencode-and-a-local-llm-handle-the-boring-80-of-my-coding-so-claude-only-gets-the-hard-part/
- Tóm tắt: Tác giả chia việc theo tỷ lệ 80-20 để tiết kiệm token: Claude Code (Opus 5.5) chỉ viết đặc tả kế hoạch chi tiết (393 dòng cho một game block-breaker trong chưa đầy 2 phút) và dự báo điểm nghẽn kỹ thuật; 80% còn lại (UI, menu, cài đặt, test) giao cho harness mã nguồn mở OpenCode + Qwen3.6-35B-A3B chạy cục bộ trên RTX 4070 Ti Super qua llama.cpp. Nhờ kế hoạch chặt, model cục bộ làm đúng phần nền, còn model đám mây giữ sức cho các lỗi hóc búa.

### 2. Thay Lovable, Replit và Claude Design bằng app builder mã nguồn mở miễn phí
- Tiêu đề gốc: *I replaced Lovable, Replit, and Claude Design with a free open-source app builder, and it's better in every way* — Nolen Jonker, 22/11/2026
- Link: https://www.xda-developers.com/replacing-lovable-replit-claude-design-with-free-open-source-app-builder/
- Tóm tắt: Trong khi Lovable/Replit/Claude Design tính phí thuê bao theo độ phức tạp, công cụ mã nguồn mở Craft Anything chạy local và miễn phí. Nó tự phát hiện các agent lập trình có sẵn trên máy (Claude Code, Codex, hoặc LLM cục bộ) thay vì đẩy dữ liệu lên server bên thứ ba. Người dùng chỉ cần trỏ vào một trang/ứng dụng mẫu, hệ thống chạy quy trình "clean-room build": nghiên cứu cấu trúc, tái tạo mã nguồn từ đầu, đo độ tương đồng trực quan. Toàn bộ mã thuộc về người dùng, không giới hạn số tác vụ mỗi tháng.

### 3. Dùng Claude debloat chiếc Android TV 6 năm tuổi
- Tiêu đề gốc: *I used Claude to debloat my 6-year-old Android TV, finally fixing what Google broke* — Tanveer Singh, 21/11/2026
- Link: https://www.xda-developers.com/i-used-claude-to-debloat-old-android-tv/
- Tóm tắt: Chiếc Hisense Android TV 2020 của tác giả chậm dần vì phần cứng yếu phải gánh bloatware và quảng cáo. Tác giả dùng prompt mẫu từ dự án dọn Android TV của Mert Cobanov + Claude Code qua ADB: Claude quét danh sách package, phân loại, xin xác nhận rồi gỡ 33 gói bloatware mà không làm hỏng hệ thống. Sau đó Claude cài launcher mã nguồn mở FLauncher siêu nhẹ — TV mượt trở lại, hết quảng cáo.

### 4. Proxmox mặc định lãng phí điện và dung lượng đĩa — một lần dọn giải quyết cả hai
- Tiêu đề gốc: *Proxmox ships with settings that waste power and disk space, and one cleanup fixes both* — Ty Sherback, 21/11/2026
- Link: https://www.xda-developers.com/proxmox-ships-with-settings-that-quietly-waste-power-and-disk-space-and-one-cleanup-fixes-both/
- Tóm tắt: Proxmox VE mặc định cấu hình cho datacenter nên lãng phí khi chạy homelab. Về điện: CPU governor mặc định `performance` giữ xung cao liên tục — chuyển sang `powersave` (intel_pstate/amd-pstate) hoặc `schedutil` và bật ASPM cho PCIe giúp giảm nhiệt và điện. Về đĩa: LVM thin pool không tự thu hồi block khi VM/LXC xoá tệp, dần làm đầy ổ và giảm tuổi thọ SSD — bật `Discard` cho từng ổ ảo và đặt lịch `fstrim` định kỳ để trả dung lượng về pool.

### 5. Claude Code hooks — tính năng bị đánh giá thấp, giúp model không lặp lại lỗi cũ
- Tiêu đề gốc: *Claude Code's hooks are its most underrated feature, and they stopped it from making the same mistakes twice* — Anurag Singh, 21/11/2026
- Link: https://www.xda-developers.com/claude-code-hooks-underrated-feature-stopped-making-same-mistakes-twice/
- Tóm tắt: `CLAUDE.md` hay `mistakes.md` chỉ là ngữ cảnh, model vẫn có thể bỏ qua quy tắc. Hooks gắn lệnh kiểm tra cưỡng chế vào từng sự kiện trong vòng đời Claude Code: `PreToolUse` chặn sửa file cấu hình được bảo vệ, `PostToolUse` tự chạy linter/formatter/unit test ngay sau khi code đổi, `Stop`/`TaskCompleted` bắt buộc thoả tiêu chuẩn chất lượng trước khi kết thúc phiên — thậm chí gọi webhook tới n8n để mở rộng automation.

---

# [3] Hacker News — top 3 theo điểm

### 1. "Hurried Announcement: Alessandro Masullo GRH" — 2388 điểm · 1160 bình luận
- Link: https://math216.wordpress.com/2026/11/20/hurried-announcement-alessandro-masullo-grh/
- Tóm tắt: GS. Ravi Vakil (Stanford) đăng vội thông báo giữa cuộc họp Hội Toán học Hoa Kỳ rằng Alessandro Masullo có một chứng minh đề xuất cho Giả thuyết Riemann tổng quát (GRH). Brian Conrad đã kiểm tra kỹ nhiều tháng và phản hồi đang được đưa vào bản thảo; Vakil nhấn mạnh công trình **hoàn toàn do con người, không có AI**, và đăng bản nháp PDF *The Music of the Primes* sớm hơn kế hoạch để cộng đồng kiểm tra và hình thức hóa. Bài nhận điểm cao nhất front page, phản ánh mức độ quan tâm cực lớn của giới toán học.

### 2. "Lean verification of the Riemann Hypothesis" — 807 điểm · 647 bình luận
- Link: https://leanprover-community.github.io/blog/posts/riemann-hypothesis/
- Tóm tắt: Tuyên bố chung của cộng đồng Lean và Mathlib (được Lean FRO và Mathlib Initiative bảo trợ) xác nhận chứng minh Giả thuyết Riemann của Levent Alpöge — thư viện Lean 17 triệu dòng công bố ngày 20/11/2026 — là đúng. Cả 4 tiêu chí kiểm định đều đạt: phát biểu khớp `RiemannHypothesis` của Mathlib, code biên dịch sạch và tái lập được, phát biểu được so khớp bằng hai công cụ độc lập, và chứng minh thô vượt qua kernel chính thức của Lean cùng các checker `con-leche`/`con-ron` (bản thân các checker này có chứng minh hình thức rằng chúng không thể chấp nhận chứng minh sai).

### 3. "Brazil's tax authority open-sources its tax calculator on GitHub under MIT" — 737 điểm · 237 bình luận
- Link: https://www.gov.br/receitafederal/pt-br/assuntos/noticias/2026/novembro/receita-federal-publica-primeiro-codigo-fonte-aberto-no-github-e-amplia-transparencia-da-reforma-tributaria
- Tóm tắt: Receita Federal (cơ quan thuế Brazil) lần đầu công bố mã nguồn một dự án phần mềm chính thức trên GitHub, theo giấy phép MIT: Calculadora de Tributos — công cụ tính thuế của cải cách thuế tiêu thụ (CBS), được chính thức hoá bằng Portaria Cotec nº 342 ngày 12/11/2026. Doanh nghiệp và hãng phần mềm có thể nhúng đúng logic tính thuế mà cơ quan thuế dùng, kèm memory tính toán và căn cứ pháp lý; ba repo được mở (regime regular, Simples Nacional, generator DANFSe). Sáng kiến gắn với mô hình "Administração Tributária 3.0" của OECD.

> Ghi chú: hai bài đầu là hai mảnh của cùng một sự kiện toán học lớn trong tuần — chứng minh RH được hình thức hóa và kiểm chứng tự động (Alpöge/Lean) và chứng minh GRH thuần con người đang chờ cộng đồng kiểm tra (Masullo).

---

# [4] GitHub trending — top 3 hôm nay

### 1. [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)
- Mô tả: Bộ skill cho Claude Code phục vụ bug hunting và red-team: 82 skill, 15 slash command, 681 mẫu báo cáo đã công bố thuộc 24 nhóm lỗ hổng cốt lõi, kèm ma trận tấn công identity/infrastructure doanh nghiệp.
- Ngôn ngữ: Python · Tổng sao: 16.074 · Sao hôm nay: +1.803 · Forks: 1.830

### 2. [obra/superpowers](https://github.com/obra/superpowers)
- Mô tả: Framework skill cho agent + phương pháp luận phát triển phần mềm "hoạt động được trên thực tế".
- Ngôn ngữ: Shell · Tổng sao: 323.731 · Sao hôm nay: +883 · Forks: 28.714

### 3. [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything)
- Mô tả: "CLI-Anything: Making ALL Software Agent-Native" — biến mọi phần mềm thành công cụ agent dùng được qua CLI (CLI-Hub: https://clianything.cc/).
- Ngôn ngữ: Python · Tổng sao: 62.080 · Sao hôm nay: +769 · Forks: 5.633

---

*Bản tin tạo tự động lúc 08:00 ngày 22/11/2026 (UTC+7). Phần 1–2 do AGY (Gemini 3.8 Flash Medium) thu thập và viết; phần 3–4 lấy trực tiếp từ Hacker News và GitHub trending qua OpenCLI.*