// -----------------ZMIENNE-----------------//

const productsInput = document.querySelector('.products-input')
const ordersInput = document.querySelector('.orders-input');
const packageInput = document.querySelector('.calc-form__select-input');
const dropdownList = document.querySelector('.calc-form__dropdown-list');
const selectBasic = document.querySelector('.dropdown-list__item.basic');
const selectProfessional = document.querySelector('.dropdown-list__item.professional');
const selectPremium = document.querySelector('.dropdown-list__item.premium');
const dropdownItems = document.querySelectorAll('.dropdown-list__item');
const accountingCheckbox = document.querySelector('.accounting-checkbox');
const terminalCheckbox = document.querySelector('.terminal-checkbox');
const productsOutput =  document.querySelector('.products-output');
const ordersOutput =  document.querySelector('.orders-output');
const packageOutput =  document.querySelector('.package-output');
const accountingOutput =  document.querySelector('.accounting-output');
const terminalOutput =  document.querySelector('.terminal-output');
const productsCalculations = document.querySelector('.products-output .choice__value');
const ordersCalculations = document.querySelector('.orders-output .choice__value');
const chosenPackage = document.querySelector('.package-output .choice__value');
const productsPrice = document.querySelector('.products-output .choice__price');
const ordersPrice = document.querySelector('.orders-output .choice__price');
const packagePrice =  document.querySelector('.package-output .choice__price');
const accountingPrice = document.querySelector('.accounting-output .choice__price');
const terminalPrice = document.querySelector('.terminal-output .choice__price');
const totalOutput = document.querySelector('.total');
const totalPriceText = document.querySelector('.total__price');
const checkboxes = document.querySelectorAll('.checkbox_input');

//-------------------------------------------

let totalPrice = 0;


const pricesMap = {
    products: 2,
    orders: 0.3,
    package: {
        basic: 20,
        professional: 30,
        premium: 40
    },
    accounting: 35,
    terminal: 5
};


const handleProducts = function(e) {
    productsOutput.classList.remove('d-none');

    if (this.value <= 0) {
        productsPrice.innerText = "Value should be greater than 0";
        productsCalculations.innerText = "";
    } else {
        productsCalculations.innerText = e.target.value + " * $" + pricesMap.products;
        let prodPrice = this.value * pricesMap.products;

        productsPrice.innerText = "$" + prodPrice.toFixed(2);
        totalOutput.classList.remove('d-none');
    }

}

productsInput.addEventListener("change", handleProducts);
productsInput.addEventListener("keyup", handleProducts);

const handleOrders= function(e) {
    ordersOutput.classList.remove('d-none');
    if (this.value <= 0) {
        ordersPrice.innerText = "Value should be greater than 0";
        ordersCalculations.innerText = "";
    } else {
        ordersCalculations.innerText = this.value + " * $" + pricesMap.orders;
        let ordPrice = e.target.value * pricesMap.orders;
        ordersPrice.innerText = "$" + ordPrice.toFixed(2);
        totalOutput.classList.remove('d-none');
    }
}

ordersInput.addEventListener("change", handleOrders);
ordersInput.addEventListener("keyup", handleOrders);

const handleDropDownList = function(e) {
dropdownList.classList.toggle('d-none');
this.classList.toggle('opened');
}

packageInput.addEventListener('click', handleDropDownList);

const handlePackageChoice = function(e) {

    chosenPackage.innerText = this.innerText;
    packageInput.childNodes[0].nodeValue = this.innerText;
    packageOutput.classList.remove('d-none');

    if (chosenPackage.innerText === "Basic") {
        packagePrice.innerText = "$" + pricesMap.package.basic;
    }

    if (chosenPackage.innerText === "Professional") {
        packagePrice.innerText = "$" + pricesMap.package.professional;
    }
    if (chosenPackage.innerText === "Premium") {
        packagePrice.innerText = "$" + pricesMap.package.premium;
    }

    totalOutput.classList.remove('d-none');
}

dropdownItems.forEach(function(item) {
    item.addEventListener('click', handlePackageChoice);
})

const handleAccounting = function(e) {
   accountingOutput.classList.toggle('d-none');
    totalOutput.classList.remove('d-none');
}

accountingCheckbox.addEventListener("change", handleAccounting);

const handleTerminal = function(e) {
    terminalOutput.classList.toggle('d-none');
    totalOutput.classList.remove('d-none');
}

terminalCheckbox.addEventListener("change", handleTerminal);



const updateTotal = function() {

}




