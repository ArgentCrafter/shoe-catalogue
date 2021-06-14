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

var shoeList = [];
var cartList = [];

let shoe = shoeFunctions();

document.body.onload = () => {
    if (localStorage["shoes"]) {
        shoeList = JSON.parse(localStorage.getItem("shoes"));
    }
    if (localStorage["cart"]) {
        cartList = JSON.parse(localStorage.getItem("cart"));
    }
};

searchBtn.addEventListener("click", () => {
    shoeList = JSON.parse(localStorage.getItem("shoes"));
    var stockFlag = false;

    for (var i = 0; i < shoeList.length; i++) {
        var currShoe = shoeList[i];
        if ((currShoe.brand === shoeBrand.value) && (currShoe.size === shoeSize.value) && (currShoe.color === shoeColor.value) && currShoe.stock > 0) {
            stockFlag = true;
            var displayHTML = compTemplate({ shoesNum: currShoe.stock, price: currShoe.price });
            displayElem.innerHTML = displayHTML;
        }
    }

    if (stockFlag == false) {
        displayElem.innerHTML = "<p>No stock matching your conditions <br>were found. Please try different <br>conditions or look again at a later date.</p>";
    }
})

cartAdd.addEventListener("click", () => {
    var flagCart = false;

    if (cartList.length) {
        for (var i = 0; i < cartList.length; i++) {
            var currCart = cartList[i];
            if ((currCart.brand === shoeBrand.value) && (currCart.size === shoeSize.value) && (currCart.color === shoeColor.value)) {
                for (var i = 0; i < shoeList.length; i++) {
                    var currShoe = shoeList[i];
                    if ((currShoe.brand === shoeBrand.value) && (currShoe.size === shoeSize.value) && (currShoe.color === shoeColor.value) && (currShoe.stock > 0)) {
                        if (currShoe.stock > 0) {
                            shoeList[i].stock--;
                            currCart.quantity++;
                        } else {
                            displayElem.innerHTML = "There is not enough stock for you to add that shoe to your cart";
                        }
                    }
                }
                flagCart = true;
            }
        }
    }
    if (!flagCart) {
        for (var i = 0; i < shoeList.length; i++) {
            var currShoe = shoeList[i];
            if ((currShoe.brand === shoeBrand.value) && (currShoe.size === shoeSize.value) && (currShoe.color === shoeColor.value) && (currShoe.stock > 0)) {
                if (currShoe.stock > 0) {
                    cartList.push({ brand: shoeBrand.value, color: shoeColor.value, size: shoeSize.value, price: currShoe.price, quantity: 1 });
                    shoeList[i].stock--;
                } else {
                    displayElem.innerHTML = "There is not enough stock for you to add that shoe to your cart";
                }
            }
        }
    }
    localStorage.setItem("cart", JSON.stringify(cartList));
    localStorage.setItem("shoes", JSON.stringify(shoeList));
    cartList = [];
});

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
    var shoeList;
    if (localStorage["shoes"]) {
        shoeList = (JSON.parse(localStorage.getItem("shoes")));
    } else {
        shoeList = [];
    }
    var stockFlag = false;
    if (localStorage["shoes"]) {
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
    } else {
        localStorage.setItem("shoes", JSON.stringify([{ brand: addBrand.value, color: addColor.value, size: addSize.value, stock: addStock.value, price: addPrice.value }]));
        shoeList = (JSON.parse(localStorage.getItem("shoes")));
        stockFlag = true;
    }
    if (stockFlag == false) {
        if (localStorage["shoes"]) {
            shoeList.push({ brand: addBrand.value, color: addColor.value, size: addSize.value, stock: addStock.value, price: addPrice.value });
            localStorage.setItem("shoes", JSON.stringify(shoeList));
        }
    }
});