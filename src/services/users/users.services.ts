import { Pool, QueryResult } from 'pg'
import { createTableFromFile, pool, getGlobalClient } from '../../db/db'
import User from '../../interfaces/user.interface'
import bcrypt from 'bcrypt'
import authService from '../../midlleware/auth/authentiaction'

class UserServices {
  async createUser(user: User): Promise<QueryResult> {
    const client = await getGlobalClient()
    try {
      const saltRounds = 10
      const salt = await bcrypt.genSalt(saltRounds)
      const passwordHash = await bcrypt.hash(user.password, salt)

      const queryString =
        'INSERT INTO users (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *'
      const values = [user.firstName, user.lastName, passwordHash]

      const result = await client.query(queryString, values)
      return result
    } catch (err) {
      // Handle the error more gracefully (e.g., log it)
      console.error('Error creating user:', err)
      throw err
    } finally {
      // Always release the client back to the pool, even in case of an error
      if (client) client.release()
    }
  }

  async signInUser(firstName: string, password: string): Promise<any> {
    const client = await getGlobalClient()
    try {
      const queryString = 'SELECT * FROM users WHERE firstName = $1'
      const resultQuery = await client.query(queryString, [firstName])
      const user = resultQuery.rows[0] // Assuming only one user is found
      const userId = user.id
      const userFirstName = user.firstname
      const userPassword = user.password
      const checkPassword = await bcrypt.compare(password, userPassword)
      if (resultQuery.rows.length > 0 && checkPassword) {
        const result = await authService.authentication(userId, userFirstName)
        return result
      }
      return null
    } catch (err) {
      console.error('Error creating user:', err)
      throw err
    } finally {
      // Always release the client back to the pool, even in case of an error
      if (client) client.release()
    }
  }
}

const userService = new UserServices()

export default userService
