'use strict';

const {database} = require("./Database");
const checkToken = require("../utils/authenticator").checkToken;

/**
 * Buy the items in the cart.
 *
 * no response value expected for this operation
 **/
exports.accountCartCheckoutPOST = async (token) => {
  return new Promise(function(resolve, reject) {
    resolve();
  });
};


/**
 * Remove an item from the cart
 *
 * item Item Item to be removed and its quantity
 * returns Cart
 **/
exports.accountCartDELETE = async (item) => {
  return new Promise(function(resolve, reject) {
    const examples = {};
    examples['application/json'] = {
  "total_price" : 5.962134,
  "book_list" : [ {
    "price" : 1.4658129,
    "book_id" : 0,
    "current_price" : 6.0274563,
    "title" : "title"
  }, {
    "price" : 1.4658129,
    "book_id" : 0,
    "current_price" : 6.0274563,
    "title" : "title"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};


/**
 * Returns list of items present in the cart of the specified user.
 *
 * offset Long Offset with regards to the current page. (optional)
 * limit Long Items per page. (optional)
 * returns Cart
 **/
exports.accountCartGET = async (token) => {
  //check if the user is logged in, if so retrieve his user_id
  const user_id = await checkToken(token);
  return retrieveCart(user_id);
};


/**
 * Add item to cart.
 *
 * book Book The book to be added to cart.
 * returns Cart
 **/
exports.accountCartPOST = async (book, token) => {
  //check if the user is logged in, if so retrieve his user_id
  book["user_id"] = await checkToken(token);

  //insert the new book into the cart
  await database.table("cart").insert(book);

  //@todo ???
  //retrieveCart();
};


async function retrieveCart(user_id) {
  //retrieve all the book_ids in the cart
  const book_ids = await database.table("cart")
      .select("book_id","quantity")
      .where("user_id","=",user_id);
  const ids = book_ids.map(a => a.book_id);

  //retrieve all the books associated to those ids
  const books = await database.table("book")
      .select("book_id","title","current_price")
      .whereIn("book_id",ids);

  let total_price = 0;
  let price = 0;
  //for each book, add the price as the current_price*quantity of that book, and sum that value to the total value of the cart
  for(let i=0; i<books.length; i++) {
    price = books[i].current_price * book_ids[i].quantity;
    books[i].price = price;
    books[i].quantity = book_ids[i].quantity;
    total_price += price;
  }

  return { "book_list": books, "total_price": total_price };
}
