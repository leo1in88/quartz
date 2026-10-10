```
// Khai bao cac thong so cau hinh
const SHOPIFY_STORE_URL = 'bookaesthetics.myshopify.com';
const API_VERSION = '2024-04';
const ACCESS_TOKEN = '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';

// Ham doc bang gia tu sheet Price_Rules
function getPriceMap() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let priceSheet = ss.getSheetByName('Price_Rules');
  if (!priceSheet) return {};
  
  const data = priceSheet.getDataRange().getValues();
  let priceMap = {};
  
  for (let i = 1; i < data.length; i++) {
    const key = data[i][0] ? data[i][0].toString().toLowerCase().trim() : "";
    const price = data[i][3];
    if (key !== "") priceMap[key] = price;
  }
  return priceMap;
}

// Ham tu dong tim ID cua cac kenh ban hang
function getTargetPublicationIds() {
  const url = `https://${SHOPIFY_STORE_URL}/admin/api/${API_VERSION}/graphql.json`;
  const query = `
    query {
      publications(first: 20) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `;
  
  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: { 'X-Shopify-Access-Token': ACCESS_TOKEN },
    payload: JSON.stringify({ query: query }),
    muteHttpExceptions: true
  };
  
  try {
    const response = UrlFetchApp.fetch(url, options);
    const result = JSON.parse(response.getContentText());
    let targetIds = [];
    
    if (result.data && result.data.publications) {
      const nodes = result.data.publications.edges;
      const targetNames = ["Online Store", "Inbox", "Google & YouTube"]; 
      
      for (let i = 0; i < nodes.length; i++) {
        const pubName = nodes[i].node.name;
        if (targetNames.includes(pubName)) {
          targetIds.push({ publicationId: nodes[i].node.id });
        }
      }
    }
    return targetIds;
  } catch (e) {
    Logger.log('Loi lay danh sach kenh ban hang: ' + e.toString());
    return [];
  }
}

// Ham bat cong tac publish san pham len cac kenh da tim duoc
function publishProductToChannels(productId, publicationInputs) {
  if (!publicationInputs || publicationInputs.length === 0) return;
  
  const url = `https://${SHOPIFY_STORE_URL}/admin/api/${API_VERSION}/graphql.json`;
  const query = `
    mutation publishablePublish($id: ID!, $input: [PublicationInput!]!) {
      publishablePublish(id: $id, input: $input) {
        userErrors {
          field
          message
        }
      }
    }
  `;
  
  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: { 'X-Shopify-Access-Token': ACCESS_TOKEN },
    payload: JSON.stringify({
      query: query,
      variables: {
        id: productId,
        input: publicationInputs
      }
    }),
    muteHttpExceptions: true
  };
  
  UrlFetchApp.fetch(url, options);
}

function uploadCompactedProductsToShopify() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet(); 
  const data = sheet.getDataRange().getValues();
  
  const priceMap = getPriceMap();
  const targetPublications = getTargetPublicationIds();
  
  let products = {};
  let currentProductTitle = "";

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const title = row[0] ? row[0].toString().trim() : "";
    const bodyHtml = row[1] ? row[1].toString() : "";
    const imagesRaw = row[2] ? row[2].toString() : "";
    const style = row[3] ? row[3].toString().trim() : "";
    const sizesRaw = row[4] ? row[4].toString() : "";
    const colorsRaw = row[5] ? row[5].toString() : "";
    const tagsRaw = row[6] ? row[6].toString() : "";
    
    // Khoi tao san pham moi va truyen thong tin mac dinh
    if (title !== "") {
      currentProductTitle = title;
      
      let filesArray = [];
      if (imagesRaw !== "") {
        filesArray = imagesRaw.split(',').map(function(url) {
          return {
            alt: currentProductTitle,
            contentType: "IMAGE",
            originalSource: url.trim()
          };
        });
      }

      let tagsArray = [];
      if (tagsRaw !== "") {
        tagsArray = tagsRaw.split(',').map(function(tag) {
          return tag.trim();
        });
      }

      products[currentProductTitle] = {
        title: currentProductTitle,
        descriptionHtml: bodyHtml,
        files: filesArray,
        status: "ACTIVE", 
        productType: "Apparel", 
        vendor: "Bookaesthetics",
        categoryId: "gid://shopify/TaxonomyCategory/aa", // ID chuan cho Apparel & Accessories
        tags: tagsArray,
        productOptions: [
          { name: "Style", values: [] },
          { name: "Size", values: [] },
          { name: "Color", values: [] }
        ],
        variants: []
      };
    }

    // Xu ly cac option va bien the (variant) cho san pham
    if (currentProductTitle !== "" && style !== "" && sizesRaw !== "" && colorsRaw !== "") {
      const sizesArray = sizesRaw.split(',');
      const colorsArray = colorsRaw.split(',');
      
      if (!products[currentProductTitle].productOptions[0].values.find(v => v.name === style)) {
        products[currentProductTitle].productOptions[0].values.push({name: style});
      }

      for (let j = 0; j < sizesArray.length; j++) {
        const size = sizesArray[j].trim();
        if (!products[currentProductTitle].productOptions[1].values.find(v => v.name === size)) {
          products[currentProductTitle].productOptions[1].values.push({name: size});
        }
        
        const searchKey = style.toLowerCase() + "-" + size.toLowerCase();
        let price = priceMap[searchKey];
        if (!price) price = "0.00"; 

        for (let k = 0; k < colorsArray.length; k++) {
          const color = colorsArray[k].trim();
          if (!products[currentProductTitle].productOptions[2].values.find(v => v.name === color)) {
            products[currentProductTitle].productOptions[2].values.push({name: color});
          }

          products[currentProductTitle].variants.push({
            optionValues: [
              { name: style, optionName: "Style" },
              { name: size, optionName: "Size" },
              { name: color, optionName: "Color" }
            ],
            price: price.toString(),
            sku: currentProductTitle.substring(0,4).toUpperCase() + "-" + style.substring(0,3).toUpperCase() + "-" + size.toUpperCase() + "-" + color.substring(0,3).toUpperCase()
          });
        }
      }
    }
  }

  // Day san pham da dong goi hoan chinh len Shopify
  for (let title in products) {
    const productData = sendToShopifyGraphQL(products[title]);
    
    if (productData && productData.id) {
      Logger.log('Da tao thanh cong: ' + title);
      
      if (targetPublications.length > 0) {
        publishProductToChannels(productData.id, targetPublications);
        Logger.log('Da mo ban tren cac kenh: Online Store, Inbox, Google & YouTube.');
      }
    }
  }
}

function sendToShopifyGraphQL(productObj) {
  const url = `https://${SHOPIFY_STORE_URL}/admin/api/${API_VERSION}/graphql.json`;
  
  const query = `
    mutation productSet($input: ProductSetInput!) {
      productSet(input: $input) {
        product {
          id
          title
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  // Tich hop tham so category vao input de tao ProductCategory
  const variables = {
    input: {
      title: productObj.title,
      descriptionHtml: productObj.descriptionHtml,
      status: productObj.status,
      productType: productObj.productType,
      vendor: productObj.vendor,
      category: productObj.categoryId, // Truyen field category tai day
      tags: productObj.tags,
      files: productObj.files,
      productOptions: productObj.productOptions,
      variants: productObj.variants
    }
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'X-Shopify-Access-Token': ACCESS_TOKEN
    },
    payload: JSON.stringify({
      query: query,
      variables: variables
    }),
    muteHttpExceptions: true
  };
  
  try {
    const response = UrlFetchApp.fetch(url, options);
    const result = JSON.parse(response.getContentText());
    
    if (result.data && result.data.productSet && result.data.productSet.product) {
      return result.data.productSet.product;
    } else {
      Logger.log('Loi GraphQL tai ' + productObj.title + ': ' + JSON.stringify(result.data.productSet.userErrors));
      return null;
    }
  } catch (e) {
    Logger.log('Loi he thong: ' + e.toString());
    return null;
  }
}
```