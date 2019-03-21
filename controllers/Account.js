'use strict';

var utils = require('../utils/writer.js');
var Account = require('../service/AccountService');

module.exports.accountInfoDELETE = function accountInfoDELETE (req, res, next) {
  Account.accountInfoDELETE()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.accountInfoGET = function accountInfoGET (req, res, next) {
  const token = req.headers.authorization;
  Account.accountInfoGET(token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.accountInfoPOST = function accountInfoPOST (req, res, next) {
  const account = req.swagger.params['account'].value;
  const token = req.headers.authorization;
  Account.accountInfoPOST(account, token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.accountLoginPOST = function accountLoginPOST (req, res, next) {
  var login = req.swagger.params['login'].value;
  Account.accountLoginPOST(login)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.accountRegisterPOST = function accountRegisterPOST (req, res, next) {
  var user = req.swagger.params['user'].value;
  Account.accountRegisterPOST(user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
