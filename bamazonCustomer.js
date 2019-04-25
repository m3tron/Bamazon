var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin123",
  database: "bamazon",
  port: 3306
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  displayItems();
});

function displayItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) {
      console.log(err);
    }
    res.forEach(element => {
      console.log(
        `${element.item_id} | ${element.product_name} | ${
          element.department_name
        } | ${element.price} | ${element.stock_quantity}\n`
      );
    });
  });
  connection.end();
}
