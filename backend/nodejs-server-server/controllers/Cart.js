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
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Cart.accountCartGET(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.accountCartPOST = function accountCartPOST (req, res, next) {
  var book = req.swagger.params['book'].value;
  Cart.accountCartPOST(book)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
