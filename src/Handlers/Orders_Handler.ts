import express, { NextFunction, Request, Response } from 'express';
import { OrderProperties, OrderModel } from '../Models/Order_Model';
import jwt from 'jsonwebtoken';

const orderRoutes = (app: express.Application) => {
  app.get('/Show_All_Orders',verifyToken, Index_Handler);
  app.get('/Show_Orders_By_Id/:id',verifyToken, Show_Handler_Order);
  app.post('/Create_New_Order',verifyToken, Create_Handler_Order);
  app.delete('/Delete_Orders_By_Id/:id',verifyToken, Delete_Handler_Order);
  app.patch('/Update_Orders_By_Id/:id', verifyToken,Update_Handler_Order);
  app.post('/orders/:id/products',verifyToken, addProduct);
  app.get('/Show_Orders_By_User_Id/:id',verifyToken, Show_Order_By_User_ID);
};
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

const addProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.params.id;
  const productId: string = _req.body.productId;
  const quantity: number = parseInt(_req.body.quantity);

  try {
    const addedProduct = await store.Add_Product_To_Order(
      quantity,
      orderId,
      productId
    );
    res.json({ addedProduct, message: 'Order Modified Successfully' });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const store = new OrderModel();

const Index_Handler = async (_req: Request, res: Response) => {
  try{
  const order = await store.index();
  res.json(order);
  }catch(err)
  {
    res.status(400);
    res.json(err);
  }
};

const Show_Handler_Order = async (_req: Request, res: Response) => {
  try{
  const Order_Id = parseInt(_req.params.id);
  const order = await store.Show_Order(Order_Id);
  if (!order) {
    res.json({ message: 'Error While Retriving Order---Order Not Found' });
  } else {
    res.json(order);
  }
}catch(err)
{res.status(400);res.json(err)}
};
const Show_Order_By_User_ID = async (req: Request, res: Response) => {
  try {
    const User_Id = parseInt(req.params.id);
    const order = await store.Show_Order_By_User_ID(User_Id);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(`Invalid Token!${err}`);
  }
};

const Create_Handler_Order = async (_req: Request, res: Response) => {
  const order: OrderProperties = {
    status: _req.body.status,
    user_id: _req.body.user_id,
  };
  try {
    const newOrder = await store.Create_Order(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400).json(err);
  }
};
const Delete_Handler_Order = async (req: Request, res: Response) => {
  try {
    const User_Id = parseInt(req.params.id);
    const Retrived_Order = await store.Delete_Order(User_Id);
    res.status(200);
    res.json({ message: 'Order Deleted Successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
};
const Update_Handler_Order = async (req: Request, res: Response) => {
  const order: OrderProperties = {
    id: req.params.id,
    status: req.body.status,
    user_id: req.body.user_id
  };
  try {
    const updated = await store.Update_Order(order);
    if (updated != null) {
      res.json(updated);
    } else {
      res.json({ mssg: 'No Order Registred With This Id' });
    }
  } catch (err) {
    res.status(400);
    res.json(err + order);
  }
};
export default orderRoutes;
