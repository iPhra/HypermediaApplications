const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//hashes the password given a salt
module.exports.hashPassword = async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

//check if the provided token is valid
module.exports.checkToken = async function checkToken(token) {
    try {
        const decoded = await jwt.verify(token, config.get('jwtPrivateKey'));
        return decoded.user_id;
    } catch(err) {
        throw {code: 401};
    }
};