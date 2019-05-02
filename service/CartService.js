'use strict';

const {database} = require("./Database");
const checkToken = require("../utils/authenticator").checkToken;


/**
 * Buy the items in the cart.
 *
 * no response value expected for this operation
 **/
exports.accountCartCheckoutPOST = async (token) => {
  //check if the user is logged in, if so retrieve his user_id
  const user_id = await checkToken(token);

  //moving books to purchases and reservations is done with triggers
  return database.transaction(async trx => {

    //retrieve all the book_ids in the cart
    const book_ids = await trx.table("cart")
        .select("book_id","quantity")
        .where("user_id","=",user_id);
    const ids = book_ids.map(a => a.book_id);

    //retrieve all the books associated to those ids
    const books = await trx.table("book")
        .select("book_id","title","current_price")
        .whereIn("book_id",ids);

    //add books to purchases or reservation
    let purchases = [];
    const date = new Date();
    for(let i=0; i<books.length; i++) {
      //add book to purchases
      purchases.push({
        user_id: user_id,
        book_id: books[i].book_id,
        timestamp: date.toDateString(),
        price: books[i].current_price,
        quantity: book_ids[i].quantity
      });
    }

    //add purchases to purchase table
    await trx.insert(purchases).into('purchase');

    //delete books from cart
    await trx.table('cart').where({ user_id: user_id }).del();

  }).catch( () => { throw { code: 400 } });
};


/**
 * Remove an item from the cart
 *
 * item Item Item to be removed and its quantity
 * returns Cart
 **/
exports.accountCartDELETE = async (item, token) => {
  const user_id = await checkToken(token);

  await database("cart").where({
    "user_id" : user_id,
    "book_id" : item.book_id
  }).del();
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
  const user_id = await checkToken(token);
  book["user_id"] = user_id;

  await database.transaction(async trx => {
    //check if the same book is already present in the user's cart
    const rows = await trx.table("cart").select().where({ user_id: user_id, book_id: book.book_id });

    if (rows.length > 0) {
      //update cart item quantity
      await trx.table("cart").where({ user_id: user_id, book_id: book.book_id }).update({
        quantity: (book.quantity + rows[0].quantity)
      });
    } else {
      //insert the new book into the cart
      await trx.table("cart").insert(book);
    }
  }).catch(() => { throw { code: 400 } });

  return retrieveCart(user_id);
};


async function retrieveCart(user_id) {
  //retrieve all the book_ids in the cart
  const book_ids = await database.table("cart")
      .select("book_id","quantity")
      .where("user_id","=",user_id);
  const ids = book_ids.map(a => a.book_id);

  //retrieve all the books associated to those ids
  const books = await database.table("book")
      .select("book_id","title","current_price","author_id")
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

