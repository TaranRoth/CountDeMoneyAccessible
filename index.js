var coinAmounts = new Array(4).fill(0);

function init() {
    ["pennies", "nickels", "dimes", "quarters"].forEach((coin) => {
        const capitalizedCoin = coin[0].toUpperCase() + coin.substring(1);
        $("body").append(`<div id="${coin}" class="money">
        <p id="${coin}Display">${capitalizedCoin}: 0</p>
        <button class="change" onclick="changeCoin(${coin}, 1);">&plus;</button>
        <button class="change" onclick="changeCoin(${coin}, -1);">&minus;</button>
        </div>`);
    })
}

function changeCoin(coin, amt) {
    coinToIndex = {
        "pennies" : 0,
        "nickels" : 1,
        "dimes" : 2,
        "quarters" : 3,
    }
    coinVals = {
        "pennies" : 1,
        "nickels" : 5,
        "dimes" : 10,
        "quarters" : 25,
    }
    if (coinAmounts[coinToIndex[coin.id]] >= amt * -1) coinAmounts[coinToIndex[coin.id]] += amt;
    $(`#${coin.id}Display`).text(`${coin.id[0].toUpperCase() + coin.id.substring(1)}: ${coinAmounts[coinToIndex[coin.id]]}`)
}