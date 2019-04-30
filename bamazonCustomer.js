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

var itemArray = [];

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
      itemArray.push([res[i].item_id]);
    }
    console.log(table.toString());
    main(res);
  });
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
      /*   if (itemArray.indexOf(ans.purchasedItem) = -1) {
        console.log("Invalid Choice! Please try again.");
        displayItems();
      } else { */
      connection.query(
        "SELECT * FROM products WHERE item_id = ?",
        ans.purchasedItem,
        function(err, results) {
          if (err) throw err;
          if (ans.purchasedQuantity > results[0].stock_quantity) {
            console.log("Insufficient quantity!");
            main(res);
          } else if (results[0].stock_quantity - ans.purchasedQuantity > 0) {
            var quant = results[0].stock_quantity - ans.purchasedQuantity;
            connection.query(
              "UPDATE products SET stock_quantity = ? WHERE item_id = ?",
              [quant, ans.purchasedItem],
              function(err, answer) {
                console.log("Purchase successful!");
                console.log(
                  `Your total for ${ans.purchasedQuantity} x ${
                    results[0].product_name
                  } is $${(results[0].price * ans.purchasedQuantity).toFixed(
                    2
                  )}`
                );
                connection.end();
              }
            );
          } else {
            console.log("Not a valid choice");
            main(res);
          }
        }
      );
    });
}

displayItems();
