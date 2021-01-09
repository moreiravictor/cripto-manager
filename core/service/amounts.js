const dataUtil = require('../commons/dataUtil');
const {coins} = require('../config/coins');
const quotes = require('../../adapter/http/service/quotes');

function userTotal(coin) {
    return coins[coin.slug] * dataUtil.price(coin);
}

async function fullAmount() {
    const response = await quotes.getFullInfos();
    const coins_data = dataUtil.data(response);

    coins_data.map(coin => coin.user_total = userTotal(coin));
    const user_total = coins_data.reduce((total, {user_total}) => total + user_total, 0);
    
    return user_total;
}

async function priceAndPercentage() {
    const response = await quotes.getFullInfos();
    const coins_data = dataUtil.data(response);
    
    coins_data.map(coin => coin.user_total = userTotal(coin));
    const user_total = coins_data.reduce((total, {user_total}) => total + user_total, 0);
    coins_data.map(coin => coin.user_percentage = (coin.user_total/user_total)*100);
    
    return coins_data;
}

module.exports = {
    fullAmount,
    priceAndPercentage
}