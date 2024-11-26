
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
const app = express()
import routes from "./routes/routes.js"
import {config} from "dotenv"


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