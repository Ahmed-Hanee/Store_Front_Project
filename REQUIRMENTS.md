# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 
*Users API Endpoints
-----------------------------------------------------------------------------
    .get('/Show_All_Users' )---->Showing All Users (Token Required)
    .get('/Show-User_By_Id/:id' )--->Showing User By Id (Token Required)
    .post('/Create_New_User' )------>Creating New User (Token Required)
    .delete('/Delete_User_By_Id/:id' )----->Deleting User By ID
    .patch('/Update_User_By_Id' )------>Udpdating User By ID
    .post('/Log_In' )------------>Authenticating Created User To Get Token
_________________________________________________________________________________________________________
*Product API Endpoints
---------------------------------------------------------------------
.get('/Show_All_Products') --> Showing All Products
.get('/Show_Products_By_Id/:id') -->Showing Product By Id 
.post('/Create_New_Product') --->Creating New Product (Token Required)
.delete('/Delete_Product_By_Id/:id')---->Deleting Product By ID
.patch('/Update_Product_By_Id/:id')---->Udpdating Product By ID
____________________________________________________________________________________________________
*Orders API Endpoints
-----------------------------------------------------------------------------
    .get('/Show_All_Orders')--->Showing All Orders
    .get('/Show_Orders_By_Id/:id')---->Showing Order By Order ID
    .get('/Show_Orders_By_User_Id/:id') ----->Showing Order By User ID (TOKEN NEEDED)
    .post('/Create_New_Order')---->Creating New Order
    .delete('/Delete_Orders_By_Id/:id')--------->Deleting Order By ID
    .patch('/Update_Orders_By_Id/:id')--------->Udpdating Order By ID
    .post('/orders/:id/products')-------------->Adding Products To Exsisting Order BY ID
___________________________________________________________________________________________________
*Order-Products API Endpoints
------------------------------------------------------------------------------------------------------------
 .get('/Show_All_Order_Products', )
 .get('/Show_Order_Products_By_Id/:id' )---->Showing Order-Products By ID
  .post('/Create_New_Order_Products' )Create_Handler_Order_Products)------>Creating New Order-Product
  .delete('/Delete_Order_Products_By_Id/:id') Delete_Handler_Order_Products)----->Deleting  Order-Product By ID
  .patch('/Update_Order_Products_By_Id/:id') Update_Handler_Order_Products)------->Udpdating Order-Product By ID
____________________________________________________________________________________________________________


## Data Shapes

#### Product
-  id
- name
- price
*****************************************************************************************************
CREATE TABLE products(id SERIAL PRIMARY KEY,name VARCHAR(255)NOT NULL,product_price INTEGER NOT NULL) ;
******************************************************************************************************
#### User
- id
- firstName
- lastName
- password
*********************************************************************************************************
CREATE TABLE users (id SERIAL PRIMARY KEY,firstname VARCHAR(100),lastname VARCHAR(100),password VARCHAR(100));
***********************************************************************************************************
#### Orders
- id
- user_id
- status of order (active or complete)
************************************************************************************************
CREATE TABLE orders(id SERIAL PRIMARY KEY,status VARCHAR(64),user_id bigint REFERENCES users(id)) ; 
**************************************************************************************************
###### Order-Products 
- id 
- id of each product in the order
- quantity of each product in the order
*******************************************************************************************************************************************************
CREATE TABLE order_products(id SERIAL PRIMARY KEY ,quantity INTEGER , order_id bigint REFERENCES orders(id),product_id bigint REFERENCES products(id)) ;
***********************************************************************************************************************************************************