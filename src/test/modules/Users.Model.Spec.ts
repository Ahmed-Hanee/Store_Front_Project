import { UserProperties, UserModel } from '../../Models/User_Model';

import db from '../../Data_Base' ;
const store = new UserModel();
const New_User: UserProperties = {
  firstname: "First",
  lastname: "User",
  password:"pass1" ,
}
const New_User_update: UserProperties = {

  firstname: "Fifth",
  lastname: "UserUpdated",
  password:"New" ,
  id:"1"
}

describe('User Models', () => {

    afterAll(async () => {
                     const connection = await db.connect();
    const sql ='DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
              await connection.query(sql);
                    connection.release();
                  });

it('Should Have An Index Method', () => {
  expect(store.index).toBeDefined();
});
it('Should Have An Show Method', () => {
  expect(store.Show_User).toBeDefined();
});

it('Should have a Create Method', () => {
  expect(store.Create_User).toBeDefined();
});

it('Should have a Delete method', () => {
  expect(store.Delete_User).toBeDefined();
});

it('Should have a Authenticate method', () => {
  expect(store.Authenticate_User).toBeDefined();
});

it('Create Method Should Return A List Of Created User', async () => {
  const CreateUser = await store.Create_User(New_User);
});
it('Index Method Should Return A List Of Users', async () => {
  const ListUsers = await store.index();
  expect(ListUsers.id).toBe(1);
  expect(ListUsers.firstname).toBe('First');
  expect(ListUsers.lastname).toBe('User');
});

it('Shows Method Should Return A List Of  User', async () => {
  const ShowUser = await store.Show_User(1);
  expect(ShowUser.id).toEqual(1);
  expect(ShowUser.firstname).toEqual('First');
  expect(ShowUser.lastname).toEqual('User');
});

it('Authenticate Method Should Un-Validate User credentials', async () => {
  const AuthenticateUser = await store.Authenticate_User("f","UserUpdated","New");
  expect(AuthenticateUser).toBe('Wrong UserName Or Password')  ;
});

  it('Update Method Should Return A List Of Updated User', async () => {
    const UpdateUser = await store.Update_User(New_User_update);
    expect(UpdateUser.firstname).toEqual('Fifth');
    expect(UpdateUser.lastname).toEqual('UserUpdated');
    expect(UpdateUser.id).toEqual(1);
  });

  it('Delete Method Should Return A List Of Deleted User', async () => {
    const DeleteUser = await store.Delete_User(2);
  });

})
