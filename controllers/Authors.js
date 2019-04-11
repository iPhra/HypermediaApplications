'use strict';

var utils = require('../utils/writer.js');
var Authors = require('../service/AuthorsService');

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
