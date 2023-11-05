import { Pool } from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: Number(process.env.PORTPG) || 5432,
})

// Check the connection immediately when this module is required
;(async () => {
  try {
    const client = await pool.connect()
    console.log('Connected to the database successfully.')
    client.release()
  } catch (err) {
    console.error('Database connection failed', err)
    process.exit(1)
  }
})()

export default pool
