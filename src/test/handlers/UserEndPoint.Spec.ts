import supertest from 'supertest';
import app from '../../Main_Server';
import { UserModel } from '../../Models/User_Model';
import db from '../../Data_Base';
import { UserProperties } from '../../Models/User_Model';
const request = supertest(app);
const userModel = new UserModel();
let Login_Token = '';

describe('Users Endpoint Handlers ', () => {
  beforeAll(async () => {
    const NewUser = {
      firstname: 'First',
      lastname: 'User',
      password: 'test123',
    } as UserProperties;
    await userModel.Create_User(NewUser);
  });
  afterAll(async () => {
    const connection = await db.connect();
    const sql =
      'DELETE FROM order_products;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
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
       it('Cretaing New User', async () => {
      const res = await request
        .post('/Create_New_User')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${Login_Token}`)
        .send({ firstname: 'First1', lastname: 'User1', password: 'test123' });
        Login_Token = res.body
      expect(res.status).toBe(200);
    });
    it('Deleting User By ID ', async () => {
      const response: supertest.Response = await request
        .delete('/Delete_User_By_Id/12')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${Login_Token}`)

      expect(response.status).toBe(200);
    });
    it('Updating User By ID ', async () => {
      const res = await request
        .patch('/Update_User_By_Id/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${Login_Token}`)
        .send({
          firstname: 'New',
          lastname: 'Userupdated',
          password: 'test123',
        });
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(1);
      expect(res.body.firstname).toBe('New');
      expect(res.body.lastname).toBe('Userupdated');
    });
    it('Showing All Users', async () => {
      const res = await request
      .get('/Show_All_Users')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${Login_Token}`)
      expect(res.body.id).toBe(2);
      expect(res.body.firstname).toBe('First1');
      expect(res.body.lastname).toBe('User1');
      expect(res.status).toBe(200);
    });
    it('Raising Error Showing All Users As Token Is Needed', async () => {
      const res = await request.get('/Show_All_Users');
      expect(res.status).toEqual(401);
    });
    it('Showing User By ID ', async () => {
      const response: supertest.Response = await request
        .get('/Show-User_By_Id/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${Login_Token}`)
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(1);
        expect(response.body.firstname).toBe('New');
        expect(response.body.lastname).toBe('Userupdated');
        expect(response.status).toEqual(200);

    });
    it('Raisess Error Showing User By ID As Token Is Needed', async () => {
      const response: supertest.Response = await request
        .get('/Show-User_By_Id/1')
        .set('Content-type', 'application/json');
        expect(response.status).toEqual(401);

    });
 
  });
});
