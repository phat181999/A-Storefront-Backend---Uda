import { Pool, PoolClient } from 'pg'
import dotenv from 'dotenv'
import { readFile } from 'fs/promises'
dotenv.config()

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: Number(process.env.PORTPG) || 5432,
})

// Check the connection immediately when this module is required
async function createTableFromFile() {
  const client = await pool.connect()
  try {
    // Read the SQL file
    const sqlFilePath = './src/db/table.sql'
    const sqlQuery = await readFile(sqlFilePath, 'utf8')

    // Execute the query
    await client.query(sqlQuery)
    console.log('Table created successfully!')
  } catch (error) {
    console.error('Error creating table:', error)
  } finally {
    client.release() // Release the client back to the pool
  }
}

async function getGlobalClient(): Promise<PoolClient> {
  const client = await pool.connect()
  return client
}
export { createTableFromFile, pool, getGlobalClient }
