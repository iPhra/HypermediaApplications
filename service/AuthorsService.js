'use strict';

const {database} = require("./Database");
const _ = require("lodash");


/**
 * Returns the lists of books similar to a specific one.
 *
 * author_id Long The id of the reference author.
 * returns List
 **/
exports.authorsAuthorIdBooksGET = async (author_id) => {
  //retrieve the desired author
  const author = (await database.select().table("author").where("author_id","=",author_id))[0];

  //if the author doesn't exist
  if(!author) throw {code: 404};

  //retrieve the books
  const books =  await database.select("title", "imgpath", "book_id",).table("book").where("author_id","=",author_id);

  //format the response
  const result = [];
  for(let i=0; i<books.length; i++) {
    result[i] = {
      "book_id" : books[i].book_id,
      "book" : _.pick(books[i], ["title", "imgpath"])
    }
  }

  return result;
};


/**
 * Returns the full description of an author.
 *
 * author_id Long The id of the desired author.
 * returns Author
 **/
exports.authorsAuthorIdGET = async (author_id) => {
  //retrieve the desired author
  const author = (await database.select("name","surname","biography","imgpath").table("author").where("author_id","=",author_id))[0];

  //if the author doesn't exist
  if(!author) throw {code: 404};

  return author;
};

