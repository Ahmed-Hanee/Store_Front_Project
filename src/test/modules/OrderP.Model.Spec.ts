import { Order_Products_Properties, Order_Products_Model } from '../../Models/Order_Products_model';
import {UserModel,UserProperties} from '../../Models/User_Model';
import { PrdouctModel,PrdouctProperties } from '../../Models/Product_Model';
import { OrderModel,OrderProperties } from '../../Models/Order_Model';

import db from '../../Data_Base' ;
const ProductStore = new PrdouctModel();
const orderstore = new OrderModel();
const Userstore= new UserModel() ;
const OrderProductStore=new Order_Products_Model() ;
const NewOrder: OrderProperties = {status: "Active",user_id:'1'}
const user = {firstname: 'Test',lastname: 'User',password: 'test123'} as UserProperties;
const NewProduct: PrdouctProperties = {name: "Prdouct1",product_price: 0}

const Order_Product: Order_Products_Properties = {
  quantity:100,
  order_id: "1",
  product_id: "1",
}
const Order_Product_Updated: Order_Products_Properties = {
  quantity:350,
  order_id: "1",
  product_id: "1",
}
describe('Order-Product Models', () => {
    beforeAll(async () => {
        await Userstore.Create_User(user);
        await orderstore.Create_Order(NewOrder);
        await ProductStore.Create_Product(NewProduct);

         });
   afterAll(async () => {
       const connection = await db.connect();
        const sql ='DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM order_products;\nALTER SEQUENCE order_products_id_seq RESTART WITH 1;';
                await connection.query(sql);
                      connection.release();
                    })
  it('Should Have An Index Method', () => {
    expect(OrderProductStore.index).toBeDefined();
  });
  it('Should Have An Show Method', () => {
    expect(OrderProductStore.Show_Order_Product).toBeDefined();
  });

  it('Should have a Create Method', () => {
    expect(OrderProductStore.Create_Order_Product).toBeDefined();
  });

  it('Should have a Delete method', () => {
    expect(OrderProductStore.Delete_Order_Product).toBeDefined();
  });

  it('Create Method Should Return A List Of Created OrderProducts', async () => {
    const orderProducts = await OrderProductStore.Create_Order_Product(Order_Product);
  });
  it('Index Method Should Return A List Of OrderProducts', async () => {
    const orderProducts = await OrderProductStore.index();
    expect(orderProducts.id).toEqual(1);
    expect(orderProducts.quantity).toBe(100);
    expect(orderProducts.order_id).toBe('1');
    expect(orderProducts.product_id).toBe('1');
  });
  it('Shows Method Should Return A List Of  OrderProduct', async () => {
    const orderProducts = await OrderProductStore.Show_Order_Product(1);
  });
  it('Update Method Should Return A List Of Updated OrderProduct', async () => {
    const orderProducts = await OrderProductStore.Update_Order_Product(Order_Product_Updated);
  });
  it('Delete Method Should Return A List Of Deleted OrderProducts', async () => {
    const orderProducts = await OrderProductStore.Delete_Order_Product(1);
  });

});
