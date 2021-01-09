const {base_url, api_key} = require('../../../core/config/general');
const {keys} = require('../../../core/commons/objects');

const URL = `${base_url}/quotes/latest`;

function currencyHttpParameters(currency, coins) {
    const slugs = keys(coins).reduce((total, current) => `${total},${current}`);
    return {
        url: `${URL}?convert=${currency}&slug=${slugs}`, 
        headers: {
            headers: {'X-CMC_PRO_API_KEY': api_key}
        }
    };
}

module.exports = {currencyHttpParameters};
