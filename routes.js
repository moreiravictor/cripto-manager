const express = require('express');
const amountsController = require('./adapter/http/controller/amountsController');
const routes = express.Router();

routes.get('/total', amountsController.getUserFullAmount);
routes.get('/infos/full', amountsController.getUserCoinsInfo);

module.exports = routes;