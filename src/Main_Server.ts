import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import User_Main_Routes from './Handlers/Users_Handler';
import orderRoutes from './Handlers/Orders_Handler';
import ProductRoutes from './Handlers/Products_Handler';
import OrderProductRoutes from './Handlers/order_Products_Handler';

const app: express.Application = express();
const Port_Number = 3000;
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req: Request, res: Response) {
  res.send('Welcome To HomePage Route ');
});

app.get('/Cors', function (req: Request, res: Response) {
  res.send('Welcome To Testing Cors Route ');
});
const corsOption = {
  origin: 'http://someotherdomain.com',
  optionsSucessStatus: 200,
};
app.use(cors(corsOption));
app.listen(Port_Number, function () {
  /*
            console.log(`Lodaing Port:${Port_Number}`); 
/*
            console.log(`Host Initialized Successfully On http://localhost:${Port_Number}`); 
            console.log("----------------------------------------------------------------------------------") ;
            */
});

User_Main_Routes(app);
orderRoutes(app);
ProductRoutes(app);
OrderProductRoutes(app);
export default app;
