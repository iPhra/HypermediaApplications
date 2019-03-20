'use strict';

const {database} = require("./Database");

/**
 * Delete an existing acccount.
 *
 * returns User
 **/
exports.accountInfoDELETE = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "password" : "password",
  "user_id" : 0,
  "email" : "email",
  "activated" : true
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns info about a user.
 *
 * returns User
 **/
exports.accountInfoGET = async () => {
    const user_id = 0; //@todo check if he's logged in and get his user_id

    //retrieve the info about the account
    return await database.select().table("account").where("user_id","=",user_id);
};


/**
 * Updates the info of an account.
 *
 * account Account Account details. (optional)
 * returns User
 **/
exports.accountInfoPOST = function(account) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "password" : "password",
  "user_id" : 0,
  "email" : "email",
  "activated" : true
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Login of a registered user.
 *
 * login Login Login details. (optional)
 * returns inline_response_200_2
 **/
exports.accountLoginPOST = function(login) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "token" : "token"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Registers a new user.
 *
 * user User User who wants to sign up. (optional)
 * returns User
 **/
exports.accountRegisterPOST = function(user) {
  return new Promise(function(resolve, reject) {
      return database
          .table('account')
          .select()
          .where({ email:  user.email })
          .then(rows => {
              // Check if some user already exist
              if (rows.length>0) reject('User already registered');
              // Insert new user into database
              database
                  .table("account")
                  .insert(user, ['user_id'])
                  .then(user_id => {
                      resolve(user_id);
                  })
                  .catch(err => console.log(err));
          });
  });
};

