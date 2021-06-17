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
const removeCartBtn = document.getElementById("cartRemove");
const addToCartBtn = document.getElementById("cartAdd");
const purchaseBtn = document.querySelector(".purchaseBtn");
const cartBtn = document.getElementById("cartBtn");
const addStockBtn = document.querySelector(".addStockBtn");
const popupStock = document.querySelector(".popup");
const confirmAddStock = document.getElementById("confirmAddStock");
const cancelAddStock = document.getElementById("cancelAddStock");
const cartForm = document.querySelector(".cart");

var templateSource = document.querySelector(".template").innerHTML;
var compTemplate = Handlebars.compile(templateSource);
var displayElem = document.querySelector(".searchResult");

var cartTemplateSource = document.querySelector(".cartTemplate").innerHTML;
var compCartTemplate = Handlebars.compile(cartTemplateSource);
var cartTableElem = document.getElementById("cartTable");

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

    if (cartList.length) {
        cartTableElem.innerHTML = "<tr><th>Brand:</th><th>Size:</th><th>Color:</th><th>Quantity:</th>";

        for (var i = 0; i < cartList.length; i++) {
            currItem = cartList[i];
            var displayHTML = '';
            displayHTML = compCartTemplate({ shoeBrand: currItem.brand, shoeSize: currItem.size, shoeColor: currItem.color, shoeQuantity: currItem.quantity });
            cartTableElem.innerHTML += displayHTML;
        }
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
    if (localStorage["cart"]) {
        cartList = JSON.parse(localStorage.getItem("cart"));
    }

    if (localStorage["shoes"]) {
        shoeList = JSON.parse(localStorage.getItem("shoes"));
    }

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

    cartList = JSON.parse(localStorage.getItem("cart"));

    if (cartList.length) {
        cartTableElem.innerHTML = "<tr><th>Brand:</th><th>Size:</th><th>Color:</th><th>Quantity:</th>";

        for (var i = 0; i < cartList.length; i++) {
            currItem = cartList[i];
            var displayHTML = '';
            displayHTML = compCartTemplate({ shoeBrand: currItem.brand, shoeSize: currItem.size, shoeColor: currItem.color, shoeQuantity: currItem.quantity });
            cartTableElem.innerHTML += displayHTML;
        }
    }
});

cartBtn.addEventListener("click", () => {
    if (popupStock.style.display === "block") {
        popupStock.style.display = "none";
    }

    if (cartForm.style.display === "none") {
        cartForm.style.display = "block"
    } else {
        cartForm.style.display = "none";
    }
})

cancelCartBtn.addEventListener("click", () => {
    if (localStorage["shoes"]) {
        shoeList = JSON.parse(localStorage.getItem("shoes"));
    }
    if (localStorage["cart"]) {
        cartList = JSON.parse(localStorage.getItem("cart"));
    }

    for (var k = 0; k < cartList.length; k++) {
        var currItem = cartList[k];
        for (var i = 0; i < shoeList.length; i++) {
            var currShoe = shoeList[i];
            if ((currShoe.brand === currItem.brand) && (currShoe.size === currItem.size) && (currShoe.color === currItem.color)) {
                currShoe.stock += currItem.quantity;
            }
        }
    }

    cartTableElem.innerHTML = "<tr><th>Brand:</th><th>Size:</th><th>Color:</th><th>Quantity:</th>";
    localStorage.setItem("shoes", JSON.stringify(shoeList));
    cartList = [];
    localStorage.removeItem("cart");
})

removeCartBtn.addEventListener("click", () => {
    if (localStorage["cart"]) {
        cartList = JSON.parse(localStorage.getItem("cart"));
    }
    if (localStorage["shoes"]) {
        shoeList - JSON.parse(localStorage.getItem("shoes"));
    }

    for (var k = 0; k < cartList.length; k++) {
        var currItem = cartList[k];
        if ((currItem.brand === shoeBrand.value) && (currItem.size === shoeSize.value) && (currItem.color === shoeColor.value)) {
            for (var i = 0; i < shoeList.length; i++) {
                var currShoe = shoeList[i];
                if ((currShoe.brand === currItem.brand) && (currShoe.size === currItem.size) && (currShoe.color === currItem.color)) {
                    console.log(currShoe);
                    console.log(currItem);
                    currShoe.stock += currItem.quantity;
                }
            }
            cartList.splice(k, 1);
        }
    }

    if (cartList.length) {
        cartTableElem.innerHTML = "<tr><th>Brand:</th><th>Size:</th><th>Color:</th><th>Quantity:</th>";

        for (var i = 0; i < cartList.length; i++) {
            currItem = cartList[i];
            var displayHTML = '';
            displayHTML = compCartTemplate({ shoeBrand: currItem.brand, shoeSize: currItem.size, shoeColor: currItem.color, shoeQuantity: currItem.quantity });
            cartTableElem.innerHTML += displayHTML;
        }
    }
    console.log(cartList);
    localStorage.setItem("cart", JSON.stringify(cartList));
    localStorage.setItem("shoes", JSON.stringify(shoeList));
})

purchaseBtn.addEventListener('click', () => {
    cartTableElem.innerHTML = "<tr><th>Brand:</th><th>Size:</th><th>Color:</th><th>Quantity:</th>";
    cartList = [];
    localStorage.removeItem("cart");
})

addStockBtn.addEventListener("click", () => {
    if (popupStock.style.display === "none") {
        popupStock.style.display = "block";
    } else {
        popupStock.style.display = "none";
    }

    if (cartForm.style.display === "block") {
        cartForm.style.display = "none";
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