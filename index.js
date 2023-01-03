var coinToIndex = {
    "pennies" : 0,
    "nickels" : 1,
    "dimes" : 2,
    "quarters" : 3,
    "halfdollars" : 4,
    "dollars" : 5,
}
var indexToVal = {
    0 : 1,
    1 : 5,
    2 : 10,
    3 : 25,
    4 : 50,
    5 : 100,
}
var coins = ["pennies", "nickels", "dimes", "quarters", "halfdollars", "dollars"];
var coinAmounts = new Array(coins.length).fill(0);

function init() {
    coins.forEach((coin) => {
        const capitalizedCoin = coin[0].toUpperCase() + coin.substring(1);
        $("body").append(`<div id="${coin}" class="money">
        <p id="${coin}Display">${capitalizedCoin}: 0</p>
        <p id="${coin}Total">Total value of ${coin}: $0.00</p>
        <button class="change" onclick="changeCoin(${coin}, 1);">&plus;</button>
        <button class="change" onclick="changeCoin(${coin}, -1);">&minus;</button>
        <br>
        <button class="change" onclick="changeCoin(${coin}, 5);">&plus;5</button>
        <button class="change" onclick="changeCoin(${coin}, -5);">&minus;5</button>
        </div>`);
    })
    $("body").append(`<p id='total'>Total Value: $0.00</p>`);
    document.addEventListener("keydown", (e) => {
        if (parseInt(e.key) != NaN) changeCoin(document.getElementById(coins[parseInt(e.key) - 1]), 1);
    })
}

function changeCoin(coin, amt) {
    if (coinAmounts[coinToIndex[coin.id]] >= amt * -1) coinAmounts[coinToIndex[coin.id]] += amt;
    $(`#${coin.id}Display`).text(`${coin.id[0].toUpperCase() + coin.id.substring(1)}: ${coinAmounts[coinToIndex[coin.id]]}`)
    updateTotalVal();
}

function updateTotalVal() {
    var valList = [];
    for (let i in indexToVal) {
        valList.push(coinAmounts[i] * indexToVal[i]);
    }
    const total = valList.reduce((a, v) => {return a + v;}, 0);
    for (i = 0; i < coins.length; i++) {
        $(`#${coins[i]}Total`).text(`Total value of ${coins[i]}: ${valToMoney(valList[i])}`);
    }
    $('#total').text(`Total Value: ${valToMoney(total)}`);
}

function valToMoney(val) {
    var dollars = Math.floor(val / 100);
    var cents = val % 100;
    if (cents < 10) cents = `0${cents}`;
    return `$${dollars}.${cents}`;
}