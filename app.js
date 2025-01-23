
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
const app = express()
import routes from "./routes/routes.js"
import {config} from "dotenv" 
import  sequelize  from './database/config.js'
//import  cita  from './models/citas.js'
import {cita} from './models/citas.js'





await sequelize.authenticate()

const dotenv = config();


const port = process.env.PORT
//import 'dotenv/config'



//middlewares
app.use(cors());
app.use(express.json());
app.use('/api/user',routes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})