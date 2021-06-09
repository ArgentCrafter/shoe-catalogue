function shoeFunctions() {
    var shoeBrand;
    var shoeColor;
    var shoeSize;

    function setBrand(input) {
        shoeBrand = input;
    }

    function getBrand() {
        return shoeBrand;
    }

    function setColor(input) {
        shoeColor = input;
    }

    function getColor() {
        return shoeColor;
    }

    function setSize(input) {
        shoeSize = input;
    }

    function getSize() {
        return shoeSize;
    }

    return {
        setBrand,
        getBrand,
        setColor,
        getColor,
        setSize,
        getSize
    }
}