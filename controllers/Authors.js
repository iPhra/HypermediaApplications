'use strict';

var utils = require('../utils/writer.js');
var Authors = require('../service/AuthorsService');

module.exports.authorsAuthorIdDELETE = function authorsAuthorIdDELETE (req, res, next) {
  var author_id = req.swagger.params['author_id'].value;
  Authors.authorsAuthorIdDELETE(author_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.authorsAuthorIdGET = function authorsAuthorIdGET (req, res, next) {
  var author_id = req.swagger.params['author_id'].value;
  Authors.authorsAuthorIdGET(author_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.authorsAuthorIdPUT = function authorsAuthorIdPUT (req, res, next) {
  var author_id = req.swagger.params['author_id'].value;
  var author = req.swagger.params['author'].value;
  Authors.authorsAuthorIdPUT(author_id,author)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.authorsGET = function authorsGET (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Authors.authorsGET(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.authorsPOST = function authorsPOST (req, res, next) {
  var author = req.swagger.params['author'].value;
    const token = req.headers.authorization;
  Authors.authorsPOST(author, token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
