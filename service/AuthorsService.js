'use strict';

const {database} = require("./Database");

/**
 * Delete an existing author.
 *
 * author_id Long The id of the desired author.
 * no response value expected for this operation
 **/
exports.authorsAuthorIdDELETE = function(author_id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Returns the full description of an author.
 *
 * author_id Long The id of the desired author.
 * returns Author
 **/
exports.authorsAuthorIdGET = async (author_id) => {
  //find the given author
  return (await database.select().table("author").where("author_id","=",author_id))[0];
};


/**
 * Update an existing author information.
 *
 * author_id Long The id of the desired author.
 * author AuthorContent The fields to update.
 * no response value expected for this operation
 **/
exports.authorsAuthorIdPUT = function(author_id,author) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Returns a preview of all the authors.
 *
 * offset Long Offset with regards to the current page. (optional)
 * limit Long Items per page. (optional)
 * returns List
 **/
exports.authorsGET = async (offset,limit) => {
  //find all the authors matching the offset and limit
  return await database.select('author_id','name', 'surname').table("author").limit(limit).offset(offset);
};


/**
 * Inserts a new Author.
 *
 * author AuthorContent The author to be inserted.
 * returns inline_response_200_1
 **/
exports.authorsPOST = function(author) {
  console.log(author);

  return new Promise((resolve, reject) => {

    // and remove this obj with author
    const obj = {
      'name': author.name,
      'surname': author.surname,
      'birthdate': author.birthdate,
      'birthplace': author.birthplace,
      'description': author.description,
      'imgpath': author.imgpath
    };

    console.log(obj);
    return database
        .table("author")
        .insert(obj, ['author_id'])
        .then(data => {
          console.log(data);
          resolve(data);
        })
        .catch(err => console.log(err));
  });
}

