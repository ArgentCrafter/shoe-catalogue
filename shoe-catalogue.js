const shoeColor = document.getElementById("color");
const shoeSize = document.getElementById("size");
const shoeBrand = document.getElementById("brand");
const searchBtn = document.getElementById("searchBtn");
const cancelCartBtn = document.getElementById("cartCancel");
const addToCartBtn = document.getElementById("cartAdd");
const purchaseBtn = document.getElementById("purchaseBtn");
const cartBtn = document.getElementById("cartBtn");
const addStockBtn = document.querySelector(".addStockBtn");
const popupStock = document.querySelector(".popup");

var templateSource = document.querySelector(".template").innerHTML;
var compTemplate = Handlebars.compile(templateSource);
var displayElem = document.querySelector(".searchResult");

var shoeList;

let shoe = shoeFunctions();

document.body.onload = () => {
    shoeList = JSON.parse(localStorage.getItem("shoes"));
}

searchBtn.addEventListener("click", () => {
    shoe.setBrand(shoeBrand.value);
    shoe.setColor(shoeColor.value);
    shoe.setSize(shoeSize.value);

    displayElem.innerHTML = "";
    displayElem.innerHTML = compTemplate({ shoesNum: shoeList[0]["stock"], color: shoeList[0]["color"], size: shoeList[0]["size"], brand: shoeList[0]["brand"] });
})

cartBtn.addEventListener("click", () => {
    // var shoeMap = {};
    // shoeMap["brand"] = shoeBrand.value;
    // shoeMap["color"] = shoeColor.value;
    // shoeMap["size"] = shoeSize.value;
    // shoeMap["stock"] = 0;

    // var tempArr = [];

    // shoeList = JSON.parse(localStorage.getItem("shoes"));
    // if (shoeList) {
    //     for (i = 0; i < shoeList.length; i++) {
    //         tempArr.push(shoeList[i]);
    //     }
    // }
    // tempArr.push(shoeMap);
    // localStorage.setItem("shoes", JSON.stringify(tempArr));
})

addStockBtn.addEventListener("click", () => {
    if (popupStock.style.display === "none"){
        popupStock.style.display = "block";
    } else {
        popupStock.style.display = "none";
    }
})