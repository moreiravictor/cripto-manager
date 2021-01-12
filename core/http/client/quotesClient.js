const axios = require('axios');
const currencyHttpBuilder = require('../paramater-builer/currencyHttpBuilder');

async function getFullInfos(currency, coins) {
    const {url, headers} = currencyHttpBuilder.currencyHttpParameters(currency, coins);
    return await axios.get(url, headers);
}

module.exports = {getFullInfos};