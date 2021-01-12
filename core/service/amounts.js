const dataUtil = require('../commons/dataUtil');
const quotesClient = require('../http/client/quotesClient');

function userTotal(coins_amount, coin, currency) {
    return coins_amount[coin.slug] * dataUtil.price(coin, currency);
}

function  userTotalAmount(coins_data) {
    return coins_data.reduce((total, {user_total}) => total + user_total, 0);
}

async function fullAmount(currency, coins_amount) {
    const response = await quotesClient.getFullInfos(currency, coins_amount);
    const coins_data = dataUtil.data(response);

    coins_data.forEach(coin => coin.user_total = userTotal(coins_amount, coin, currency));
    const user_total = {'total_amount': userTotalAmount(coins_data)};
    
    return user_total;
}

async function fullInfos(currency, coins_amount) {
    const response = await quotesClient.getFullInfos(currency, coins_amount);
    const coins_data = dataUtil.data(response);
    
    coins_data.forEach(coin => coin.user_total = userTotal(coins_amount, coin, currency));
    const user_total = userTotalAmount(coins_data);
    coins_data.forEach(coin => coin.user_percentage = (coin.user_total/user_total)*100);
    
    return coins_data;
}
module.exports = {
    fullAmount,
    fullInfos
}