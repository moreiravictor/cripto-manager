const {keys} = require('../../commons/objects');

function buildURL(base_url, currency, coins) {
    const slugs = keys(coins).reduce((total, current) => `${total},${current}`);
    return `${base_url}?convert=${currency}&slug=${slugs}`;
}

module.exports = {buildURL};
