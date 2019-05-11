'use strict';

const utils = require('../utils/writer.js');
const Authors = require('../service/AuthorsService');

module.exports.authorsAuthorIdBooksGET = function authorsAuthorIdBooksGET (req, res, next) {
  const author_id = req.swagger.params['author_id'].value;
  Authors.authorsAuthorIdBooksGET(author_id)
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
