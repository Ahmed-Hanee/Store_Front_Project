import express, { NextFunction, Request, Response } from 'express';
import { PrdouctProperties, PrdouctModel } from '../Models/Product_Model';
import jwt from 'jsonwebtoken';
const ProductRoutes = (app: express.Application) => {
  app.get('/Show_All_Products',Index_Handler);
  app.get('/Show_Products_By_Id/:id', Show_Handler_Product);
  app.post('/Create_New_Product',verifyToken, Create_Handler_Product);
  app.delete('/Delete_Product_By_Id/:id',verifyToken, Delete_Handler_Product);
  app.patch('/Update_Product_By_Id/:id', verifyToken,Update_Handler_Product);
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
const store = new PrdouctModel();
const Index_Handler = async (_req: Request, res: Response) => {
  try{
  const ShowProducts = await store.index();
  res.json(ShowProducts);
  }catch(err)
  {res.status(400);
  res.json(err) ;
}
};

const Show_Handler_Product =  async (req: Request, res: Response) => {
  try {
    const ID = parseInt(req.params.id);
    const Product = await store.Show_Product(ID);
    res.json(Product);
  } catch (err) {
    res.status(400);
  }
};
const Create_Handler_Product = async (req: Request, res: Response) => {
  const order: PrdouctProperties = {
    name: req.body.name,
    product_price: req.body.product_price
  };
  try {
    const NewProduct = await store.Create_Product(order);
    res.json(NewProduct);
  } catch (err) {
    res.status(400).json(err);
  }
};
const Delete_Handler_Product = async (req: Request, res: Response) => {
  try {
    const ProductID = parseInt(req.params.id);
    await store.Delete_Product(ProductID);
    res.status(200);
    res.json({ message: 'Order Deleted Successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
};
const Update_Handler_Product=async (req: Request, res: Response) => {
  const Product: PrdouctProperties = {
    id: req.params.id,
    name: req.body.name,
    product_price: req.body.product_price
  };
  try {
    const updated = await store.Update_Product(Product);
    if (updated != null) {
      res.json(updated);
    } else {
      res.json({ mssg: 'No Order Registred With This Id' });
    }
  } catch (err) {
    res.status(400);
    res.json(err + Product);
  }
};

export default ProductRoutes;
