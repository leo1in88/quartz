---
title: "[Vọc Playwright] – Test generator"
source: "https://playwrightvn.com/blog/voc-playwright-test-generator/"
author:
  - "[[admin]]"
published: 2024-08-29
created: 2026-04-22
description: "Introduction Playwright có 1 tính năng cực kỳ tiện lợi: tự động tạo test cho bạn khi bạn tương tác với trang web! Chỉ cần lướt web như bình thường, Playwright sẽ ghi lại mọi thao tác của bạn: click…"
tags:
  - "clippings"
---
> https://playwright.dev/docs/codegen

## Introduction

- Playwright có 1 tính năng cực kỳ tiện lợi: tự động tạo test cho bạn khi bạn tương tác với trang web!
- Chỉ cần lướt web như bình thường, Playwright sẽ ghi lại mọi thao tác của bạn: click, typing, di chuyển chuột… Sau đó, nó sẽ tự động tạo ra một bài test kiểm tra xem website có hoạt động đúng như mong đợi hay không.
- Playwright sẽ tìm cách xác định chính xác element bạn tương tác, ưu tiên những cách xác định rõ ràng và độc đáo nhất. Nếu có nhiều element giống nhau, Playwright sẽ tự động “tinh chỉnh” để đảm bảo bài test chạy chính xác!

## Generate tests in VS Code

- Bạn có thể cài đặt extenstion của Playwright trên VsCode để tạo test case 1 cách dễ dàng. Extenstion này có sẵ trên **VS Code Marketplace**. Tham khảo hướng dẫn: https://youtu.be/LM4yqrOzmFE

## Record a New Test

- Để ghi lại action click vào button “Record new” trên Testing sidebar, bạn chỉ cần click vào “Record” và chọn button “Record new”. Playwright sẽ tự động tạo 1 file **test-1.spec.ts** và open 1 browser windown ![Record test](https://playwrightvn.com/wp-content/uploads/2024/08/055-record-new-test.png)
- Hãy vào trang web bạn muốn test và bắt đầu click như người dùng bình thường
- Playwright ghi lại hành động của bạn và generate code trực tiếp trong VSCode
- Bạn có thể “kiểm tra” các element trên trang web bằng cách chọn các icon trên toolbar
- Playwright sẽ giúp bạn tạo ra các assertion:
	- **assert visibility**: Kiểm tra xem một phần tử có hiển thị hay không.
		- **assert text**: Kiểm tra xem một phần tử có chứa văn bản cụ thể hay không.
		- **assert value**: Kiểm tra xem một phần tử có giá trị cụ thể hay không. ![Record assertion](https://playwrightvn.com/wp-content/uploads/2024/08/055-record-assertion.png)
- Sau khi bạn hoàn thành việc recording, hãy click vào cancle hoặc đóng browser window. Sau đó bạn có thể xem file `test-1.spec.ts` và tự tay sửa đổi để hoàn hảo hơn nếu cần ![Record done](https://playwrightvn.com/wp-content/uploads/2024/08/055-record-done.png)

## Record at Cursor

- Để record action tại 1 điểm cụ thể, bạn hãy di chuyển con trỏ đến vị trí muốn ghi và click vào **Record at cursor** ở Testing sidebar. Nếu chưa mở browser window, hãy chạy test với tuỳ chọn **Show browser** và sau đó click vào **Record at cursor** ![Record at cursor](https://playwrightvn.com/wp-content/uploads/2024/08/055-record-at-cursor.png)
- Trong browser window, hãy thực hiện các record muốn ghi lại ![Record at cursor example](https://playwrightvn.com/wp-content/uploads/2024/08/055-record-at-cursor-example.png)
- Trong file test của vs code, bạn sẽ thấy các action mới được thêm vào ngay tạo vị trí con trỏ

## Generating locators

- Bạn có thể tạo locators một cách dễ dàng với Test Generator của Playwright
	- Bật Test Generator: Click vào “Pick locator” trên Testing sidebar
		- Di chuột: Di chuột qua các element trên trang web trong browser, bạn sẽ thấy locator được tô sáng bên dưới mỗi element
		- Chọn element: Click vào element mà bạn muốn chọn. Locator của phần tử đó sẽ xuất hiện trong “Pick locator” trong vs code
		- Copy locator:
		- Nhấn Enter: Copy locator vào clipboard để paste vào code của bạn
				- Nhấn Escape: Huỷ bỏ việc chọn locator

## Generate tests with the Playwright Inspector

- Khi bạn chạy lệnh codegen, 2 tab sẽ được mở: Một tab để bạn tương tác với trang web muốn test và một tab Playwright Inspector để bạn ghi lại các action và copy chúng vào vs code

## Running Codegen

- Chạy lệnh codegen với URL của trang web muốn tạo test. URL là tuỳ chọn, bạn có thể chạy mà không cần URL, sau đó thêm URL trực tiếp vào browser window
```js
npx playwright codegen demo.playwright.dev/todomvc
```

## Recording a test

- Chạy lệnh codegen và thực hiện các hành động trong browser window. Playwright sẽ tạo code cho các tương tác của bạn, hiển thị trong tab Playwright Inspector. Khi hoàn thành record, hãy dừng và nhấn vào nút copy để copy code đã tạo vào vs code
- Test generator cho phép bạn ghi lại:
	- Các action click hoặc fill text bằng cách tương tác trực tiếp với trang web
		- Các assert bằng cách click vào các biểu tượng trên sidebar, sau đó click vào 1 element trên trang web để assert. Bạn có thể chọn:
		- **assert visibility**: Kiểm tra xem một phần tử có hiển thị hay không.
				- **assert text**: Kiểm tra xem một phần tử có chứa văn bản cụ thể hay không.
				- **assert value**: Kiểm tra xem một phần tử có giá trị cụ thể hay không. ![Recording a test](https://playwrightvn.com/wp-content/uploads/2024/08/055-recording-a-test.png)
- Khi bạn đã tương tác với trang web xong, hãy nhấn button **Record** để dừng record và sử dụng button copy để copy code đã tạo vào vscode
- Sử dụng button **Clear** để xoá code và bắt đầu record lại action mới. Khi hoàn thành, hãy đóng tab Playwright Inspector hoặc dừng trong terminal
- **Hình dung như bạn đang quay 1 bộ phim. Playwright Inspector là đạo diễn, ghi lại mọi hành động của bạn trên “bối cảnh” là trang web. Sau đó bạn có thể sử dụng mã đã tạo để “biên tập” và tạo ra 1 kịch bản hoàn chỉnh cho 1 bộ phim**

## Emulation

- Bạn có thể sử dụng test generator của Playwright để tạo các test trên nhiều thiết bị, kích thước màn hình, màu sắc, ngôn ngữ,… thậm chí là lưu trữ trạng thái đăng nhập

## Emulate viewport size

- Tạo test cho kích thước màn hình cụ thể
```js
npx playwright codegen --viewport-size=800,600 playwright.dev
```
- Lệnh này sẽ tạo test cho trang web playwright.dev với kích thước màn hình 800×600 pixels. ![Emulate viewport size](https://playwrightvn.com/wp-content/uploads/2024/08/055-emulate-viewport-size.png)

## Emulate devices

- Tạo test cho thiết bị cụ thể
```js
npx playwright codegen --device="iPhone 13" playwright.dev
```

![Emulate devices](https://playwrightvn.com/wp-content/uploads/2024/08/055-emulate-devices.png)

## Emulate color scheme

- Tạo test cho chế độ màu
```js
npx playwright codegen --color-scheme=dark playwright.dev
```

![Emulate color](https://playwrightvn.com/wp-content/uploads/2024/08/055-emulate-color.png)

## Emulate geolocation, language and timezone

- Playwright cho phép bạn mô phỏng vị trí địa lý, ngôn ngữ và múi giờ để tạo các test generator chính xác hơn
- Tạo test cho vị trí địa lý, ngôn ngữ và múi giờ
```js
npx playwright codegen --timezone="Europe/Rome" --geolocation="41.890221,12.492348" --lang="it-IT" bing.com/maps
```

## Preserve authenticated state

- Đoạn code bên dưới sẽ lưu thông tin đăng nhập (cookie và localStorage) vào file `auth.json` để sử dụng lại trong các lần test sau
```js
npx playwright codegen github.com/microsoft/playwright --save-storage=auth.json
```

![Authenticate](https://playwrightvn.com/wp-content/uploads/2024/08/055-authenticate.png)

- Lệnh này sẽ ghi nhớ các bước đăng nhập vào trang `github.com/microsoft/playwrigh` và lưu trạng thái đăng nhập vào file `auth.json`
- Bạn có thể sử dụng option `--load-storage` để tải trạng thái đăng nhập trước đó từ auth.json. Việc này sẽ khôi phục lại cookie và localStorage đưa trang vào trạng thái đã đăng nhập mà không cần đăng nhập lại
```js
npx playwright codegen --load-storage=auth.json github.com/microsoft/playwright
```

## Record using custom setup

- Bạn có thể sử dụng `page.pause()` để tạm dừng quá trình ghi test thủ công với các cài đặt tuỳ chỉnh, ví dụ như sử dụng \`browserContext.route()
```js
const { chromium } = require('@playwright/test');

(async () => {
  // Make sure to run headed.
  const browser = await chromium.launch({ headless: false });

  // Setup context however you like.
  const context = await browser.newContext({ /* pass any options */ });
  await context.route('**/*', route => route.continue());

  // Pause the page, and start recording manually.
  const page = await context.newPage();
  await page.pause();
})();
```

source: https://playwrightvn.com/blog/voc-playwright-test-generator/