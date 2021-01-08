const axios = require('axios');
const {base_url} = require('./config/general');
const {headers} = require('./config/general');

const {currency} = require('./config/coins');
const {coins} = require('./config/coins');


function getAmount() {
    axios.get(buildURL(base_url), headers)
            .then(res => console.log(`${getFullAmount(res)} ${currency}`));
}

function buildURL() {
    let final_url = base_url;
    final_url = `${final_url}?convert=${currency}&slug=`;
    coins.forEach((coin, index) => final_url = (index < coins.length-1) ? `${final_url}${coin.name},` : `${final_url}${coin.name}`);
    return final_url;
}

function coinsInfo(coin) {
    return Object.values(coin.data.data);
}

function price(coin) {
    return {[coin.slug]: coin.quote[currency.toUpperCase()].price};
}

function getFullAmount(res) {
    const mapped_quotes = coinsInfo(res).map(coin => price(coin));
    const totals = mapped_quotes.map(mapped => {
        const coin_amount = coins.find(coin => coin.name === Object.keys(mapped).toString()).qt;
        return coin_amount * Object.values(mapped);
    });
    return totals.reduce((total, current) => total + current).toFixed(2);
}

getAmount();