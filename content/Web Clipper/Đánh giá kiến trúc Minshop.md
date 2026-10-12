---
title: "Xây dựng web ecom trên Cloudflare"
source: "https://chatgpt.com/c/6a66bb69-ada0-83ec-9663-127862c03b7b"
author:
published:
created: 2026-07-27
description: "xây dựng ecom trên CF cho website bán hàng nhỏ "
tags:
  - "clippings"
---
Bài viết trên Reddit.
-----------------
I built an open-source ecommerce store on Workers, D1, and R2 Hi r/cloudflare! I’ve built WooCommerce stores for clients for years, but I got tired of maintaining servers and wanted to see how far I could take an ecommerce stack built entirely around Cloudflare. The result is Minshop, an open-source storefront and admin system running on Cloudflare Workers. The main stack: \* Astro SSR on Workers \* D1 for products, inventory, orders, customers, settings, and FTS5 keyword search \* R2 for product images \* Workers AI and Vectorize for optional semantic product search and recommendations \* Cloudflare Email for optional receipts, fulfillment updates, and passwordless sign-in \* Native rate-limiting bindings around authentication and checkout \* Stripe Checkout for conventional payments \* Lightning for agent-driven payments \* A separate MCP Worker for agent-based store administration The unusual part is the agent interface. An agent can browse the product API, create a checkout, receive a Lightning invoice, and pay it without a human entering card details. Merchants can also use agents over MCP to create products, check sales, and fulfill orders. For search, the default implementation uses D1 FTS5. Merchants can optionally enable semantic search powered by Workers AI embeddings and Vectorize. This lets queries match products by meaning rather than exact keywords—for example, “something to drink coffee from” can find a mug. The same stored embeddings power related-product recommendations. Products are automatically re-embedded when they’re created or updated. If Workers AI or Vectorize is unavailable, search falls back to D1 FTS5 rather than breaking the storefront. I tried to keep the storefront close to zero client-side JavaScript. Most pages are server-rendered, and the application falls back cleanly when optional bindings such as Cloudflare Email, Images, Workers AI, or Vectorize aren’t configured. The core deployment is intended to fit within Cloudflare’s free-plan allowances at low volume. Optional services have their own allowances and pricing. There’s also a Deploy to Cloudflare button that provisions D1 and R2. Demo: \[https://demo.minshop.dev\](https://demo.minshop.dev) Product API: \[https://demo.minshop.dev/api/products\](https://demo.minshop.dev/api/products) Source: \[https://github.com/ddyy/minshop\](https://github.com/ddyy/minshop) I’d appreciate feedback on the architecture, implementation, and agent-payment model. I’m the developer and happy to answer questions. ————— Đây là đề xuất của một thành viên trên diễn đàn. Tôi muốn bạn nhận xét về đề xuất này. Kiến trúc kiến trúc này để xây dựng 1 trang Web thương mại điện tử theo bạn thì có ổn không cho 1 trang Web nhỏ tầm 5.000 lượt truy cập mỗi ngày.

---

## Kết luận

**Có — kiến trúc này hoàn toàn phù hợp cho một cửa hàng khoảng 5.000 lượt truy cập mỗi ngày.** Xét riêng khả năng chịu tải, Workers + D1 + R2 còn dư sức cho quy mô đó.

Tuy nhiên, tôi **không khuyên triển khai nguyên trạng trên gói Free** nếu đây là cửa hàng tạo doanh thu thật. Cấu hình thực tế tôi sẽ chọn là:

- Workers Paid, tối thiểu 5 USD/tháng.
- Ảnh R2 qua custom domain, không đi xuyên qua Worker.
- D1 đặt primary tại khu vực APAC.
- Chỉ dùng FTS5 lúc đầu; chưa cần Workers AI/Vectorize.
- Cloudflare Access bảo vệ toàn bộ `/admin` và `/api/admin`.
- Thêm cơ chế đối soát thanh toán, giải phóng tồn kho và retry email.

Đánh giá tổng quan của tôi:

| Hạng mục | Đánh giá |
| --- | --- |
| Khả năng đáp ứng 5.000 lượt/ngày | 9/10 |
| Thiết kế tồn kho và thanh toán | 8,5/10 |
| Chi phí vận hành | 9/10 |
| Bảo mật mặc định | 7,5/10 |
| Tính sẵn sàng production nguyên bản | 6,5–7/10 |
| Hệ sinh thái tính năng so với WooCommerce | 5,5/10 |
| Sau khi bổ sung các điểm bên dưới | Khoảng 8,5/10 |

---

## 1\. Về khả năng chịu tải: 5.000 lượt/ngày không phải vấn đề

5.000 lượt truy cập/ngày trung bình chỉ khoảng **0,058 lượt/giây**. Kể cả giả sử toàn bộ lưu lượng tập trung trong một giờ, trung bình cũng chỉ khoảng **1,4 lượt/giây**. Đây là lưu lượng rất nhỏ đối với Workers.

D1 đúng là một cơ sở dữ liệu single-threaded ở cấp từng database và xử lý truy vấn tuần tự, nhưng ở quy mô này nó chưa phải nút thắt. D1 chỉ đáng lo khi có flash sale, hàng nghìn checkout đồng thời hoặc rất nhiều thao tác ghi tranh chấp trên cùng một SKU. Cloudflare cho biết một D1 database sẽ xếp hàng các truy vấn đồng thời và chỉ trả lỗi overloaded khi hàng đợi bị đầy. [^1]

Điểm dễ gây hiểu nhầm là:

> **5.000 lượt truy cập không đồng nghĩa với 5.000 Worker request.**

Mỗi người có thể mở nhiều trang, tải fragment giỏ hàng, thực hiện tìm kiếm, gọi API và tải nhiều ảnh. Minshop cache HTML công khai trong 60 giây và tách các trang chứa dữ liệu cá nhân thành `private, no-store`, đây là thiết kế hợp lý. Tuy nhiên, những request đi vào Worker rồi được trả từ Cache API vẫn được tính là Worker request. [^2]

Một ví dụ giả định khá thực tế:

| Loại request | Ước tính/ngày |
| --- | --- |
| 5.000 lượt × 3 trang | 15.000 |
| Fragment đếm sản phẩm trong giỏ | Khoảng 15.000 |
| 5.000 lượt × 8 ảnh sản phẩm khác nhau | 40.000 |
| Tìm kiếm, API, bot, checkout, webhook, admin | 10.000–30.000 |
| **Tổng** | **80.000–100.000+** |

Trong khi đó, Workers Free hiện có giới hạn **100.000 request/ngày cho cả tài khoản** và **10 ms CPU cho mỗi invocation**. Cloudflare cũng lưu ý các tác vụ SSR hoặc xác thực nặng thường có thể sử dụng khoảng 10–20 ms CPU, nên Astro SSR có khả năng chạm giới hạn CPU Free ở một số request dù tổng lưu lượng chưa cao. [^3]

Workers Paid có mức tối thiểu **5 USD/tháng**, bao gồm 10 triệu Worker request/tháng và 30 triệu CPU-ms; không còn hard cap 100.000 request/ngày. Với quy mô của bạn, thông thường chi phí Workers vẫn chỉ quanh mức 5 USD/tháng nếu không lạm dụng AI hoặc biến đổi ảnh. [^2]

---

## 2\. Ảnh là yếu tố quyết định việc gói Free có đủ hay không

Theo cấu hình mặc định, ảnh được đọc từ R2 qua route:

```
/images/<key>
```

Route này dùng Cache API nên cache hit sẽ tránh phải đọc lại R2, nhưng **mỗi request ảnh vẫn đi vào Worker**. Chính tác giả cũng ghi rõ vấn đề này trong tài liệu dự án.

Vì vậy, với production tôi sẽ cấu hình:

```
images.example.com → R2 custom domain
```

Sau đó đặt `IMAGE_BASE_URL` để tất cả ảnh sản phẩm, ảnh trang nội dung, email và Stripe Checkout dùng trực tiếp domain đó. Khi ấy:

- Request ảnh không còn chiếm hạn mức Worker.
- Cloudflare CDN có thể cache ảnh trực tiếp.
- Chỉ HTML, API và checkout mới đi vào Worker.
- R2 hiện có 10 GB lưu trữ, 1 triệu Class A operation và 10 triệu Class B operation miễn phí mỗi tháng, không tính phí egress. [^4]

Lưu ý: R2 custom domain khiến các object trong bucket đó có thể đọc công khai. Chỉ nên dùng bucket này cho ảnh sản phẩm, logo và nội dung công khai; không lưu tài liệu riêng tư hoặc dữ liệu khách hàng vào cùng bucket.

Sau khi đưa ảnh ra custom domain, gói Free có khả năng vẫn đủ cho 5.000 lượt/ngày. Nhưng đối với cửa hàng thật, tôi vẫn chọn Paid vì 5 USD/tháng là rất nhỏ so với thiệt hại khi website bị lỗi 1027 do chạm 100.000 request trong một ngày nhiều bot hoặc chiến dịch quảng cáo.

---

## 3\. Phần tồn kho và thanh toán được thiết kế tốt

Đây là điểm tôi đánh giá cao nhất trong Minshop.

### Giá và tồn kho được xác minh ở server

Dữ liệu mà trình duyệt hoặc agent gửi lên không được tin tưởng trực tiếp. Checkout tải lại sản phẩm, biến thể, add-on, giá và tồn kho từ D1 trước khi tạo phiên thanh toán. Điều này ngăn người dùng sửa JSON hoặc HTML để mua với giá giả.

### Tồn kho được giữ trước khi chuyển sang Stripe

Minshop không chờ đến khi Stripe gửi webhook mới trừ tồn kho. Nó tạo một inventory reservation trước, rồi mới đưa khách sang trang thanh toán.

Việc giữ tồn kho sử dụng một D1 batch gồm:

1. Kiểm tra tất cả sản phẩm còn đủ hàng.
2. Chỉ tạo reservation nếu toàn bộ mặt hàng hợp lệ.
3. Trừ tồn kho có điều kiện.
4. Rollback toàn bộ nếu một statement thất bại.

D1 xác nhận `batch()` là một SQL transaction và toàn bộ chuỗi sẽ rollback nếu một statement lỗi. [^5]

### Webhook có tính idempotent

Đơn hàng được chống ghi trùng bằng `provider_session_id`, `ON CONFLICT DO NOTHING` và một settlement token. Hai webhook song song hoặc webhook được Stripe gửi lại nhiều lần sẽ không thể cùng tạo đơn, cùng trừ tồn kho hoặc gửi email xác nhận nhiều lần.

Đây là thiết kế tốt hơn khá nhiều dự án ecommerce mẫu, nơi tồn kho chỉ được đọc trước checkout rồi trừ sau thanh toán, dẫn đến overselling khi hai khách mua cùng lúc.

### Cache 60 giây không làm sai tồn kho

Trang sản phẩm có thể hiển thị dữ liệu cũ tối đa khoảng 60 giây do edge cache. Điều đó có thể khiến người dùng nhìn thấy “còn hàng” trong khi vừa có người khác mua hết, nhưng checkout vẫn kiểm tra lại D1 và reservation nguyên tử sẽ từ chối giao dịch.

Do đó đây chủ yếu là vấn đề trải nghiệm, không phải lỗi toàn vẹn dữ liệu. Nếu giá sản phẩm thay đổi thường xuyên, tôi sẽ bổ sung cache purge khi admin cập nhật giá, thay vì chỉ chờ TTL 60 giây.

---

## 4\. Điểm yếu lớn nhất: reservation phụ thuộc vào webhook

Với Stripe và OpenNode, reservation được giải phóng khi hệ thống nhận được webhook báo phiên thanh toán hết hạn hoặc thất bại. Còn Lightning tự host mới có cơ chế thu hồi các reservation hết hạn theo cách lazy.

Điều này tạo ra hai rủi ro.

### Webhook bị cấu hình sai

Nếu `checkout.session.expired` không được đăng ký, webhook secret sai hoặc endpoint gặp lỗi kéo dài, hàng hóa có thể bị giữ vô thời hạn dù khách không thanh toán.

Tôi sẽ bổ sung một Cron Trigger chạy định kỳ để:

- Tìm reservation quá hạn.
- Gọi Stripe/OpenNode kiểm tra trạng thái thật.
- Nếu chưa thanh toán và phiên đã hết hạn thì giải phóng tồn kho.
- Nếu đã thanh toán nhưng webhook bị bỏ lỡ thì chốt đơn.
- Ghi log và cảnh báo mọi reservation tồn tại quá thời gian cho phép.

Webhook vẫn là luồng chính; cron chỉ đóng vai trò reconciliation dự phòng.

### Agent API có thể bị dùng để giữ hàng giả

`POST /api/checkout` là API công khai, bật CORS `*`, và mỗi lần gọi hợp lệ có thể tạo phiên checkout và giữ tồn kho. Mã nguồn có rate limit 20 request/phút theo hostname, route và IP, nhưng một mạng bot phân tán vẫn có thể tạo nhiều phiên thanh toán chưa trả tiền.

Đối với cửa hàng có sản phẩm số lượng ít, tôi sẽ thêm ít nhất một trong các biện pháp:

- Turnstile hoặc challenge thích ứng cho checkout đáng ngờ.
- Giới hạn số reservation đang hoạt động trên mỗi IP, cookie hoặc email.
- Khoảng thời gian giữ hàng ngắn hơn.
- API key cho agent đối tác.
- WAF rule và bot score.
- Tắt agent checkout nếu không thật sự sử dụng.

---

## 5\. D1 phù hợp, nhưng cần hiểu giới hạn của nó

Gói Free hiện cung cấp:

- 5 triệu rows read/ngày.
- 100.000 rows written/ngày.
- Tối đa 500 MB cho mỗi database.
- 7 ngày Time Travel.

Gói Paid tăng kích thước mỗi database lên 10 GB, Time Travel 30 ngày và thay daily limit bằng lượng sử dụng hàng tháng rất lớn trước khi tính thêm phí. [^6]

Minshop đã tạo index cho các truy vấn phổ biến như sản phẩm đang active, đơn hàng theo thời gian và đơn hàng theo email; FTS5 cũng dùng virtual index và trigger để đồng bộ sản phẩm. Đây là cách sử dụng D1 hợp lý.

Với một cửa hàng nhỏ có vài trăm đến vài nghìn sản phẩm, 5.000 lượt/ngày khó có khả năng làm D1 quá tải, miễn là không có truy vấn full scan bất thường. Nên theo dõi `rows_read` thực tế trong dashboard vì D1 tính cả số hàng bị scan, không chỉ số hàng trả về. [^6]

### Vị trí D1

Nếu phần lớn người mua ở Việt Nam hoặc Đông Nam Á, hãy tạo D1 với location hint `apac`. Location hint là best-effort nhưng giúp primary được đặt gần khu vực người dùng hơn. [^7]

Nếu khách hàng phân bố toàn cầu, có thể bật read replication. Tuy nhiên, Cloudflare yêu cầu ứng dụng sử dụng D1 Sessions API; nếu vẫn gọi trực tiếp `env.DB`, mọi truy vấn tiếp tục chạy trên primary. Trong các đường đọc tôi kiểm tra của Minshop, mã hiện đang gọi trực tiếp `env.DB`, nên chỉ bật read replication trong dashboard chưa đủ. [^8]

Ở mức 5.000 lượt/ngày và khách chủ yếu tại một khu vực, chưa cần sửa điểm này.

---

## 6\. Bảo mật nhìn chung tốt, nhưng cần cấu hình đúng

Các điểm tích cực gồm:

- Admin password được hash bằng PBKDF2-HMAC-SHA256 với salt.
- Session được ký HMAC và tự vô hiệu hóa khi đổi mật khẩu.
- Cookie `HttpOnly`, `Secure` trên HTTPS và `SameSite=Lax`.
- Có Turnstile tùy chọn.
- Astro chặn cross-origin form POST theo mặc định.
- Trang Markdown không cho raw HTML, giảm nguy cơ stored XSS.
- Route admin UI và admin API đều được bảo vệ.

Điểm phải chú ý là lần triển khai đầu tiên, `/admin/setup` được mở cho đến khi tạo mật khẩu. Cần hoàn tất setup ngay hoặc, tốt hơn, đặt Cloudflare Access trước cả:

```
/admin/*
/api/admin/*
```

Không chỉ bảo vệ `/admin`; nếu bỏ sót `/api/admin`, endpoint thay đổi dữ liệu có thể còn truy cập được. Mã nguồn và README đều khuyến nghị Cloudflare Access cho production.

MCP Worker có thiết kế fail-closed: không có `MCP_TOKEN` thì trả 503, và client phải gửi bearer token. Điều này đủ cho cửa hàng một người quản lý. Nhưng bearer token hiện là một quyền toàn phần, chưa có role, scope hay audit identity cho từng nhân viên. Với nhiều người vận hành, nên đặt MCP sau Access hoặc chuyển sang OAuth có scope.

Trong middleware tôi thấy HSTS, `nosniff` và `X-Frame-Options`; tôi sẽ bổ sung thêm Content Security Policy, Referrer Policy và Permissions Policy trước khi production.

---

## 7\. Email cần một hàng đợi retry

Thiết kế hiện tại cố ý không để lỗi email làm rollback đơn hàng. Đây là lựa chọn đúng: thanh toán đã hoàn tất thì đơn phải được lưu dù nhà cung cấp email đang lỗi.

Tuy nhiên, email được gửi ngay sau khi ghi đơn, lỗi chỉ được log rồi bỏ qua; chưa có durable retry. Như vậy một lỗi mạng tạm thời có thể khiến khách hàng không bao giờ nhận được email xác nhận.

Tôi sẽ dùng mô hình outbox:

1. Trong transaction chốt đơn, ghi thêm một hàng vào `email_outbox`.
2. Queue consumer hoặc Cron gửi email.
3. Nếu lỗi, retry với exponential backoff.
4. Chỉ đánh dấu `sent_at` sau khi provider xác nhận.
5. Admin có nút gửi lại receipt.

Với cửa hàng nhỏ, đây là phần bổ sung không lớn nhưng cải thiện độ tin cậy đáng kể.

---

## 8\. Backup đã có nền tảng, nhưng chưa đủ cho dữ liệu kinh doanh dài hạn

D1 Time Travel luôn được bật tự động, với 7 ngày trên Free và 30 ngày trên Paid. Nó rất hữu ích khi migration lỗi hoặc vô tình chạy nhầm `UPDATE` / `DELETE`. [^9]

Tuy nhiên, Minshop dùng FTS5 và tài liệu dự án ghi rõ `wrangler d1 export` không xuất được database có virtual table. Quy trình backup phải tạm bỏ bảng `products_fts`, export, rồi tạo lại FTS index.

Với production tôi sẽ có:

- Time Travel làm recovery ngắn hạn.
- Export định kỳ lưu sang R2 hoặc vị trí ngoài Cloudflare.
- Script tự động drop/recreate FTS trong bản export.
- Kiểm thử restore định kỳ, không chỉ kiểm tra rằng file backup tồn tại.
- Lưu Stripe session ID và webhook event ID đủ để đối soát lại sau recovery.

---

## 9\. Nhận xét riêng về Workers AI, Vectorize và semantic search

Thiết kế fallback của Minshop khá tốt:

- Semantic search chỉ chạy khi cả Workers AI và Vectorize tồn tại.
- Nếu AI hoặc Vectorize lỗi, hệ thống quay về FTS5.
- Sản phẩm được embed khi tạo hoặc cập nhật.
- Related products có fallback theo category.

Nhưng với cửa hàng nhỏ, semantic search chưa chắc đem lại giá trị tương xứng. FTS5 thường đã đủ cho catalog vài trăm hoặc vài nghìn sản phẩm. Workers AI hiện có 10.000 neurons/ngày miễn phí và tính phí vượt mức trên Paid; Vectorize cũng có allowance riêng. [^10]

Tôi sẽ bắt đầu bằng FTS5, theo dõi các truy vấn không có kết quả, rồi chỉ bật semantic search nếu dữ liệu thực tế cho thấy khách thường tìm bằng câu mô tả tự nhiên.

---

## 10\. Mô hình agent và Lightning: thú vị nhưng chưa nên là luồng chính

### Agent mua hàng

Phần này được thiết kế hợp lý vì agent chỉ gửi slug, số lượng, biến thể và add-on; server vẫn tính lại giá và kiểm tra tồn kho từ D1. Agent không được quyền tự khai giá.

Tuy vậy, agent checkout nên được coi là một API bổ sung chứ không phải lý do chính để chọn kiến trúc này. Cần thêm idempotency key phía client, quota, giới hạn số tiền, allowlist và cơ chế chống tạo reservation hàng loạt.

### Agent quản trị qua MCP

Một MCP Worker riêng là cách tách biệt hợp lý. Nó không làm phình bundle storefront và có thể triển khai, giới hạn hoặc tắt độc lập. Bearer token fail-closed phù hợp cho một chủ shop; nhiều người dùng thì cần OAuth, scope và audit log.

### Lightning

Lightning có thể cho phép agent trả hóa đơn mà không nhập thẻ, nhưng làm tăng đáng kể trách nhiệm vận hành:

- Phải vận hành phoenixd hoặc LNbits.
- Phải backup seed.
- Phải bảo vệ node API.
- Phải phụ thuộc vào nguồn tỷ giá fiat/BTC.
- Tax và promotion code không dùng chung như Stripe.
- Lightning không có automatic refund theo cách của thanh toán thẻ.

Với một cửa hàng thông thường, tôi sẽ triển khai Stripe hoặc cổng thanh toán truyền thống trước; Lightning và MCP chỉ bật sau khi hoạt động cốt lõi đã ổn định.

---

## 11\. So với WooCommerce

Kiến trúc Cloudflare này thắng WooCommerce ở:

- Không phải quản lý VPS, PHP-FPM, MySQL, Redis hoặc cache plugin.
- Không phải vá WordPress/plugin liên tục.
- Scale tự động.
- Ít JavaScript phía client.
- Chi phí hạ tầng thấp và tương đối dễ dự đoán.
- Mã checkout, giá và tồn kho có thể kiểm soát chặt chẽ.

Nhưng thua WooCommerce ở:

- Không có hệ sinh thái plugin khổng lồ.
- Không có hàng nghìn theme và extension sẵn có.
- Tích hợp ERP, marketing, CRM, vận chuyển và thanh toán thường phải tự viết.
- Vendor lock-in với Workers, D1, R2, Cache API và các binding ở mức trung bình đến cao.
- Khó thuê người quản trị không biết lập trình hơn.
- Khi cần tính năng mới, bạn chủ yếu phải sửa code thay vì cài plugin.

Minshop có `PaymentProvider` và `StorageProvider` để giảm lock-in cho thanh toán và lưu trữ, nhưng runtime, database và deployment vẫn gắn khá sâu với Cloudflare.

Nếu cửa hàng bán tại Việt Nam và cần VNPay, MoMo, ZaloPay, COD, đơn vị vận chuyển nội địa, hóa đơn điện tử hoặc đồng bộ phần mềm bán hàng thì cần viết thêm adapter; Minshop hiện tập trung vào Stripe, Lightning và OpenNode.

---

## Cấu hình production tôi đề xuất

| Thành phần | Cấu hình nên dùng |
| --- | --- |
| Workers | Paid, tối thiểu 5 USD/tháng |
| D1 | Primary tại APAC |
| Ảnh | R2 custom domain, cache immutable |
| Search | FTS5 trước; AI/Vectorize tắt |
| Thanh toán | Một cổng truyền thống trước; demo tắt |
| Admin | Cloudflare Access cho cả UI và API |
| Bot protection | Turnstile + rate limits + WAF |
| Tồn kho | Reservation hiện tại + cron reconciliation |
| Email | Outbox/Queue có retry |
| Backup | Time Travel + export dài hạn + test restore |
| Giám sát | Worker 5xx, CPU, request count, D1 rows read/write, reservation quá hạn, webhook lỗi |
| Kiểm thử tải | Catalog cache miss, nhiều checkout cùng SKU, webhook gửi trùng và webhook đến sai thứ tự |

## Phán quyết cuối cùng

**Tôi sẽ chấp thuận kiến trúc này cho một cửa hàng khoảng 5.000 lượt truy cập/ngày.** Khả năng chịu tải không phải điểm yếu; thậm chí nó có thể phục vụ lưu lượng lớn hơn nhiều.

Nhưng đây vẫn là dự án phiên bản `0.1.0`, dù có CI và khá nhiều kiểm thử tích hợp cho D1, reservation, checkout và refund. Vì vậy, nên coi nó là **một nền tảng kỹ thuật tốt cần được chủ cửa hàng sở hữu và duy trì**, không phải một sản phẩm hoàn chỉnh có thể triển khai rồi bỏ mặc như Shopify.

Với **Workers Paid, ảnh qua R2 custom domain, Cloudflare Access, reconciliation cho webhook, email retry và backup được kiểm thử**, đây là một kiến trúc rất hợp lý, tiết kiệm và sạch cho một cửa hàng nhỏ.

[^1]: [developers.cloudflare.com](https://developers.cloudflare.com/d1/platform/limits/?utm_source=chatgpt.com)

[^2]: [developers.cloudflare.com](https://developers.cloudflare.com/workers/platform/pricing/)

[^3]: [developers.cloudflare.com](https://developers.cloudflare.com/workers/platform/limits/?utm_source=chatgpt.com)

[^4]: [developers.cloudflare.com](https://developers.cloudflare.com/r2/buckets/public-buckets/?utm_source=chatgpt.com)

[^5]: [developers.cloudflare.com](https://developers.cloudflare.com/d1/worker-api/d1-database/?utm_source=chatgpt.com)

[^6]: [developers.cloudflare.com](https://developers.cloudflare.com/d1/platform/pricing/?utm_source=chatgpt.com)

[^7]: [developers.cloudflare.com](https://developers.cloudflare.com/d1/configuration/data-location/?utm_source=chatgpt.com)

[^8]: [developers.cloudflare.com](https://developers.cloudflare.com/d1/best-practices/read-replication/?utm_source=chatgpt.com)

[^9]: [developers.cloudflare.com](https://developers.cloudflare.com/d1/reference/time-travel/?utm_source=chatgpt.com)

[^10]: [developers.cloudflare.com](https://developers.cloudflare.com/workers-ai/platform/pricing/?utm_source=chatgpt.com)

source: https://chatgpt.com/c/6a66bb69-ada0-83ec-9663-127862c03b7b