import Client from '../Data_Base';

const SaltRounds = process.env.SALT_ROUNDS as unknown as string;
const pepper_Pass = process.env.BCRYPT_PASSWORD;

export type PrdouctProperties = {
  id?: number | string;
  name: string;
  product_price: number;
};

export class PrdouctModel {
  async index(): Promise<PrdouctProperties[]> {
    try {
      const connect = await Client.connect();
      const sql = 'SELECT * FROM  products ORDER By id';
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Unable To Show order List ${err}`);
    }
  }
  async Create_Product(p: PrdouctProperties): Promise<PrdouctProperties> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO products(name,product_price)VALUES($1,$2) RETURNING *';

      const result = await conn.query(sql, [p.name, p.product_price]);
      const Product = result.rows[0];

      conn.release();

      return Product;
    } catch (err) {
      throw new Error(`unable create Product With Id (${p.id}): ${err}`);
    }
  }

  async Show_Product(id: number): Promise<PrdouctProperties> {
    try {
      const connect = await Client.connect();

      const sql = 'SELECT * FROM products WHERE id=($1) ';
      const result = await connect.query(sql, [id]);
      connect.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not Find Products With This Id ${id},as ${err.message}`
      );
    }
  }

  async Delete_Product(id: number): Promise<PrdouctProperties> {
    try {
      const connect = await Client.connect();

      const sql = 'Delete FROM products WHERE id=($1) RETURNING *';

      const result = await connect.query(sql, [id]);
      connect.release();
      const Product = result.rows[0];
      return {
        id: Product.id,
        name: Product.name,
        product_price: Product.product_price,
      };
    } catch (err) {
      throw new Error(
        `Could not Delete Product With This Id ${id}, as  ${err.message}`
      );
    }
  }
  async Update_Product(p: PrdouctProperties): Promise<PrdouctProperties[]> {
    try {
      const connection = await Client.connect();
      const sql =
        'UPDATE products SET name=$2,product_price=$3 WHERE id=$1 RETURNING *' ;

      const result = await connection.query(sql, [
        p.id,
        p.name,
        p.product_price
      ]);

      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not Update Producr With Id: ${p.id}, ${err.message}`
      );
    }
  }
}
