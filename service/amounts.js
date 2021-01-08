const {values, keys} = require('../commons/objects');
const dataUtil = require('../commons/dataUtil');
const {currency, coins} = require('../config/coins');
const {getFullAmount} = require('./http/quotes');

async function fullAmount() {
    const response = await getFullAmount();

    const mapped_prices = dataUtil.coinsData(response).map(coin => dataUtil.price(coin));
    const totals = mapped_prices.map(price => values(price) * coins[keys(price)]);
    const total_value = totals.reduce((total, current) => total + current).toFixed(2);
    
    console.log(`${total_value} ${currency}`);
}

fullAmount();