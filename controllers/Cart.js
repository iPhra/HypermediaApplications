'use strict';

const utils = require('../utils/writer.js');
const Cart = require('../service/CartService');

module.exports.accountCartCheckoutPOST = function accountCartCheckoutPOST (req, res, next) {
  Cart.accountCartCheckoutPOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.accountCartDELETE = function accountCartDELETE (req, res, next) {
  const item = req.swagger.params['item'].value;
  Cart.accountCartDELETE(item)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.accountCartGET = function accountCartGET (req, res, next) {
  const offset = req.swagger.params['offset'].value;
  const limit = req.swagger.params['limit'].value;
  const token = req.headers.authorization;
  Cart.accountCartGET(offset,limit,token)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
};

module.exports.accountCartPOST = function accountCartPOST (req, res, next) {
  const book = req.swagger.params['book'].value;
  const token = req.headers.authorization;
  Cart.accountCartPOST(book, token)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
};
