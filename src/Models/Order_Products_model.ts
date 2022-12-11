import Client from '../Data_Base';

const SaltRounds = process.env.SALT_ROUNDS as unknown as string;
const pepper_Pass = process.env.BCRYPT_PASSWORD;

export type Order_Products_Properties = {
  id?: number | string;
  quantity: number;
  order_id: string | number;
  product_id: string | number;
};

export class Order_Products_Model {
  async index(): Promise<Order_Products_Properties> {
    try {
      const connect = await Client.connect();
      const sql = 'SELECT * FROM order_products ORDER BY id';
      const result = await connect.query(sql);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable To Show order_products List ${err}`);
    }
  }
  async Create_Order_Product(
    op: Order_Products_Properties
  ): Promise<Order_Products_Properties> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO order_products(quantity,order_id,product_id) VALUES($1,$2,$3) RETURNING *';

      const result = await conn.query(sql, [
        op.quantity,
        op.order_id,
        op.product_id,
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `unable create order_products With Id (${op.id}): ${err}`
      );
    }
  }

  async Show_Order_Product(id: number): Promise<Order_Products_Properties> {
    try {
      const connect = await Client.connect();

      const sql = 'SELECT * FROM order_products WHERE id=($1)';
      const result = await connect.query(sql, [id]);
      connect.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not Find order_products With This Id ${id},as ${err.message}`
      );
    }
  }

  async Delete_Order_Product(id: number): Promise<Order_Products_Properties> {
    try {
      const connect = await Client.connect();

      const sql = 'Delete FROM order_products WHERE id=($1) RETURNING *';

      const result = await connect.query(sql, [id]);

      connect.release();
      const Order_Product = result.rows[0];
      return {
        id: Order_Product.id,
        quantity: Order_Product.quantity,
        order_id: Order_Product.order_id,
        product_id: Order_Product.product_id,
      };
    } catch (err) {
      throw new Error(
        `Could not Delete  order_products With This Id ${id}, as  ${err.message}`
      );
    }
  }
  async Update_Order_Product(
    op: Order_Products_Properties
  ): Promise<Order_Products_Properties> {
    try {
      const connection = await Client.connect();
      const sql =
        'UPDATE order_products SET quantity=$2,order_id=$3,product_id=$4 WHERE id=$1 RETURNING *';

      const result = await connection.query(sql, [
        op.id,
        op.quantity,
        op.order_id,
        op.product_id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not Update order_products With Id: ${op.id}, ${err.message}`
      );
    }
  }
}
