const express = require('express');
const amountsController = require('./adapter/http/controller/amountsController');
const routes = express.Router();

routes.get('/user/total', amountsController.getUserFullAmount);
routes.get('/user/full', amountsController.getUserCoinsInfo);

module.exports = routes;