import { Router } from 'express'
import User from './controllers/UserController.js'
// import { rolRequired, ROLE } from '../auth.js'

const router = Router()

export default function userRoutes(app) {
  
    app.use('/api', router)

  //router.get('/getRutinas', rolRequired(ROLE.User), User.getRutinas) //TODO: Control de acceso y permisos (auth.js)

    router.post('/login', User.login)

    router.get('/getUserByID/:id', User.getUserByID)

    router.get('/getRutinas/:id', User.getRutinas)

    router.post('/createUser', User.createUser)

    router.get('/getAllUsers', User.getAllUsers)

    router.delete('/deleteUser/:id', User.deleteUser)

    router.put('/changePassword/:id', User.changePassword) //TODO: Agregar cookie jwt para no mandar el usuario logueado por route

}
