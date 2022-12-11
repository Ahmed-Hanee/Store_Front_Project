import supertest from 'supertest';
import db from '../../Data_Base';
import app from '../../Main_Server';

import { UserModel, UserProperties } from '../../Models/User_Model';
import {
  Order_Products_Properties,
  Order_Products_Model,
} from '../../Models/Order_Products_model';
import { PrdouctProperties, PrdouctModel } from '../../Models/Product_Model';
import { OrderModel, OrderProperties } from '../../Models/Order_Model';
const userModel = new UserModel();
const productModel = new PrdouctModel();
const orderModel = new OrderModel();
const request = supertest(app);

describe('Order Product Endpoint Handlers', () => {
  const user = { firstname: 'Test', lastname: 'User', password: 'test123', } as UserProperties;
  const product = { name: 'productname', product_price: 9,} as PrdouctProperties;
  const order = { user_id: '1', status: 'nactive' } as OrderProperties;
  const orderProduct = {quantity: 254,order_id: '1',product_id: '1',} as Order_Products_Properties;

  beforeAll(async () => {
    await userModel.Create_User(user);
    await productModel.Create_Product(product);
    await orderModel.Create_Order(order);
  });

  afterAll(async () => {
    const connection = await db.connect();
    const sql =
      ' DELETE FROM order_products;\nALTER SEQUENCE order_products_id_seq RESTART WITH 1;DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;';
    await connection.query(sql);
    connection.release();
  });

  describe('Testing CRUD API methods', () => {
    it('Creating New Order-Products', async () => {
      const res = await request
        .post('/Create_New_Order_Products')
        .set('Content-type', 'application/json')
        .send(orderProduct);
      expect(res.body.id).toBe(1);
      expect(res.body.quantity).toBe(254);
      expect(res.body.order_id).toBe('1');
      expect(res.body.product_id).toBe('1');
      expect(res.status).toBe(200);

    });

    it('Showing All Order-Products', async () => {
      const res = await request
        .get('/Show_All_Order_Products')
        .set('Content-type', 'application/json');
      expect(res.body.id).toBe(1);
      expect(res.body.quantity).toBe(254);
      expect(res.body.order_id).toBe('1');
      expect(res.body.product_id).toBe('1');
      expect(res.status).toBe(200);

    });

    it('Showing Order-Products By ID', async () => {
      const res = await request
        .get('/Show_Order_Products_By_Id/1')
        .set('Content-type', 'application/json');
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(1);
      expect(res.body.quantity).toBe(254);
      expect(res.body.order_id).toBe('1');
      expect(res.body.product_id).toBe('1');
    });

    it('Updating Order-Products By ID ', async () => {
      const res = await request
        .patch('/Update_Order_Products_By_Id/1')
        .set('Content-type', 'application/json')
        .send({ quantity: 1250, order_id: '1', product_id: '1' });
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(1);
      expect(res.body.quantity).toBe(1250);
      expect(res.body.order_id).toBe('1');
    });

    it('Deleting Order-Products By ID', async () => {
      const res = await request
        .delete('/Delete_Order_Products_By_Id/1')
        .set('Content-type', 'application/json');
      expect(res.status).toBe(200);
    });
  });
});
