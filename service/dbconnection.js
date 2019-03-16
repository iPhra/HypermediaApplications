const sqlDbFactory = require("knex");

let { booksDbSetup } = require("./BooksService");
//require all other setups

let sqlDb = sqlDbFactory({
    client: "pg",
    connection: process.env.DATABASE_URL || "postgres://bciddqzwubzgxb:c0154d9c774c7b7da88220d33d4ab6bd3be0b5b32492aacf6e62c049865f3162@ec2-54-247-70-127.eu-west-1.compute.amazonaws.com:5432/d6ifalhrov4ije?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory",
    ssl: true,
    debug: true
});

function setupDatabase() {
    console.log("Setting up the database");
    //add all other setups
    return booksDbSetup(sqlDb);
}

module.exports = { database: sqlDb, setupDatabase };