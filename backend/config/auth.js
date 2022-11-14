import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const generateAccessToken =  async (user) => {
    return await jwt.sign(user, process.env.SECRET, {expiresIn: '15m'})
}

export const validateToken =  async (req,res,next) => {
    const accessToken = req.headers['authorization'];
    if(!accessToken) return res.status(401).send('Acceso denegado');

    await jwt.verify(accessToken, process.env.SECRET, (err, user) => {
        if(err){
            return res.status(401).send('Acceso denegado, token vencido o incorrecto');
        }else{
            next();
        }
    })
}

export const getLoggedUser = async (req) => {
    const header = jwt.decode(req.headers['authorization'])
    return header.ID_USER
}

