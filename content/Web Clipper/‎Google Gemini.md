---
title: "Tóm tắt kiến trúc telegram"
source: "https://gemini.google.com/u/1/app/03090921c1ac02a9?pageId=none"
tags:
  - "clippings"
  - "telegram"
---
## Tóm tắt: Kiến trúc Telegram

**Nền tảng & ngôn ngữ:**
- Kiến trúc **cloud-native phân tán**, tự vận hành 5 data center (Miami, Amsterdam, Singapore) thay vì thuê cloud công cộng
- Lõi backend/TDLib viết bằng **C/C++**, giao thức độc quyền **MTProto 2.0**
- App native 100%: Desktop (C++/Qt), iOS/macOS (Swift/Objective-C), Android (Java/Kotlin), Web (TypeScript/WASM)

**Vì sao tốc độ cao:**
- Tuần tự hóa nhị phân TL thay vì JSON/HTTP → giảm ~30% băng thông
- Kết nối socket liên tục, xử lý bất đồng bộ đa luồng ở tầng C++
- Cơ chế Shared-Log cho nhóm lớn: ghi 1 bản tin duy nhất, giảm tải từ O(N) xuống O(1)

**Vì sao lưu trữ miễn phí vĩnh viễn:**
- **Data deduplication**: file trùng lặp chỉ lưu 1 bản vật lý, mọi người dùng tham chiếu chung
- Mã hóa client-server (không E2EE mặc định) cho phép hệ thống hash và đồng bộ tức thì đa thiết bị
- Lưu trữ phân tầng (cold storage) + hạ tầng bare-metal tự chủ → chi phí thấp
- Tài trợ bởi vốn Durov, Telegram Premium, Ads và blockchain TON

**Điểm đánh đổi chính:** ưu tiên tiện lợi/tốc độ đám mây hơn mã hóa đầu-c mút mặc định (khác Signal/WhatsApp).
--------------------
## Conversation with Gemini

##### You said Telegram là 1 app được xây dựng trên nền tảng nào? ngôn ngữ nào? vì sao nó có tốc độ cao, và miền ph…

Telegram là 1 app được xây dựng trên nền tảng nào? ngôn ngữ nào? vì sao nó có tốc độ cao, và miền phí lưu trữ nội dung chat vĩnh viễn?

###### Gemini said

Telegram được xây dựng trên kiến trúc **Cloud-native phân tán tự chủ** kết hợp với thư viện lõi viết bằng **C/C++** và giao thức truyền tải độc quyền **MTProto**, giúp tối ưu hóa tối đa tốc độ xử lý lẫn chi phí lưu trữ đám mây.

www.ariyanki.net

**1\. Nền tảng và Kiến trúc hệ thống**

- **Hạ tầng Bare-metal phân tán:** Thay vì thuê đám mây công cộng (như AWS hay Google Cloud), Telegram tự vận hành phần cứng máy chủ tại **5 Trung tâm dữ liệu (DC1 đến DC5)** đặt ở Miami (DC1, DC3), Amsterdam (DC2, DC4) và Singapore (DC5).
	Coxxs
- **Giao thức MTProto 2.0:** Giao thức truyền tải và mã hóa do Nikolai Durov thiết kế riêng cho mạng di động yếu, hoạt động trực tiếp trên TCP hoặc WebSocket.
	Wikipedia
- **Thư viện lõi TDLib (Telegram Database Library):** Nền tảng đa hệ điều hành xử lý toàn bộ kết nối mạng bất đồng bộ, mã hóa và cơ sở dữ liệu cục bộ cho mọi ứng dụng Telegram.
	core.telegram.org+ 1

**2\. Ngôn ngữ lập trình trên từng nền tảng** Telegram không dùng các framework đóng gói web nặng nề (như Electron hay React Native) mà phát triển **Native 100%** cho từng thiết bị:

- **Backend & TDLib:** Viết bằng **C và C++** thuần túy để đạt hiệu suất xử lý I/O bất đồng bộ cực cao và kiểm soát bộ nhớ sát phần cứng.
	Telegram APIs
- **Telegram Desktop (Windows, macOS, Linux):** Viết bằng **C++ kết hợp Qt Framework** (`tdesktop`), giúp ứng dụng ngốn cực ít RAM và phản hồi tức thì.
	AriyankiNET+ 1
- **Telegram iOS & macOS Native:** Viết bằng **Swift và Objective-C**.
	AriyankiNET
- **Telegram Android:** Viết bằng **Java và Kotlin**, giao tiếp trực tiếp với tầng C++ qua JNI (Java Native Interface).
	Telegram APIs
- **Telegram Web (Web K & Web A):** Viết bằng **TypeScript, JavaScript và WebAssembly**.

**3\. Vì sao Telegram có tốc độ vượt trội?**

- **Đóng gói nhị phân TL (Type Language):** MTProto không dùng JSON/HTTP nặng nề mà tuần tự hóa dữ liệu sang định dạng nhị phân TL siêu gọn, giảm khoảng 30% băng thông so với Protobuf.
	Algoroq
- **Kết nối liên tục & Đa luồng C++:** Ứng dụng duy trì kết nối socket liên tục và xử lý bất đồng bộ hoàn toàn ở tầng C++, giúp gửi/nhận tin nhắn gần như không có độ trễ khởi tạo.
- **Cơ chế Shared-Log cho nhóm lớn:** Trong nhóm lên tới 200.000 người, server chỉ ghi **1 bản tin nhắn duy nhất** vào luồng chung và dùng con trỏ đọc (`last_read_message_id`) cho từng thành viên, giảm tải ghi từ cấp số nhân $O(N)$ xuống $O(1)$.
	Algoroq

**4\. Vì sao Telegram miễn phí lưu trữ nội dung chat vĩnh viễn?**

- **Chống trùng lặp dữ liệu (Data Deduplication):** Mọi file, ảnh, video tải lên đều được đối chiếu mã băm (hash). Nếu hàng triệu người cùng gửi hoặc chuyển tiếp một video 1 GB, server chỉ lưu **1 bản vật lý duy nhất** và gắn con trỏ tham chiếu cho các cuộc trò chuyện.
- **Mặc định dùng mã hóa Client-Server:** Các cuộc trò chuyện thông thường (Cloud Chat) được mã hóa giữa thiết bị và máy chủ (chỉ *Secret Chat* mới mã hóa đầu cuối E2EE). Nhờ đó, hệ thống mới có thể đọc mã băm để chống trùng lặp file và đồng bộ lịch sử chat tức thì trên mọi thiết bị.
- **Lưu trữ phân tầng (Tiered Storage) & Tự chủ phần cứng:** Dữ liệu cũ ít truy cập được chuyển sang ổ cứng lưu trữ lạnh (cold storage) chi phí cực thấp; việc tự vận hành máy chủ vật lý thay vì thuê cloud bên thứ ba giúp cắt giảm hàng chục lần chi phí băng thông.
- **Mô hình tài chính bù đắp:** Chi phí hạ tầng được tài trợ bởi nguồn vốn của nhà sáng lập Pavel Durov, doanh thu từ gói **Telegram Premium**, nền tảng quảng cáo **Telegram Ads** và hệ sinh thái blockchain **TON**.
	Wikipedia

Sơ đồ tương tác dưới đây mô phỏng luồng hoạt động của kiến trúc Telegram qua 4 giai đoạn: từ xử lý bất đồng bộ tại TDLib, đóng gói nhị phân MTProto, định tuyến về Data Center, đến cơ chế chống trùng lặp lưu trữ (Deduplication) trên Cloud:

core.telegram.org

<iframe allow="xr-spatial-tracking; web-share" sandbox="allow-pointer-lock allow-popups allow-forms allow-popups-to-escape-sandbox allow-downloads allow-same-origin allow-scripts" src="https://5vkpqfxejjc6lkvfyvubdxpmd1s0xxy4d1e5hdxgjqjoc6e33u-h1008167276.scf.usercontent.goog/gemini-code-immersive/shim.html?origin=https%3A%2F%2Fgemini.google.com&amp;cache=1"></iframe>

Điểm đánh đổi lớn nhất trong thiết kế của Telegram là **ưu tiên sự tiện lợi và tốc độ đám mây hơn mã hóa đầu cuối mặc định**: nhờ lưu trữ dữ liệu ở dạng Cloud Chat thay vì E2EE mặc định như Signal hay WhatsApp, Telegram mới có thể đồng bộ lịch sử tức thì trên nhiều thiết bị và áp dụng triệt để kỹ thuật chống trùng lặp dữ liệu để miễn phí dung lượng lưu trữ.

Algoroq

Bạn có muốn tìm hiểu sâu hơn về kiến trúc giao thức MTProto không?

Gemini is AI and can make mistakes.

source: https://gemini.google.com/u/1/app/03090921c1ac02a9?pageId=none