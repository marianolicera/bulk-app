import mysql from 'mysql';
import dotenv from 'dotenv'
dotenv.config()

export default class DB {

  constructor() {
    this.connection = mysql.createPool({
      host: process.env.DB_HOST,
      port: process.env.PORT,
      user: process.env.DB_USERNAME,
      database: process.env.DB_DATABASE,
      });
  }
 
  query(sql, args = []) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err)
          return reject(err);
        resolve(rows); 
      });
    });
  }
}
