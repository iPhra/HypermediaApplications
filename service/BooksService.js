'use strict';

const {database} = require("./Database");
const checkToken = require("../utils/authenticator").checkToken;
const _ = require("lodash");

/**
 * Returns the lists of authors of a specific book.
 *
 * book_id Long The id of the reference book.
 * returns List
 **/
exports.booksBookIdAuthorsGET = async (book_id) => {
  //find the given book
  const book = (await database.select().table("book").where("book_id","=",book_id))[0];

  //if the book doesn't exist
  if(!book) throw {code: 404};

  const authors = await database("author")
    .join("authorship", "author.author_id", "authorship.author_id")
    .where("authorship.book_id", "=", book_id)
    .select("name", "surname", "author.author_id", "author.imgpath");

  const result = [];
  for(let i=0; i<authors.length; i++) {
    result[i] = {
      "author_id" : authors[i].author_id,
      "author" : _.pick(authors[i], ['name', 'surname', 'birthdate', 'birthplace', 'biography', 'imgpath'])
    }
  }

  return result;
};


/**
 * Delete an existing book.
 *
 * book_id Long The id of the desired book.
 * no response value expected for this operation
 **/
exports.booksBookIdDELETE = async (book_id, token) => {
  //check admin permission
  const user_id = await checkToken(token);
  const admin = await database.select('admin').table('account').where("user_id", user_id);
  if(!admin[0]) throw {code : 403};

  //check if the book doesn't exists
  const book = (await database.select().table("book").where("book_id","=",book_id))[0];
  if(!book) throw {code: 404};

  //from here, checklist OK, delete the book
  await database("book").del().where({book_id: book_id});
  return "Book deleted.";
};


/**
 * Returns the lists of presentation events of a specific book.
 *
 * book_id Long The id of the reference book.
 * returns List
 **/
exports.booksBookIdEventsGET = async (book_id) => {
  //find the given book
  const book = (await database.select().table("book").where("book_id","=",book_id))[0];

  //if the book doesn't exist
  if(!book) throw {code: 404};

  return await database("event")
      .where("book_id", "=", book_id)
      .select("event_id","date","description","location","organizer_email");
};


/**
 * Returns the full description of a book.
 *
 * book_id Long Id of the book to retrieve.
 * returns Book
 **/
exports.booksBookIdGET = async (book_id) => {
  //find the given book
  const book = (await database.select().table("book").where("book_id","=",book_id))[0];

  //if the book doesn't exist
  if(!book) throw {code: 404};

  //find the themes of the book
  book["themes"] = (await database("theme")
      .join("book","book.book_id","theme.book_id")
      .where("theme.book_id","=",book_id)
      .select("theme")).map(a => a.theme);

  //find the genres of the book
  book["genres"] = (await database("genre")
      .join("book","book.book_id","genre.book_id")
      .where("genre.book_id","=",book_id)
      .select("genre")).map(a => a.genre);
  return book;
};


/**
 * Updates an existing Book.
 *
 * book_id Long The id of the desired book.
 * book_container Book_container_1 The book object to insert and its similars.
 * no response value expected for this operation
 **/
exports.booksBookIdPUT = async(book_id,book,token) => {
  /*//check admin permission
  const user_id = await checkToken(token);
  const admin = await database.select('admin').table('account').where({ user_id: user_id});
  if(!admin[0]) throw {code : 403};


  //check if the book doesn't exists
  const oldBook = (await database.select("*").from("book").where("book_id", book_id))[0];
  if(!oldBook) throw {code: 404};
  let book = book_container.book;

  return database.transaction(async trx => {
    await trx("book").where("book_id", book_id).update({
          title               : book.title,
          current_price       : book.current_price,
          isbn10              : book.isbn10,
          isbn13              : book.isbn13,
          num_of_pages        : book.num_of_pages,
          cover_type          : book.cover_type,
          description         : book.description,
          availability        : book.availability,
          available_quantity  : book.available_quantity,
          img_path            : book.img_path
        }

    );

    //cleaning past data
    await trx("genre").where("book_id", book_id).del();
    await trx("authorship").where("book_id" , book_id).del();
    await trx("similarity").where("book_id1", book_id)
        .orWhere("book_id2", book_id).del();

    //inserting new one
    let data = book.genres.map(genre => {
      return {'book_id': book_id, 'genre': genre};
    });
    await trx("genre").insert(data);

    data = book.authors.map(author => {
      author["book_id"] = book_id;
      return author;
    });
    await trx("authorship").insert(data);

    data = book_container.similars.map(similar_book_id => {
      return { 'book_id1': book_id, 'book_id2' : similar_book_id };
    });
    await trx("similarity").insert(data);
    return "Book updated!";

  }).catch( () => { throw { code: 400 }});*/
};


/**
 * Returns the lists of reviews of a specific book.
 *
 * book_id Long The id of the reference book.
 * returns List
 **/
exports.booksBookIdReviewsGET = async (book_id) => {
  //find the given book
  const book = (await database.select().table("book").where("book_id","=",book_id))[0];

  //if the book doesn't exist
  if(!book) throw {code: 404};

  //find all the reviews of the book
  const reviews =  await database("review")
      .where("book_id", "=", book_id)
      .select("user_id","text","rating");

  const result = [];
  let user;
  //find the name of the user giving the review
  for(let i=0; i<reviews.length; i++) {
    user = await database("account").where("user_id","=",reviews[i].user_id).select("name");
    result[i] = {
      "user_name" :user[0].name,
      "text" : reviews[i].text,
      "rating" : reviews[i].rating
    }
  }

  return result;
};


/**
 * Returns the lists of books similar to a specific one.
 *
 * book_id Long The id of the reference book.
 * offset Long Offset with regards to the current page. (optional)
 * limit Long Items per page. (optional)
 * returns List
 **/
exports.booksBookIdSimiliarsGET = async (book_id,offset,limit) => {
  //find the requested book
  const book = (await database("book").select().where("book_id","=",book_id))[0];

  //if the book doesn't exist
  if(!book) throw {code: 404};

  //find the books similar to the given one, in rows of the form (similar_book, given_book) in the database
  let books = await database("book")
      .join("similarity","similarity.book_id1","book.book_id")
      .where("similarity.book_id2","=",book_id)
      .select("book.book_id","book.title","book.current_price","book.imgpath")
      .offset(offset)
      .limit(limit);

  //concatenate the previous books to the ones in the form (given_book, similar_book) in the database
  books = books.concat(await database("book")
      .join("similarity","similarity.book_id2","book.book_id")
      .where("similarity.book_id1","=",book_id)
      .select("book.book_id","book.title","book.current_price","book.imgpath")
      .offset(offset)
      .limit(limit));

  //for each book, find its themes and its genres
  for(let i=0; i<books.length; i++) {
    books[i]["themes"] = (await database("theme")
        .join("book","book.book_id","theme.book_id")
        .where("theme.book_id","=",books[i].book_id)
        .select("theme")).map(a => a.theme);

    books[i]["genres"] = (await database("genre")
        .join("book","book.book_id","genre.book_id")
        .where("genre.book_id","=",books[i].book_id)
        .select("genre")).map(a => a.genre);
  }
  return books;
};


/**
 * Adds similars.
 *
 * book_id Long The id of the reference book.
 * similars List The books to be inserted.
 * no response value expected for this operation
 **/
exports.booksBookIdSimiliarsPUT = function(book_id,similars) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Returns a preview of all the books filtered by keyword.
 *
 * keyword String A keyword to match the book to. (optional)
 * genre String The genre to filter the book by. (optional)
 * theme String The theme to search the book by. (optional)
 * offset Long Offset with regards to the current page. (optional)
 * limit Long Items per page. (optional)
 * returns List
 **/
exports.booksGET = async (keyword,genre,theme,offset,limit) => {
  offset = 0;
  limit = 100;

  let books;
  //if keyword is specified, then retrieve all books matching that keyword
  if (keyword) {
    books = await database("book")
        .select('book_id', 'title', 'current_price')
        .where("title", "LIKE", "%"+keyword+"%")
        .limit(limit)
        .offset(offset);
  }
  //else if the genre is specified, retrieve all books of that genre
  else if (genre) {
    //find all the books matching the offset and limit
    books = await database("book")
        .select('book_id', 'title', 'current_price', 'imgpath')
        .whereRaw("exists(select * from book B join genre on genre.book_id = B.book_id where genre = ? and B.book_id = book.book_id)", [genre])
        .limit(limit)
        .offset(offset);
  }
  //else if the theme is specified, retrieve all books of that theme
  else if (theme) {
    //find all the books matching the offset and limit
    books = await database("book")
        .select('book_id', 'title', 'current_price', 'imgpath')
        .whereRaw("exists(select * from book B join theme on theme.book_id = B.book_id where theme = ? and B.book_id = book.book_id)", [theme])
        .limit(limit)
        .offset(offset);
  }
  //if nothing specified
  else {
    books = await database("book")
        .select('book_id', 'title', 'current_price', 'imgpath')
        .limit(limit)
        .offset(offset);
  }

  //for each book, find its themes and its genres
  for(let i=0; i<books.length; i++) {
    books[i]["themes"] = (await database("theme")
        .join("book","book.book_id","theme.book_id")
        .where("theme.book_id","=",books[i].book_id)
        .select("theme")).map(a => a.theme);

    books[i]["genres"] = (await database("genre")
        .join("book","book.book_id","genre.book_id")
        .where("genre.book_id","=",books[i].book_id)
        .select("genre")).map(a => a.genre);
  }
  return books;
};


/**
 * Inserts a new book.
 *
 * book Book The book object to insert.
 * returns inline_response_200
 **/
exports.booksPOST = function(book) {
/*
  //check if the user is logged in, if so retrieve his user_id
  const user_id = await checkToken(token);

  //check if the user is an admin
  const admin = await database.select('admin').table('account').where({ user_id: user_id});
  if(!admin[0]["admin"]) throw {code : 403};

  let data;
  data = {
    'title': book_container.book.title,
    'isbn10': book_container.book.isbn10,
    'isbn13': book_container.book.isbn13,
    'description': book_container.book.description,
    'current_price': book_container.book.current_price,
    'num_of_pages': book_container.book.num_of_pages,
    'availability': book_container.book.availability,
    'cover_type' : book_container.book.cover_type,
    'imgpath': book_container.book.imgpath,
    'available_quantity': book_container.book.available_quantity
  };

  return database.transaction(async trx => {

    //check if book already exists
    const rows = await trx.select().table('book').where({isbn10: data.isbn10, isbn13: data.isbn13});

    if (rows.length > 0) {
      //update book available copies
      return (await database.table("book").where({isbn10: data.isbn10, isbn13: data.isbn13}).update({
        available_quantity: rows[0].available_quantity + data.available_quantity
      }, ['book_id']))[0];
    }

    //insert book into book table
    const res = await trx.insert(data, ['book_id'])
        .into('book');
    const id = res[0]["book_id"];

    //insert genres into genre table
    data = book_container.book.genres.map(genre => {
      return {'book_id': id, 'genre': genre};
    });
    await trx.insert(data, 'genre').into('genre');

    //insert authors into table authorship
    data = book_container.book.authors.map(author => {
      author["book_id"] = id;
      return author;
    });
    await trx.insert(data, 'author_id').into('authorship');

    //insert similars into table similarity
    data = book_container.similars.map(book_id => {
      return {'book_id1': id, 'book_id2': book_id};
    });
    await trx.insert(data).into('similarity');

    return res[0];
  }).catch( () => { throw { code: 400 }; }
  );*/
};


/**
 * Returns the lists of all available genres.
 *
 * returns List
 **/
exports.genresGET = async () => {
  //retrieve all the genres associated to at least one book
  return (await database.distinct().select('genre').table("genre")).map(a => a.genre);
};


/**
 * Returns the lists of all available themes.
 *
 * returns List
 **/
exports.themesGET = async () => {
  //retrieve all the themes associated to at least one book
  return (await database.distinct().select('theme').table("theme")).map(a => a.theme);
};

