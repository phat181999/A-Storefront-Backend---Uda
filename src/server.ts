import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import { createTableFromFile, pool } from './db/db'
import rootRouter from './services'
dotenv.config()
const port = process.env.PORT
const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.use('/api', rootRouter)

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`)
  try {
    await createTableFromFile()
    console.log('Connected To The Database Successfully.')
  } catch (err) {
    console.log('Connected To The Database Failed.')
  }
})

module.exports = app
