const sqlDbFactory = require("knex");

let { booksDbSetup } = require("./BooksService");
//require all other setups

let sqlDb = sqlDbFactory({
    client: "pg",
    connection: process.env.DATABASE_URL,
    ssl: true,
    debug: true
});

function setupDatabase() {
    console.log("Setting up the database");
    //add all other setups
    return booksDbSetup(sqlDb);
}

module.exports = { database: sqlDb, setupDatabase };