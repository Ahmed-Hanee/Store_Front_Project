import Client from '../Data_Base';
import bcrypt from 'bcrypt';

const SaltRounds = process.env.SALT_ROUNDS as unknown as string;
const pepper_Pass = process.env.BCRYPT_PASSWORD;

export type OrderProperties = {
  id?: number | string;
  status: string;
  user_id: string;
};

export class OrderModel {
  async index(): Promise<OrderProperties[]> {
    try {
      const connect = await Client.connect();
      const sql = 'SELECT * FROM orders ORDER BY id';
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Unable To Show order List ${err}`);
    }
  }
  async Create_Order(u: OrderProperties): Promise<OrderProperties> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'INSERT INTO orders(status,user_id)VALUES($1,$2) RETURNING *';

      const result = await conn.query(sql, [u.status, u.user_id]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`unable create Order With Id (${u.id}): ${err}`);
    }
  }

  async Show_Order(id: number): Promise<OrderProperties> {
    try {
      const connect = await Client.connect();

      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const result = await connect.query(sql, [id]);
      connect.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not Find Order With This Id ${id},as ${err.message}`
      );
    }
  }

  async Delete_Order(id: number): Promise<OrderProperties> {
    try {
      const connect = await Client.connect();

      const sql = 'Delete FROM orders WHERE id=($1) RETURNING *';

      const result = await connect.query(sql, [id]);
      connect.release();
      const order = result.rows[0];
      return {
        id: order.id,
        status: order.status,
        user_id: order.user_id,
      };
    } catch (err) {
      throw new Error(
        `Could not Delete Order With This Id ${id}, as  ${err.message}`
      );
    }
  }
  async Update_Order(o: OrderProperties): Promise<OrderProperties[]> {
    try {
      const connection = await Client.connect();
      const sql =
        'UPDATE orders SET status=$2,user_id=$3 WHERE id=$1 RETURNING *';

      const result = await connection.query(sql, [o.id, o.status, o.user_id]);

      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not Update Order With Id: ${o.id}, ${err.message}`
      );
    }
  }
  async Add_Product_To_Order(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<OrderProperties> {
    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      //@ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [quantity, orderId, productId]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }
  async Show_Order_By_User_ID(id: number): Promise<OrderProperties> {
    try {
      const connect = await Client.connect();

      const sql =
        'SELECT firstname,lastname,status FROM users  INNER JOIN orders ON users.id = orders.user_id WHERE users.id=($1) ';
      const result = await connect.query(sql, [id]);
      connect.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not Find Order With This User_Id ${id},as ${err.message}`
      );
    }
  }
}
