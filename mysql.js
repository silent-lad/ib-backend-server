const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  name: "sql12361367",
  user: "sql12361367",
  password: "SGYfyiUjwx",
});

module.exports = { connection };
