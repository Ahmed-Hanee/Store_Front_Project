import supertest from 'supertest';
import app from '../../Main_Server';
import db from '../../Data_Base';
import { UserModel, UserProperties } from '../../Models/User_Model';
import { PrdouctModel, PrdouctProperties } from '../../Models/Product_Model';

const request = supertest(app);
const userModel = new UserModel();
const Prdouctmodel = new PrdouctModel();
let Login_Token: string = '';

describe('Orders EndPoints Handlers ', () => {
    beforeAll(async () => {
        const NewUser = {
            firstname: 'First',
            lastname: 'User',
            password: 'Test123',
        } as UserProperties;
        await userModel.Create_User(NewUser);
        const NewProduct = {
            name: 'Product1',
            product_price: 150,
        } as PrdouctProperties;
        await Prdouctmodel.Create_Product(NewProduct);
    });
    afterAll(async () => {
        const connection = await db.connect();
        const sql =
            'DELETE FROM order_products;\nALTER SEQUENCE order_products_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
        await connection.query(sql);
        connection.release();
    });
    describe('Test CRUD EndPoints API Main Methods', () => {
        it('Authenticating Registerd User And Generating Token', async () => {
            const res = await request
                .post('/Log_In')
                .set('Content-type', 'application/json')
                .send({ firstname: 'First', lastname: 'User', password: 'Test123' });
            expect(res.status).toBe(200);
             Login_Token = res.body;
        });
        it('Cretaing New Order ', async () => {
            const res = await request
                .post('/Create_New_Order')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${Login_Token}`)
                .send({ status: 'NewOrder', user_id: '1' });
            expect(res.body.id).toBe(1);
            expect(res.body.status).toBe('NewOrder');
            expect(res.body.user_id).toBe('1');
            expect(res.status).toBe(200);
        });
        it('Showing All Orders ', async () => {
            const res = await request
                .get('/Show_All_Orders')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${Login_Token}`)

            expect(res.body[0].id).toBe(1);
            expect(res.body[0].status).toBe('NewOrder');
            expect(res.body[0].user_id).toBe('1');
            expect(res.status).toBe(200);
        });
        it('Showing Order By ID ', async () => {
            const res = await request
                .get('/Show_Orders_By_Id/1')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${Login_Token}`)
            expect(res.body.id).toBe(1);
            expect(res.body.status).toBe('NewOrder');
            expect(res.body.user_id).toBe('1');
            expect(res.status).toBe(200);
        });

        it(' Showing Order By User-ID ', async () => {
            const res = await request
                .get('/Show_Orders_By_User_Id/1')
                .set('Authorization', `Bearer ${Login_Token}`)
                .set('Content-type', 'application/json')
                expect(res.body.firstname).toBe('First');
                expect(res.body.lastname).toBe('User');
                expect(res.body.status).toBe('NewOrder');
                expect(res.status).toBe(200);
                    });
        it('Raising Error Showing Order By User-ID As Token Is Needed ', async () => {
            const res = await request
                .get('/Show_Orders_By_User_Id/1')
                .set('Content-type', 'application/json');
            expect(res.status).toBe(401);
        });
        it('Updating Order By ID ', async () => {
            const res = await request
                .patch('/Update_Orders_By_Id/1')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${Login_Token}`)
                .send({ status: 'Deactive', user_id: '1' });
            expect(res.body[0].id).toBe(1);
            expect(res.body[0].status).toBe('Deactive');
            expect(res.body[0].user_id).toBe('1');
            expect(res.status).toBe(200);
        });
        it('Adding Product To Existing Order ', async () => {
            const res = await request
                .post('/orders/1/products/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${Login_Token}`)
                .send({ quantity: 100, orderId: '1', productId: '1' })
                
            expect(res.body.addedProduct.id).toBe(1);
            expect(res.body.addedProduct.quantity).toBe(100);
            expect(res.body.addedProduct.order_id).toBe('1');
            expect(res.body.addedProduct.product_id).toBe('1');
            expect(res.status).toBe(200);
        });
        it('Raising Error Deleting Order By ID As Token Is Needed ', async () => {
            const res = await request
                .delete('/Delete_Orders_By_Id/5')
                .set('Content-type', 'application/json');
             expect(res.status).toBe(401);
        });
    });
});
