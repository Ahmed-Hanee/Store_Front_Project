                                             EGY_FWD ADVANCED FULL_STACK WEB DEVELOPMENT PROGRAM
                                                       BUILD STORE FRONT APPLICATION
                                                                PROJECT2
#Project Summary
Imagine that you are a web developer at a small company. The company stakeholders have decided they want to set up an online store to make their great product ideas available for purchase -- and they want you and your co-worker to build it.

The stakeholders have put together a list of requirements for this online store. Your co-worker will be building the frontend and you will be supplying the JavaScript API. The requirements have been collected into requirements document.

Your job is to architect the database, its tables and columns to fulfill the data requirements and craft a RESTful API that exposes that information to the frontend developer.

Your application needs to be ready for beta tests, so it needs to have tests, keep user information secure, and provide user authentication tokens that are ready to integrate with the frontend.


***psql Commands 
-------------------------------------------------------------------------------------------------------------------
Server [localhost]:
Database [postgres]: Store_Front_DB_Test
Port [5432]:
Username [postgres]:
______________________________________________________________________________________________________________
*Requirments
------------------------------------------------------------------------------------------------------------------------------------------
1- prettier
2- Typescript
3- Jasmine
4- Express
5- Cors
6- JWT
7- Supertest
8- Bcrypt
9- db-migrate
10- Postgres
11- dotenv
12- tsc-watch
______________________________________________________________________________________________________________________________________________________________
*How to use
-------------------------------------------------------------------------------------------------------------------------------------------------------------
1- Open the project
2- Install all required package (npm install)-->node modules
3- Create a development database using Postgres
4- Create a testing database using Postgres
5- Create a user to the two databases
6- Create a dotenv file 
7- Adding  details of  Database inside the Env File
8- Adding  BCRYPT_PASSWORD and TOKEN_SECRET And SECRET_TOKEN
9- Running Prettier script (npm run prettier)
10- Runnong test Script (npm run test)
11- Starting the server (npm run start) at http://localhost:3000 ,PORT NUMBER (5432) 
_____________________________________________________________________________________________________________________________________________________
*Env File Copy
-----------------------------------
HOST = 127.0.0.1
DB = Store_Front_DB
DB_Test = Store_Front_DB_Test
USER = postgres
PASSWORD = pass
ENV = test

TOKEN_SECRET=alohomora123!
SALT_ROUNDS=10 

BCRYPT_PASSWORD=your-secret-password
________________________________________________________________________________________________________________________________________________________

Introduction to Routes : Routs Are Found in Handler folder where every model got its handler model and its own routes,this is all routes in this project 
--------------------------------------------------------------------------------------------------------------------------------------------------------------
(order_ProductsRoutes)
-------------------------
  app.get('/Show_All_Order_Products', Index_Handler)
    app.get('/Show_Order_Products_By_Id/:id', Show_Handler_Order_Products)
    app.post('/Create_New_Order_Products', Create_Handler_Order_Products)
    app.delete('/Delete_Order_Products_By_Id/:id', Delete_Handler_Order_Products)
    app.patch('/Update_Order_Products_By_Id/:id', Update_Handler_Order_Products)
----------------------------------------------------------------------------------------------    
(ordeRoutes)
-------------------------
    app.get('/Show_All_Orders', Index_Handler)
    app.get('/Show_Orders_By_Id/:id', Show_Handler_Order)
    app.post('/Create_New_Order', Create_Handler_Order)
    app.delete('/Delete_Orders_By_Id/:id', Delete_Handler_Order)
    app.patch('/Update_Orders_By_Id/:id', Update_Handler_Order)
    app.post('/orders/:id/products', addProduct)
    app.get('/Show_Orders_By_User_Id/:id', Show_Order_By_User_ID) 
------------------------------------------------------------------------------------------

(ProductRoutes)
-------------------------
    app.get('/Show_All_Products', Index_Handler)
    app.get('/Show_Products_By_Id/:id', Show_Handler_Product)
    app.post('/Create_New_Product', Create_Handler_Product)
    app.delete('/Delete_Product_By_Id/:id', Delete_Handler_Product)
    app.patch('/Update_Product_By_Id/:id', Update_Handler_Product)
---------------------------------------------------------------------------------------------

(UserRoutes)
-------------------------
    app.get('/Show_All_Users', Index_Handler)
    app.get('/Show-User_By_Id/:id', Show_Handler_User)
    app.post('/Create_New_User', Create_Handler_User)
    app.delete('/Delete_User_By_Id/:id', Delete_Handler_User)
    app.patch('/Update_User_By_Id', Update_Handler_User)
    app.post('/Log_In', User_Handler_Authentication)
-------------------------------------------------------------------------------------------------------------


*************************************************************************************************************************************
2)Authentication
--------------------
There Are Some Function That May Require Your Login Token Which Will BE --> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InBhc3N3b3JkIjoiJDJiJDEwJGVoRElKTFdNVjJTSVZBeml3TnVUbmVINzNsWFhGeEFuQlJoTjRkTXZUbHNBR0kycXkycUQ2In0sImlhdCI6MTY2Nzg5ODQ0MX0.239F67qwI3mLSUIjtewOGDg5b1gopvpcw50j9Lmsirc"
*********************************************************************************************************************************************
3)Instructions To Run 
------------------------
.First We Have To Make Sure NodeMone Is Running Correctly 
.Then We Open PostMan to Start Our Connection With DataBase
.Connecting To PostMan And Checking DataBase By This Link http://localhost:3000/ ,
Then Name A Route From Above To Start Connecting To Database 
**************************************************************************************************
Thanks...
