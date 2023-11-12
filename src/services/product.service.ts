import { Pool, QueryResult } from 'pg'
import { createTableFromFile, pool, getGlobalClient } from '../db/db'
import CreateProduct from '../dto/product.dto'
class ProductServices {
  async createProduct(data: CreateProduct): Promise<QueryResult> {
    const client = await getGlobalClient()
    try {
      const queryString =
        'INSERT INTO products (name,price,category_id) VALUES ($1, $2, $3) RETURNING *'
      const values = [data.name, data.price, data.categoryId]
      const result = await client.query(queryString, values)
      return result
    } catch (err) {
      throw err
    }
  }
}

const produdctService = new ProductServices()

export default produdctService
