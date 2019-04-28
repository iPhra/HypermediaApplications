'use strict';

const {database} = require("./Database");
const _ = require("lodash");


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

    //retrieve a preview of all the events of the book
    const events = await database("event").select("book_id","event_id","location","date","imgpath").where("book_id","=",book_id);

    //format the response
    const result = [];
    for(let i=0; i<events.length; i++) {
        events[i].date = (events[i].date).toISOString().slice(0,10);
        result[i] = {
            "event_id" : events[i].event_id,
            "event" : _.pick(events[i], ["book_id","location", "date", "imgpath"])
        }
    }

    return result;
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
        .select("book.book_id","book.title","book.abstract","book.imgpath","book.author_id")
        .offset(offset)
        .limit(limit);

    //concatenate the previous books to the ones in the form (given_book, similar_book) in the database
    books = books.concat(await database("book")
        .join("similarity","similarity.book_id2","book.book_id")
        .where("similarity.book_id1","=",book_id)
        .select("book.book_id","book.title","book.abstract","book.imgpath","book.author_id")
        .offset(offset)
        .limit(limit));

    return books;
};


/**
 * Returns the favourite books.
 *
 * returns List
 **/
exports.booksFavouriteGET = async () => {
    //retrieve the favourite books
    const books = await database("favourite").join("book","book.book_id","favourite.book_id");

    //format the response
    const result = [];
    for(let i=0; i<books.length; i++) {
        result[i] = {
            "book_id" : books[i].book_id,
            "book" : _.pick(books[i], ["title", "imgpath", "author_id"])
        }
    }

    return result;
};


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
    let books;

    //if keyword is specified, then retrieve all books matching that keyword
    if (keyword) {
        books = await database("book")
            .select("book_id","title", "current_price", "imgpath", "author_id", "abstract")
            .where("title", "LIKE", "%"+keyword+"%")
            .limit(limit)
            .offset(offset);
    }
    //else if the genre is specified, retrieve all books of that genre
    else if (genre) {
        books = await database("book")
            .select("book_id","title", "current_price", "imgpath", "author_id", "abstract")
            .whereRaw("exists(select * from book B join genre on genre.book_id = B.book_id where genre = ? and B.book_id = book.book_id)", [genre])
            .limit(limit)
            .offset(offset);
    }
    //else if the theme is specified, retrieve all books of that theme
    else if (theme) {
        books = await database("book")
            .select("book_id","title", "current_price", "imgpath", "author_id", "abstract")
            .whereRaw("exists(select * from book B join theme on theme.book_id = B.book_id where theme = ? and B.book_id = book.book_id)", [theme])
            .limit(limit)
            .offset(offset);
    }
    //if nothing specified
    else {
        books = await database("book")
            .select("book_id","title", "current_price", "imgpath", "author_id", "abstract")
            .limit(limit)
            .offset(offset);
    }

    //format the response
    const result = [];
    for(let i=0; i<books.length; i++) {
        result[i] = {
            "book_id" : books[i].book_id,
            "book" : _.pick(books[i], ["title", "current_price", "imgpath","author_id","abstract"])
        }
    }

    return result;
};


/**
 * Returns the top 10 books.
 *
 * returns List
 **/
exports.booksTop10GET = async () => {
    //retrieve the favourite books
    const books = await database("top10").join("book","book.book_id","top10.book_id");

    //for each book, find its genres
    for(let i=0; i<books.length; i++) {
        books[i]["genres"] = (await database("genre")
            .join("book","book.book_id","genre.book_id")
            .where("genre.book_id","=",books[i].book_id)
            .select("genre")).map(a => a.genre);
    }

    //format the response
    const result = [];
    for(let i=0; i<books.length; i++) {
        result[i] = {
            "book_id" : books[i].book_id,
            "book" : _.pick(books[i], ["title", "imgpath", "author_id", "genres"])
        }
    }

    return result;
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

