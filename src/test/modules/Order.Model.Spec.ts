import { OrderProperties,OrderModel } from "../../Models/Order_Model";
import {UserModel,UserProperties} from '../../Models/User_Model';
import db from '../../Data_Base'
 const store = new OrderModel();
 const usestore= new UserModel() ;
 const NewOrder: OrderProperties = {status: "Active",user_id:'1'}
 const Order_Updated: OrderProperties = { id:1,status: "Deactive", user_id:"1",}
 const user = {firstname: 'Test',lastname: 'User',password: 'test123'} as UserProperties;
 describe('Order Models', () => {
    beforeAll(async () => {
         await usestore.Create_User(user);
          });
    afterAll(async () => {
        const connection = await db.connect();
         const sql ='DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;';
                 await connection.query(sql);
                       connection.release();
                     });
   it('Should Have An Index Method', () => {
     expect(store.index).toBeDefined();
   });
   it('Should Have An Show Method', () => {
     expect(store.Show_Order).toBeDefined();
   });
   it('Should have a Create Method', () => {
     expect(store.Create_Order).toBeDefined();
   });
   it('Should have a Delete Method', () => {
     expect(store.Delete_Order).toBeDefined();
   });
   it('Should have a Add_Product_To_Order Method', () => {
     expect(store.Add_Product_To_Order).toBeDefined();
   });
   it('Should have a Show_Order_By_User_ID Method', () => {
     expect(store.Show_Order_By_User_ID).toBeDefined();
   });
   it('Should have a Update Method', () => {
     expect(store.Update_Order).toBeDefined();
   });
   it('Create Method Should Return A List Of Created Order', async () => {
     const Order = await store.Create_Order(NewOrder);

   });
   it('Index Method Should Return A List Of Orders', async () => {
     const order = await store.index();
         expect(order[0].id).toBe(1);
         expect(order[0].status).toBe('Active');
         expect(order[0].user_id).toBe('1');

   });
   it('Shows Method Should Return A List Of  Order', async () => {
     const Order = await store.Show_Order(1);
   });

   it('Update Method Should Return A List Of Updated Order', async () => {
     const Order = await store.Update_Order(Order_Updated);
     expect(Order[0].id).toBe(1);
     expect(Order[0].status).toBe('Deactive');
    expect(Order[0].user_id).toBe('1');
  });
  it('Delete Method Should Order Deleted SuccsesFully', async () => {
    const Order = await store.Delete_Order(1);

  });

 })
