import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import imageRouter from './routes/images/image'
import cors from 'cors'
import connection from './db/db'

dotenv.config()
const port = process.env.PORT
const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.use('/api', imageRouter)

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`)
  try {
    console.log('Connected To The Database Successfully.')
  } catch (err) {
    console.log('Connected To The Database Failed.')
  }
})

module.exports = app
