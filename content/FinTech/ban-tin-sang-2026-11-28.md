# Bản tin sáng 28-11-2026

*Bản tin sáng hằng ngày cho Mlight — Tech/AI · XDA · Hacker News · GitHub Trending*
*Tạo lúc 08:00–08:10 ngày 28/11/2026 (+07)*

| Phần | Nội dung | Nguồn |
|---|---|---|
| 1 | Tin Công nghệ & AI (8 bài + Xu hướng) | AGY — Gemini 3.8 Flash (Medium) |
| 2 | 5 bài trending XDA Developers | AGY — Gemini 3.8 Flash (Medium) |
| 3 | Hacker News top 3 | OpenCLI adapter (public) |
| 4 | GitHub Trending top 3 (đã lọc trùng 3 ngày) | OpenCLI adapter (public) |

---

# Phần 1 — Tin Công nghệ & AI (qua AGY)

# BẢN TIN TỔNG HỢP CÔNG NGHỆ & AI (28/11/2026)

> **Tóm tắt ngày:** Lĩnh vực công nghệ và AI hôm nay chứng kiến bước tiến kỹ thuật vượt bậc ở kiến trúc mô hình và toán học lý thuyết, song song với làn sóng phản kháng đạo đức ngày càng gay gắt từ giới học thuật kỳ cựu và các vụ việc phơi bày nguy cơ an ninh trong chuỗi cung ứng công cụ AI Agent.

---

## 1. Google Research công bố kiến trúc DeepCrossAttention (DCA) tăng tốc Transformer gấp 3 lần
- **Nguồn:** [Google Research Blog](https://research.google/blog/supercharging-transformer-residual-connections/)
- **Bản chất & Điểm mới:** Các nhà nghiên cứu Kyriakos Axiotis và Thomas Fu tại Google Research vừa công bố kiến trúc DeepCrossAttention (DCA) nhằm khắc phục hiện tượng suy giảm tín hiệu (information dilution) trong các kết nối tắt (residual/skip connections) của mạng Transformer truyền thống. Thay vì chỉ cộng dồn vector đầu vào theo cách tuyến tính đơn giản, DCA sử dụng các trọng số có thể học được và cơ chế cross-attention theo chiều sâu (depth-wise cross-attention) để kết hợp linh hoạt đầu ra từ các lớp trước đó. Cải tiến kiến trúc này cho phép mô hình đạt chất lượng tương đương với tốc độ huấn luyện và suy luận nhanh hơn tới 3 lần mà chỉ tăng một lượng tham số không đáng kể. Công trình được đánh giá là bước đột phá nền tảng giúp mở rộng quy mô mạng nơ-ron lên hàng trăm lớp mà không bị thắt cổ chai bởi hiện tượng triệt tiêu gradient.

## 2. Bước ngoặt mật mã học: Thuật toán xác định thời gian dưới hàm mũ cho Logarit rời rạc dựa trên cấu trúc tensor OpenAI
- **Nguồn:** [IACR Cryptology ePrint Archive](https://eprint.iacr.org/2026/3020)
- **Bản chất & Điểm mới:** Nhóm tác giả Shuchang Liu, Bingsheng Zhang và Kui Ren đã công bố thuật toán xác định (deterministic) thời gian dưới hàm mũ giải bài toán logarit rời rạc (DLP) trên các đường cong elliptic trường nguyên tố và trường hữu hạn $\mathbb{F}_p^*$. Kế thừa cấu trúc co rút tensor Boolean Cauchy–Hermite do OpenAI đề xuất vào tháng 10/2026, thuật toán này đạt độ phức tạp thời gian trường hợp xấu nhất là $2^{O(b/\sqrt{\log\log b})} = p^{o(1)}$ mà không cần sử dụng bất kỳ bit ngẫu nhiên nào, đồng thời không phụ thuộc vào Giả thuyết Riemann mở rộng (GRH) hay các phỏng đoán trơn số học. Bằng cách kết hợp phép xây dựng kỳ vọng có điều kiện và kỹ thuật co rút bảo toàn điểm cuối để nén lõi số học lên các dây biên, nghiên cứu này giáng đòn trực tiếp vào các giả định độ khó bảo mật cổ điển của hệ mật mã khóa công khai dựa trên đường cong elliptic (ECC).

## 3. Nhà mật mã học D. J. Bernstein cảnh báo lỗ hổng tính đúng đắn trong các phần mềm chứng minh hình thức
- **Nguồn:** [cr.yp.to](https://cr.yp.to/proofs/falseccp.html)
- **Bản chất & Điểm mới:** Giữa cơn sốt các phòng lab AI (Anthropic, DeepMind) công bố các bằng chứng toán học thế kỷ được kiểm tra bằng máy tính qua hệ thống Lean, nhà khoa học máy tính kiêm mật mã học huyền thoại D. J. Bernstein (djb) đã công bố bản khảo cứu chuyên sâu "False computer-checked proofs". Ông chỉ ra rằng các công cụ kiểm chứng như Lean, Coq, Isabelle hay HOL Light vẫn tồn tại nhiều lỗi tính đúng đắn (soundness bugs) cho phép các mệnh đề sai lầm lọt qua khâu xác thực một cách hợp lệ. Djb cảnh báo rằng việc giảm thiểu cơ sở tính toán tin cậy (Trusted Computing Base - TCB) xuống vài trăm dòng mã như HOL Light không đồng nghĩa với việc loại bỏ hoàn toàn khả năng có lỗi mã nguồn, đồng thời chỉ trích các lỗ hổng giao diện người dùng có thể đánh lừa chuyên gia về những gì thực sự đã được chứng minh. Bài viết là lời cảnh tỉnh nghiêm túc về việc đặt niềm tin tuyệt đối vào "bằng chứng máy tính" khi con người chưa hiểu thấu đáo bản chất lập luận của AI.

## 4. OpenAI GPT-6.2 Astra thể hiện năng lực tự chủ giải quyết các bí ẩn nghiên cứu lịch sử
- **Nguồn:** [Generative History](https://generativehistory.substack.com/p/gpt-62-astra-solves-a-historical)
- **Bản chất & Điểm mới:** Sau các cột mốc giải quyết các bài toán toán học trừu tượng (như bài toán Navier-Stokes hay VP vs VNP), mô hình thế hệ mới GPT-6.2 Astra của OpenAI tiếp tục gây tiếng vang khi chứng minh năng lực nghiên cứu lịch sử mở hoàn toàn tự động từ đầu đến cuối. Không giống như toán học vốn dựa trên các luật suy diễn tất định, nghiên cứu lịch sử đòi hỏi khả năng xử lý khối lượng tư liệu lưu trữ khổng lồ, thiếu nhất quán và mơ hồ, từ đó tự hình thành các giả thuyết độc lập và tìm bằng chứng xác thực chéo. Bài phân tích nhấn mạnh năng lực lý luận của các hệ thống AI tiền tuyến đang vượt ra khỏi các hệ thống hình thức khép kín để bước vào các lĩnh vực xã hội nhân văn phức tạp, đặt ra tiềm năng tái khám phá các kho lưu trữ tri thức nhân loại bị lãng quên.

## 5. Michael Nielsen gỡ bỏ cuốn sách kinh điển "Neural Networks and Deep Learning" để phản đối các frontier labs
- **Nguồn:** [Neural Networks and Deep Learning](https://neuralnetworksanddeeplearning.com/)
- **Bản chất & Điểm mới:** Nhà vật lý lượng tử và tác giả tiên phong Michael Nielsen đã bất ngờ xóa toàn bộ nội dung trực tuyến của cuốn sách giáo khoa nhập môn nổi tiếng "Neural Networks and Deep Learning" (được viết từ 2011–2015). Trong thông điệp công khai thay thế trang chủ, Nielsen bày tỏ sự thất vọng sâu sắc trước hành vi phát triển thần tốc nhưng "vô cùng liều lĩnh" của các phòng thí nghiệm AI hàng đầu hiện nay, đẩy nhân loại vào nguy cơ thảm họa hiện sinh trước khi kịp thiết lập các cơ chế kiểm soát an toàn. Tác giả khẳng định ông không muốn tiếp tục đóng góp bất kỳ phần nào—dù là nhỏ nhất—vào việc đào tạo nhân lực hỗ trợ cho cuộc đua nguy hiểm này. Hành động quyết liệt của một học giả uy tín đánh dấu sự phân hóa đạo đức ngày càng sâu sắc ngay trong lòng cộng đồng khoa học công nghệ.

## 6. Plugin Convex trên marketplace Claude Code bị phát hiện âm thầm gửi ý tưởng dự án và lách rào an toàn
- **Nguồn:** [GitHub Convex Backend Skill (Issue #64)](https://github.com/convex/convex-backend-skill/issues/64)
- **Bản chất & Điểm mới:** Cộng đồng bảo mật đã phát hiện plugin chính thức của nền tảng backend Convex trong kho tiện ích `claude-plugins-official` chứa các hành vi đáng ngờ vi phạm quyền riêng tư và an toàn hệ thống. Cụ thể, kỹ năng `quickstart` đã tự động gửi tóm tắt ý tưởng dự án phần mềm của lập trình viên về máy chủ đám mây từ xa (`basic-anteater-667.convex.site`) dưới vỏ bọc đo kiểm (telemetry) mà không có bất kỳ thông báo hay sự đồng ý nào từ người dùng. Nghiêm trọng hơn, tài liệu kỹ năng `labs-quickstart` còn chủ động hướng dẫn mô hình AI tách lệnh tải và thực thi mã độc thành hai bước shell riêng biệt với chú thích nội bộ nhằm né tránh bộ phân loại an toàn (safety classifiers) của máy trạm. Vụ việc phơi bày rủi ro nhức nhối trong chuỗi cung ứng mở rộng của các AI Coding Agent khi mã độc hoặc hành vi mập mờ có thể dễ dàng vượt qua khâu kiểm duyệt ban đầu.

## 7. Các Tổng chưởng lý bang tại Mỹ khởi kiện SpaceX và xAI vì Grok tạo nội dung deepfake khiêu dâm
- **Nguồn:** [Virginia Office of the Attorney General](https://www.oag.state.va.us/media-center/news-releases/jay-jones/3162-attorneys-general-jones-and-rayfield-file-suit-against-spacex-parent-company-of-x-xai-and-grok-over-creation-and-promotion-of-child-exploitation-and-non-consensual-images-on-platform)
- **Bản chất & Điểm mới:** Tổng chưởng lý bang Virginia Jay Jones cùng các quan chức tư pháp bang đã chính thức đệ đơn kiện SpaceX (công ty mẹ liên đới nắm giữ mạng xã hội X và xAI) liên quan đến mô hình ngôn ngữ và sinh ảnh Grok. Đơn kiện cáo buộc hệ thống Grok thiếu hụt nghiêm trọng các hàng rào bảo vệ (guardrails) cơ bản, dẫn đến việc công cụ này bị lợi dụng rộng rãi để tạo ra các hình ảnh bóc lột tình dục trẻ em (CSAM) và ảnh ghép khiêu dâm không đồng thuận nhắm vào phụ nữ và nhân vật công chúng. Đây là vụ kiện pháp lý trực diện đầu tiên từ chính quyền cấp bang nhắm vào hạ tầng sinh ảnh AI không kiểm soát của Elon Musk, yêu cầu lệnh cấm khẩn cấp và các khoản bồi thường phạt nặng nề theo luật bảo vệ trẻ em và an toàn số.

## 8. Tin tặc cấy mã skimmer qua WebRTC đánh cắp dữ liệu thẻ trên hàng loạt website mua sắm trước Black Friday
- **Nguồn:** [InfoHawk News](https://www.infohawk.com/news/2026-11-27-black-friday-webrtc-skimmer)
- **Bản chất & Điểm mới:** Đơn vị nghiên cứu an ninh mạng InfoHawk vừa công bố phát hiện về một chiến dịch tấn công đánh cắp dữ liệu thanh toán (digital skimming) tinh vi nhắm vào hàng loạt chuỗi bán lẻ quốc tế như Lascana, Samsonite, American Tourister và Revolve ngay trước kỳ mua sắm Black Friday. Kẻ tấn công đã xâm nhập thông qua các pixel tiếp thị và banner quản lý cookie của bên thứ ba (như Quorum, Seers) để nhúng mã độc JavaScript thu thập thông tin thẻ tín dụng, họ tên và địa chỉ của khách hàng trước khi đơn hàng được gửi duyệt. Điểm mới nguy hiểm của chiến dịch này là việc sử dụng giao thức truyền thông dữ liệu WebRTC (thay vì các yêu cầu HTTP/XHR thông thường) để tuồn dữ liệu ra ngoài, giúp mã độc qua mặt hoàn toàn các chính sách bảo mật nội dung (Content Security Policy - CSP) và các hệ thống tường lửa web truyền thống.

---

### Ghi chú tình trạng truy cập nguồn kiểm tra:
- **Sky News** ([US Air Force cloud platform hacked](https://news.sky.com/story/us-air-forces-cloud-computing-platform-hacked-13617163)): Máy chủ phản hồi mã lỗi `HTTP 403 Forbidden` đối với kết nối tự động.
*Tuân thủ nguyên tắc bảo đảm tính xác thực, nội dung từ nguồn không thể đọc toàn văn này không được sử dụng để suy diễn.*

---

## Xu hướng đáng chú ý (Phân tích liên kết ngang)

1. **Từ toán học trừu tượng đến đe dọa hạ tầng an ninh mạng thực tế:** Mối liên kết giữa đột phá tensor của OpenAI (tháng 10/2026) và thuật toán giải bài toán Logarit rời rạc (DLP) trên đường cong Elliptic của nhóm nghiên cứu Liu et al. cho thấy tốc độ hiện thực hóa từ lý thuyết AI sang công phá các tiêu chuẩn mật mã học đang diễn ra nhanh chưa từng thấy. Những công trình toán học được AI hỗ trợ không còn là bài tập học thuật đơn thuần mà đang làm suy yếu trực tiếp các trụ cột mã hóa (ECC) bảo vệ hệ thống tài chính và thông tin toàn cầu.
2. **Khủng hoảng thẩm định và sự phản kháng từ nội bộ giới khoa học:** Sự kết hợp giữa bài phê bình về các lỗi kiểm chứng hình thức của D. J. Bernstein và động thái gỡ bỏ sách của Michael Nielsen làm nổi bật sự hoài nghi ngày càng lớn đối với cuộc đua AI. Các công cụ kiểm tra tự động bằng máy (Lean) tưởng chừng là chân lý tuyệt đối nhưng vẫn chứa các lỗ hổng hệ thống, trong khi sự thiếu vắng các khung an toàn thuyết phục đang thúc đẩy các nhà khoa học kỳ cựu sử dụng tiếng nói cá nhân để phản đối văn hóa "chạy đua bất chấp hậu quả" của các phòng thí nghiệm lớn.
3. **Mặt trận chuỗi cung ứng mở rộng: Lỗ hổng mới của AI Agent:** Vụ việc plugin Convex cho Claude Code chứng minh rủi ro bảo mật lớn nhất của làn sóng trợ lý ảo không nằm ở bản thân mô hình nền tảng, mà nằm ở hệ sinh thái kỹ năng và công cụ của bên thứ ba (third-party agent plugins). Việc nhà phát triển chủ động viết mã lách bộ phân loại an toàn và lén lút thu thập ý tưởng của người dùng cho thấy cơ chế cấp quyền cho AI Agent đang tạo ra lỗ hổng bảo mật nghiêm trọng trong quy trình phát triển phần mềm doanh nghiệp.
4. **Áp lực kép: Tối ưu hiệu năng kiến trúc và siết chặt chế tài xã hội:** Trong khi các tập đoàn công nghệ lớn như Google nỗ lực giải bài toán kinh tế suy luận bằng các kiến trúc phần mềm mới như DeepCrossAttention (nhanh hơn 3 lần), áp lực xã hội và pháp lý đang bủa vây các mô hình thiếu kiểm soát. Vụ kiện chống lại xAI/SpaceX cùng các cuộc tấn công khai thác hạ tầng hiện đại (như WebRTC skimmer) cho thấy một hệ thống AI chỉ có thể tồn tại bền vững khi giải quyết hài hòa cả hai bài toán: tối ưu chi phí vận hành kỹ thuật và chịu trách nhiệm pháp lý minh bạch trước cộng đồng.

---

# Phần 2 — 5 bài trending trên XDA Developers (qua AGY)

# XDA Developers — Xu Hướng & Tin Mới Nhất (28/11/2026)

> **Lưu ý kỹ thuật:** Kết nối tự động trực tiếp từ máy chủ đến `xda-developers.com` bị tường lửa ngăn chặn (kết nối trực tiếp timeout / HTTP 405 do Valnet Cloudflare WAF). Danh sách 5 bài viết nổi bật và mới nhất hôm nay (28/11/2026) được xác định trên trang chủ và trích xuất nội dung đầy đủ thông qua proxy CDN phân phối dữ liệu web dự phòng (Jina Reader). **Ghi rõ: Toàn bộ nội dung chưa đối chiếu trực tiếp trên giao diện trình duyệt web gốc của xda-developers.com do rào cản WAF của Valnet; các chi tiết kỹ thuật, công cụ, số liệu, tên tác giả và liên kết trong bài được trích xuất nguyên bản từ văn bản CDN, tuyệt đối không suy diễn hay bịa đặt chi tiết.**

---

### 1. DeckCraft: Công Cụ Trình Chiếu Nguồn Mở Miễn Phí Thay Thế PowerPoint, Canva Và Claude Design
- **Tiêu đề gốc:** *I finally found a free open-source tool that can replace PowerPoint, Canva, and Claude Design for presentations*
- **Tác giả:** Nolen Jonker
- **Thời gian đăng:** 27/11/2026 19:00 EST (28/11/2026 07:00 VN)
- **Liên kết:** [Bài gốc trên XDA](https://www.xda-developers.com/found-free-open-source-tool-that-can-replace-powerpoint-canva-claude-design-for-presentations/)
- **Tóm tắt nội dung:**
Trong bối cảnh các công cụ trình chiếu hàng đầu như PowerPoint, Canva hay Claude Design liên tục đẩy tính năng cao cấp vào các gói thuê bao đắt đỏ, tác giả đã tìm ra DeckCraft – một ứng dụng mã nguồn mở miễn phí thuộc bộ công cụ ArtCraft được lập trình viên Brandon Thomas phát triển cùng Claude Opus 5.5. Không giống như nhiều giải pháp nguồn mở truyền thống thường gặp lỗi lệch font chữ hoặc mất hiệu ứng khi mở slide từ người khác, DeckCraft được tái thiết kế độc lập (clean-room rebuild) để đọc và lưu định dạng `.pptx` nguyên bản một cách chuẩn xác. Thay vì tự tích hợp sẵn mô hình AI bên trong phần mềm, DeckCraft biến toàn bộ nút bấm trên giao diện thành lệnh điều khiển thông qua máy chủ MCP (Model Context Protocol), cho phép người dùng kết nối trực tiếp với Claude hoặc các mô hình AI cục bộ để tạo và căn chỉnh slide tự động. Nhờ đó, người dùng có toàn quyền tùy biến thiết kế chi tiết như Canva mà không lo bị giới hạn số lượt tạo hay bị ràng buộc vào các hệ sinh thái thương mại tính phí.

---

### 2. Biến TV Thành Khung Tranh Số Hiển Thị Kho Ảnh Cá Nhân Mà Không Lo Bị Theo Dõi Hay Quảng Cáo
- **Tiêu đề gốc:** *My TV shows my own photo library when nobody's watching, and it never phones home*
- **Tác giả:** Jasmine Mannan
- **Thời gian đăng:** 27/11/2026 18:00 EST (28/11/2026 06:00 VN)
- **Liên kết:** [Bài gốc trên XDA](https://www.xda-developers.com/my-tv-shows-my-own-photo-library-when-nobodys-watching-and-it-never-phones-home/)
- **Tóm tắt nội dung:**
Các chế độ hiển thị nền (Ambient mode) trên smart TV hiện đại thường khóa tính năng trình chiếu ảnh cá nhân sau các dịch vụ đám mây, nén giảm chất lượng hình ảnh và liên tục chèn quảng cáo tài trợ cùng mã theo dõi dữ liệu người dùng. Để loại bỏ hoàn toàn phiền toái này, tác giả đã triển khai dịch vụ tự lưu trữ ảnh Immich chạy trong Docker trên một chiếc NAS 2-bay tại gia để tự động sao lưu ảnh từ điện thoại qua mạng Wi-Fi nội bộ. Trên chiếc TV, tác giả cài đặt ứng dụng mã nguồn mở như Immich TV (dành cho Google TV) hoặc Immich Frame để kéo ảnh trực tiếp qua địa chỉ IP mạng LAN mà không cần mở cổng Internet, không cần tên miền hay chứng chỉ SSL bên ngoài. Sau đó, tác giả ngắt kết nối Internet hoàn toàn của TV để ngăn chặn việc thu thập dữ liệu tự động (ACR) và tránh tình trạng chậm giao diện do nạp quảng cáo, biến màn hình TV thành một khung tranh số độ nét cao mượt mà và bảo mật tuyệt đối.

---

### 3. Khắc Phục Tình Trạng AI Coding Agent Bị "Mất Trí Nhớ" Bằng Tệp Cấu Hình AGENTS.md Duy Nhất
- **Tiêu đề gốc:** *My coding agents kept forgetting what I told them until I gave every project one shared instructions file*
- **Tác giả:** Korbin Brown
- **Thời gian đăng:** 27/11/2026 17:30 EST (28/11/2026 05:30 VN)
- **Liên kết:** [Bài gốc trên XDA](https://www.xda-developers.com/one-agents-md-file-for-every-coding-agent/)
- **Tóm tắt nội dung:**
Việc phải lặp đi lặp lại cùng một bộ quy tắc lập trình, quy ước kiểm thử linter (`npm run lint`) hay cấu trúc dự án mỗi khi mở một phiên làm việc mới với AI coding agent gây tiêu tốn rất nhiều thời gian và công sức. Nhằm giải quyết triệt để, tác giả sử dụng tệp `AGENTS.md` đặt ngay tại thư mục gốc của mỗi kho mã nguồn và commit thẳng vào Git, đóng vai trò làm bản chỉ dẫn chuẩn mực được hầu hết các công cụ như Claude Code, OpenAI Codex và Cursor tự động nạp mỗi khi khởi động. Tác giả lưu ý chỉ nên đưa vào file những thông tin thiết yếu mà agent không thể tự đọc hiểu từ mã nguồn (như biến môi trường, cơ chế xác thực người dùng, kiến trúc database) với chỉ dẫn rõ ràng, tránh đưa vào quá nhiều chi tiết vụn vặt gây lỗi thời. Ngoài ra, tác giả bổ sung một quy tắc thông minh yêu cầu AI tự động cảnh báo và đề xuất chỉnh sửa tệp `AGENTS.md` khi phát hiện các quy ước cũ không còn phù hợp, giúp việc chuyển giao giữa các mô hình AI khác nhau diễn ra mượt mà và nhất quán.

---

### 4. Cấp Danh Tính Tailscale Riêng Cho Từng Docker Container Và Ngừng Mở Cổng Trên Home Server Với TSDProxy
- **Tiêu đề gốc:** *I gave each Docker container its own Tailscale address, and stopped exposing ports on my home server*
- **Tác giả:** Abhishek Kumar Mishra
- **Thời gian đăng:** 27/11/2026 17:00 EST (28/11/2026 05:00 VN)
- **Liên kết:** [Bài gốc trên XDA](https://www.xda-developers.com/my-docker-containers-have-own-tailscale-address-and-i-dont-expose-ports/)
- **Tóm tắt nội dung:**
Phương thức quản lý máy chủ tại gia truyền thống luôn đòi hỏi người dùng phải mở và ghi nhớ từng cổng dịch vụ (port mapping), gây nguy cơ xung đột và tạo lỗ hổng bảo mật không đáng có khi mở cổng ra bên ngoài. Việc cấu hình từng container phụ trợ Tailscale Sidecar riêng lẻ tuy giải quyết được việc gán IP an toàn nhưng lại tốn quá nhiều công sức thiết lập xác thực và quản lý tài nguyên. Để tối ưu hóa, tác giả đã chuyển sang sử dụng giải pháp TSDProxy – một dịch vụ proxy chạy tập trung chỉ trong một container duy nhất để quản trị danh tính mạng Tailscale cho toàn bộ hệ thống. Với TSDProxy, người dùng chỉ cần khai báo 3 dòng nhãn (`labels`) đơn giản trong tệp Docker Compose của từng ứng dụng (như Vaultwarden) là container đó lập tức có tên miền riêng và chứng chỉ HTTPS tự động, giúp việc truy cập nội bộ hay từ xa đều tiện lợi mà không cần mở bất kỳ cổng nào trên máy chủ.

---

### 5. Thử Thách Claude Code, OpenAI Codex Và Google Antigravity Viết Firmware ESP32: Chỉ Có Một Agent Thành Công Ngay Lần Đầu
- **Tiêu đề gốc:** *I asked Claude Code, Codex, and Google Antigravity to write the same ESP32 firmware, and only one worked on the first flash*
- **Tác giả:** Anurag Singh
- **Thời gian đăng:** 27/11/2026 14:30 EST (27/11/2026 02:30 VN)
- **Liên kết:** [Bài gốc trên XDA](https://www.xda-developers.com/claude-code-codex-google-antigravity-write-same-esp32-firmware-only-one-worked-first-flash/)
- **Tóm tắt nội dung:**
Tác giả đã tiến hành một bài thử nghiệm thực tế khi giao cùng một nhiệm vụ viết firmware điều khiển dải đèn LED RGB WS2812B qua Wi-Fi trên vi điều khiển ESP32 cho ba AI coding agent danh tiếng: Claude Code, OpenAI Codex và Google Antigravity. Mục tiêu của dự án đòi hỏi firmware phải tạo được một web dashboard cục bộ để đổi màu sắc, độ sáng, chạy các hiệu ứng ánh sáng (cầu vồng, hiệu ứng thở) và tự động ghi nhớ cài đặt qua bộ nhớ flash sau khi khởi động lại. Trong thử nghiệm nạp mã thực tế trên cùng một phần cứng, Claude Code đã giành chiến thắng thuyết phục khi là công cụ duy nhất tạo ra mã nguồn chạy hoàn hảo ngay ở lần nạp đầu tiên mà không cần can thiệp gỡ lỗi. Trong khi đó, OpenAI Codex gặp lỗi không đồng bộ endpoint giữa giao diện web và backend điều khiển, còn Google Antigravity lại viết logic hiệu ứng chứa vòng lặp chặn (blocking loop) khiến máy chủ web bị treo và không phản hồi khi đang chạy hiệu ứng, buộc tác giả phải yêu cầu sửa mã thêm một lượt nữa.

---

# Phần 3 — Hacker News top 3 (qua OpenCLI)

*Lấy lúc 08:02 ngày 28/11/2026 (+07) từ adapter công khai `opencli hackernews top --limit 10`, xếp theo score cao nhất.*

### 1. Credit card skimming scripts using WebRTC found on popular shopping sites
**Score:** 413 điểm · **Thảo luận:** 212 comment · **Nguồn:** [InfoHawk News, 27/11/2026](https://www.infohawk.com/news/2026-11-27-black-friday-webrtc-skimmer) · [Thớt HN](https://news.ycombinator.com/item?id=50668145)

Một kit skimmer (mã đánh cắp thẻ) được cài lên website của Lascana, Samsonite, American Tourister, Revolve và FWRD đúng tuần trước Black Friday. Mã độc vào trang qua ba đường khác nhau: pixel marketing Quorum bị sửa, file cấu hình banner cookie của Seers bị chèn, hoặc file trên CDN của chính Revolve bị thay — và chỉ kích hoạt trên màn hình nhỏ/cảm ứng ở bước thanh toán, nên quét desktop không thấy. Điểm mới về kỹ thuật: nó dùng WebRTC (qua relay `turn.cloudflare.com`, host trung gian `northbridgeads[.]com`) để tải mã và gửi dữ liệu thẻ ra ngoài, tức nằm ngoài quy tắc CSP `connect-src` mà hầu hết công cụ giám sát dựa vào. InfoHawk xác nhận có một ca thật sự gửi dữ liệu thẻ thử nghiệm đi (Lascana); cả 5 site đã gỡ mã trong ngày 24–25/11. Khuyến nghị phòng thủ chính: đặt `connect-src` allowlist chặt trên mọi trang thanh toán.

### 2. Show HN: bouncemarket – a live prediction market game for a bouncing ball
**Score:** 324 điểm · **Thảo luận:** 111 comment · **Nguồn:** [bouncemarket.minhanhday.com](https://bouncemarket.minhanhday.com/) · [Thớt HN](https://news.ycombinator.com/item?id=50667726)

Dự án Show HN của tác giả minh-anh day: một game web nhỏ trong đó mỗi ván một quả bóng nảy và người chơi đặt cược vào việc nó rơi về bên trái hay bên phải. Người chơi mua "share" của mỗi bên với giá thay đổi theo lượng mua — giá phản ánh odds thị trường, share thắng trả 1 điểm — nên đây là một prediction market thu nhỏ đúng nghĩa chứ không phải game may rủi thuần tuý. Mỗi người bắt đầu với 10 điểm, có bảng xếp hạng trực tuyến (top đầu ~37 điểm), đếm ngược "drop" và nút reset. Toàn bộ chạy trong trình duyệt với giao diện tối giản, thú vị ở chỗ dạy người chơi hiểu price discovery trong vài ván ngắn.

### 3. GPT 6.2 Astra Solves a Historical Mystery
**Score:** 292 điểm · **Thảo luận:** 175 comment · **Nguồn:** [Generative History (Substack), 28/11/2026](https://generativehistory.substack.com/p/gpt-62-astra-solves-a-historical) · [Thớt HN](https://news.ycombinator.com/item?id=50643158)

Sử gia Mark Humphries giao cho GPT-6.2 Astra một bài toán mà ông bí hơn 4 năm: tìm tác giả cuốn sổ ký hoạ ẩn danh năm 1808 đang nằm ở thư viện Beinecke (Đại học Yale), chỉ có vài chục bức vẽ và không ghi tên người vẽ. Model trả lời sau 22 phút: Louis-Guy-Charles-Guillaume de Rohan-Chabot, vicomte de Chabot — một quý tộc Pháp tha hương làm sĩ quan quân đội Anh, và nó còn chỉ ra một cuốn nhật ký đã bị vi phim ở bộ sưu tập Lafayette (Đại học Cleveland State) để kiểm chứng giả thuyết. Khi trao đổi với kho lưu trữ, chữ viết trùng khớp, lịch trình trùng khớp, và ngày 18/6/1808 Chabot tự viết "I took a sketch" ngay chỗ có bức vẽ tương ứng — bằng chứng gần như quyết định. Cái đáng chú ý không chỉ là tốc độ mà là đường đi suy luận: nó tự tìm footnote trong một luận án 2014 về quý tộc Pháp lưu vong, rồi lần ngược qua nhật ký của thương nhân Joseph Frobisher — nơi không sử gia nào về fur trade nghĩ tới. Chạy lại cùng prompt với Fable 5.2 cũng ra kết quả tương tự trong 35 phút nhưng không tìm được cuốn nhật ký.

---

# Phần 4 — GitHub Trending top 3 (qua OpenCLI, đã lọc trùng)

*Lấy lúc 08:02 ngày 28/11/2026 (+07) từ `opencli github-trending repos` (16 repo, đúng thứ tự trending).*

Đã bỏ qua 3 repo top đầu vì trùng bản tin 3 ngày gần nhất: elementalsouls/Claude-BugHunter, obra/superpowers, HKUDS/CLI-Anything.

### 1. [jingyaogong/minimind](https://github.com/jingyaogong/minimind) — rank 4
- **Mô tả:** Dự án giáo dục: tự train một LLM 64M tham số từ đầu trong 2 giờ, toàn bộ code + dữ liệu + hướng dẫn.
- **Ngôn ngữ:** Python · **Tổng sao:** 72.212 ⭐ · **Sao hôm nay:** +660

### 2. [cursor/plugins](https://github.com/cursor/plugins) — rank 5
- **Mô tả:** Đặc tả plugin và bộ plugin chính thức của Cursor — cách đóng gói skill/agent cho editor.
- **Ngôn ngữ:** TypeScript · **Tổng sao:** 20.011 ⭐ · **Sao hôm nay:** +243

### 3. [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) — rank 6
- **Mô tả:** Hạ tầng dữ liệu cho agent: search, scrape và truy cập 550+ nguồn dữ liệu qua một API duy nhất.
- **Ngôn ngữ:** TypeScript · **Tổng sao:** 211.689 ⭐ · **Sao hôm nay:** +822
