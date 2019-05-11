'use strict';

const utils = require('../utils/writer.js');
const Books = require('../service/BooksService');

module.exports.booksBookIdAuthorsGET = function booksBookIdAuthorsGET (req, res, next) {
  const book_id = req.swagger.params['book_id'].value;
  Books.booksBookIdAuthorsGET(book_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.booksBookIdEventsGET = function booksBookIdEventsGET (req, res, next) {
  const book_id = req.swagger.params['book_id'].value;
  Books.booksBookIdEventsGET(book_id)
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

module.exports.booksBookIdReviewsGET = function booksBookIdReviewsGET (req, res, next) {
  const book_id = req.swagger.params['book_id'].value;
  Books.booksBookIdReviewsGET(book_id)
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
  Books.booksBookIdSimiliarsGET(book_id)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        res.writeHead(response.code);
        res.end();
      });
};

module.exports.booksFavouriteGET = function booksFavouriteGET (req, res, next) {
  Books.booksFavouriteGET()
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
};

module.exports.booksGET = function booksGET (req, res, next) {
  const keyword = req.swagger.params['keyword'].value;
  const genre = req.swagger.params['genre'].value;
  const theme = req.swagger.params['theme'].value;
  const offset = req.swagger.params['offset'].value;
  const limit = req.swagger.params['limit'].value;
  Books.booksGET(keyword,genre,theme,offset,limit)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        res.writeHead(response.code);
        res.end();
      });
};

module.exports.booksTop10GET = function booksTop10GET (req, res, next) {
  Books.booksTop10GET()
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
};

module.exports.genresGET = function genresGET (req, res, next) {
  Books.genresGET()
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        res.writeHead(response.code);
        res.end();
      });
};

module.exports.themesGET = function themesGET (req, res, next) {
  Books.themesGET()
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        res.writeHead(response.code);
        res.end();
      });
};
