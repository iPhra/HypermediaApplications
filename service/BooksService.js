'use strict';

/**
 * Delete an existing book.
 *
 * book_id Long The id of the desired book.
 * returns Book
 **/
exports.booksBookIdDELETE = function(book_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "imgpath" : "imgpath",
  "isbn13" : 5,
  "isbn10" : 5,
  "book_id" : 0,
  "current_price" : 6.0274563,
  "availability" : "unreleased",
  "title" : "title",
  "authors" : {
    "author_ids" : [ 1, 1 ]
  },
  "info" : {
    "num_of_pages" : 2,
    "genres" : [ "genres", "genres" ],
    "description" : "description",
    "cover_type" : "hard cover"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
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
  "imgpath" : "imgpath",
  "isbn13" : 5,
  "isbn10" : 5,
  "book_id" : 0,
  "current_price" : 6.0274563,
  "availability" : "unreleased",
  "title" : "title",
  "authors" : {
    "author_ids" : [ 1, 1 ]
  },
  "info" : {
    "num_of_pages" : 2,
    "genres" : [ "genres", "genres" ],
    "description" : "description",
    "cover_type" : "hard cover"
  }
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
 * book Book The new fields to update.
 * returns Book
 **/
exports.booksBookIdPUT = function(book_id,book) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "imgpath" : "imgpath",
  "isbn13" : 5,
  "isbn10" : 5,
  "book_id" : 0,
  "current_price" : 6.0274563,
  "availability" : "unreleased",
  "title" : "title",
  "authors" : {
    "author_ids" : [ 1, 1 ]
  },
  "info" : {
    "num_of_pages" : 2,
    "genres" : [ "genres", "genres" ],
    "description" : "description",
    "cover_type" : "hard cover"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
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
  "imgpath" : "imgpath",
  "isbn13" : 5,
  "isbn10" : 5,
  "book_id" : 0,
  "current_price" : 6.0274563,
  "availability" : "unreleased",
  "title" : "title",
  "authors" : {
    "author_ids" : [ 1, 1 ]
  },
  "info" : {
    "num_of_pages" : 2,
    "genres" : [ "genres", "genres" ],
    "description" : "description",
    "cover_type" : "hard cover"
  }
}, {
  "imgpath" : "imgpath",
  "isbn13" : 5,
  "isbn10" : 5,
  "book_id" : 0,
  "current_price" : 6.0274563,
  "availability" : "unreleased",
  "title" : "title",
  "authors" : {
    "author_ids" : [ 1, 1 ]
  },
  "info" : {
    "num_of_pages" : 2,
    "genres" : [ "genres", "genres" ],
    "description" : "description",
    "cover_type" : "hard cover"
  }
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
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "imgpath" : "imgpath",
  "isbn13" : 5,
  "isbn10" : 5,
  "book_id" : 0,
  "current_price" : 6.0274563,
  "availability" : "unreleased",
  "title" : "title",
  "authors" : {
    "author_ids" : [ 1, 1 ]
  },
  "info" : {
    "num_of_pages" : 2,
    "genres" : [ "genres", "genres" ],
    "description" : "description",
    "cover_type" : "hard cover"
  }
}, {
  "imgpath" : "imgpath",
  "isbn13" : 5,
  "isbn10" : 5,
  "book_id" : 0,
  "current_price" : 6.0274563,
  "availability" : "unreleased",
  "title" : "title",
  "authors" : {
    "author_ids" : [ 1, 1 ]
  },
  "info" : {
    "num_of_pages" : 2,
    "genres" : [ "genres", "genres" ],
    "description" : "description",
    "cover_type" : "hard cover"
  }
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Inserts a new book.
 *
 * book Book The book object to insert.
 * returns Book
 **/
exports.booksPOST = function(book) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "imgpath" : "imgpath",
  "isbn13" : 5,
  "isbn10" : 5,
  "book_id" : 0,
  "current_price" : 6.0274563,
  "availability" : "unreleased",
  "title" : "title",
  "authors" : {
    "author_ids" : [ 1, 1 ]
  },
  "info" : {
    "num_of_pages" : 2,
    "genres" : [ "genres", "genres" ],
    "description" : "description",
    "cover_type" : "hard cover"
  }
};
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
  "imgpath" : "imgpath",
  "isbn13" : 5,
  "isbn10" : 5,
  "book_id" : 0,
  "current_price" : 6.0274563,
  "availability" : "unreleased",
  "title" : "title",
  "authors" : {
    "author_ids" : [ 1, 1 ]
  },
  "info" : {
    "num_of_pages" : 2,
    "genres" : [ "genres", "genres" ],
    "description" : "description",
    "cover_type" : "hard cover"
  }
}, {
  "imgpath" : "imgpath",
  "isbn13" : 5,
  "isbn10" : 5,
  "book_id" : 0,
  "current_price" : 6.0274563,
  "availability" : "unreleased",
  "title" : "title",
  "authors" : {
    "author_ids" : [ 1, 1 ]
  },
  "info" : {
    "num_of_pages" : 2,
    "genres" : [ "genres", "genres" ],
    "description" : "description",
    "cover_type" : "hard cover"
  }
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

