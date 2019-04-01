'use strict';

const utils = require('../utils/writer.js');
const Authors = require('../service/AuthorsService');

module.exports.authorsAuthorIdDELETE = function authorsAuthorIdDELETE (req, res, next) {

    const author_id = req.swagger.params['author_id'].value;
    const token = req.headers.authorization;
  Authors.authorsAuthorIdDELETE(author_id, token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      res.writeHead(response.code);
      res.end();
    });
};

module.exports.authorsAuthorIdGET = function authorsAuthorIdGET (req, res, next) {
  const author_id = req.swagger.params['author_id'].value;
  Authors.authorsAuthorIdGET(author_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
        res.writeHead(response.code);
        res.end();
    });
};

module.exports.authorsAuthorIdPUT = function authorsAuthorIdPUT (req, res, next) {
  const author_id = req.swagger.params['author_id'].value;
  const author = req.swagger.params['author'].value;
    const token = req.headers.authorization;
  Authors.authorsAuthorIdPUT(author_id,author,token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      res.writeHead(response.code);
      res.end();
    });
};

module.exports.authorsGET = function authorsGET (req, res, next) {
  const offset = req.swagger.params['offset'].value;
  const limit = req.swagger.params['limit'].value;
  Authors.authorsGET(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      res.writeHead(response.code);
      res.end();
    });
};

module.exports.authorsPOST = function authorsPOST (req, res, next) {
  const author = req.swagger.params['author'].value;
  const token = req.headers.authorization;
  Authors.authorsPOST(author, token)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
          res.writeHead(response.code);
          res.end();
      });
};
