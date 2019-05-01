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
  main();
});

//Main function
function main() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "option",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product",
          "Quit"
        ]
      }
    ])
    .then(function(res) {
      switch (res.option) {
        //Creates table to view all products
        case "View Products for Sale":
          connection.query("SELECT * FROM products", function(err, res) {
            if (err) {
              console.log(err);
            }

            var table = new Table({
              head: ["ID", "Product Name", "Department", "Price", "Stock"]
            });
            for (var i = 0; i < res.length; i++) {
              table.push([
                res[i].item_id,
                res[i].product_name,
                res[i].department_name,
                res[i].price,
                res[i].stock_quantity
              ]);
            }
            console.log(table.toString());
            main();
          });
          break;

        //Shows products which have less than 5 items in stock
        case "View Low Inventory":
          connection.query("SELECT * FROM products", function(err, res) {
            if (err) {
              console.log(err);
            }

            var table = new Table({
              head: ["ID", "Product Name", "Department", "Price", "Stock"]
            });
            for (var i = 0; i < res.length; i++) {
              if (res[i].stock_quantity < 5) {
                table.push([
                  res[i].item_id,
                  res[i].product_name,
                  res[i].department_name,
                  res[i].price,
                  res[i].stock_quantity
                ]);
              }
            }
            console.log(table.toString());
            main();
          });
          break;

        //Allows the manager to add items to the inventory
        case "Add to Inventory":
          connection.query("SELECT * FROM products", function(err, res) {
            if (err) {
              console.log(err);
            }

            inquirer
              .prompt([
                {
                  type: "number",
                  name: "itemId",
                  message:
                    "Please enter the ID of the item you'd like to increase the inventory."
                },
                {
                  type: "number",
                  name: "addStock",
                  message: "How much would you like to increase it by?"
                }
              ])
              .then(function(ans) {
                connection.query(
                  "UPDATE products SET stock_quantity = stock_quantity +" +
                    ans.addStock +
                    " WHERE item_id = ?",
                  ans.itemId,
                  function(err, response) {
                    if (err) throw err;
                  }
                );
                main();
              });
          });
          break;

        //Adds a new product
        case "Add New Product":
          connection.query("SELECT * FROM products", function(err, res) {
            if (err) {
              console.log(err);
            }

            inquirer
              .prompt([
                {
                  type: "input",
                  name: "productName",
                  message: "Enter the product name."
                },
                {
                  type: "input",
                  name: "productDepartment",
                  message: "Which department does it belong in?"
                },
                {
                  type: "number",
                  name: "productPrice",
                  message: "Enter the price of the product."
                },
                {
                  type: "number",
                  name: "productStock",
                  message: "How many do you have in stock?"
                }
              ])
              .then(function(ans) {
                connection.query(
                  "INSERT INTO products(product_name, department_name, price, stock_quantity)VALUES(?,?,?,?)",
                  [
                    ans.productName,
                    ans.productDepartment,
                    ans.productPrice,
                    ans.productStock
                  ],
                  function(err) {
                    if (err) throw err;
                    console.log("Item added!");
                    main();
                  }
                );
              });
          });
          break;

        //Closes the connection with the database
        case "Quit":
          connection.end();
          break;

        default:
          console.log("Please try again");
          break;
      }
    });
}
