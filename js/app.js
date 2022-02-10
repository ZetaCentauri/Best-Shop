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
        premium: 40,
    },
    accounting: 35,
    terminal: 9
};

/* Adding, calculating and removing products from the basket*/
const addProductsAndOrders = function(e, selector) {
    const el = document.querySelector(`.${selector}-output`)
    const price = el.querySelector("[class$='price']")
    const calculations = el.querySelector("[class$='value']");
    el.classList.remove('d-none');

    if (!e.target.value.length) {
        el.classList.add('d-none');
    } else if  (e.target.value <= 0) {
        price.innerText = "Value should be greater than 0";
        calculations.innerText = "";
    } else {
        calculations.innerText = e.target.value + " * $" + prices[selector];
        let prodPrice = e.target.value * prices[selector];
        price.innerText = "$" + prodPrice.toFixed(2);
        totalOutput.classList.remove('d-none');
    }
    updateTotal();
}

productsInput.addEventListener("change", function(e) {addProductsAndOrders(e, "products")});
productsInput.addEventListener("keyup", function(e) {addProductsAndOrders(e, 'products')});

ordersInput.addEventListener("change", function(e) {addProductsAndOrders(e, "orders")});
ordersInput.addEventListener("keyup", function(e) {addProductsAndOrders(e, 'orders')});



const handleDropDownList = function(e) {
dropdownList.classList.toggle('d-none');
this.classList.toggle('opened');
}

packageInput.addEventListener('click', handleDropDownList);


// function choosePackage() {
//     let chosenPackagePrice = 0;
//     if (chosenPackage.innerText === "Basic") {
//         chosenPackagePrice = prices.package.basic;
//     }
//     if (chosenPackage.innerText === "Professional") {
//         chosenPackagePrice = prices.package.professional;
//     }
//     if (chosenPackage.innerText === "Premium") {
//         chosenPackagePrice = prices.package.premium;
//     }
//     return chosenPackagePrice;
// }
// Modyfikacja powyższej funkcji :)

function choosePackage(packageName) {
   return prices.package[packageName];
}

const handlePackageChoice = function(e) {

    chosenPackage.innerText = this.innerText;
    packageInput.childNodes[0].nodeValue = this.innerText;
    packageOutput.classList.remove('d-none');
    const packageString = this.innerText.toLowerCase();
    packagePrice.innerText = "$" + choosePackage(packageString);

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

    if (displayedChoices) {
        const productsCost = productsInput.value > 0
            ? productsInput.value * prices.products : 0;
        const ordersCost = ordersInput.value > 0
            ? ordersInput.value * prices.orders : 0;
        const packageString = packageOutput.querySelector('.choice__value').innerText.toLowerCase();
        const packageCost = packageInput.innerText.length > 0
            ? choosePackage(packageString)
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