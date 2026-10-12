```
// Khai bao cac thong so cau hinh chung
const SHOPIFY_STORE_URL = 'bookaesthetics.myshopify.com';
const API_VERSION = '2024-04';
const ACCESS_TOKEN = '******************************';

// ==========================================
// KICH HOAT CHAY QUY TRINH
// ==========================================
// Tao menu tren giao dien Google Sheet khi mo file
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  
  ui.createMenu('Shopify Sync')
    .addItem('Dong bo Sweatshirt tu Etsy', 'runSweatshirtSync')
    .addItem('Tao Sweatshirt thu cong', 'runSweatshirtManualSync')
    .addItem('Dong bo CC tu Etsy', 'runCCSync')
    .addToUi();
}
// Nut chay cho nhom Sweatshirt dong bo tu Etsy
function runSweatshirtSync() {
  mainProcess('sweatshirt', 'sweatshirt_etsy', 'Price_Rules_Sweatshirt');
}

// Nut chay cho nhom Sweatshirt tao thu cong
function runSweatshirtManualSync() {
  manualProcess('sweatshirt', 'sweatshirt_nhap_tay', 'Price_Rules_Sweatshirt');
}
// Nut chay cho nhom CC ETsy
function runCCSync() {
  mainProcess('comfort color', 'comfort color_etsy', 'Price_Rules_CC');
}

// ==========================================
// HAM XU LY CHINH
// ==========================================

// Ham xu ly cho truong hop cao du lieu tu Etsy
function mainProcess(templateSheetName, etsySheetName, priceSheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const etsySheet = ss.getSheetByName(etsySheetName);
  const templateSheet = ss.getSheetByName(templateSheetName);
  
  if (!etsySheet || !templateSheet) return Logger.log("Loi: Khong tim thay sheet.");

  const etsyData = etsySheet.getDataRange().getValues();
  const priceMap = getPriceMap(priceSheetName);
  const targetPublications = getTargetPublicationIds();
  const template = getVariantTemplate(templateSheet);

  for (let i = 1; i < etsyData.length; i++) {
    const etsyUrl = etsyData[i][0] ? etsyData[i][0].toString().trim() : "";
    if (etsyUrl === "" || etsyData[i][1].toString().includes("https://")) continue;
    
    // Doc gia tri checkbox o cot C (index 2) xem co phai ao 2 mat hay khong
    const isTwoSided = etsyData[i][2] === true;
    
    const scrapedData = scrapeEtsyListing(etsyUrl);
    if (!scrapedData) continue;

    let filesArray = scrapedData.images.map(imgUrl => ({
      alt: scrapedData.title.substring(0, 100),
      contentType: "IMAGE",
      originalSource: imgUrl
    }));

    let productObj = {
      title: scrapedData.title,
      descriptionHtml: template.description,
      files: filesArray,
      status: "ACTIVE", 
      productType: "Apparel", 
      vendor: "Bookaesthetics",
      category: "gid://shopify/TaxonomyCategory/aa", 
      tags: template.tags,
      productOptions: [{ name: "Style", values: [] }, { name: "Size", values: [] }, { name: "Color", values: [] }],
      variants: []
    };

    template.styles.forEach(styleTpl => {
      const style = styleTpl.styleName;
      if (!productObj.productOptions[0].values.find(v => v.name === style)) productObj.productOptions[0].values.push({name: style});
      
      styleTpl.sizes.forEach(size => {
        if (!productObj.productOptions[1].values.find(v => v.name === size)) productObj.productOptions[1].values.push({name: size});
        const searchKey = style.toLowerCase() + "-" + size.toLowerCase();
        
        // Chuyen doi gia ve dang so thuc
        let basePrice = parseFloat(priceMap[searchKey]) || 0.00;
        // Neu tick chon ao 2 mat thi cong them 4
        if (isTwoSided) basePrice += 4;
        
        styleTpl.colors.forEach(color => {
          if (!productObj.productOptions[2].values.find(v => v.name === color)) productObj.productOptions[2].values.push({name: color});
          productObj.variants.push({
            optionValues: [{ name: style, optionName: "Style" }, { name: size, optionName: "Size" }, { name: color, optionName: "Color" }],
            price: basePrice.toFixed(2), // Dinh dang lai co 2 so thap phan
            sku: "ETSY-" + style.substring(0,3).toUpperCase() + "-" + size.toUpperCase() + "-" + color.substring(0,3).toUpperCase() + "-" + Math.floor(Math.random() * 1000)
          });
        });
      });
    });

    // Bat dau lenh curl day API
    const productData = sendToShopifyGraphQL(productObj);
    if (productData && productData.id) {
      let productIdNumeric = productData.id.split('/').pop();
      let productUrl = "https://" + SHOPIFY_STORE_URL + "/admin/products/" + productIdNumeric;
      etsySheet.getRange(i + 1, 2).setValue(productUrl);
      if (targetPublications.length > 0) publishProductToChannels(productData.id, targetPublications);
    }
    Utilities.sleep(1000); 
  }
}



// Ham xu ly cho truong hop nhap du lieu bang tay
function manualProcess(templateSheetName, manualSheetName, priceSheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const manualSheet = ss.getSheetByName(manualSheetName);
  const templateSheet = ss.getSheetByName(templateSheetName);
  
  if (!manualSheet || !templateSheet) return Logger.log("Loi: Khong tim thay sheet.");

  const manualData = manualSheet.getDataRange().getValues();
  const priceMap = getPriceMap(priceSheetName);
  const targetPublications = getTargetPublicationIds();
  const template = getVariantTemplate(templateSheet);

  for (let i = 1; i < manualData.length; i++) {
    const row = manualData[i];
    const title = row[0] ? row[0].toString().trim() : "";
    const customDesc = row[1] ? row[1].toString().trim() : "";
    const imagesRaw = row[2] ? row[2].toString().trim() : "";
    const customTagsRaw = row[3] ? row[3].toString().trim() : ""; 
    
    // Doc gia tri checkbox o cot F (index 5)
    const isTwoSided = row[5] === true;
    
    if (title === "" || (row[4] && row[4].toString().includes("https://"))) continue;

    let filesArray = imagesRaw !== "" ? imagesRaw.split(',').map(url => ({
      alt: title.substring(0, 100),
      contentType: "IMAGE",
      originalSource: url.trim()
    })) : [];

    let finalTags = [...template.tags];
    if (customTagsRaw !== "") finalTags = [...new Set([...finalTags, ...customTagsRaw.split(',').map(t => t.trim())])];

    let productObj = {
      title: title,
      descriptionHtml: customDesc !== "" ? customDesc : template.description, 
      files: filesArray,
      status: "ACTIVE", 
      productType: "Apparel", 
      vendor: "Bookaesthetics",
      category: "gid://shopify/TaxonomyCategory/aa", 
      tags: finalTags, 
      productOptions: [{ name: "Style", values: [] }, { name: "Size", values: [] }, { name: "Color", values: [] }],
      variants: []
    };

    template.styles.forEach(styleTpl => {
      const style = styleTpl.styleName;
      if (!productObj.productOptions[0].values.find(v => v.name === style)) productObj.productOptions[0].values.push({name: style});
      
      styleTpl.sizes.forEach(size => {
        if (!productObj.productOptions[1].values.find(v => v.name === size)) productObj.productOptions[1].values.push({name: size});
        const searchKey = style.toLowerCase() + "-" + size.toLowerCase();
        
        // Chuyen doi gia ve dang so thuc
        let basePrice = parseFloat(priceMap[searchKey]) || 0.00;
        // Neu tick chon ao 2 mat thi cong them 4
        if (isTwoSided) basePrice += 4;
        
        styleTpl.colors.forEach(color => {
          if (!productObj.productOptions[2].values.find(v => v.name === color)) productObj.productOptions[2].values.push({name: color});
          productObj.variants.push({
            optionValues: [{ name: style, optionName: "Style" }, { name: size, optionName: "Size" }, { name: color, optionName: "Color" }],
            price: basePrice.toFixed(2), // Dinh dang lai co 2 so thap phan
            sku: "MANUAL-" + style.substring(0,3).toUpperCase() + "-" + size.toUpperCase() + "-" + color.substring(0,3).toUpperCase() + "-" + Math.floor(Math.random() * 1000)
          });
        });
      });
    });

    // Bat dau lenh curl day API
    const productData = sendToShopifyGraphQL(productObj);
    if (productData && productData.id) {
      let productIdNumeric = productData.id.split('/').pop();
      let productUrl = "https://" + SHOPIFY_STORE_URL + "/admin/products/" + productIdNumeric;
      manualSheet.getRange(i + 1, 5).setValue(productUrl); 
      if (targetPublications.length > 0) publishProductToChannels(productData.id, targetPublications);
    }
    Utilities.sleep(1000); 
  }
}

// ==========================================
// HAM HO TRO
// ==========================================

// Ham doc thong tin khuon mau variant va description
function getVariantTemplate(sheet) {
  const data = sheet.getDataRange().getValues();
  let templateObj = { description: data[1][1] ? data[1][1].toString() : "", styles: [], tags: [] };
  for (let i = 1; i < data.length; i++) {
    const style = data[i][3] ? data[i][3].toString().trim() : "";
    if (style !== "") templateObj.styles.push({ styleName: style, sizes: data[i][4].toString().split(',').map(s => s.trim()), colors: data[i][5].toString().split(',').map(c => c.trim()) });
    if (data[i][6]) templateObj.tags = [...new Set(templateObj.tags.concat(data[i][6].toString().split(',').map(t => t.trim())))];
  }
  return templateObj;
}

// Ham tao bang gia tu dong theo tung nhom
function getPriceMap(priceSheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(priceSheetName);
  if (!sheet) return {};
  const data = sheet.getDataRange().getValues();
  let map = {};
  for (let i = 1; i < data.length; i++) {
    if (data[i][0]) map[data[i][0].toString().toLowerCase().trim()] = data[i][3];
  }
  return map;
}

// Ham cao du lieu tu link Etsy, su dung regex 
function scrapeEtsyListing(url) {
  try {
    const options = { method: 'get', muteHttpExceptions: true, headers: { 'User-Agent': 'Mozilla/5.0' } };
    const html = UrlFetchApp.fetch(url, options).getContentText();
    let title = (html.match(/<meta property="og:title" content="([^"]+)"/) || [0, "Etsy Product"])[1].replace(/\s*-\s*Etsy.*$/, "").trim();
    let images = [], m, re = /"url_(?:1140xN|794xN|fullxfull)":"([^"]+)"/g;
    const zoomRe = /data-src-zoom-image="([^"]+)"/g;
    while ((m = zoomRe.exec(html)) !== null) images.push(m[1]);
    const largeRe = /data-large-image-href="([^"]+)"/g;
    while ((m = largeRe.exec(html)) !== null) images.push(m[1]);
    if (images.length === 0) {
      while ((m = re.exec(html)) !== null) images.push(m[1].replace(/\\u[\dA-F]{4}/gi, match => String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16))).replace(/\\\//g, '/'));
    }
    images = [...new Set(images)].filter(u => u.includes("etsystatic.com"));
    if (images.length === 0) {
      let ogImg = html.match(/<meta property="og:image" content="([^"]+)"/);
      if (ogImg) images.push(ogImg[1]);
    }
    return { title: title, images: images };
  } catch (e) { return null; }
}

// Ham gui query GraphQL den may chu Shopify (Co hien thi loi)
function sendToShopifyGraphQL(obj) {
  const url = `https://${SHOPIFY_STORE_URL}/admin/api/${API_VERSION}/graphql.json`;
  const query = `mutation productSet($input: ProductSetInput!) { productSet(input: $input) { product { id title } userErrors { field message } } }`;
  const options = {
    method: 'post', contentType: 'application/json',
    headers: { 'X-Shopify-Access-Token': ACCESS_TOKEN },
    payload: JSON.stringify({ query: query, variables: { input: obj } }),
    muteHttpExceptions: true
  };
  try { 
    const result = JSON.parse(UrlFetchApp.fetch(url, options).getContentText());
    
    // Neu Shopify tra ve loi, in ra man hinh log
    if (result.data && result.data.productSet && result.data.productSet.userErrors.length > 0) {
      Logger.log("LOI TỪ SHOPIFY CHO SẢN PHẨM [" + obj.title + "]: " + JSON.stringify(result.data.productSet.userErrors));
      return null;
    }
    
    return result.data.productSet.product; 
  } catch (e) { 
    Logger.log("Loi he thong: " + e.toString());
    return null; 
  }
}

// Ham truy xuat ID cac kenh ban hang
function getTargetPublicationIds() {
  const url = `https://${SHOPIFY_STORE_URL}/admin/api/${API_VERSION}/graphql.json`;
  const query = `query { publications(first: 20) { edges { node { id name } } } }`;
  const options = { method: 'post', contentType: 'application/json', headers: { 'X-Shopify-Access-Token': ACCESS_TOKEN }, payload: JSON.stringify({ query: query }), muteHttpExceptions: true };
  try {
    const res = JSON.parse(UrlFetchApp.fetch(url, options).getContentText());
    let ids = [];
    res.data.publications.edges.forEach(e => { if(["Online Store", "Inbox", "Google & YouTube"].includes(e.node.name)) ids.push({publicationId: e.node.id}); });
    return ids;
  } catch (e) { return []; }
}

// Ham bat cong tac publish cho san pham sau khi tao thanh cong
function publishProductToChannels(id, input) {
  const url = `https://${SHOPIFY_STORE_URL}/admin/api/${API_VERSION}/graphql.json`;
  const query = `mutation publishablePublish($id: ID!, $input: [PublicationInput!]!) { publishablePublish(id: $id, input: $input) { userErrors { field message } } }`;
  UrlFetchApp.fetch(url, { method: 'post', contentType: 'application/json', headers: { 'X-Shopify-Access-Token': ACCESS_TOKEN }, payload: JSON.stringify({ query: query, variables: { id: id, input: input } }) });
}
```