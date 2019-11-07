// To import
const mysql = require("mysql");
require("dotenv").config();

// To configure the connection
const connection = mysql.createConnection({
  host: process.env.SQL_HOST, // complet with your infos in .env
  port: process.env.SQL_PORT, //complet with your infos in .env
  user: process.env.SQL_USER, //complet with your infos in .env
  password: process.env.SQL_PASSWORD, //complet with your infos in .env
  database: process.env.SQL_DATABASE //complet with your infos in .env
});


//To see if the connection was made with the database 
connection.connect(function(err) {
  if (err) {
    console.error("Error connecting: " + err.stack);
    return;
  } else {
    console.log("Connected as thread id: " + connection.threadId);
  }
});

// To export
module.exports = connection;
