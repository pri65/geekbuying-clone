import { navbar } from "./navbar.js";

document.querySelector("#navbar").innerHTML = navbar();

let navline = document.querySelectorAll("#navText>div>p");

for (let i = 0; i < navline.length; i++) {
  if (i <= 1) continue;
  else {
    if (i % 2 === 0) {
      navline[i].style.backgroundColor = "rgb(220, 200, 200,0.7)";
    } else {
      navline[i].style.backgroundColor = "rgb(220, 200, 200,0.7)";
      navline[i].style.borderColor = "rgb(220, 200, 200,0.7)";
    }
  }
}
document.getElementById("totalValue").innerText = 0;

let cartArr = JSON.parse(localStorage.getItem("buyNow")) || []
//   {
//     productName:
//       "Tronsmart Force/Mega/T6/T6 Plus/T6 Plus Upgraded Carrying Case Portable Travel Bag Protective Case",
//     imageUrl:
//       "https://img.gkbcdn.com/p/2019-03-16/tronsmart-force-mega-t6-t6-plus-speaker-carry-case-1571991604256._w280_.jpg",
//     offerPrice: "965.52",
//     shipFrom: "China",
//   },
//   {
//     productName:
//       "Tronsmart Force/Mega/T6/T6 Plus/T6 Plus Upgraded Carrying Case Portable Travel Bag Protective Case",
//     imageUrl:
//       "https://img.gkbcdn.com/p/2020-01-09/Tronsmart-element-T6-plus-Upgrade-Black-895558-._w280_.jpg",
//     offerPrice: "965.52",
//     shipFrom: "China",
//   },
//   {
//     productName:
//       "ronsmart Force/Mega/T6/T6 Plus/T6 Plus Upgraded Carrying Case Portable Travel Bag Protective Case",
//     imageUrl:
//       "https://img.gkbcdn.com/p/2020-01-09/Tronsmart-element-T6-plus-Upgrade-Black-895558-._w280_.jpg",
//     offerPrice: "965.52",
//     shipFrom: "USA",
//   },
//   {
//     productName:
//       "Tonsmart Force/Mega/T6/T6 Plus/T6 Plus Upgraded Carrying Case Portable Travel Bag Protective Case",
//     imageUrl:
//       "https://img.gkbcdn.com/p/2020-01-09/Tronsmart-element-T6-plus-Upgrade-Black-895558-._w280_.jpg",
//     offerPrice: "96.52",
//     shipFrom: "India",
//   },
//   {
//     productName:
//       "Trosmart Force/Mega/T6/T6 Plus/T6 Plus Upgraded Carrying Case Portable Travel Bag Protective Case",
//     imageUrl:
//       "https://img.gkbcdn.com/p/2020-01-09/Tronsmart-element-T6-plus-Upgrade-Black-895558-._w280_.jpg",
//     offerPrice: "965.52",
//     shipFrom: "India",
//   },
//   {
//     productName:
//       "Tronsmart Force/Mega/T6/T6 Plus/T6 Plus Upgraded Carrying Case Portable Travel Bag Protective Case",
//     imageUrl:
//       "https://img.gkbcdn.com/p/2020-01-09/Tronsmart-element-T6-plus-Upgrade-Black-895558-._w280_.jpg",
//     offerPrice: "965.52",
//     shipFrom: "USA",
//   },
// ];

// let cartArr = JSON.parse(localStorage.getItem("buyNow")) || [];

function showCart(cartArr) {
  document.querySelector("#tableBody").innerHTML = null;
  let cartData = {};

  cartArr.forEach(function (ele) {
    if (!cartData[ele.shipFrom]) {
      cartData[ele.shipFrom] = { uniqueCartItems: [], itemsQuantity: [] };
    }
    let flag = false;
    let dataArr = cartData[ele.shipFrom].uniqueCartItems;
    let itemArr = cartData[ele.shipFrom].itemsQuantity;

    for (var i = 0; i < dataArr.length; i++) {
      let obj = dataArr[i];
      if (
        obj.imageUrl === ele.imageUrl &&
        obj.productName === ele.productName &&
        obj.offerPrice === ele.offerPrice &&
        obj.shipFrom === ele.shipFrom
      ) {
        flag = true;
        break;
      }
    }
    if (flag) {
      itemArr[i] = itemArr[i] + 1;
    } else {
      dataArr.push(ele);
      itemArr.push(1);
    }
  });

  for (let country in cartData) {
    let maintr = document.createElement("tr");
    let maintd = document.createElement("td");
    maintd.colSpan = "5";
    let table = document.createElement("table");
    table.setAttribute("id", `table${country}`);
    let thead = document.createElement("thead");
    let headRow = document.createElement("tr");
    let rowCell = document.createElement("td");
    rowCell.innerText = "Ship" + " " + "From" + " : " + country;
    headRow.append(rowCell);
    thead.append(headRow);

    let tbody = document.createElement("tbody");
    cartData[country].uniqueCartItems.forEach((ele, index) => {
      let tr1 = document.createElement("tr");

      let check = document.createElement("input");
      check.type = "checkbox";
      check.style.cursor = "pointer";
      check.addEventListener("change", (event) => {
        checkList(event);
      });

      let td2 = document.createElement("td");
      let img = document.createElement("img");
      img.src = ele.imageUrl;

      let name = document.createElement("p");
      name.innerText = ele.productName;

      td2.append(check, img, name);

      let td4 = document.createElement("td");
      let price = document.createElement("p");
      price.innerText = `${ele.currencySign} ${ele.offerPrice}`;
      td4.append(price);

      let td5 = document.createElement("td");
      let box = document.createElement("p");
      let plus = document.createElement("span");
      plus.innerText = "+";
      plus.style.cursor = "pointer";
      plus.addEventListener("click", () => {
        cartArr.push(ele);
        localStorage.setItem("buyNow", JSON.stringify(cartArr));
        showCart(cartArr);
      });

      let count = document.createElement("span");
      count.innerText = cartData[country].itemsQuantity[index];

      let minus = document.createElement("span");
      minus.innerText = "-";
      minus.style.cursor = "pointer";
      minus.addEventListener("click", () => {
        for (let i = cartArr.length - 1; i >= 0; i--) {
          let obj = cartArr[i];
          if (
            obj.imageUrl === ele.imageUrl &&
            obj.productName === ele.productName &&
            obj.offerPrice === ele.offerPrice &&
            obj.shipFrom === ele.shipFrom
          ) {
            cartArr.splice(i, 1);
            break;
          }
        }
        localStorage.setItem("buyNow", JSON.stringify(cartArr));
        showCart(cartArr);
      });
      box.append(plus, count, minus);
      td5.append(box);

      let td6 = document.createElement("td");
      let tPrice = document.createElement("p");
      tPrice.innerText = `₹ ${
        Math.round(
          +ele.offerPrice * +cartData[country].itemsQuantity[index] * 100
        ) / 100
      }`;
      td6.append(tPrice);

      let td7 = document.createElement("td");
      let wish = document.createElement("p");
      wish.innerText = "Wishlist";
      wish.style.cursor = "pointer";
      let delet = document.createElement("p");
      delet.innerText = "Delete";
      delet.style.cursor = "pointer";
      delet.addEventListener("click", () => {
        document.querySelector("#delBox").style.display = "block";
        document
          .querySelector("#del button:last-child")
          .addEventListener("click", () => {
            document.querySelector("#delBox").style.display = "none";
          });
        document
          .querySelector("#del button:first-child")
          .addEventListener("click", () => {
            document.querySelector("#delBox").style.display = "none";
            deleteItem(ele);
          });
      });

      td7.append(wish, delet);
      tr1.append(td2, td4, td5, td6, td7);
      tbody.append(tr1);
    });

    let tr = document.createElement("tr");
    let td = document.createElement("td");
    let check1 = document.createElement("input");
    check1.type = "checkbox";
    check1.style.cursor = "pointer";
    check1.addEventListener("change", (event) => {
      checkList(event);
    });

    let select = document.createElement("span");
    select.innerText = "Select All";
    let wishlist = document.createElement("span");
    wishlist.innerText = "Add To Wishlist";
    wishlist.style.cursor = "pointer";
    wishlist.style.textDecoration = "underline";
    let deletw = document.createElement("span");
    deletw.innerText = "Delete";
    deletw.style.cursor = "pointer";
    deletw.style.textDecoration = "underline";
    deletw.addEventListener("click", () => {
      document.querySelector("#delBox").style.display = "block";
      document
        .querySelector("#del button:last-child")
        .addEventListener("click", () => {
          document.querySelector("#delBox").style.display = "none";
        });
      document
        .querySelector("#del button:first-child")
        .addEventListener("click", () => {
          document.querySelector("#delBox").style.display = "none";
          deleteCategory(cartData[country]);
        });
    });
    td.append(check1, select, wishlist, deletw);
    tr.append(td);

    tbody.append(tr);
    table.append(thead, tbody);
    maintd.append(table);
    maintr.append(maintd);
    document.querySelector("#tableBody").append(maintr);

    // total update
    let totalSum = cartArr.reduce(function (a, b) {
      return a + Number(b.offerPrice);
    }, 0);

    // console.log(totalSum);
    document.getElementById(
      "totalValue"
    ).innerText = `${cartArr[0].currencySign} ${totalSum}`;
    document.getElementById("quantityTotal").innerText = cartArr.length;
    // console.log(cartArr.length);
  }
}

showCart(cartArr);

function checkList(event) {
  let tables = document.querySelectorAll("table table");

  for (let table of tables) {
    let id = table.id;
    let inputs = document.querySelectorAll(`#${id} input`);
    if (event.target === inputs[inputs.length - 1]) {
      let value = event.target.checked;
      inputs.forEach((ele) => {
        if (value === true) {
          ele.checked = "true";
        } else {
          ele.checked = "";
        }
      });
    }
    let flag = false;

    for (let inp of inputs) {
      if (event.target === inp) {
        flag = true;
        break;
      }
    }
    if (flag === false) {
      inputs.forEach((ele) => {
        ele.checked = "";
      });
    }

    let input1 = [];
    inputs.forEach(function (ele) {
      if (ele.checked) input1.push(ele);
    });
    if (input1.length === inputs.length - 1) {
      inputs[inputs.length - 1].checked = "true";
    }
  }
  showPrice();
}

function showPrice() {
  let tables = document.querySelectorAll("table table");
  let flag = false;
  for (var i = 0; i < tables.length; i++) {
    let id = tables[i].id;
    let inputs = document.querySelectorAll(`#${id} input`);
    for (let inp of inputs) {
      if (inp.checked) {
        flag = true;
        break;
      }
    }
    if (flag) {
      break;
    }
  }
  let totalPrice = 0;
  let totalItems = 0;
  if (flag) {
    let id = tables[i].id;
    let inputs = document.querySelectorAll(`#${id} input`);
    let prices = document.querySelectorAll(`#${id}>tbody>tr>td:nth-child(4)`);
    let counts = document.querySelectorAll(
      `#${id}>tbody>tr>td:nth-child(3)>p>span:nth-child(2)`
    );

    for (let i = 0; i < inputs.length - 1; i++) {
      if (inputs[i].checked) {
        let price = prices[i].innerText.split(" ")[1];
        let count = counts[i].innerText;
        totalPrice += +price;
        totalItems += +count;
      }
    }
  }

  document.querySelector("span>b").innerText = totalItems;
  document.querySelector("span>b+b").innerText =
    "₹ " + Math.round(totalPrice * 100) / 100;
}

function deleteItem(ele) {
  for (let i = 0; i < cartArr.length; i++) {
    let obj = cartArr[i];
    if (
      obj.imageUrl === ele.imageUrl &&
      obj.productName === ele.productName &&
      obj.offerPrice === ele.offerPrice &&
      obj.shipFrom === ele.shipFrom
    ) {
      cartArr.splice(i, 1);
      i--;
    }
  }
  localStorage.setItem("buyNow", JSON.stringify(cartArr));
  showCart(cartArr);
}

function deleteCategory(country) {
  country.uniqueCartItems.forEach((ele) => {
    for (let i = 0; i < cartArr.length; i++) {
      let obj = cartArr[i];
      if (
        obj.imageUrl === ele.imageUrl &&
        obj.productName === ele.productName &&
        obj.offerPrice === ele.offerPrice &&
        obj.shipFrom === ele.shipFrom
      ) {
        cartArr.splice(i, 1);
        i--;
      }
    }
  });

  localStorage.setItem("buyNow", JSON.stringify(cartArr));
  showCart(cartArr);
}

function checkoutToPay() {
  let tables = document.querySelectorAll("table table");
  let flag = false;
  for (var i = 0; i < tables.length; i++) {
    let id = tables[i].id;
    let inputs = document.querySelectorAll(`#${id} input`);
    for (let inp of inputs) {
      if (inp.checked) {
        flag = true;
        break;
      }
    }
    if (flag) {
      break;
    }
  }

  if (flag) {
    let payData = [];
    let id = tables[i].id;
    let inputs = document.querySelectorAll(`#${id} input`);
    let prices = document.querySelectorAll(`#${id}>tbody>tr>td:nth-child(4)`);
    let counts = document.querySelectorAll(
      `#${id}>tbody>tr>td:nth-child(3)>p>span:nth-child(2)`
    );
    let image = document.querySelectorAll(
      `#${id}>tbody>tr>td:nth-child(1)>img`
    );
    let name = document.querySelectorAll(`#${id}>tbody>tr>td:nth-child(1)>p`);

    for (let i = 0; i < inputs.length - 1; i++) {
      if (inputs[i].checked) {
        let prodData = {
          productData: name[i].innerText,
          imageUrl: image[i].src,
          offerPrice: prices[i].innerText.split(" ")[1],
          productCount: counts[i].innerText,
        };

        payData.push(prodData);
      }
    }

    localStorage.setItem("payData", JSON.stringify(payData));
    window.location.href = "../payment/placeorder.html";
    console.log(payData);
  } else {
    document.querySelector("#msgBox").style.display = "block";
    document.querySelector("#msg button").addEventListener("click", () => {
      document.querySelector("#msgBox").style.display = "none";
    });
  }
}

document.querySelector("#orderDiv button").addEventListener("click", () => {
  checkoutToPay();
});
document.querySelector("#orderDiv img").addEventListener("click", () => {
  checkoutToPay();
});
