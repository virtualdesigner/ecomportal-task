const {db} = require("./database");

const createUserTable = () => {
  db.serialize(() => {
   db.run(
    `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        passwordHash TEXT NOT NULL,
        refreshToken TEXT
      );
    `,
    (err: Error) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Users table created successfully.");
      }
    }
   );
  });
}

createUserTable()