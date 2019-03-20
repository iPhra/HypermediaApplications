'use strict';


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
exports.authorsAuthorIdGET = function(author_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "birthdate" : "birthdate",
  "birthplace" : "birthplace",
  "surname" : "surname",
  "imgpath" : "imgpath",
  "name" : "name",
  "description" : "description",
  "author_id" : 1
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


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
exports.authorsGET = function(offset,limit) {
  return new Promise((resolve, reject) => {
    return database
        .select()
        .table("author")
        .limit(limit)
        .offset(offset)
        .then(data => {
          resolve(data);
        });
  });
}


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

