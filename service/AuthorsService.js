'use strict';

const {database} = require("./Database");

/**
 * Delete an existing author.
 *
 * author_id Long The id of the desired author.
 * no response value expected for this operation
 **/
exports.authorsAuthorIdDELETE = async (author_id) => {
    //todo handle exceptions here
    await database("author").where("author_id", author_id).del();
    return "Author deleted.";
};


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
exports.authorsAuthorIdPUT = async (author_id,author) => {
    let old_author = await database.select("*").from("author").where("author_id", author_id);
    if (old_author.length === 1) {

        await database("author").where("author", author_id).update({
                name        : author.name,
                surname     : author.surname,
                birthdate   : author.birthdate,
                birthplace  : author.birthplace,
                description : author.description,
                img_path    : author.img_path
            }
        );

        return "Author updated!"

    }
    else{
        //todo handle error here
    }
};

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
exports.authorsPOST = async (author) => {

    // Insert a new author into author table
    return await database
        .table("author")
        .insert(author, ['author_id'])
        .then(data => {
          return data;
        })
        .catch(err => { throw err; });
};

