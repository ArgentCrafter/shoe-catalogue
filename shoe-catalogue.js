const shoeColor = document.getElementById("color");
const shoeSize = document.getElementById("size");
const shoeBrand = document.getElementById("brand");
const addColor = document.getElementById("addColor");
const addSize = document.getElementById("addSize");
const addBrand = document.getElementById("addBrand");
const addStock = document.getElementById("stock");
const addPrice = document.getElementById("price");
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
    if (localStorage){
    shoeList = JSON.parse(localStorage.getItem("shoes"));
    }
};

searchBtn.addEventListener("click", () => {
    shoeList = JSON.parse(localStorage.getItem("shoes"));
    var stockFlag = false;

    for (var i = 0; i < shoeList.length; i++) {
        var currShoe = shoeList[i];
        if ((currShoe.brand === shoeBrand.value) && (currShoe.size === shoeSize.value) && (currShoe.color === shoeColor.value) && currShoe.stock > 0) {
            stockFlag = true;
            var displayHTML = compTemplate({shoesNum: currShoe.stock, price: currShoe.price});
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

    addStock.value = "";
    addPrice.value = "";
    addBrand.value = "mike";
    addSize.value = "6";
    addColor.value = "black";
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
                currShoe.price = addPrice.value;
                localStorage.setItem("shoes", JSON.stringify(shoeList));
            }
        }
    }

    if (stockFlag == false) {
        shoeList.push({ brand: addBrand.value, color: addColor.value, size: addSize.value, stock: addStock.value, price: addPrice.value });
        localStorage.setItem("shoes", JSON.stringify(shoeList));
    }
});