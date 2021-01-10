const amounts = require("../../../core/service/amounts")

module.exports = {
    async getUserFullAmount(req, res) {
        const amount = await amounts.fullAmount();
        return res.json({'amount': amount});
    },
    async getUserCoinsInfo(req, res) {
        const infos = await amounts.priceAndPercentage();
        return res.json(infos);
    }
}