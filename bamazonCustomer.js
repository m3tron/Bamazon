var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table3");

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
});

function displayItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) {
      console.log(err);
    }
    var table = new Table({
      head: ["ID", "Product Name", "Price"]
    });
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].item_id, res[i].product_name, res[i].price]);
    }
    console.log(table.toString());

    main(res);
  });

  //connection.end();
}

function main(res) {
  inquirer
    .prompt([
      {
        type: "number",
        message: "Please enter the ID of the item you'd like to purchase.",
        name: "purchasedItem"
      },
      {
        type: "number",
        message: "How many would you like to purchase?",
        name: "purchasedQuantity"
      }
    ])
    .then(function(ans) {
      var itemIndex = ans.purchasedItem - 1;
      console.log(res[itemIndex].stock_quantity);
      console.log(ans.purchasedItem, ans.purchasedQuantity);

      connection.query(
        "SELECT * FROM products WHERE item_id = ?",
        ans.purchasedItem,
        function(err, results) {
          if (err) throw err;
          if (ans.purchasedQuantity > res[itemIndex].stock_quantity) {
            console.log("too much sauce");
          }
        }
      );
    });
}

displayItems();
