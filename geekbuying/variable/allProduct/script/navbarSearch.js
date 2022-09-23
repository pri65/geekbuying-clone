let searchInputIn = document.getElementById("searchNav");
searchInputIn.addEventListener("input", function () {
  searchInInputDowScroll();
});

function searchInInputDowScroll() {
  let inputKeyWord = document.getElementById("searchNav");
  let searchScrollView = masterRawAllProduct.filter(function (elem) {
    if (elem.productName.includes(inputKeyWord.value)) {
      return elem;
    }
  });
  console.log(searchScrollView);
  displayNav(searchScrollView);
}

function displayNav(data) {
  let container = document.getElementById("searchDwonPop");
  container.innerHTML = null;
  data.forEach(function ({
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
  }) {
    let boxDiv = document.createElement("div");
    boxDiv.setAttribute("class", "searchDwonPopBoxIn");

    let left = document.createElement("div");
    let image = document.createElement("img");
    image.src = imageUrl;
    left.append(image);

    let right = document.createElement("div");
    let title = document.createElement("span");
    title.innerText = productName;
    let price = document.createElement("span");
    price.innerText = `Price: ${offerPrice}`;
    right.append(title, price);

    boxDiv.append(left, right);
    container.append(boxDiv);

    boxDiv.addEventListener("click", function () {
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
        productId
      );
    });
  });
}
// dataPassToDetail
class ProductSingle {
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
  let newObj = new ProductSingle(
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

document.getElementById("logoNav").addEventListener("click", function () {
  window.location.href = "/index.html";
});

// cart redirect
// cartCount

document
  .getElementById("AddToCartOnNav")
  .addEventListener("click", function () {
    window.location.href = "/cart/cart.html";
  });

let totalProductInCart = JSON.parse(localStorage.getItem("buyNow")).length;
console.log(totalProductInCart);
document.getElementById("cartCount").innerText = totalProductInCart;

// sign in signUpRed signInRed
// active user
let activeUserInfo = JSON.parse(localStorage.getItem("activeUser"));

if (activeUserInfo) {
  let spanspan = document.createElement("span");
  spanspan.innerText = `Hello ${activeUserInfo.name} !`;
  spanspan.style.fontSize = "1.1rem";
  spanspan.style.fontWeight = "bold";
  spanspan.style.cursor = "pointer";
  spanspan.style.textTransform = "capitalize";
  document.getElementById("signInUpNav").innerHTML = "";
  document.getElementById("signInUpNav").append(spanspan);
  spanspan.addEventListener("click", function () {
    alert("logging out");
    localStorage.removeItem("activeUser");
    window.location.reload();
  });
}

let singinButtonnnn = document.getElementById("signInRed");
if (singinButtonnnn != null) {
  document.getElementById("signInRed").addEventListener("click", function () {
    window.location.href = "/signinandsignup/signin.html";
  });
  document.getElementById("signUpRed").addEventListener("click", function () {
    window.location.href = "/signinandsignup/signup.html";
  });
}
