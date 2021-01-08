const {currency} = require('../config/coins');
const {values} = require('./objects');

function coinsData(response) {
    return values(response.data.data);
}

function price(coin) {
    return {[coin.slug]: coin.quote[currency].price};
}

module.exports = {
    coinsData,
    price
}