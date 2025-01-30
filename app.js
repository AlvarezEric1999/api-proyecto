
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
const app = express()
import routes from "./routes/routes.js"
import {config} from "dotenv" 
import  sequelize  from './database/config.js'
import swaggerUI from 'swagger-ui-express';
import specs from './utils/swagger.js'
//import  cita  from './models/citas.js'
import {cita} from './models/citas.js'





//await sequelize.sync({ alter: true })

const dotenv = config();


const port = process.env.PORT
//import 'dotenv/config'



//middlewares
app.use(cors({  origin: '*', // Permite todas las orígenes
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'],}));
app.use(express.json());
app.use("/api-doc",cors(),swaggerUI.serve,swaggerUI.setup(specs));
app.use('/api/user',routes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})