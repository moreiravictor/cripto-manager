const {currency} = require('../config/coins');
const {values} = require('./objects');

function data(response) {
    return values(response.data.data);
}

function price(coin) {
    return coin.quote[currency].price;
}

module.exports = {
    data,
    price
}