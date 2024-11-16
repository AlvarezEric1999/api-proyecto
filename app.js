
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
const app = express()
const port = 3000
import routes from "./routes/routes.js"

app.use(cors());
app.use(express.json());
app.use('/api/user',routes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})