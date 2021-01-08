const axios = require('axios');
const {base_url, headers} = require('../../config/general');
const {currency, coins} = require('../../config/coins');
const urlBuilder = require('../url/currencyURLbuilder');

const URL = `${base_url}/quotes/latest`;

async function getFullInfos() {
    const complete_url = urlBuilder.buildURL(URL, currency, coins);
    return await axios.get(complete_url, headers);
}

module.exports = {getFullInfos};