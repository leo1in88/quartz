Script gốc để ở google sheet gốc
```
var CONFIG_SHEET = "Dashboard";

var RESULT_SHEET = "Combined_Emails";

  

function aggregateSelectedGmails() {

  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var dashboard = ss.getSheetByName(CONFIG_SHEET);

  if (!dashboard) return;

  

  // 1. Lấy từ khóa ở A1 và Dữ liệu từ dòng 3 (Cột A: Tên, B: URL, C: Checkbox)

  var searchTerm = dashboard.getRange("A1").getValue() || "";

  // Lấy dữ liệu vùng A3:C103 (100 tài khoản)

  var configData = dashboard.getRange("A3:C103").getValues();

  var requests = [];

  var accountNames = [];

  

  // 2. Lọc ra những dòng được TÍCH CHỌN (Checkbox = true)

  configData.forEach(function(row) {

    var name = row[0];

    var url = row[1];

    var isSelected = row[2]; // Giá trị của checkbox ở cột C

  

    if (isSelected === true && url && url.indexOf("https") === 0) {

      accountNames.push(name);

      requests.push({

        url: url + "?q=" + encodeURIComponent(searchTerm),

        method: "get",

        muteHttpExceptions: true

      });

    }

  });

  

  // Kiểm tra nếu không có tài khoản nào được chọn

  if (requests.length === 0) {

    SpreadsheetApp.getUi().alert("Vui lòng tích chọn ít nhất một tài khoản ở cột C!");

    return;

  }

  

  // 3. Thực hiện fetchAll (Chỉ gọi những cái đã chọn)

  var responses = UrlFetchApp.fetchAll(requests);

  var allRows = [];

  

  responses.forEach(function(response, index) {

    try {

      var emails = JSON.parse(response.getContentText());

      if (Array.isArray(emails)) {

        emails.forEach(function(mail) {

          allRows.push([accountNames[index], new Date(mail.date), mail.from, mail.subject, mail.body]);

        });

      }

    } catch (e) {

      console.log("Lỗi tại tài khoản: " + accountNames[index]);

    }

  });

  

  // 4. Ghi vào sheet tổng hợp

  var sheet = ss.getSheetByName(RESULT_SHEET) || ss.insertSheet(RESULT_SHEET);

  sheet.clear();

  sheet.getRange(1, 1, 1, 5).setValues([["Tài khoản", "Ngày", "Người gửi", "Tiêu đề", "Nội dung"]]).setFontWeight("bold");

  if (allRows.length > 0) {

    // Sắp xếp: Tên tài khoản -> Thời gian

    allRows.sort(function(a, b) {

      if (a[0] < b[0]) return -1;

      if (a[0] > b[0]) return 1;

      return b[1] - a[1];

    });

  

    sheet.getRange(2, 1, allRows.length, 5).setValues(allRows);

    sheet.autoResizeColumns(1, 5);

    sheet.setColumnWidth(5, 600);

  }

  SpreadsheetApp.getUi().alert("Đã cập nhật xong từ " + accountNames.length + " tài khoản được chọn.");

}

  

// Ham nay tu dong chay moi khi ban chinh sua mot o tren bang tinh

function onEdit(e) {

  if (!e) return;

  var sheet = e.source.getActiveSheet();

  var range = e.range;

  // Kiem tra xem thao tac co dang dien ra o sheet Dashboard va chinh xac tai o C2 khong

  if (sheet.getName() === "Dashboard" && range.getA1Notation() === "C2") {

    // Lay trang thai hien tai cua o C2 (true hoac false)

    var isChecked = range.getValue();

    // Xac dinh dong cuoi cung co du lieu o cot A hoac B de chi check den do

    var lastRow = sheet.getLastRow();

    if (lastRow >= 3) {

      // Ap dung trang thai cua C2 cho toan bo cac o tu C3 tro xuong

      sheet.getRange(3, 3, lastRow - 2, 1).setValue(isChecked);

    }

  }

}
```

Script trong các acc con:
```
function doGet(e) {

  try {

    var q = e.parameter.q || "";

    // Lay 5 email moi nhat moi tai khoan (de tranh du lieu qua nang khi nhan tu 100 acc)

    var threads = GmailApp.search(q, 0, 5);

    var results = [];

    threads.forEach(function(thread) {

      var msg = thread.getMessages().pop();

      // XU LY XOA KHOANG TRONG: Bien moi xuong dong, tab thanh 1 khoang trang

      var cleanBody = msg.getPlainBody()

                        .substring(0, 400)

                        .replace(/[\n\r\t]+/g, " ") // Thay the xuong dong/tab bang " "

                        .replace(/\s{2,}/g, " ")    // Thay the 2 khoang trang tro len bang 1 " "

                        .trim();

      results.push({

        date: msg.getDate(),

        from: msg.getFrom(),

        subject: msg.getSubject(),

        body: cleanBody

      });

    });

    return ContentService.createTextOutput(JSON.stringify(results))

      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {

    return ContentService.createTextOutput(JSON.stringify([])).setMimeType(ContentService.MimeType.JSON);

  }

}
```