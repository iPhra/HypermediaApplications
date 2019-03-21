'use strict';

var utils = require('../utils/writer.js');
var Books = require('../service/BooksService');

module.exports.booksBookIdDELETE = function booksBookIdDELETE (req, res, next) {
  var book_id = req.swagger.params['book_id'].value;
  Books.booksBookIdDELETE(book_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.booksBookIdGET = function booksBookIdGET (req, res, next) {
  var book_id = req.swagger.params['book_id'].value;
  Books.booksBookIdGET(book_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.booksBookIdPUT = function booksBookIdPUT (req, res, next) {
  var book_id = req.swagger.params['book_id'].value;
  var book = req.swagger.params['book'].value;
  Books.booksBookIdPUT(book_id,book)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.booksBookIdSimiliarsGET = function booksBookIdSimiliarsGET (req, res, next) {
  var book_id = req.swagger.params['book_id'].value;
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Books.booksBookIdSimiliarsGET(book_id,offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.booksGET = function booksGET (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Books.booksGET(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.booksPOST = function booksPOST (req, res, next) {
  var book = req.swagger.params['book'].value;
  const token = req.headers.authorization;
  Books.booksPOST(book, token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.booksSearchGET = function booksSearchGET (req, res, next) {
  var keyword = req.swagger.params['keyword'].value;
  var title = req.swagger.params['title'].value;
  var genre = req.swagger.params['genre'].value;
  var author = req.swagger.params['author'].value;
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Books.booksSearchGET(keyword,title,genre,author,offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.genresGET = function genresGET (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Books.genresGET(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
