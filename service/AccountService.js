'use strict';

const {database} = require("./Database");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const checkToken = require("../utils/authenticator").checkToken;
const hashPassword = require("../utils/authenticator").hashPassword;

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
exports.accountInfoGET = async (token) => {
    //check if the user is logged in, if so retrieve his user_id
    const user_id = await checkToken(token);

    //retrieve the info about the account
    return (await database.select().table("account").where("user_id","=",user_id))[0];
};


/**
 * Updates the info of an account.
 *
 * account Account Account details. (optional)
 * returns User
 **/
exports.accountInfoPOST = async (account, token) => {
    //check if the user is logged in, if so retrieve his user_id
    const user_id = await checkToken(token);

    //encrypt the password
    if(account["password"]) account["password"] = await hashPassword(account["password"]);

    //update existing account
    const result = await database.update(account, ['email', 'password', 'name', 'surname', 'admin']).table("account").where({ 'user_id': user_id });
    return result[0];
};


/**
 * Login of a registered user.
 *
 * login Login Login details. (optional)
 * returns inline_response_200_2
 **/
exports.accountLoginPOST = async (login) => {
    //query the database to find an existing account with the provided credentials
    const account = await database.table("account").select().where("account.email", "=", login["email"]);

    //if there is no email associated
    if (account.length === 0)
        throw new Error("Email provided does not exist");

    //if the password is wrong
    if (!(await bcrypt.compare(login["password"], account[0]["password"])))
        throw new Error("Wrong password");

    //generate jwt token containing user_id
    const token =  jwt.sign({
        user_id: account[0]["user_id"],
    }, config.get('jwtPrivateKey'), { expiresIn: '1 day' });

    return {token: token};
};


/**
 * Registers a new user.
 *
 * user User User who wants to sign up. (optional)
 * returns User
 **/
exports.accountRegisterPOST = async (user) => {
    //retrieve users with the same email
    const account = await database.table('account').select().where({ email: user.email });

    //check if some user already exists
    if (account.length > 0)
        throw new Error('User already existing');

    //encrypt the password
    user["password"] = await hashPassword(user["password"]);

    //create new Account
    const result = await database.table("account").insert(user, ['email', 'password', 'name', 'surname']);
    return result;
};

