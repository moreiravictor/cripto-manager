const amounts = require("../../../core/service/amounts")

module.exports = {
    async getUserFullAmount(req, res) {
        const amount = await amounts.fullAmount();
        return res.json(amount);
    },
    async getUserCoinsInfo(req, res) {
        const {currency} = req.query;
        const coins_amount = req.query;
        delete coins_amount.currency;
        
        const infos = await amounts.fullInfos(currency, coins_amount);
        return res.json(infos);
    }
}