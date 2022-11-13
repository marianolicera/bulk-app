import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import serverRoutes from './routes/index.js'

const app = express()
const PORT = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors({
    origin: "http://localhost:8080",
}))

serverRoutes(app);

app.listen(PORT, () => {
    console.log('Server listeting on port ', PORT)
})