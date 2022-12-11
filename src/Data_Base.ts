import dotenv from 'dotenv';
import { Pool } from 'pg';
dotenv.config();
const { HOST, DB, DB_Test, USER, PASSWORD, ENV } = process.env;

let Client;
console.log(`We Are Connected On ${ENV} DataBase `);
console.log(
  '----------------------------------------------------------------------------------'
);
if (ENV == 'dev') {
  Client = new Pool({
    host: HOST,
    database: DB,
    user: USER,
    password: PASSWORD,
  });
}
if (ENV == 'test') {
  Client = new Pool({
    host: HOST,
    database: DB_Test,
    user: USER,
    password: PASSWORD,
  });
}
export default Client as Pool;
