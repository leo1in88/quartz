Quy trình: tạo web app -> lấy email thông qua script kết nối đến web app.
```
// 1. THAY URL WEB APP SAU KHI DEPLOY PHIEN BAN MOI

var WEB_APP_URL = "URL_WEB_APP_CUA_BAN";

// 2. THAY ID CUA SPREADSHEET

var SPREADSHEET_ID = "ID_SPREADSHEET_CUA_BAN";

// 3. TEN TRANG TINH

var SHEET_NAME = "myalphastyles";

  

function onOpen() {

  var ui = SpreadsheetApp.getUi();

  ui.createMenu('Công cụ Gmail')

      .addItem('Lấy 10 email của Host', 'triggerHostScript')

      .addToUi();

}

  

/**

 * Ham kich hoat chay duoi quyen Host

 */

function triggerHostScript() {

  if (WEB_APP_URL.includes("URL_WEB_APP")) {

    SpreadsheetApp.getUi().alert("Ban chua cau hinh URL Web App.");

    return;

  }

  try {

    var response = UrlFetchApp.fetch(WEB_APP_URL + "?t=" + new Date().getTime(), {

      "muteHttpExceptions": true

    });

    if (response.getResponseCode() == 200) {

      SpreadsheetApp.getUi().alert("Dang cap nhat du lieu cho sheet: " + SHEET_NAME);

    } else {

      SpreadsheetApp.getUi().alert("Loi: " + response.getContentText());

    }

  } catch (e) {

    SpreadsheetApp.getUi().alert("Loi ket noi: " + e.toString());

  }

}

  

function doGet() {

  try {

    getRecentEmails();

    return ContentService.createTextOutput("Success");

  } catch (e) {

    return ContentService.createTextOutput("Error: " + e.toString());

  }

}

  

/**

 * Ham thuc thi chinh

 */

function getRecentEmails() {

  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) throw new Error("Khong tim thay sheet: " + SHEET_NAME);

  var searchTerm = sheet.getRange("A1").getValue();

  var query = (!searchTerm || searchTerm.toString().trim() === "") ? "" : searchTerm;

  // Xoa du lieu cu

  var lastRow = sheet.getLastRow();

  if (lastRow >= 3) {

    sheet.getRange(3, 1, lastRow - 2, 4).clearContent();

  }

  var threads = GmailApp.search(query, 0, 10);

  var results = [];

  for (var i = 0; i < threads.length; i++) {

    var messages = threads[i].getMessages();

    var lastMessage = messages[messages.length - 1];

    var rawSnippet = lastMessage.getPlainBody().substring(0, 200);

    // Xu ly fix link neu co dau cach trong snippet

    var cleanSnippet = fixLinksInText(rawSnippet);

    results.push([

      lastMessage.getDate(),

      lastMessage.getFrom(),

      lastMessage.getSubject(),

      cleanSnippet

    ]);

  }

  if (results.length > 0) {

    sheet.getRange(2, 1, 1, 4).setValues([["Ngày", "Người gửi", "Tiêu đề", "Nội dung (Đã fix link)"]]);

    sheet.getRange(2, 1, 1, 4).setFontWeight("bold").setBackground("#f3f3f3");

    sheet.getRange(3, 1, results.length, 4).setValues(results);

    sheet.autoResizeColumns(1, 4);

  }

}

  

/**

 * Ham ho tro tim va thay the khoang trong trong link bang %20

 */

function fixLinksInText(text) {

  if (!text) return "";

  // Regex tim cac chuoi giong URL (bat dau bang http hoac https)

  var urlRegex = /(https?:\/\/[^\s]+)/g;

  // Luu y: Neu link co dau cach, regex thong thuong se bi ngat o dau cach do.

  // Neu link cua ban bi loi do dau cach, ta can dung encodeURI cho toan bo text

  // hoac xu ly rieng neu ban co mot cot link rieng biet.

  // Cach don gian nhat de fix link co dau cach la dung replace

  return text.replace(/ /g, "%20");

  // Neu ban chi muon fix rieng phan URL ma khong anh huong den van ban:

  // (Cach nay phuc tap hon mot chut, nen dung neu snippet co ca chu va link)

}
```