import express, { Request, Response } from 'express';
import {
  Order_Products_Model,
  Order_Products_Properties,
} from '../Models/Order_Products_model';

const OrderProductRoutes = (app: express.Application) => {
  app.get('/Show_All_Order_Products', Index_Handler);
  app.get('/Show_Order_Products_By_Id/:id', Show_Handler_Order_Products);
  app.post('/Create_New_Order_Products', Create_Handler_Order_Products);
  app.delete('/Delete_Order_Products_By_Id/:id', Delete_Handler_Order_Products);
  app.patch('/Update_Order_Products_By_Id/:id', Update_Handler_Order_Products);
};

const store = new Order_Products_Model();

const Index_Handler = async (_req: Request, res: Response) => {
  const product = await store.index();
  res.json(product);
};
const Show_Handler_Order_Products = async (_req: Request, res: Response) => {
  try{
  const Produt_Id = parseInt(_req.params.id);
  const Product = await store.Show_Order_Product(Produt_Id);
  if (!Product) {
    res.json({
      message: 'Error While Retriving OrderProduct---Product Not Found',
    });
  } else {
    res.json(Product);
  }
}catch(err)
{
  res.status(400);
  res.json(err);
}
};

const Create_Handler_Order_Products = async (_req: Request, res: Response) => {
  const product: Order_Products_Properties = {
    quantity: _req.body.quantity,
    order_id: _req.body.order_id,
    product_id: _req.body.product_id,
  };
  try {
    const OrderProduct = await store.Create_Order_Product(product);
    res.json(OrderProduct);
  } catch (err) {
    res.status(401).json(err);
  }
};
const Delete_Handler_Order_Products = async (req: Request, res: Response) => {
  try {
    const OrderProduct_ID = parseInt(req.params.id);
    const Retrived_OrderProduct = await store.Delete_Order_Product(
      OrderProduct_ID
    );
    res.status(200);
    res.json({ message: 'Order Deleted Successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
};
const Update_Handler_Order_Products = async (req: Request, res: Response) => {
  const product: Order_Products_Properties = {
    id: req.params.id,
    quantity: req.body.quantity,
    order_id: req.body.order_id,
    product_id: req.body.product_id,
  };
  try {
    const UpdatedProduct = await store.Update_Order_Product(product);
    res.json(UpdatedProduct);
  } catch (err) {
    res.status(400).json(err + product);
  }
};
export default OrderProductRoutes;
