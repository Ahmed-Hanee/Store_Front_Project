import supertest from 'supertest';
import app from '../../Main_Server';
import db from '../../Data_Base'
import { PrdouctModel, PrdouctProperties } from '../../Models/Product_Model';
import { UserProperties,UserModel } from '../../Models/User_Model';
const productmodel = new PrdouctModel();
const usermodel= new UserModel () ;
const request = supertest(app);
let Login_Token = ''

describe('Products Endpoint Handlers ', () => {
    beforeAll(async () => {
 
        const NewUser ={firstname: 'First',lastname: 'User',password: 'test123'} as UserProperties;
       await usermodel.Create_User(NewUser);
    });

    afterAll(async () => {
        const connection = await db.connect();
        const sql =
            'DELETE FROM order_products;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
        await connection.query(sql);
        connection.release();
    });

    describe('Test CRUD EndPoints API Main Methods', () => {
        it('Authenticating Registerd User And Generating Token', async () => {
            const res = await request
                .post('/Log_In')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${Login_Token}`)
                .send({ firstname: 'First', lastname: 'User', password: 'test123' });
                Login_Token = res.body;
                expect(res.status).toBe(200);
        });
        it('Cretaing New Product ', async () => {
            const response = await request
                .post('/Create_New_Product')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${Login_Token}`)
                .send({ name: 'productname', product_price: 90 });
                expect(response.body.id).toBe(1);
                expect(response.body.name).toBe('productname');
                expect(response.body.product_price).toBe(90);
                expect(response.status).toBe(200);
        });
        it('Raising Error Cretaing New Product As Token Is Needed', async () => {
            const res = await request
                .post('/Create_New_Product')
                .set('Content-Type', 'application/json')
                .send({ name: 'productname', product_price: 90 });
            expect(res.status).toBe(401);
        });

        it('Showing All Products', async () => {
            const response = await request
                .get('/Show_All_Products')
                .set('Content-type', 'application/json')
            expect(response.body[0].id).toBe(1);
            expect(response.body[0].name).toBe('productname');
            expect(response.body[0].product_price).toBe(90);
            expect(response.status).toBe(200);
        });
        it('Showing Product By ID ', async () => {
            const response: supertest.Response = await request
                .get('/Show_Products_By_Id/1')
                .set('Content-type', 'application/json')
            expect(response.body.id).toBe(1);
            expect(response.body.name).toBe('productname');
            expect(response.body.product_price).toBe(90);
            expect(response.status).toBe(200);
        });
        it('Updating Products By ID ', async () => {
            const response: supertest.Response = await request
                .patch('/Update_Product_By_Id/1')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${Login_Token}`)
                .send({ name: 'product1', product_price: 290 })
            expect(response.body.id).toBe(1);
            expect(response.body.name).toBe('product1');
            expect(response.body.product_price).toBe(290);
            expect(response.status).toBe(200);

        });

        it('Deleting Product By ID ', async () => {
            const response: supertest.Response = await request
                .delete('/Delete_Product_By_Id/1')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${Login_Token}`)
            expect(response.status).toBe(200);
        });
        it('Raising Error No Product Registerd By This ID ', async () => {
            const response: supertest.Response = await request
                .delete('/Delete_Product_By_Id/12')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${Login_Token}`)
            expect(response.status).toBe(400);
        });
    });
});
