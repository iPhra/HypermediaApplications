'use strict';


/**
 * Returns the full description of an author.
 *
 * author_id Long The id of the desired author.
 * returns Author
 **/
exports.authorsAuthorIdGET = async (author_id) => {
    //retrieve the given author
    const author = (await database.select("name","surname","birthdate","birthplace","description","imgpath").table("author").where("author_id","=",author_id))[0];

    //if the author doesn't exist
    if(!author) throw {code: 404};

    return author;
};

