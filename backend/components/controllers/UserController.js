import User from '../services/UserService.js'
import { generateAccessToken, getLoggedUser } from '../../config/auth.js'

export default class UserController {

  static async login(req, res, next) {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const login = await User.checkLogin(username, password);
        if (!login) {
        return await res.status(200).send({
            status: "error",
            message: 'Usuario no encontrado o datos incorrectos.'
        });
        } else {
          let tokenUser = await generateAccessToken(login)
          return await res.status(200)
          .json({
            user: login,
            token: tokenUser
          })
        }
    } catch (err) {
      res.status(500).send(err);
      next(err);
    }
  }

  static async getUserByID(req, res, next) {
    try {
        const id = req.params.id;
        const user = await User.getUserByID(id);
        if (!user) {
        return await res.status(200).send({
            status: "error",
            message: 'Usuario no encontrado.'
        });
        } else {
        return await res.status(200).json(user);
        }
    } catch (err) {
      res.status(500).send(err);
      next(err);
    }
  }

  static async getRutinas(req, res, next) {
      try {
          const id = await getLoggedUser(req)
          const rutinas = await User.getRutinas(id);
          if (!rutinas) {
            return await res.status(200).send({
                status: "error",
                message: 'Usuario no encontrado.'
            });
            } else {
            return await res.status(200).json(rutinas);
            }
      } catch (err) {
        res.status(500).send(err);
        next(err);
      }
    }

    static async createUser(req, res, next) {
      try {
          const dni = req.body.dni;
          const rol = req.body.rol;
          const nombre = req.body.nombre;
          const apellido = req.body.apellido;
          const user = await User.createUser(dni, nombre, apellido, rol);
          if (!user) {
            return await res.status(200).send({
                status: "error",
                message: 'Error creando usuario.'
            });
            } else {
            return await res.status(200).json(user);
            }
      } catch (err) {
        res.status(500).send(err);
        next(err);
      }
    }

    static async getAllUsers(req, res, next) {
      try {
          const user = await User.getAllUsers();
          if (!user) {
          return await res.status(200).send({
              status: "error",
              message: 'Usuarios no encontrados.'
          });
          } else {
          return await res.status(200).json(user);
          }
      } catch (err) {
        res.status(500).send(err);
        next(err);
      }
    }


    static async deleteUser(req, res, next) {
      try {
          const id = req.params.id
          const user = await User.deleteUser(id);
          if (user != 'OK') {
          return await res.status(200).send({
              status: "error",
              message: 'El usuario no se pudo eliminar.'
          });
          } else {
          return await res.status(200).json(user);
          }
      } catch (err) {
        res.status(500).send(err);
        next(err);
      }
    }

    static async changePassword(req, res, next) {
      try {
          const id = await getLoggedUser(req)
          const newPass = req.body.newPass
          const oldPass = req.body.oldPass
          const user = await User.changePassword(id, newPass, oldPass);
          if (user != 'OK') {
          return await res.status(200).send({
              status: "error",
              message: 'No se pudo cambiar la contrasena del usuario.'
          });
          } else {
          return await res.status(200).send({
            status: "success",
            message: 'Contraseña cambiada correctamente.'
          });
          }
      } catch (err) {
        res.status(500).send(err);
        next(err);
      }
    }

    static async membership(req, res, next) {
      try {
        const id = await getLoggedUser(req)
          const user = await User.membership(id);
          if (!user) {
          return await res.status(200).send({
              status: "error",
              message: 'No se pudo pagar la suscripcion.'
          });
          } else {
          return await res.status(200).json(user);
          }
      } catch (err) {
        res.status(500).send(err);
        next(err);
      }
    }


    static async getAlumnos(req, res, next) {
      try {
          const user = await User.getAlumnos();
          if (!user) {
          return await res.status(200).send({
              status: "error",
              message: 'Usuarios no encontrados.'
          });
          } else {
          return await res.status(200).json(user);
          }
      } catch (err) {
        res.status(500).send(err);
        next(err);
      }
    }


    static async createRutina(req, res, next) {
      try {
          const idProfesor = await getLoggedUser(req)
          const idAlumno = req.params.idAlumno
          const rutina = req.body.rutina


          const rutinas = await User.createRutina(idProfesor, idAlumno, rutina);
          if (!rutinas) {
            return await res.status(200).send({
                status: "Error",
                message: 'Error creando rutina.'
            });
            } else {
            return await res.status(200).json(rutinas);
            }
      } catch (err) {
        res.status(500).send(err);
        next(err);
      }
    }
}
