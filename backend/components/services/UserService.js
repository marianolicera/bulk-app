import DB from '../../config/mysql.js';

const db = new DB();

export default class UserService {

  static async checkLogin(username, pass) {
    try {
      const user = await db.query(
        `SELECT * FROM USUARIO WHERE DNI = ? AND DELETED = 0`, [username]
      );
      if(user && pass === user[0]?.CONTRASENA){
        return {
          ID_USER: user[0].ID_USER,
          NOMBRE: user[0].NOMBRE,
          APELLIDO: user[0].APELLIDO,
          DNI: user[0].DNI,
          ID_ROL: user[0].ID_ROL,
          VENCIMIENTO: user[0].VENCIMIENTO
        }
      }
    } catch (err) {
      console.log(err)
      return ({
        status: "error",
        message: 'Usuario no encontrado.'
    });
    }
  }
  
  static async getUserByID(idUser) {
    try {
      const user = await db.query(
        `SELECT ID_USER,NOMBRE,APELLIDO,DNI,ID_ROL,VENCIMIENTO FROM USUARIO WHERE ID_USER = ?`, [idUser]
      );
      return user[0]
    } catch (err) {
      console.log(err)
      return ({
        message: 'Error getting rutinas.'
      });
    }
  }

  static async getRutinas(idUser) {
    try {
      let rutinas = []
      const lunes = await db.query(
        `SELECT RUTINA.*, EJERCICIO.*, (SELECT NOMBRE FROM USUARIO WHERE ID_USER = RUTINA.ID_PROFESOR) AS PROFESOR_NOMBRE, 
        (SELECT APELLIDO FROM USUARIO WHERE ID_USER = RUTINA.ID_PROFESOR) AS PROFESOR_APELLIDO
        FROM EJERCICIO 
        INNER JOIN RUTINA ON EJERCICIO.ID_RUTINA = RUTINA.ID_RUTINA 
        INNER JOIN USUARIO ON USUARIO.ID_USER = RUTINA.ID_ALUMNO 
        WHERE ID_USER = ? AND EJERCICIO.DIA = 1`, [idUser]);

      const mierc = await db.query(
        `SELECT RUTINA.*, EJERCICIO.*, (SELECT NOMBRE FROM USUARIO WHERE ID_USER = RUTINA.ID_PROFESOR) AS PROFESOR_NOMBRE, 
        (SELECT APELLIDO FROM USUARIO WHERE ID_USER = RUTINA.ID_PROFESOR) AS PROFESOR_APELLIDO
        FROM EJERCICIO 
        INNER JOIN RUTINA ON EJERCICIO.ID_RUTINA = RUTINA.ID_RUTINA 
        INNER JOIN USUARIO ON USUARIO.ID_USER = RUTINA.ID_ALUMNO 
        WHERE ID_USER = ? AND EJERCICIO.DIA = 3`, [idUser]);

      const vier = await db.query(
        `SELECT RUTINA.*, EJERCICIO.*, (SELECT NOMBRE FROM USUARIO WHERE ID_USER = RUTINA.ID_PROFESOR) AS PROFESOR_NOMBRE, 
        (SELECT APELLIDO FROM USUARIO WHERE ID_USER = RUTINA.ID_PROFESOR) AS PROFESOR_APELLIDO
        FROM EJERCICIO 
        INNER JOIN RUTINA ON EJERCICIO.ID_RUTINA = RUTINA.ID_RUTINA 
        INNER JOIN USUARIO ON USUARIO.ID_USER = RUTINA.ID_ALUMNO 
        WHERE ID_USER = ? AND EJERCICIO.DIA = 5`, [idUser]);
      
      rutinas.push(lunes)
      rutinas.push(mierc)
      rutinas.push(vier)
      
      return rutinas
    } catch (err) {
      console.log(err)
      return ({
        status: "error",
        message: 'error getting rutinas.'
    });
    }
  }

  static async createUser(dni, nombre, apellido, rol) {
    try {
      const password = dni
      const newRole = rol == 'ADMINISTRADOR' ? '0' : rol == 'ALUMNO' ? 1 : 2
      let date = new Date()
      let newDate = new Date(date.setMonth(date.getMonth()+1))

      await db.query(
        `INSERT INTO USUARIO VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, DEFAULT)`, [dni, nombre, apellido, newRole, password, newDate]
      );
      const user = await db.query('SELECT ID_USER, DNI, NOMBRE, APELLIDO, ID_ROL, VENCIMIENTO FROM USUARIO WHERE DNI = ?', [dni])
      return user[0]
    } catch (err) {
      console.log(err)
      return ({
        message: 'Error creating user.'
      });
    }
  }

  static async getAllUsers() {
    try {
      const user = await db.query(
        `SELECT ID_USER, NOMBRE, APELLIDO, DNI, ID_ROL, VENCIMIENTO FROM USUARIO WHERE DELETED = 0`, []
      );
      return user
    } catch (err) {
      console.log(err)
      return ({
        message: 'Error getting users.'
      });
    }
  }


  static async deleteUser(id) {
    try {
      await db.query(
        `UPDATE USUARIO SET DELETED = 1 WHERE ID_USER = ?`, [id]
      );
      return 'OK'
    } catch (err) {
      console.log(err)
      return ({
        message: 'Error deletting user.'
      });
    }
  }


  static async changePassword(id, newPass, oldPass) {
    try {
      const user = await db.query(
        `SELECT * FROM USUARIO WHERE (ID_USER = ? AND CONTRASENA = ?)`, [id, oldPass]
      );
      console.log(user)
      if(user.length > 0){
        await db.query(
        `UPDATE USUARIO SET CONTRASENA = ? WHERE ID_USER = ?`
        , [newPass, id])
        return 'OK'
      }
      else{
        return 'ERROR'
      }
    } catch (err) {
      console.log(err)
      return ({
        message: 'Error deletting user.'
      });
    }
  }

  static async membership(idUser) {
    try {
      let date = new Date()
      let newDate = new Date(date.setMonth(date.getMonth()+1))

      await db.query(
        `UPDATE USUARIO SET VENCIMIENTO = ? WHERE ID_USER = ? `, [newDate,idUser]
      );
      const user = await db.query(
        `SELECT VENCIMIENTO FROM USUARIO WHERE ID_USER = ?`, [idUser]
      );
      return user
    } catch (err) {
      console.log(err)
      return ({
        message: 'Error paying membership.'
      });
    }
  }


}
