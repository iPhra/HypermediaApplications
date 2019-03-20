const sqlDbFactory = require("knex");

let sqlDb = sqlDbFactory({
    client: "pg",
    connection: process.env.DATABASE_URL || "postgres://bciddqzwubzgxb:c0154d9c774c7b7da88220d33d4ab6bd3be0b5b32492aacf6e62c049865f3162@ec2-54-247-70-127.eu-west-1.compute.amazonaws.com:5432/d6ifalhrov4ije?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory",
    ssl: true,
    debug: true
});

accountSetup = (database) => {
    sqlDb = database;
    console.log("Checking if account table exists");
    return database.schema.hasTable("account").then(exists => {
        if (!exists) {
            console.log("It doesn't so we create it");
            return database.schema.createTable("account", table => {
                table.increments("user_id");
                table.string("email").notNullable();
                table.string("password").notNullable();
                table.string("name");
                table.string("surname");
                table.boolean("activated").notNullable();
                table.boolean("admin").defaultTo(false);
            })
        }
    });
};

authorSetup = (database) => {
    sqlDb = database;
    console.log("Checking if author table exists");
    return database.schema.hasTable("author").then(exists => {
        if (!exists) {
            console.log("It doesn't so we create it");
            return database.schema.createTable("author", table => {
                table.increments("author_id");
                table.string("name").notNullable();
                table.string("surname").notNullable();
                table.date("birthdate");
                table.string("birthplace");
                table.text("imgpath");
                table.text("description");
            })
        }
    });
};

authorshipSetup = (database) => {
    sqlDb = database;
    console.log("Checking if authorship table exists");
    return database.schema.hasTable("authorship").then(exists => {
        if (!exists) {
            console.log("It doesn't so we create it");
            return database.schema.createTable("authorship", table => {
                table.integer("author_id").references("author.author_id").onUpdate("CASCADE").onDelete("CASCADE");
                table.integer("book_id").references("book.book_id").onUpdate("CASCADE").onDelete("CASCADE");
                table.primary(["author_id", "book_id"]);
            })
        }
    });
};

bookSetup = (database) => {
    sqlDb = database;
    console.log("Checking if book table exists");
    return database.schema.hasTable("book").then(exists => {
        if (!exists) {
            console.log("It doesn't so we create it");
            return database.schema.createTable("book", table => {
                table.increments("book_id");
                table.string("isbn10", 10).notNullable();
                table.string("isbn13", 13).notNullable();
                table.string("title").notNullable();
                table.text("description");
                table.float("current_price").defaultTo(0).notNullable();
                table.integer("num_of_pages");
                table.enu("cover_type",["hard_cover","soft_cover","e-book"]);
                table.enu("availability",["available","unreleased","out_of_stock"]).notNullable();
                table.text("img_path");
            });
        }
    });
};

cartSetup = (database) => {
    sqlDb = database;
    console.log("Checking if cart table exists");
    return database.schema.hasTable("cart").then(exists => {
        if (!exists) {
            console.log("It doesn't so we create it");
            return database.schema.createTable("cart", table => {
                table.increments("cart_id");
                table.integer("user_id").notNullable().references("account.user_id").onUpdate("CASCADE").onDelete("CASCADE");
                table.integer("book_id").notNullable().references("book.book_id").onUpdate("CASCADE").onDelete("CASCADE");
                table.integer("quantity").defaultTo(1);
            });
        }
    });
};

genreSetup = (database) => {
    sqlDb = database;
    console.log("Checking if genre table exists");
    return database.schema.hasTable("genre").then(exists => {
        if (!exists) {
            console.log("It doesn't so we create it");
            return database.schema.createTable("genre", table => {
                table.integer("book_id").references("book.book_id").onUpdate("CASCADE").onDelete("CASCADE");
                table.enu("genre",["thriller","fantasy","novel","horror","crime","romance","action","sci-fi"]);
                table.primary(["book_id", "genre"]);
            });
        }
    });
};

purchaseSetup = (database) => {
    sqlDb = database;
    console.log("Checking if purchase table exists");
    return database.schema.hasTable("purchase").then(exists => {
        if (!exists) {
            console.log("It doesn't so we create it");
            return database.schema.createTable("purchase", table => {
                table.increments("purchase_id");
                table.integer("user_id").notNullable().references("account.user_id").onUpdate("CASCADE").onDelete("SET NULL");
                table.timestamp("timestamp").notNullable().defaultTo(database.fn.now());
                table.float("total_price").notNullable();
            });
        }
    });
};

purchaseSessionSetup = (database) => {
    sqlDb = database;
    console.log("Checking if purchaseSession table exists");
    return database.schema.hasTable("purchase_session").then(exists => {
        if (!exists) {
            console.log("It doesn't so we create it");
            return database.schema.createTable("purchase_session", table => {
                table.integer("purchase_id").references("purchase.purchase_id").onUpdate("CASCADE").onDelete("SET NULL");
                table.integer("book_id").references("book.book_id").onUpdate("CASCADE").onDelete("SET NULL");
                table.float("price").notNullable();
                table.integer("quantity").defaultTo(1);
                table.primary(["purchase_id","book_id"]);
            });
        }
    });
};

reservationSetup = (database) => {
    sqlDb = database;
    console.log("Checking if reservation table exists");
    return database.schema.hasTable("reservation").then(exists => {
        if (!exists) {
            console.log("It doesn't so we create it");
            return database.schema.createTable("reservation", table => {
                table.increments("reservation_id");
                table.integer("user_id").notNullable().references("account.user_id").onUpdate("CASCADE").onDelete("NO ACTION");
                table.integer("book_id").notNullable().references("book.book_id").onUpdate("CASCADE").onDelete("NO ACTION");
                table.timestamp("timestamp").notNullable().defaultTo(database.fn.now());
                table.float("price").notNullable();
                table.integer("quantity").defaultTo(1);
            });
        }
    });
};

similaritySetup = (database) => {
    sqlDb = database;
    console.log("Checking if similarity table exists");
    return database.schema.hasTable("similarity").then(exists => {
        if (!exists) {
            console.log("It doesn't so we create it");
            return database.schema.createTable("similarity", table => {
                table.integer("book_id1").references("book.book_id").onUpdate("CASCADE").onDelete("CASCADE");
                table.integer("book_id2").references("book.book_id").onUpdate("CASCADE").onDelete("CASCADE");
                table.primary(["book_id1","book_id2"]);
            });
        }
    });
};

function setupDatabase() {
    console.log("Setting up the database");
    accountSetup(sqlDb);
    authorSetup(sqlDb);
    bookSetup(sqlDb);
    authorshipSetup(sqlDb);
    cartSetup(sqlDb);
    genreSetup(sqlDb);
    purchaseSetup(sqlDb);
    purchaseSessionSetup(sqlDb);
    reservationSetup(sqlDb);
    similaritySetup(sqlDb);
}

module.exports = { database: sqlDb, setupDatabase };