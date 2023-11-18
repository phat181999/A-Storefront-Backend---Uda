import { Pool, QueryResult } from 'pg'
import { createTableFromFile, pool, getGlobalClient } from '../../db/db'
import Category from '../../interfaces/category.interface'
class CategoryServices {
  async createCategory(category: Category): Promise<QueryResult> {
    const client = await getGlobalClient()
    try {
      const queryString =
        'INSERT INTO categorys (categoryName) VALUES ($1) RETURNING *'
      const values = [category.categoryName]
      const result = await client.query(queryString, values)
      return result
    } catch (err) {
      throw err
    } finally {
      // Always release the client back to the pool, even in case of an error
      client.release()
    }
  }
}

const categoryService = new CategoryServices()

export default categoryService
