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
exports.booksBookIdGET = async (book_id) => {
    //find the given book
    const book = (await database.select().table("book").where("book_id","=",book_id))[0];

    //find the authors of the book
    book["authors"] = await database("author")
        .join("authorship","author.author_id","authorship.author_id")
        .where("authorship.book_id","=",book_id)
        .select("name","surname","author.author_id");

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
exports.booksBookIdSimiliarsGET = async (book_id,offset,limit) => {
    //find the books similar to the given one, in rows of the form (similar_book, given_book) in the database
    let books = await database("book")
      .join("similarity","similarity.book_id1","book.book_id")
      .where("similarity.book_id2","=",book_id)
      .select("book.*")
      .offset(offset)
      .limit(limit);

    //concatenate the previous books to the ones in the form (given_book, similar_book) in the database
    books = books.concat(await database("book")
      .join("similarity","similarity.book_id2","book.book_id")
      .where("similarity.book_id1","=",book_id)
      .select("book.*")
      .offset(offset)
      .limit(limit));

    //for each book, find its authors and its genres
    for(let i=0; i<books.length; i++) {
        books[i]["authors"] = await database("author")
            .join("authorship","author.author_id","authorship.author_id")
            .where("authorship.book_id","=",books[i].book_id)
            .select("name","surname","author.author_id");

        books[i]["genres"] = (await database("genre")
            .join("book","book.book_id","genre.book_id")
            .where("genre.book_id","=",books[i].book_id)
            .select("genre")).map(a => a.genre);
    }
    return books;
};


/**
 * Returns a preview of all the books.
 *
 * offset Long Offset with regards to the current page. (optional)
 * limit Long Items per page. (optional)
 * returns List
 **/
exports.booksGET = async (offset,limit) => {
    //find all the books matching the offset and limit
    const books = await database.select('book_id','title', 'current_price').table("book").limit(limit).offset(offset);

    //for each book, find its authors and its genres
    for(let i=0; i<books.length; i++) {
        books[i]["authors"] = await database("author")
            .join("authorship","author.author_id","authorship.author_id")
            .where("authorship.book_id","=",books[i].book_id)
            .select("name","surname","author.author_id");

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
 * book BookContent The book object to insert.
 * returns inline_response_200
 **/
exports.booksPOST = async (book) => {

    let data;
    data = {
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

    return database.transaction(async trx => {
        const id = await trx.insert(data, ['book_id'])
            .into('book');

        data = book.genres.map(genre => {
            return { 'book_id': id[0].book_id, 'genre' : genre };
        });

        await trx.insert(data, 'genre').into('genre');

        data = book.authors.author_ids.map(author_id => {
            return { 'book_id': id[0].book_id, 'author_id' : author_id };
        });

        await trx.insert(data, 'author_id').into('authorship');

        return id[0];
    });
};


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
exports.booksSearchGET = async (keyword,title,genre,author,offset,limit) => {
    /*
    //retrieve all the books in the database
    let books = await database.select('book_id','title', 'current_price').table("book").limit(limit).offset(offset);

    //for each book, find its authors and its genres
    for(let i=0; i<books.length; i++) {
        books[i]["authors"] = await database("author")
            .join("authorship","author.author_id","authorship.author_id")
            .where("authorship.book_id","=",books[i].book_id)
            .select("name","surname","author.author_id");

        books[i]["genres"] = (await database("genre")
            .join("book","book.book_id","genre.book_id")
            .where("genre.book_id","=",books[i].book_id)
            .select("genre")).map(a => a.genre);
    }

    const result = [];
    for(let i=0; i<books.length; i++)
        if((!title || (title && books[i].title===title))
            && (!genre || (genre && genre in books[i].genres))
            && (!author || (author && author in books[i].authors))
            && (!keyword || (keyword && books[i].title.includes(keyword))))
            results.concat(books[i]);

    return result;*/
};


/**
 * Returns the lists of all available genres.
 *
 * offset Long Offset with regards to the current page. (optional)
 * limit Long Items per page. (optional)
 * returns List
 **/
exports.genresGET = async (offset,limit) => {
    //retrieve all the genres associated to at least one book
    const genres =  await database.select('genre').table("genre").limit(limit).offset(offset);

    //convert the array of objects into array of strings
    const result = [];
    for(let i =0; i<genres.length; i++) {
        result[i] = genres[i]["genre"];
    }
    return result;
};



