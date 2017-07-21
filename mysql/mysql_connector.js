const mysql = require("mysql");

const client = mysql.createConnection({
  host: "192.168.99.100",
  user: "root",
  password: "root",
  database: "board"
});

module.exports = client;
