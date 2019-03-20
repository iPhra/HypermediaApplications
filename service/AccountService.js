'use strict';


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
exports.accountInfoGET = function() {
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

