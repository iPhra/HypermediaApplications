'use strict';

const utils = require('../utils/writer.js');
const Books = require('../service/BooksService');

module.exports.booksBookIdDELETE = function booksBookIdDELETE (req, res, next) {
  const book_id = req.swagger.params['book_id'].value;
  const token = req.headers.authorization;
  Books.booksBookIdDELETE(book_id,token)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        res.writeHead(response.code);
        res.end();
      });
};

module.exports.booksBookIdGET = function booksBookIdGET (req, res, next) {
  const book_id = req.swagger.params['book_id'].value;
  Books.booksBookIdGET(book_id)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        res.writeHead(response.code);
        res.end();
      });
};

module.exports.booksBookIdPUT = function booksBookIdPUT (req, res, next) {
  const book_id = req.swagger.params['book_id'].value;
  const book_container = req.swagger.params['book_container'].value;
  const token = req.headers.authorization;
  Books.booksBookIdPUT(book_id,book_container,token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      res.writeHead(response.code);
      res.end();
    });
};

module.exports.booksBookIdSimiliarsGET = function booksBookIdSimiliarsGET (req, res, next) {
  const book_id = req.swagger.params['book_id'].value;
  const offset = req.swagger.params['offset'].value;
  const limit = req.swagger.params['limit'].value;
  Books.booksBookIdSimiliarsGET(book_id,offset,limit)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        res.writeHead(response.code);
        res.end();
      });
};

module.exports.booksGET = function booksGET (req, res, next) {
  const offset = req.swagger.params['offset'].value;
  const limit = req.swagger.params['limit'].value;
  Books.booksGET(offset,limit)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        res.writeHead(response.code);
        res.end();
      });
};

module.exports.booksPOST = function booksPOST (req, res, next) {
  const book_container = req.swagger.params['book_container'].value;
  const token = req.headers.authorization;
  Books.booksPOST(book_container, token)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        res.writeHead(response.code);
        res.end();
      });
};

module.exports.booksSearchGET = function booksSearchGET (req, res, next) {
  const title = req.swagger.params['title'].value;
  const genre = req.swagger.params['genre'].value;
  const author = req.swagger.params['author'].value;
  const offset = req.swagger.params['offset'].value;
  const limit = req.swagger.params['limit'].value;
  Books.booksSearchGET(title,genre,author,offset,limit)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        res.writeHead(response.code);
        res.end();
      });
};

module.exports.genresGET = function genresGET (req, res, next) {
  const offset = req.swagger.params['offset'].value;
  const limit = req.swagger.params['limit'].value;
  Books.genresGET(offset,limit)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        res.writeHead(response.code);
        res.end();
      });
};
