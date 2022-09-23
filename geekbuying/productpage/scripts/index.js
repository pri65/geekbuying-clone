const productImage = document.getElementById("productImage");
// let currData= JSON.parse(localStorage.getItem("singleProductView"))

// let currData = {
//   productName:
//     "Cordless Tire Inflator Portable Compressor Digital Car Tire Pump 12V 150PSI Rechargeable Air Pump -Black",
//   currencySign: "$",
//   offerPrice: "3690.43",
//   actualPrice: "4336.41",
//   discount: "(15% off)",
//   shipToOmit: ["Russia", "Arab"],
//   imageUrl:
//     "https://img.gkbcdn.com/p/2020-08-03/Car-Tyre-Pump-12V-150PSI-Rechargeable---Black-425899-0._w280_p1_.jpg",
//   review_num: "9",
//   freeShip: true,
//   productId: 1234,
//   shipto: "Armenia",
// };

let currData = JSON.parse(localStorage.getItem("dataToLocalDetail")) || {};

const proImg = document.createElement("img");
proImg.setAttribute("src", currData.imageUrl);
let thumbnail = document.createElement("div");
thumbnail.className = "thumb";
let thumb1 = document.createElement("img");
thumb1.setAttribute("src", currData.imageUrl);
//thumb1.src=currData.imageUrl;
let thumb2 = document.createElement("img");
thumb2.setAttribute("src", currData.imageUrl);
//thumb2.src=currData.imageUrl;
let thumb3 = document.createElement("img");
thumb3.setAttribute("src", currData.imageUrl);
//thumb3.src=currData.imageUrl;
let thumb4 = document.createElement("img");
thumb4.setAttribute("src", currData.imageUrl);
//thumb4.src=currData.imageUrl;
thumbnail.append(thumb1, thumb2, thumb3, thumb4);
productImage.append(proImg, thumbnail);

const productName = document.getElementById("productName");
let proName = document.createElement("h3");
proName.innerText = currData.productName;

let div1 = document.createElement("div");
div1.className = "prices";
let curSign = document.createElement("div");
curSign.innerText = currData.currencySign;

let offPrice = document.createElement("div");
offPrice.innerText = currData.offerPrice;

let acPrice = document.createElement("div");
acPrice.innerText = currData.actualPrice;
acPrice.className = "actual";

let dis = document.createElement("div");
dis.innerText = currData.discount;

div1.append(curSign, offPrice, acPrice, dis);

let shipTo = document.createElement("p");
if (currData.shipTo == undefined) {
  let a = document.getElementById("shipToNavImg").alt;
  if (a == "") {
    currData.shipto = "India";
  } else {
    currData.shipto = a;
  }
  // console.log(currData.shipTo)
}

shipTo.innerText = `Ship to ${currData.shipto}`;
shipTo.className = "country";

let review = document.createElement("p");
review.innerHTML = `<b>Review</b> ${currData.review_num}`;

let free = document.createElement("p");
free.innerHTML = `<b>Free Shipping</b> ${currData.freeShip}`;

let tempBoxAdd = document.createElement("div");
tempBoxAdd.setAttribute("class", "tempBoxDivAddTO");

let addToCart = document.createElement("button");
addToCart.innerText = "Add To Cart";

let cartDetailSet = JSON.parse(localStorage.getItem("buyNow")) || [];
addToCart.addEventListener("click", function () {
  cartDetailSet.push(currData);
  localStorage.setItem("buyNow", JSON.stringify(cartDetailSet));
  window.location.reload();
});

let buyNow = document.createElement("button");
buyNow.addEventListener("click", function () {
  cartDetailSet.push(currData);

  localStorage.setItem("buyNow", JSON.stringify(cartDetailSet));
  // redirect to local
  // it will only redirect if clicked buy, and
  window.location.href = "/cart/cart.html";
  // for add to cart it will just reload the page
});
buyNow.innerText = "Buy Now";

tempBoxAdd.append(addToCart, buyNow);
productName.append(proName, div1, shipTo, review, free, tempBoxAdd);

// sign in signUpRed signInRed

let singinButton = document.getElementById("signInRed");
if (singinButton != null) {
  document.getElementById("signInRed").addEventListener("click", function () {
    window.location.href = "/signinandsignup/signin.html";
  });
  document.getElementById("signUpRed").addEventListener("click", function () {
    window.location.href = "/signinandsignup/signup.html";
  });
}
