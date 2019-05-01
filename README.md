# Bamazon

## Amazon like CLI app

### Customer

Run **_node bamazonCustomer.js_** in terminal.

![](screenshots/cust1.PNG)

You will be shown a list of products available for sale.

Enter the **_ID_** of the product you would like to purchase.

Then enter the quantity you would like to order.

![](screenshots/cust2.PNG)

If quantity requested exceeds quantity on stock, you will be asked to retry.

![](screenshots/cust3.PNG)

### Manager

Run **_node bamazonManager.js_** in terminal.
![](screenshots/man1.PNG)

You will then be prompted to pick one of the following options:
![](screenshots/man2.PNG)

1. View Products for Sale
   Select this option to see a list of products available for sale.
   ![](screenshots/man3.PNG)
2. View Low Inventory
   Select this to view which product has a stock quantity less than 5.
   ![](screenshots/man4.PNG)
3. Select this to add stock to a product. You will be asked for an item ID and the amount to be added.
   ![](screenshots/man5.PNG)
   Before:
   ![](screenshots/man6.PNG)
   After:
   ![](screenshots/man7.PNG)
4. Add New Product
   Select this to add a new product. You will be asked the product name, department name it belongs to, price, and quantity you have to sell.

   ![](screenshots/man8.PNG)
   ![](screenshots/man9.PNG)

5. Quit
   Select this to quit.
