import { PrdouctProperties,PrdouctModel } from "../../Models/Product_Model";
import db from '../../Data_Base'
const store = new PrdouctModel();
const NewOrder: PrdouctProperties = {
   name: "Prdouct1",
   product_price: 0
}
const Order_Updated: PrdouctProperties = {
    id: "1" ,
   name: "Test1",
   product_price: 100
}
describe('Products Models', () => {
   afterAll(async () => {
       const connection = await db.connect();
        const sql ='DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;';
                await connection.query(sql);
                      connection.release();
                    });
  it('Should Have An Index Method', () => {
    expect(store.index).toBeDefined();
  });
  it('Should Have An Show Method', () => {
    expect(store.Show_Product).toBeDefined();
  });

  it('Should have a Create Method', () => {
    expect(store.Create_Product).toBeDefined();
  });

  it('Should have a Delete Method', () => {
    expect(store.Delete_Product).toBeDefined();
  });
  it('Should have a Update Method', () => {
    expect(store.Update_Product).toBeDefined();
  });
  it('Create Method Should Return A List Of Created Product', async () => {
    const Order = await store.Create_Product(NewOrder);
  });

  it('Index Method Should Return A List Of Products', async () => {
    const Product = await store.index();
        expect(Product[0].id).toBe(1);
        expect(Product[0].name).toBe('Prdouct1');
        expect(Product[0].product_price).toBe(0);

  });
  it('Shows Method Should Return A List Of  Product', async () => {
    const Product = await store.Show_Product(1);
    expect(Product.id).toBe(1);
    expect(Product.name).toBe('Prdouct1');
    expect(Product.product_price).toBe(0);
  });

  it('Update Method Should Return A List Of Updated Product', async () => {
    const Order = await store.Update_Product(Order_Updated);
  });
  it('Delete Method Should Return A List Of Deleted Product', async () => {
    const Order = await store.Delete_Product(1);
  });

})
