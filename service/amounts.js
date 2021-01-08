const {values, keys} = require('../commons/objects');
const dataUtil = require('../commons/dataUtil');
const {currency, coins} = require('../config/coins');
const {getFullInfos} = require('./http/quotes');

async function fullAmount() {
    const response = await getFullInfos();
    const mapped_prices = dataUtil.priceMap(dataUtil.data(response));
    const totals = keys(mapped_prices).map(coin_name => mapped_prices[coin_name] * coins[coin_name]);
    const total_value = totals.reduce((total, current) => total + current).toFixed(2);
    
    console.log(`${total_value} ${currency}`);
}

async function priceAndPercentage() {
    const response = await getFullInfos();

    const mapped_informations = dataUtil.infoMap(dataUtil.data(response));
    keys(mapped_informations).forEach(coin_name => mapped_informations[coin_name].user_total = Number((mapped_informations[coin_name].price * coins[coin_name]).toFixed(2)));    
    const total_value = values(mapped_informations).reduce((total, {user_total}) => total + user_total, 0);
    keys(mapped_informations).forEach(coin_name => mapped_informations[coin_name].percentage = Number(((mapped_informations[coin_name].user_total/total_value)*100).toFixed(2)));

    let result = '';
    values(mapped_informations).forEach( coin => result += (`${coin.symbol} ${coin.price} (${coin.percentage}%) `));
    console.log(result);
}

fullAmount();
priceAndPercentage();