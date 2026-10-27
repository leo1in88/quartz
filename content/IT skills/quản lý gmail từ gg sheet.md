cài script sau vào các mail
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
