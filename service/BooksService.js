'use strict';

const {database} = require("./Database");

/**
 * Delete an existing book.
 *
 * book_id Long The id of the desired book.
 * no response value expected for this operation
 **/
exports.booksBookIdDELETE = function(book_id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Returns the full description of a book.
 *
 * book_id Long Id of the book to retrieve.
 * returns Book
 **/
exports.booksBookIdGET = function(book_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "num_of_pages" : 2,
  "genres" : [ "genres", "genres" ],
  "imgpath" : "imgpath",
  "isbn13" : 5,
  "description" : "description",
  "isbn10" : 5,
  "book_id" : 0,
  "current_price" : 6.0274563,
  "availability" : "unreleased",
  "title" : "title",
  "cover_type" : "hard cover",
  "authors" : [ {
    "birthdate" : "birthdate",
    "birthplace" : "birthplace",
    "surname" : "surname",
    "imgpath" : "imgpath",
    "name" : "name",
    "description" : "description",
    "author_id" : 1
  }, {
    "birthdate" : "birthdate",
    "birthplace" : "birthplace",
    "surname" : "surname",
    "imgpath" : "imgpath",
    "name" : "name",
    "description" : "description",
    "author_id" : 1
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Updates an existing Book.
 *
 * book_id Long The id of the desired book.
 * book BookContent The new fields to update.
 * no response value expected for this operation
 **/
exports.booksBookIdPUT = function(book_id,book) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Returns the lists of books similar to a specific one.
 *
 * book_id Long The id of the reference book.
 * offset Long Offset with regards to the current page. (optional)
 * limit Long Items per page. (optional)
 * returns List
 **/
exports.booksBookIdSimiliarsGET = function(book_id,offset,limit) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "num_of_pages" : 2,
  "genres" : [ "genres", "genres" ],
  "imgpath" : "imgpath",
  "isbn13" : 5,
  "description" : "description",
  "isbn10" : 5,
  "book_id" : 0,
  "current_price" : 6.0274563,
  "availability" : "unreleased",
  "title" : "title",
  "cover_type" : "hard cover",
  "authors" : [ {
    "birthdate" : "birthdate",
    "birthplace" : "birthplace",
    "surname" : "surname",
    "imgpath" : "imgpath",
    "name" : "name",
    "description" : "description",
    "author_id" : 1
  }, {
    "birthdate" : "birthdate",
    "birthplace" : "birthplace",
    "surname" : "surname",
    "imgpath" : "imgpath",
    "name" : "name",
    "description" : "description",
    "author_id" : 1
  } ]
}, {
  "num_of_pages" : 2,
  "genres" : [ "genres", "genres" ],
  "imgpath" : "imgpath",
  "isbn13" : 5,
  "description" : "description",
  "isbn10" : 5,
  "book_id" : 0,
  "current_price" : 6.0274563,
  "availability" : "unreleased",
  "title" : "title",
  "cover_type" : "hard cover",
  "authors" : [ {
    "birthdate" : "birthdate",
    "birthplace" : "birthplace",
    "surname" : "surname",
    "imgpath" : "imgpath",
    "name" : "name",
    "description" : "description",
    "author_id" : 1
  }, {
    "birthdate" : "birthdate",
    "birthplace" : "birthplace",
    "surname" : "surname",
    "imgpath" : "imgpath",
    "name" : "name",
    "description" : "description",
    "author_id" : 1
  } ]
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns a preview of all the books.
 *
 * offset Long Offset with regards to the current page. (optional)
 * limit Long Items per page. (optional)
 * returns List
 **/
exports.booksGET = function(offset,limit) {
  return new Promise((resolve, reject) => {
    database.select('book_id','title', 'current_price').table("book").limit(limit).offset(offset).then(  async (result) => {
      for(let i=0; i<result.length; i++) {
        result[i]["authors"] = await database("author")
            .join("authorship","author.author_id","authorship.author_id")
            .where("authorship.book_id","=",result[i].book_id)
            .select("name","surname","author.author_id")
      }
      resolve(result);
    });
  });
};


/**
 * Inserts a new book.
 *
 * book BookContent The book object to insert.
 * returns inline_response_200
 **/
exports.booksPOST = function(book) {
  return new Promise(function(resolve, reject) {

      console.log(book);

      const obj = {
          'title': book.title,
          'isbn10': book.isbn10,
          'isbn13': book.isbn13,
          'description': book.description,
          'current_price': book.current_price,
          'num_of_pages': book.num_of_pages,
          'availability': book.availability,
          'cover_type' : book.cover_type,
          'img_path': book.imgpath
      };

      database.transaction(trx => {
          return trx
              .insert(obj, 'book_id')
              .into('book')
              .then(function(id) {

                  const data = book.genres.map(genre => {
                      return {
                          'book_id': id[0],
                          'genre' : genre
                      };
                  });

                  // Insert book_id, genre into genre table
                  return trx.insert(data, 'genre').into('genre')
                      .then( function(genre) {
                          console.log(genre);
                          //obj.id = id;
                          console.log('Obj 2', genre);
                          resolve(data);
                      })
                      .catch( err => reject(err, 400)); // How to pass status code?
              });
      });

    /*return database
        .table("book")
        .insert(obj, ['book_id'])
        .then(data => {
          console.log(data);
          resolve(data);
        })
        .catch(err => console.log(err));*/
  });
}


/**
 * Returns a preview of all the books filtered by keyword.
 *
 * keyword String A generic keyword to filter all the books. (optional)
 * title String The desired title of the book. (optional)
 * genre String The genre to filter the book by. (optional)
 * author String The author to search the book by. (optional)
 * offset Long Offset with regards to the current page. (optional)
 * limit Long Items per page. (optional)
 * returns List
 **/
exports.booksSearchGET = function(keyword,title,genre,author,offset,limit) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "num_of_pages" : 2,
  "genres" : [ "genres", "genres" ],
  "imgpath" : "imgpath",
  "isbn13" : 5,
  "description" : "description",
  "isbn10" : 5,
  "book_id" : 0,
  "current_price" : 6.0274563,
  "availability" : "unreleased",
  "title" : "title",
  "cover_type" : "hard cover",
  "authors" : [ {
    "birthdate" : "birthdate",
    "birthplace" : "birthplace",
    "surname" : "surname",
    "imgpath" : "imgpath",
    "name" : "name",
    "description" : "description",
    "author_id" : 1
  }, {
    "birthdate" : "birthdate",
    "birthplace" : "birthplace",
    "surname" : "surname",
    "imgpath" : "imgpath",
    "name" : "name",
    "description" : "description",
    "author_id" : 1
  } ]
}, {
  "num_of_pages" : 2,
  "genres" : [ "genres", "genres" ],
  "imgpath" : "imgpath",
  "isbn13" : 5,
  "description" : "description",
  "isbn10" : 5,
  "book_id" : 0,
  "current_price" : 6.0274563,
  "availability" : "unreleased",
  "title" : "title",
  "cover_type" : "hard cover",
  "authors" : [ {
    "birthdate" : "birthdate",
    "birthplace" : "birthplace",
    "surname" : "surname",
    "imgpath" : "imgpath",
    "name" : "name",
    "description" : "description",
    "author_id" : 1
  }, {
    "birthdate" : "birthdate",
    "birthplace" : "birthplace",
    "surname" : "surname",
    "imgpath" : "imgpath",
    "name" : "name",
    "description" : "description",
    "author_id" : 1
  } ]
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns the lists of all available genres.
 *
 * offset Long Offset with regards to the current page. (optional)
 * limit Long Items per page. (optional)
 * returns List
 **/
exports.genresGET = function(offset,limit) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ { }, { } ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

