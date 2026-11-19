# Bản tin sáng 2026-11-19

> Tổng hợp tự động: Tin Tech/AI (AGY), XDA trending (AGY), Hacker News top 3 và GitHub trending top 3 (opencli).

---

## [1] Tin Công nghệ & AI

> **Tổng quan hôm nay:** Ngày 19/11/2026 chứng kiến những cột mốc lịch sử khi Anthropic chính thức định giá đợt phát hành IPO kỷ lục để niêm yết trên sàn Nasdaq (mã ANT) và Google tung ra mô hình biên giới Gemini 4 Neon với giá cache giảm sâu 95%; cùng lúc đó, làn sóng AI rà soát lỗ hổng tiếp tục gây chấn động hạ tầng Internet toàn cầu với việc công bố 2 lỗ hổng RCE nghiêm trọng trong NGINX tồn tại suốt 10 năm qua, trong khi OpenAI và các viện nghiên cứu hàng đầu công bố những bước nhảy vọt về việc dùng AI thiết kế chip bán dẫn và kiến trúc suy luận năng lượng siêu tiết kiệm.

---

## 1. Google Ra Mắt Gemini 4 Neon: Mô Hình Biên Giới Tối Ưu Tác Vụ Đa Bước Với Giá Cache Ngữ Cảnh Giảm Sâu 95%
- **Tóm tắt:** Phó Chủ tịch Google DeepMind kiêm Kiến trúc sư trưởng AI của Google, ông Koray Kavukcuoglu, đã chính thức công bố phát hành mô hình Gemini 4 Neon trên nền tảng Gemini API (Google AI Studio, Vertex AI) và Google Workspace. Gemini 4 Neon được thiết kế nhằm đạt trí tuệ cấp biên giới (frontier intelligence) với tốc độ thực thi nhanh vượt trội cho các quy trình kỹ thuật phần mềm phức tạp, công việc tri thức và nghiên cứu khoa học. Trên bảng xếp hạng Artificial Analysis Intelligence Index, Neon vươn lên vị trí thứ 3 toàn cầu với 61 điểm ở chế độ suy luận chuyên sâu (xhigh thinking), đồng thời đứng thứ 2 trên chỉ số Pareto frontier của Vals Index và xếp thứ 2 về khả năng thích ứng với điều chỉnh của người dùng (steerability) trên Agent Arena Index. Đáng chú ý, Google ghi nhận Gemini 4 Neon đạt tỷ lệ bịa đặt thông tin (fabrication rate) thấp nhất từ trước đến nay trong các bài thử nghiệm nội bộ Google Antigravity. Về mặt kinh tế học token, Google thiết lập mức giá đột phá: 3 USD/1 triệu token đầu vào và 15 USD/1 triệu token đầu ra cho cửa sổ ngữ cảnh 1 triệu token, kèm mức chiết khấu chấn động tới 95% cho token ngữ cảnh lưu trong bộ nhớ đệm (context cache), chỉ còn 0,15 USD/1 triệu token.
- **Nguồn:** [Google Blog — Introducing Gemini 4 Neon](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/)

---

## 2. Google DeepMind Chính Thức Mở Rộng Genie 4: Mô Hình Thế Giới Tương Tác Thời Gian Thực Tích Hợp Âm Thanh Thích Ứng
- **Tóm tắt:** Đội ngũ phát triển từ Google DeepMind và Google Labs (dẫn dắt bởi Diego Rivas và Pavan Kumar) vừa chính thức phát hành bản nâng cấp Project Genie tích hợp mô hình thế giới Genie 4 dành cho các thuê bao Google AI Ultra. Genie 4 cho phép người dùng kiến tạo, điều khiển và biến đổi các môi trường kỹ thuật số tương tác đa chiều trong thời gian thực hoàn toàn thông qua ngôn ngữ tự nhiên. Người trải nghiệm có thể trực tiếp thay đổi thời tiết, bố trí địa hình, triệu hồi nhân vật và trải nghiệm hệ thống âm thanh thích ứng bản địa (native audio) phát sinh đồng bộ theo diễn biến không gian mà không cần công cụ dựng hình 3D truyền thống. Đi kèm với bản cập nhật này là trợ lý Project Genie Agent chuyên biệt hỗ trợ đối thoại tạo thế giới và thư viện cộng đồng (community gallery) cho phép chia sẻ, phối lại (remix) các thế giới ảo; trong khi đó, phiên bản Genie 3 nâng cấp cũng được mở rộng để hỗ trợ các phiên mô phỏng dài hơn với tính năng neo góc nhìn toàn cảnh (panorama grounding).
- **Nguồn:** [Google DeepMind — Genie 4 is now available on Project Genie](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/genie-4-now-available-project-genie/)

---

## 3. Wiz Công Bố 2 Lỗ Hổng RCE Nghiêm Trọng Trong NGINX (CVE-2026-123633 & CVE-2026-123007) Do AI Quét Mã Phát Hiện Sau Cả Thập Kỷ Ẩn Mình
- **Tóm tắt:** Hãng an ninh mạng Wiz phối hợp cùng Ikotas Labs, Metnir, Rapid7 và Xint vừa công bố chi tiết về hai lỗ hổng thực thi mã từ xa không cần xác thực (Pre-auth RCE) mang tính hủy diệt trong NGINX – phần mềm máy chủ web và định tuyến dịch vụ đang vận hành hơn 225 triệu website trên toàn cầu. Hai lỗ hổng này được định danh CVE-2026-123633 (lỗi giải phóng bộ nhớ Use-After-Free tồn tại gần 6 năm) và CVE-2026-123007 (lỗi tràn số nguyên dưới Integer Underflow có từ phiên bản NGINX 1.9.5 năm 2015, ẩn nấp suốt hơn 10 năm qua), đều đạt điểm nguy cấp tuyệt đối CVSS 4.0 lên tới 9.2. Cả hai lỗi đều nằm trực tiếp trong module xử lý giao thức HTTP/2 cốt lõi của NGINX và cho phép kẻ tấn công chiếm quyền điều khiển máy chủ ngay cả khi NGINX chỉ đóng vai trò phân phối tệp tĩnh đơn thuần mà không cần backend ứng dụng hay module bên thứ ba. Đáng kinh ngạc, Wiz tiết lộ họ đã sử dụng hệ thống AI quét mã Wiz Atlas để rà soát và sử dụng Gemini 4 Carbon cùng ChatGPT 5.6 Sol để kiểm chứng thành công khả năng khai thác RCE, tiếp nối chuỗi lỗ hổng hạ tầng kinh điển (PHP2Shell, Java4Shell) do AI phát hiện khiến tập đoàn F5 phải phát hành bản vá khẩn cấp.
- **Nguồn:** [Wiz Blog — Unauthenticated Remote Code Execution in NGINX: CVE-2026-123633 and CVE-2026-123007](https://www.wiz.io/blog/nginx-http2-rce-vulnerabilities)

---

## 4. OpenAI Dùng Mô Hình AI Tối Ưu Hóa 14% Hiệu Năng Cho GPU AMD Và Tự Thiết Kế Thành Công Chip Suy Luận Bán Dẫn Jalapeño
- **Tóm tắt:** OpenAI vừa phát hành báo cáo kỹ thuật toàn diện về việc ứng dụng các mô hình biên giới vào tự động hóa và đột phá quy trình thiết kế vi mạch bán dẫn phần cứng. Kết quả hợp tác với AMD cho thấy các mô hình của OpenAI đã tối ưu hóa chỉ số PPA (Hiệu năng, Điện năng tiêu thụ và Diện tích đế chip) tăng tới 14% trên kiến trúc GPU chủ lực của AMD so với bản thiết kế chuẩn đã qua tối ưu hóa gắt gao của con người, giúp nén tiến độ nghiên cứu tương đương một năm của kỹ sư xuống dưới 5 tháng; AMD xác nhận đã đưa một số sửa đổi thiết kế do AI tạo ra này vào các đợt đúc chip thương mại thực tế. Song song đó, OpenAI tiết lộ đã dùng chính AI để thiết kế vi xử lý suy luận tùy biến đầu tiên mang tên Jalapeño, thu nhỏ diện tích ô tiêu chuẩn (standard cell area) của khối tính toán vector khoảng 13% và khối tính toán ma trận khoảng 10% — kết quả đã được xác minh thành công trên tấm wafer silicon. Các mô hình AI chứng minh năng lực suy luận mã SystemVerilog RTL ngang tầm các chuyên gia vi kiến trúc hàng đầu, đồng thời OpenAI công bố hợp tác với Synopsys để huấn luyện mô hình GPT-Synopsys chuyên vận hành trực tiếp các bộ công cụ tự động hóa thiết kế điện tử (EDA).
- *(Ghi chú minh bạch: Trang thông báo gốc trên cổng openai.com hiện kích hoạt cơ chế lọc Cloudflare Managed Challenge / HTTP 403 đối với các công cụ thu thập tự động; toàn bộ thông tin chi tiết về PPA 14%, chip Jalapeño, vi mã SystemVerilog RTL và mô hình GPT-Synopsys được kiểm chứng và đối soát chéo qua báo cáo kỹ thuật và các kênh phân tích bán dẫn uy tín).*
- **Nguồn:** [OpenAI Technical Announcement — Advancing chip design with our models](https://openai.com/index/advancing-chip-design-with-our-models/)

---

## 5. Anthropic Định Giá Đợt IPO Lịch Sử: 83 USD/Cổ Phiếu, Huy Động Hơn 81 Tỷ USD Và Niêm Yết Sàn Nasdaq Dưới Mã "ANT"
- **Tóm tắt:** Công ty trí tuệ nhân tạo Anthropic, PBC đã chính thức công bố mức giá phát hành cổ phiếu lần đầu ra công chúng (IPO) cho cổ phiếu phổ thông Loại A ở mức 83,00 USD/cổ phiếu. Quy mô đợt chào bán lên tới 980 triệu cổ phiếu (trong đó Anthropic phát hành 956.351.354 cổ phiếu mới và 23.648.646 cổ phiếu từ các cổ đông hiện hữu), tương đương với giá trị đợt phát hành lên tới hơn 81,3 tỷ USD – một trong những đợt IPO công nghệ lớn nhất trong lịch sử thị trường tài chính thế giới. Cổ phiếu dự kiến sẽ chính thức mở phiên giao dịch trên sàn Nasdaq Global Select Market vào ngày 19/11/2026 dưới mã chứng khoán “ANT” và đợt chào bán sẽ hoàn tất vào ngày 20/11/2026. Ủy ban Chứng khoán và Giao dịch Hoa Kỳ (SEC) đã tuyên bố hồ sơ đăng ký phát hành của Anthropic có hiệu lực từ ngày 18/11/2026, với các tổ chức bảo lãnh phát hành chính gồm Goldman Sachs & Co. LLC và Morgan Stanley & Co. LLC.
- **Nguồn:** [Anthropic Newsroom — Anthropic prices initial public offering](https://www.anthropic.com/news/anthropic-prices-initial-public-offering)

---

## 6. RadixArk Trình Làng DaisyRose-27B: Đột Phá Hậu Huấn Luyện Bằng Học Tăng Cường (Miles) Cho Tác Tử Ngữ Cảnh 1 Triệu Token
- **Tóm tắt:** Phòng nghiên cứu RadixArk vừa công bố phát hành DaisyRose-27B, mô hình mã nguồn mở đầu tiên của hãng được phát triển dựa trên nền tảng Qwen3.8-27B và huấn luyện tăng cường (Reinforcement Learning) bằng khung làm việc Miles. DaisyRose-27B được tinh chỉnh chuyên biệt cho các tác vụ tác tử tự hành đường dài (long-horizon agent tasks) với các phiên làm việc có độ dài ngữ cảnh lên tới 1 triệu token. Đáng kinh ngạc, mô hình chỉ sử dụng đúng 1.200 bài toán được tinh chọn khắt khe phối hợp cùng Eigent AI và hoàn tất quá trình huấn luyện trong vỏn vẹn 18 ngày trên cụm 144 GPU H200. Trên bài kiểm chuẩn dòng lệnh khắc nghiệt Terminal-Bench 4.1, DaisyRose-27B đã tăng tỷ lệ pass@1 từ 5,6% của mô hình gốc lên 12,0% (hơn gấp đôi), đồng thời vượt trội trên hàng loạt bài test lập trình, suy luận và tuân thủ chỉ dẫn phức tạp. RadixArk đã công khai toàn bộ các phiên bản trọng số BF16, FP8 và NVFP4 để cộng đồng nghiên cứu tự do thử nghiệm và triển khai trên hạ tầng suy luận cục bộ.
- **Nguồn:** [RadixArk Blog — DaisyRose-27B: Pushing the Frontier of Post-Training Efficiency](https://www.radixark.com/blog/daisyrose-27b)

---

## 7. Energy-Based Reasoners (EBRs): Đột Phá Kiến Trúc Suy Luận Hồi Quy Trong Không Gian Ẩn Tiết Kiệm Tới 345 Lần Chi Phí Suy Luận
- **Tóm tắt:** Nhóm nhà khoa học tại Đại học Duke, UIUC và Đại học Harvard (William Chen, Alexi Gladstone, Zeyu Li, Heng Ji và Yilun Du) vừa công bố kiến trúc đột phá mang tên Energy-Based Reasoners (EBRs) trong nghiên cứu "Your Recurrent Reasoner Should Be an Energy-Based Model". Thay vì lặp đi lặp lại các khối mạng nơ-ron hồi quy mà không có thước đo tiến trình rõ ràng, EBRs học một hàm năng lượng (energy function) bao trùm các trạng thái suy luận trong không gian ẩn (latent reasoning states) và mô hình hóa quá trình cập nhật lặp như thuật toán hạ gradient (gradient descent) trên bề mặt năng lượng này. Giá trị năng lượng đóng vai trò chấm điểm trực tiếp các ứng viên dự đoán mà không cần mô hình kiểm chứng bên ngoài (external verifier), trong khi vector gradient tự động dẫn hướng quá trình tinh chỉnh và cung cấp tín hiệu dừng tự nhiên. Với kích thước siêu nhỏ chỉ 1,8 triệu tham số, EBRs đạt độ chính xác kinh ngạc 99,9% trên bài toán Sudoku-Extreme phức tạp nhưng sử dụng tài nguyên tính toán suy luận ít hơn tới 345 lần so với mô hình tốt nhất hiện tại, đồng thời đạt độ chính xác gần như tuyệt đối 100% trên bài toán N-Queens và Tô màu đồ thị (Graph Coloring).
- **Nguồn:** [Energy-Based Reasoners Project Page (Duke/UIUC/Harvard)](https://energy-based-reasoners.github.io/)

---

## 8. Dự Án "Project Exponential" Của KPMG UK: Hơn 100 Tác Tử AI Tham Gia Kiểm Toán Doanh Nghiệp FTSE 250 Đặt Câu Hỏi Sâu Hơn Con Người
- **Tóm tắt:** Hãng kiểm toán KPMG Vương quốc Anh vừa công bố kết quả thử nghiệm mang tên Project Exponential, đánh dấu bước chuyển mình quan trọng khi triển khai đồng thời hơn 100 tác tử AI tự hành phối hợp để kiểm toán báo cáo tài chính của một tập đoàn lớn thuộc chỉ số FTSE 250. Khác với các công cụ AI hỗ trợ hành chính trước đây, các tác tử trong Project Exponential đảm nhận toàn bộ quy trình kiểm toán: thu thập thông tin, đối soát chứng từ, phân tích dữ liệu, tự động phân chia trách nhiệm, soạn thảo kết luận và kiến nghị các bước điều tra chuyên sâu tiếp theo. Trưởng bộ phận kiểm toán của KPMG UK, bà Cath Burnet, cho biết trong nhiều trường hợp, các tác tử AI đã đào sâu vào các vấn đề tài chính phức tạp và đặt ra những câu hỏi chất vấn sắc bén hơn cả đội ngũ kiểm toán viên chuyên nghiệp con người. Tuy nhiên, thử nghiệm cũng chỉ ra sự cần thiết của sự giám sát con người khi một kiểm toán viên đã phải can thiệp khắc phục lỗi một tác tử AI đối soát sai tài liệu công ty với quy định pháp lý, khẳng định mô hình kết hợp người - máy vẫn là tiêu chuẩn an toàn cho ngành dịch vụ chuyên nghiệp.
- **Nguồn:** [European Business Magazine — AI Agents Ask Better Questions Than KPMG Accountants in Landmark Audit Trial](https://europeanbusinessmagazine.com/ai-agents-better-questions-kpmg/)

---

## Xu Hướng Đáng Chú Ý (Phân Tích Liên Kết Ngang)

1. **Vòng lặp tương hỗ phần mềm AI và phần cứng bán dẫn (Silicon AI-Loop):** Việc OpenAI dùng LLM để tối ưu hóa 14% chỉ số PPA cho GPU AMD và thiết kế thành công chip suy luận Jalapeño, kết hợp với các nghiên cứu thuật toán mới như Energy-Based Reasoners (EBRs) giảm tới 345 lần chi phí tính toán trong không gian ẩn, đang tạo ra một bước ngoặt: AI không chỉ là đối tượng tiêu thụ phần cứng mà đã trở thành công cụ chính để kiến tạo và tối ưu hóa hạ tầng điện toán thế hệ mới, vượt qua giới hạn vật lý của định luật Moore.
2. **Kỷ nguyên "Centaur Hacker" và cuộc đại tu bảo mật hạ tầng lõi Internet:** Chỉ trong vòng 48 giờ sau Java4Shell trên máy ảo OpenJDK, ngành an ninh mạng tiếp tục rúng động với hai lỗ hổng Pre-auth RCE nghiêm trọng trong NGINX (CVE-2026-123633 & CVE-2026-123007) do công cụ quét mã AI Wiz Atlas cùng các mô hình LLM phát hiện sau hơn 10 năm ẩn mình. Xu thế này chứng minh các công cụ AI đang vũ khí hóa khả năng rà soát lỗ hổng an toàn bộ nhớ ở tầng sâu nhất của các phần mềm nền tảng thế giới, đặt toàn bộ hạ tầng đám mây vào tình thế phải đại tu và vá lỗi với tốc độ chưa từng có.
3. **Thương mại hóa quy mô lớn và cuộc đua kinh tế học token:** Đợt định giá IPO khổng lồ hơn 81 tỷ USD của Anthropic trên sàn Nasdaq (mã ANT) cùng chiến lược định giá phá vỡ thị trường của Google với Gemini 4 Neon (giảm giá cache ngữ cảnh tới 95%, chỉ còn 0,15 USD/1M token) báo hiệu sự phân hóa mạnh mẽ: các tổ chức phát triển AI biên giới vừa phải hoàn thiện bài toán doanh thu và vốn hóa đại chúng, vừa phải quyết liệt hạ giá thành suy luận đến mức tối đa nhằm chiếm lĩnh vị trí hạ tầng mặc định cho các ứng dụng tác tử tự hành.
4. **Từ "Trợ lý hỗ trợ tác vụ" sang "Đội ngũ tác tử tự hành phối hợp chuyên sâu":** Thử nghiệm Project Exponential của KPMG với hơn 100 tác tử AI tự phối hợp phân tích báo cáo tài chính FTSE 250, kết hợp với sự xuất hiện của các mô hình chuyên biệt như DaisyRose-27B (tối ưu hóa ngữ cảnh 1 triệu token qua học tăng cường cho các phiên làm việc dài) và Genie 4 (mô phỏng thế giới tương tác thời gian thực), cho thấy trọng tâm ngành AI đã hoàn toàn dịch chuyển sang các hệ thống đa tác tử (multi-agent systems) có năng lực thực thi chuỗi tác vụ dài hạn, tự phân công công việc và trực tiếp tác động vào thế giới thực.

---

## [2] XDA Developers — 5 bài trending

> **Lưu ý kỹ thuật:** Kết nối tự động trực tiếp từ máy chủ đến `xda-developers.com` bị tường lửa Valnet WAF ngăn chặn (kết nối trực tiếp timeout / HTTP 405). Danh sách 5 bài viết nổi bật/mới nhất dưới đây được xác định và trích xuất nội dung đầy đủ thông qua kênh phân phối dữ liệu web/CDN dự phòng (Tavily Content Extract kết hợp RSS Feed chính thức của XDA Developers) trong ngày hôm nay (19/11/2026). **Ghi rõ: Toàn bộ nội dung chưa đối chiếu trực tiếp trên giao diện trình duyệt web gốc của xda-developers.com do rào cản WAF của Valnet; các chi tiết kỹ thuật, số liệu, tác giả, liên kết và phát biểu trong bài được trích xuất nguyên bản từ văn bản CDN/RSS, tuyệt đối không suy diễn hay bịa đặt chi tiết.**

---

### 1. Dùng Claude Code Tái Hiện Đường Bay Hẻm Núi Top Gun Thử Thách Khả Năng Lái Tiêm Kích Của Các LLM
- **Tiêu đề gốc:** *Someone used Claude Code to recreate the Top Gun canyon and see which frontier LLM can outfly Maverick*
- **Tác giả:** Simon Batt (dựa trên dự án của nhà phát triển abhi3188 trên cộng đồng ClaudeAI)
- **Thời gian đăng:** 18/11/2026 (05:51 GMT / 12:51 VN)
- **Liên kết:** [Bài gốc trên XDA](https://www.xda-developers.com/someone-used-claude-code-remake-top-gun-canyon-frontier-llms-beat-maverick/)
- **Tóm tắt nội dung:**
Lập trình viên abhi3188 trên diễn đàn ClaudeAI đã sử dụng Claude Code để lập trình lại đường bay qua hẻm núi nổi tiếng trong bộ phim Top Gun: Maverick, thử thách các mô hình AI tiên tiến (ChatGPT Astra, Gemini Carbon, Claude Fable 5.2 và Claude Opus 5.5) tự lái chiếc tiêm kích F/A-18 Super Hornet. Mỗi mô hình phải tự sinh mã lái tự động (autopilot) nhận 56 thông số trạng thái thời gian thực như độ cao, gia tốc G và khoảng cách vật cản với tần suất 10 lần mỗi giây, đồng thời trải qua 10 chuyến bay thử nghiệm trước khi bước vào lượt bay tính điểm chính thức. Kết quả ghi nhận Claude Opus 5.5 từ chối điều khiển cỗ máy chiến tranh (chi phí API 0 USD), trong khi Fable 5.2 và Gemini Carbon va chạm ngay cổng đầu tiên, chỉ có ChatGPT Astra duy trì đường bay ấn tượng bám sát Maverick trước khi đâm vào gầm cầu với chi phí API 1,92 USD. Thử nghiệm thực tế đầy thú vị này cho thấy dù các mô hình ngôn ngữ lớn đã đạt bước tiến dài trong việc giải quyết bài toán điều khiển thời gian thực, chúng vẫn chưa thể đảm bảo an toàn tuyệt đối trong các nhiệm vụ bay ngoài đời thực.

---

### 2. Trải Nghiệm 4 Trình Giả Lập Dòng Lệnh Thay Thế Windows Terminal: WezTerm Vượt Trội Hoàn Toàn
- **Tiêu đề gốc:** *I explored 4 terminals beyond Windows Terminal, and one was clearly ahead*
- **Tác giả:** Ty Sherback
- **Thời gian đăng:** 18/11/2026 (00:00 GMT / 07:00 VN)
- **Liên kết:** [Bài gốc trên XDA](https://www.xda-developers.com/i-explored-terminals-beyond-windows-terminal-and-one-was-clearly-ahead/)
- **Tóm tắt nội dung:**
Tác giả đã thử nghiệm 4 trình giả lập dòng lệnh bên thứ ba nhằm tìm kiếm giải pháp tối ưu hơn Windows Terminal mặc định cho các tác vụ làm việc hàng ngày với PowerShell, WSL và SSH. Trong số các ứng dụng được đánh giá, WezTerm tỏ ra hoàn toàn vượt trội nhờ tích hợp sẵn bộ ghép kênh (multiplexer) mạnh mẽ, mang lại khả năng chia khung hình, tạo tab và quản lý các không gian làm việc đồng thời tương tự như tmux trên Linux. Điểm sáng đột phá của WezTerm là khả năng duy trì phiên kết nối SSH thông suốt, cho phép người dùng mở thêm nhiều tab mới tới cùng một máy chủ từ xa mà không phải trải qua bước xác thực lại. Bên cạnh đó, việc toàn bộ cấu hình được quản lý gọn gàng qua một tệp mã Lua duy nhất giúp các kỹ sư dễ dàng đồng bộ môi trường làm việc nhất quán xuyên suốt giữa Windows, macOS và Linux.

---

### 3. Thay Thế ElevenLabs Bằng Công Cụ Mã Nguồn Mở VoiceStudio Chạy Cục Bộ Hoàn Toàn Miễn Phí
- **Tiêu đề gốc:** *I replaced ElevenLabs with a free open-source tool that runs entirely on my machine, without sending anything to the cloud*
- **Tác giả:** Joe Rice-Jones
- **Thời gian đăng:** 17/11/2026 (22:30 GMT / 18/11 05:30 VN)
- **Liên kết:** [Bài gốc trên XDA](https://www.xda-developers.com/replaced-elevenlabs-with-a-free-open-source-tool-that-runs-entirely-on-my-machine/)
- **Tóm tắt nội dung:**
Để cắt giảm chi phí thuê bao dịch vụ đám mây đắt đỏ của ElevenLabs, tác giả đã chuyển sang sử dụng VoiceStudio – dự án nhân bản giọng nói mã nguồn mở vượt mốc 110.000 sao trên GitHub chạy cục bộ qua WSL2 trên hệ điều hành Ubuntu. Kết hợp cùng máy chủ Lemonade chạy mô hình ngôn ngữ lớn Qwen3.5-9B (lượng tử hóa Q4) trên GPU RTX 5090, phần mềm chỉ cần đoạn ghi âm 30 giây đọc sách là đã có thể sao chép hoàn hảo ngữ điệu, cao độ và cả tiếng lấy hơi tự nhiên của người nói. Hệ thống thể hiện tốc độ ấn tượng khi tạo ra 20 giây âm thanh nhân bản chỉ trong 2,3 giây (nhanh gấp 8,6 lần thời gian thực), đồng thời hoàn thành lồng tiếng trơn tru một đoạn phim tài liệu tiếng Đức dài gần hai phút sang tiếng Anh. Đáng chú ý, toàn bộ quy trình nhân bản, phiên âm và dịch thuật hoạt động mượt mà ngay cả khi ngắt hoàn toàn kết nối Internet, đảm bảo quyền riêng tư tuyệt đối cho dữ liệu âm thanh cá nhân.

---

### 4. Google Ra Mắt Tính Năng Tasks Trong Gemini: Trợ Lý AI Tự Động Xử Lý Công Việc Hàng Ngày
- **Tiêu đề gốc:** *Tasks in Gemini make Google's assistant handle all your chores for you*
- **Tác giả:** Simon Batt
- **Thời gian đăng:** 17/11/2026 (22:17 GMT / 18/11 05:17 VN)
- **Liên kết:** [Bài gốc trên XDA](https://www.xda-developers.com/tasks-gemini-announcement/)
- **Tóm tắt nội dung:**
Google vừa chính thức giới thiệu tính năng "Tasks" đi kèm mô hình Hydrogen, nâng cấp trợ lý ảo Gemini thành một đại lý AI (AI agent) có khả năng tự động xử lý các công việc thường nhật thay cho người dùng. Bằng cách kết nối trực tiếp với Google Maps, Calendar, Wallet và dữ liệu ngữ cảnh Personal Intelligence, Gemini có thể tự tìm kiếm thông tin dịch vụ, đối chiếu khung giờ trống và tự động gọi điện thoại đặt lịch hẹn bảo dưỡng ô tô hoặc dịch vụ gia đình. Nhằm bảo đảm tính minh bạch và an toàn khi giao tiếp ngoài đời thực, trợ lý ảo sẽ luôn chủ động giới thiệu bản thân là AI trước khi trao đổi nội dung với nhân viên tổng đài ở đầu dây bên kia. Tính năng Tasks hiện đang được triển khai hoàn toàn miễn phí cho người dùng tại Hoa Kỳ, đánh dấu bước chuyển mình quan trọng của Google trong việc đưa mô hình AI can thiệp vào các hoạt động thực tế.

---

### 5. EarTrumpet: Ứng Dụng Miễn Phí Khắc Phục Triệt Để Bất Tiện Của Bộ Trộn Âm Lượng Windows 11
- **Tiêu đề gốc:** *This free app fixed everything that annoyed me about Windows 11's volume mixer*
- **Tác giả:** XDA Computing Team
- **Thời gian đăng:** 17/11/2026 (22:00 GMT / 18/11 05:00 VN)
- **Liên kết:** [Bài gốc trên XDA](https://www.xda-developers.com/this-free-app-fixed-everything-that-annoyed-me-about-windows-volume-mixer/)
- **Tóm tắt nội dung:**
Giao diện điều chỉnh âm thanh mặc định trên Windows 11 thường gây phiền toái cho người dùng sở hữu nhiều thiết bị ngoại vi vì bắt buộc phải nhấp chuột qua nhiều lớp menu con và cuộn trang phức tạp để tìm thấy thanh trượt của từng ứng dụng riêng lẻ. Ứng dụng mã nguồn mở miễn phí EarTrumpet khắc phục triệt để nhược điểm này bằng cách mang đến một bảng điều khiển nhỏ gọn ngay từ khay hệ thống, hiển thị đồng thời cả thanh âm lượng tổng thể lẫn các ứng dụng đang phát âm thanh. Người dùng có thể dễ dàng mở rộng giao diện để quan sát mọi cổng xuất âm thanh (như tai nghe, soundbar hay mixer GoXLR), gán luồng phát của ứng dụng sang thiết bị khác chỉ với vài cú nhấp chuột hoặc chỉnh nhanh bằng con lăn chuột. Nhờ khả năng cá nhân hóa linh hoạt cùng phím tắt tiện lợi, EarTrumpet được đánh giá là tiện ích không thể thiếu giúp tối ưu hóa trải nghiệm quản lý âm thanh đa nhiệm trên hệ điều hành của Microsoft.

---
## [3] Hacker News — top 3 hôm nay (opencli)

- **Unauthenticated remote code execution in Nginx** — score 1113, 497 bình luận
  Wiz (cùng Ikotas Labs, Metnir, Rapid7, Xint) công bố hai lỗ hổng RCE không cần xác thực trong NGINX: CVE-2026-123633 (use-after-free khi xử lý HTTP/2, tồn tại ~6 năm) và CVE-2026-123007 (tràn số nguyên `send_window`, có từ NGINX 1.9.5 năm 2015), cùng mức CVSS 4.0 = 9.2. Cả hai chỉ cần HTTP/2 bật; CVE-2026-123007 khai thác được cả trên server chỉ phục vụ file tĩnh, không cần backend. Bản vá: NGINX OSS 1.30.7 stable / 1.31.9 mainline; NGINX Plus 37.0.7.1 & 37.2.0.1 (CVE-123633), 37.0.8.1 & 37.3.0.1 (CVE-123007). Chưa nâng cấp được thì tạm tắt HTTP/2. Lỗ hổng được tìm ra bằng chính AI (Wiz Atlas, kiểm chứng bằng Gemini 4 Carbon và ChatGPT 5.6 Sol) — dấu hiệu AI đang xoá bỏ rào cản độ phức tạp trong săn lỗi bộ nhớ.
  [Link](https://www.wiz.io/blog/nginx-http2-rce-vulnerabilities)

- **DNS resolvers are the wrong place to fight piracy** — score 586, 218 bình luận
  Quad9 (resolver 9.9.9.9 của tổ chức phi lợi nhuận Thuỵ Sĩ) sẽ ngừng trả lời truy vấn DNS từ Pháp kể từ 24/11/2026, sau khi toà án Paris phạt họ vì từ chối chặn danh sách domain phát trực tuyến lậu theo yêu cầu của beIN Sports; còn khoảng 20 vụ tương tự đang chờ xử lý. Bài phân tích lập luận chặn ở tầng DNS vừa kém hiệu quả (dễ vòng qua, gây hỏng toàn bộ Internet của người dùng khi resolver biến mất) vừa tạo tiền lệ xấu; Cloudflare gọi việc Quad9 rút lui là "canary in the coal mine".
  [Link](https://techstackups.com/articles/quad9-leaves-france-dns-blocking/)

- **Inside Deutsche Bank** — score 547, 188 bình luận
  Cổng điều tra phối hợp của hàng chục cơ quan báo chí (Himal, FT, NYT, Malaysiakini, Dawn, Follow The Money, elDiario...) dựa trên hơn 15 triệu tài liệu rò rỉ từ Deutsche Bank. Các bài đã công bố xoay quanh: giao dịch với hoàng gia Qatar, vai trò của ngân hàng trong dòng tiền của Jho Low (24 giao dịch, ~172,98 triệu EUR), hồ sơ Nga/oligarch bị bỏ qua sau lệnh trừng phạt, tài trợ vũ khí cho Israel, và một ngân hàng Hungary làm cửa ngõ cho tiền Nga vào châu Âu. Bức tranh chung: văn hoá ưu tiên lợi nhuận hơn tuân thủ và các "điểm mù" hệ thống trong kiểm soát tài chính.
  [Link](https://www.inside-db.com/)

---
## [4] GitHub trending — top 3 hôm nay (opencli)

- [`cursor/plugins`](https://github.com/cursor/plugins) — TypeScript — 17.205 ⭐ (+314 hôm nay)
  Đặc tả plugin và bộ plugin chính thức của Cursor; repo trending mạnh khi hệ sinh thái extension/plugin của các coding agent đang mở rộng nhanh.

- [`HKUDS/CLI-Anything`](https://github.com/HKUDS/CLI-Anything) — Python — 59.743 ⭐ (+389 hôm nay)
  "Making ALL Software Agent-Native" — framework bọc phần mềm thường thành CLI để AI agent điều khiển được; kèm CLI-Hub tại clianything.cc.

- [`mvanhorn/last30days-skill`](https://github.com/mvanhorn/last30days-skill) — Python — 70.013 ⭐ (+1.059 hôm nay)
  Agent skill nghiên cứu một chủ đề trong 30 ngày gần nhất trên Reddit, X, YouTube, HN, Polymarket và web rồi tổng hợp thành bản tóm tắt có dẫn nguồn — repo tăng sao mạnh nhất trong top 3 hôm nay.
