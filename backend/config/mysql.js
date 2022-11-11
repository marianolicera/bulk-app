import mysql from 'mysql';

export default class DB {

  constructor() {
    this.connection = mysql.createPool({
      host: 'localhost',
      port: '3306',
      user: 'root',
      database: 'cloud_aws',
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
