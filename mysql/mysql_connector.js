const mysql = require("mysql");

const client = mysql.createConnection({
  host: "54.82.110.167:3306",
  user: "root",
  password: "root",
  database: "board"
});

module.exports = client;
