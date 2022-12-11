import Client from '../Data_Base';
import bcrypt from 'bcrypt';

const SaltRounds = process.env.SALT_ROUNDS as unknown as string;
const pepper_Pass = process.env.BCRYPT_PASSWORD;

export type UserProperties = {
  id?: string | number;
  firstname: string;
  lastname: string;
  password: string;
};

export class UserModel {
  async index(): Promise<UserProperties> {
    try {
      const connect = await Client.connect();
      const sql = 'SELECT * FROM users ';
      const result = await connect.query(sql);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable To Show users List ${err}`);
    }
  }
  async Create_User(u: UserProperties): Promise<UserProperties> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO users (firstname, lastname,password) VALUES($1, $2,$3) RETURNING *';

      const hash = bcrypt.hashSync(
        u.password + pepper_Pass,
        parseInt(SaltRounds as string)
      );

      const result = await conn.query(sql, [u.firstname, u.lastname, hash]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`unable create user (${u.firstname}): ${err}`);
    }
  }
  async Update_User(u: UserProperties): Promise<UserProperties> {
    const hash = bcrypt.hashSync(
      u.password + pepper_Pass,
      parseInt(SaltRounds) as number
    );
    try {
      const connection = await Client.connect();
      const sql =
        'UPDATE users SET firstname=$1, lastname=$2, password=$3 WHERE id=$4 RETURNING *';

      const result = await connection.query(sql, [
        u.firstname,
        u.lastname,
        hash,
        u.id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not Update User Named: ${u.firstname + u.lastname}, ${
          err.message
        }`
      );
    }
  }

  async Show_User(id: number): Promise<UserProperties> {
    try {
      const connect = await Client.connect();

      const sql = 'SELECT * FROM users WHERE id=($1)';
      const result = await connect.query(sql, [id]);
      connect.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not Find user With This Id ${id},as ${err.message}`
      );
    }
  }

  async Delete_User(id: number): Promise<UserProperties> {
    try {
      const connect = await Client.connect();

      const sql = 'Delete FROM users WHERE id=($1)';

      const result = await connect.query(sql, [id]);

      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not Delete user With This Id ${id}, as  ${err.message}`
      );
    }
  }
  async Authenticate_User(
    firstname: string,
    lastname: string,
    password: string
  ): Promise<UserProperties | string> {
    const conn = await Client.connect();
    const sql = 'SELECT password FROM users WHERE firstname=$1 AND lastname=$2';
    const result = await conn.query(sql, [firstname, lastname]);
    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password + pepper_Pass, user.password)) {
        return user;
      }
    }
    return 'Wrong UserName Or Password';
  }
}
