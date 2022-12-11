import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserProperties, UserModel } from '../Models/User_Model';
const User_Main_Routes = (app: express.Application) => {
  app.get('/Show_All_Users',verifyToken, Index_Handler);
  app.get('/Show-User_By_Id/:id',verifyToken, Show_Handler_User);
  app.post('/Create_New_User', Create_Handler_User);
  app.delete('/Delete_User_By_Id/:id', verifyToken,Delete_Handler_User);
  app.patch('/Update_User_By_Id/:id', verifyToken,Update_Handler_User);
  app.post('/Log_In', User_Handler_Authentication);
};
const store = new UserModel();
const verifyToken = (req:Request, res: Response, next: NextFunction): void=> {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader?.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
    next();
    
  } catch (err) {
    res.status(401);
    res.json('Access denied' + err);
return;
  }
}
const Index_Handler = async (req: Request, res: Response) => {

  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(401);
    res.json(`Invalid Token!${err}`);
  }
};

const Show_Handler_User = async (req: Request, res: Response) => {
 
  const User_Id = parseInt(req.params.id);
  try {
    const Retrived_User = await store.Show_User(User_Id);
    if (!Retrived_User) {
      res.json({ message: 'Error While Retriving User---User Not Found' });
    } else {
      res.json(Retrived_User);
    }
  } catch (err) {
    res.status(400);
    res.json(`Invalid Token!${err}`);
  }
};
const Create_Handler_User = async (req: Request, res: Response) => {
  const user: UserProperties = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
  };
  let newUser = await store.Create_User(user);
  try {
    const token = jwt.sign({user: newUser}, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err + user);
  }
};
const Delete_Handler_User = async (req: Request, res: Response) => {
try{
  const User_Id = parseInt(req.params.id);
  const Retrived_User = await store.Delete_User(User_Id);
  res.json({ message: 'User Deleted Successfully', Retrived_User });
}catch(err){
res.status(400) ;
res.json(err) ;
}
};
const Update_Handler_User = async (req: Request, res: Response) => {
  const user: UserProperties = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
    id: req.params.id
  };
  try {
    const updated = await store.Update_User(user);
    res.json(updated);
  } catch (err) {
    res.status(400);
    res.json(err + user);
  }
};

const User_Handler_Authentication = async (_req: Request, res: Response) => {
  const user: UserProperties = {
    firstname: _req.body.firstname,
    lastname: _req.body.lastname,
    password: _req.body.password,
  };
  const u = await store.Authenticate_User(
    user.firstname,
    user.lastname,
    user.password
  );
  if (u == 'Wrong UserName Or Password') {
    res.status(400);
    res.json('Wrong UserName Or Password');
  } else {
    try {
      const token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as string);
      res.json(token);
    } catch (err) {
      res.status(401);
      res.json(err + user);
    }
  }
};
export default User_Main_Routes;
