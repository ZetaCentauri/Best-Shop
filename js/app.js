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

const prices = {
    products: 2,
    orders: 0.3,
    package: {
        basic: 20,
        professional: 30,
        premium: 40
    },
    accounting: 35,
    terminal: 9
};


const handleProducts = function(e) {
    productsOutput.classList.remove('d-none');

    if (!this.value.length) {
        productsOutput.classList.add('d-none');
    } else if  (this.value <= 0) {
        productsPrice.innerText = "Value should be greater than 0";
        productsCalculations.innerText = "";
    } else {
        productsCalculations.innerText = e.target.value + " * $" + prices.products;
        let prodPrice = this.value * prices.products;
        productsPrice.innerText = "$" + prodPrice.toFixed(2);
        totalOutput.classList.remove('d-none');
    }
    updateTotal();
}

productsInput.addEventListener("change", handleProducts);
productsInput.addEventListener("keyup", handleProducts);

const handleOrders= function(e) {
    ordersOutput.classList.remove('d-none');
    if (!this.value.length) {
        ordersOutput.classList.add('d-none');
    } else if (this.value <= 0) {
        ordersPrice.innerText = "Value should be greater than 0";
        ordersCalculations.innerText = "";
    } else {
        ordersCalculations.innerText = this.value + " * $" + prices.orders;
        let ordPrice = e.target.value * prices.orders;
        ordersPrice.innerText = "$" + ordPrice.toFixed(2);
        totalOutput.classList.remove('d-none');
    }
    updateTotal();
}

ordersInput.addEventListener("change", handleOrders);
ordersInput.addEventListener("keyup", handleOrders);

const handleDropDownList = function(e) {
dropdownList.classList.toggle('d-none');
this.classList.toggle('opened');
}

packageInput.addEventListener('click', handleDropDownList);

function choosePackage() {
    let chosenPackagePrice = 0;
    if (chosenPackage.innerText === "Basic") {
        chosenPackagePrice = prices.package.basic;
    }
    if (chosenPackage.innerText === "Professional") {
        chosenPackagePrice = prices.package.professional;
    }
    if (chosenPackage.innerText === "Premium") {
        chosenPackagePrice = prices.package.premium;
    }
    return chosenPackagePrice;
}

const handlePackageChoice = function(e) {

    chosenPackage.innerText = this.innerText;
    packageInput.childNodes[0].nodeValue = this.innerText;
    packageOutput.classList.remove('d-none');

    packagePrice.innerText = "$" + choosePackage();

    totalOutput.classList.remove('d-none');
    updateTotal();
}

dropdownItems.forEach(function(item) {
    item.addEventListener('click', handlePackageChoice);
})

const handleAccounting = function(e) {
   accountingOutput.classList.toggle('d-none');
   accountingPrice.innerText = "$" + prices.accounting;
   totalOutput.classList.remove('d-none');
    updateTotal();
}

accountingCheckbox.addEventListener("change", handleAccounting);

const handleTerminal = function(e) {
    terminalOutput.classList.toggle('d-none');
    terminalPrice.innerText = "$" + prices.terminal;
    totalOutput.classList.remove('d-none');
    updateTotal();
}

terminalCheckbox.addEventListener("change", handleTerminal);



const updateTotal = function() {
    const displayedChoices = document.querySelectorAll(".calc__choice:not(.d-none)").length > 0;
    console.log(displayedChoices);

    if (displayedChoices) {
        const productsCost = productsInput.value > 0
            ? productsInput.value * prices.products : 0;
        const ordersCost = ordersInput.value > 0
            ? ordersInput.value * prices.orders : 0;
        const packageCost = packageInput.innerText.length > 0
            ? choosePackage()
            : 0;
        const accountingCost = accountingCheckbox.checked
            ? prices.accounting : 0;
        const terminalCost = terminalCheckbox.checked
            ? prices.terminal: 0;

        totalPriceText.innerText =
            "$" + (productsCost + ordersCost + packageCost + accountingCost + terminalCost);
    } else {
        totalOutput.classList.add('d-none');
    }
}




