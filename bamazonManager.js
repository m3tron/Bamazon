var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table3");

//Create connection to database
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin123",
  database: "bamazon",
  port: 3306
});

//Connect to database
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});
