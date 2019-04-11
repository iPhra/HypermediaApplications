'use strict';

const {database} = require("./Database");
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
 * Returns the favourite books.
 *
 * returns List
 **/
exports.booksFavouriteGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ "{}", "{}" ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
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
 * Returns the top 10 books.
 *
 * returns List
 **/
exports.booksTop10GET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ "{}", "{}" ];
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

