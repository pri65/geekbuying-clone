import { allCatagories } from "../components/chunks.js";

document.getElementById("allCatagoriesFilter").innerHTML = allCatagories();

// filter array

// let filtertDataStorage = JSON.parse(localStorage.getItem("filterDatabase")) || [];
let filtertDataStorage = masterRawAllProduct.filter(function (elem, index) {
  if (!elem.imageUrl.includes("loading")) {
    let a = new Date();
    elem.productId = a.getTime() + index;
    return elem;
  }
});

console.log(filtertDataStorage);
// display product 40 per page
let pagination = Math.ceil(filtertDataStorage.length / 40);

// pagination buttton create ================================>
document.getElementById("leftPaginationButton").innerText = "<";
document.getElementById("rightPaginationButton").innerText = ">";
displayAllProductPerPage(1, filtertDataStorage);

for (let page = 1; page <= pagination; page++) {
  let divBox = document.createElement("div");
  let paginationSpan = document.createElement("span");
  paginationSpan.innerText = page;
  divBox.append(paginationSpan);
  divBox.addEventListener("click", function () {
    let page = paginationSpan.innerText;
    displayAllProductPerPage(page, filtertDataStorage);
  });
  document.getElementById("paginationOnView").append(divBox);
  // displayAllProductPerPage(page, filtertDataStorage); // data passed
}

// array per page
function displayAllProductPerPage(i, arr) {
  let start = 40 * (i - 1);
  let targetTo = 40 * i;
  // container null
  // container null
  let container = document.getElementById("gridProductView");
  container.innerHTML = null;
  for (start; start < targetTo; start++) {
    //code here
    // arr start
    // pass product to displayonPage
    //test pass
    // console.log(arr[start]);
    displayProductByone(arr[start], container);
  }
}
// filteration

// display on page

function displayProductByone(
  {
    productName,
    currencySign,
    offerPrice,
    actualPrice,
    discount,
    shipToOmit,
    imageUrl,
    imageReview,
    review_num,
    freeShip,
    productId,
  },
  container
) {
  // outer box
  let boxDiv = document.createElement("div");
  boxDiv.setAttribute("class", "allProductBoxOuter");

  // inner box
  let innerBox = document.createElement("div");
  innerBox.setAttribute("class", "allProdcutBoxInner");

  let imageBox = document.createElement("div");
  imageBox.setAttribute("class", "innerProductImage");
  let image = document.createElement("img");
  image.src = imageUrl;
  // new or old tag as absulute on image div
  // new or old tag as absulute on image div
  imageBox.append(image);

  // product nname
  let productNameSpan = document.createElement("span");
  productNameSpan.setAttribute("class", "productNameInBox");
  productNameSpan.innerText = productName;

  // price info
  // this value will shuffle
  let productInfo = document.createElement("span");
  productInfo.setAttribute("class", "priceInfo");

  let currencySignS = document.createElement("span");
  currencySignS.setAttribute("class", "currencySign");
  currencySignS.innerText = currencySign;

  let currencyAmount = document.createElement("span");
  currencyAmount.setAttribute("class", "currencyAmount");
  currencyAmount.innerText = offerPrice;

  productInfo.append(currencySignS, currencyAmount);

  // actual and discount
  //    <!-- it will update only in the case of diff between actual and offer price is zero  -->
  let actualPriceInfo = document.createElement("span");
  actualPriceInfo.setAttribute("class", "actualPriceInfo");

  let actualPriceValue = document.createElement("span");
  actualPriceValue.setAttribute("class", "actualPriceInBox");
  if (discount != "" && actualPrice != 0.0) {
    actualPriceValue.innerText = `${currencySign} ${actualPrice}`;
  }
  let discountValue = document.createElement("span");
  discountValue.setAttribute("class", "discountInfoInBox");
  discountValue.innerText = discount;

  actualPriceInfo.append(actualPriceValue, discountValue);

  // Last box
  let footerBox = document.createElement("div");
  footerBox.setAttribute("class", "footerBox");

  let likeSignInfo = document.createElement("span");
  likeSignInfo.setAttribute("class", "likeProduct");

  let imageLike = document.createElement("img");
  imageLike.setAttribute("class", "likeUpdate");
  imageLike.src = "https://cdn-icons-png.flaticon.com/512/833/833300.png";
  if (imageReview) {
    imageLike.src = imageReview;
  }
  let countNoInfo = document.createElement("span");
  countNoInfo.setAttribute("class", "countNo");
  countNoInfo.innerText = review_num;
  // function to increment ===================================
  imageLike.addEventListener("click", function () {
    if (imageLike.src == "https://cdn-icons-png.flaticon.com/512/833/833300.png") {
        // countNoInfo.innerText = review_num++;
      increaseReviewCount(imageLike, productId, countNoInfo, review_num);
    } else {
      //   countNoInfo.innerText = review_num--;
      decreaseReviewCount(imageLike, productId, countNoInfo, review_num);
    }
    window.location.reload();
  });
  likeSignInfo.append(imageLike, countNoInfo);

  let freeShipInfo = document.createElement("span");
  freeShipInfo.setAttribute("class", "freeShiping");
  if (freeShip) {
    freeShipInfo.innerText = "FreeShip";
  }
  footerBox.append(likeSignInfo, freeShipInfo);

  // produuct id
  let productIdSpan = document.createElement("span");
  productIdSpan.setAttribute("id", productId);

  // inner box append
  innerBox.append(
    imageBox,
    productNameSpan,
    productInfo,
    actualPriceInfo,
    footerBox,
    productIdSpan
  );
  boxDiv.append(innerBox);
  imageBox.addEventListener("click", function () {
    dataPassToDetail(
      productName,
      currencySign,
      offerPrice,
      actualPrice,
      discount,
      shipToOmit,
      imageUrl,
      review_num,
      freeShip,
      productId,
    );
  });
  container.append(boxDiv);
}
// displayProductInAll(masterData);

function increaseReviewCount(imageSS, productId, countNoInfo, review_num) {
  countNoInfo.innerText = review_num++;
  imageSS.src = "https://cdn-icons-png.flaticon.com/512/833/833472.png";
  masterRawAllProduct.forEach(function (element, index) {
    if (element.productId == productId) {
      element.review_num++;
      element.imageReview = "https://cdn-icons-png.flaticon.com/512/833/833472.png";
    }
  });
  localStorage.setItem(
    "masterAllLocalData",
    JSON.stringify(masterRawAllProduct)
  );
}

function decreaseReviewCount(imageSS, productId, countNoInfo, review_num) {
  countNoInfo.innerText = review_num--;

  imageSS.src =
    "https://cdn-icons-png.flaticon.com/512/833/833300.png";

  masterRawAllProduct.forEach(function (element, index) {
    if (element.productId == productId) {
      element.review_num--;
      element.imageReview =
        "https://cdn-icons-png.flaticon.com/512/833/833300.png";
    }
  });
  localStorage.setItem(
    "masterAllLocalData",
    JSON.stringify(masterRawAllProduct)
  );
}

// data push to detail --=============================================
class Product {
  constructor(
    productName,
    currencySign,
    offerPrice,
    actualPrice,
    discount,
    shipToOmit,
    imageUrl,
    review_num,
    freeShip,
    productId,
    shipto
  ) {
    this.productName = productName;
    this.currencySign = currencySign;
    this.offerPrice = offerPrice;
    this.actualPrice = actualPrice;
    this.discount = discount;
    this.shipToOmit = shipToOmit; // it's array of countries
    this.imageUrl = imageUrl;
    this.review_num = review_num;
    this.freeShip = freeShip;
    this.productId = productId;
    this.shipto = shipto;
  }
}

function dataPassToDetail(
  productName,
  currencySign,
  offerPrice,
  actualPrice,
  discount,
  shipToOmit,
  imageUrl,
  review_num,
  freeShip,
  productId
) {
  let shipto = document.getElementById("shipToNavImg");
  let newObj = new Product(
    productName,
    currencySign,
    offerPrice,
    actualPrice,
    discount,
    shipToOmit,
    imageUrl,
    review_num,
    freeShip,
    productId,
    shipto.alt
  );
  //   console.log(newObj)
  // localStore
  localStorage.setItem("dataToLocalDetail", JSON.stringify(newObj));

  //
  window.location.href = "/productpage/productDetail.html";
}
