const shoeColor = document.getElementById("color");
const shoeSize = document.getElementById("size");
const shoeBrand = document.getElementById("brand");
const searchBtn = document.getElementById("searchBtn");
const cancelCartBtn = document.getElementById("cartCancel");
const addToCartBtn = document.getElementById("cartAdd");
const purchaseBtn = document.getElementById("purchaseBtn");
const cartBtn = document.getElementById("cartBtnInput");

searchBtn.addEventListener("click", () => {
    console.clear();
    console.log(shoeColor.value);
    console.log(shoeSize.value);
    console.log(shoeBrand.value);
})