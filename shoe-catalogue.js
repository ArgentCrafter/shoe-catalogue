const shoeColor = document.getElementById("color");
const shoeSize = document.getElementById("size");
const shoeBrand = document.getElementById("brand");
const addColor = document.getElementById("addColor");
const addSize = document.getElementById("addSize");
const addBrand = document.getElementById("addBrand");
const addStock = document.getElementById("stock");
const searchBtn = document.getElementById("searchBtn");
const cancelCartBtn = document.getElementById("cartCancel");
const addToCartBtn = document.getElementById("cartAdd");
const purchaseBtn = document.getElementById("purchaseBtn");
const cartBtn = document.getElementById("cartBtn");
const addStockBtn = document.querySelector(".addStockBtn");
const popupStock = document.querySelector(".popup");
const confirmAddStock = document.getElementById("confirmAddStock");
const cancelAddStock = document.getElementById("cancelAddStock");

var templateSource = document.querySelector(".template").innerHTML;
var compTemplate = Handlebars.compile(templateSource);
var displayElem = document.querySelector(".searchResult");

var shoeList;

let shoe = shoeFunctions();

document.body.onload = () => {
    shoeList = JSON.parse(localStorage.getItem("shoes"));
};

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
});

searchBtn.addEventListener("click", () => {
    shoeList = JSON.parse(localStorage.getItem("shoes"));
    var stockFlag = false;

    for (var i = 0; i < shoeList.length; i++) {
        var currShoe = shoeList[i];
        if ((currShoe.brand === shoeBrand.value) && (currShoe.size === shoeSize.value) && (currShoe.color === shoeColor.value) && currShoe.stock > 0) {
            stockFlag = true;
            var displayHTML = compTemplate({ shoesNum: currShoe.stock });
            displayElem.innerHTML = displayHTML;
        }
    }

    if (stockFlag == false) {
        displayElem.innerHTML = "<p>No stock matching your conditions <br>were found. Please try different <br>conditions or look again at a later date.</p>";
    }
})

addStockBtn.addEventListener("click", () => {
    if (popupStock.style.display === "none") {
        popupStock.style.display = "block";
    } else {
        popupStock.style.display = "none";
    }
});

cancelAddStock.addEventListener("click", () => {
    if (popupStock.style.display === "none") {
        popupStock.style.display = "block";
    } else {
        popupStock.style.display = "none";
    }
})

confirmAddStock.addEventListener("click", () => {
    shoeList = JSON.parse(localStorage.getItem("shoes"));
    var stockFlag = false;

    for (var i = 0; i < shoeList.length; i++) {
        var currShoe = shoeList[i];
        if ((currShoe.brand === addBrand.value) && (currShoe.size === addSize.value) && (currShoe.color === addColor.value)) {
            stockFlag = true;
            if ((addStock.value != "") && (addStock.value >= 0)) {
                currShoe.stock = addStock.value;
                localStorage.setItem("shoes", JSON.stringify(shoeList));
            }
            console.log(currShoe);
        }
    }

    if (stockFlag == false) {
        console.log("No stock detected");
    }
});