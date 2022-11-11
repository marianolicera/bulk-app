import User from '../services/UserService.js'

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
        return await res.status(200).json(login);
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
          const id = req.params.id;
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
          const id = req.params.id
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
}