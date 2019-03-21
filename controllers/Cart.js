'use strict';

var utils = require('../utils/writer.js');
var Cart = require('../service/CartService');

module.exports.accountCartDELETE = function accountCartDELETE (req, res, next) {
  var item = req.swagger.params['item'].value;
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
  var book = req.swagger.params['book'].value;
  const token = req.headers.authorization;
  Cart.accountCartPOST(book, token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
