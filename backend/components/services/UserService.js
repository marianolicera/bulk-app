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
      let dias = [1,2,3,4,5]
      for (const dia of dias){
        const rutina = await db.query(
        `SELECT RUTINA.*, EJERCICIO.*, (SELECT NOMBRE FROM USUARIO WHERE ID_USER = RUTINA.ID_PROFESOR) AS PROFESOR_NOMBRE, 
        (SELECT APELLIDO FROM USUARIO WHERE ID_USER = RUTINA.ID_PROFESOR) AS PROFESOR_APELLIDO
        FROM EJERCICIO 
        INNER JOIN RUTINA ON EJERCICIO.ID_RUTINA = RUTINA.ID_RUTINA 
        INNER JOIN USUARIO ON USUARIO.ID_USER = RUTINA.ID_ALUMNO 
        WHERE ID_USER = ? AND EJERCICIO.DIA = ? AND ENABLED = 1`, [idUser,dia]);

        if(rutina.length > 0 )rutinas.push(rutina)
      }
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

  static async getAlumnos() {
    try {
      const users = await db.query(
        `SELECT ID_USER, NOMBRE, APELLIDO, DNI, VENCIMIENTO FROM USUARIO WHERE DELETED = 0 AND ID_ROL = 1`, []
      );
      return users
    } catch (err) {
      console.log(err)
      return ({
        message: 'Error getting users.'
      });
    }
  }

  static async createRutina(idProfesor, idAlumno, rutina) {
    try {
      //Deshabilitar vieja rutina
      await db.query(
        `UPDATE RUTINA SET ENABLED = 0 WHERE ID_ALUMNO = ?`, [idAlumno]
      );

      //Nuevo id de rutina MAX(ID_RUTINA) + 1
      let max = await db.query(
        `SELECT MAX(ID_RUTINA) AS MAX FROM RUTINA`, []
      );
      const cont = Object.values(JSON.parse(JSON.stringify(max)))[0].MAX + 1

      //Crear la nueva rutina
      await db.query(
        `INSERT INTO RUTINA VALUES (DEFAULT,?,?,8,1)`, [idAlumno,idProfesor]
      );

      let rut = JSON.parse(JSON.parse(JSON.stringify(rutina)))

      for (const x of rut) {
        await db.query(
          `INSERT INTO EJERCICIO VALUES (DEFAULT, ?,?,?,?,?)`, [cont, x.ejercicio, x.dia, x.series, x.repeticiones ]
        );
      }
      return {
        status: 'Success',
        message: 'La rutina fue creada con exito!'
      }
    } catch (err) {
      console.log(err)
      return ({
        status: 'Error',
        message: 'Error posting rutines.'
      });
    }
  }

}
