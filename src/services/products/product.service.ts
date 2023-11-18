import { Pool, QueryResult } from 'pg'
import { createTableFromFile, pool, getGlobalClient } from '../../db/db'
import CreateProduct from '../../interfaces/product.interfaces'
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
    } finally {
      // Always release the client back to the pool, even in case of an error
      client.release()
    }
  }

  async getAllProducts(): Promise<QueryResult> {
    const client = await getGlobalClient()
    try {
      const queryString = 'SELECT *  from products'
      const result = await client.query(queryString)
      return result
    } catch (err) {
      throw err
    } finally {
      // Always release the client back to the pool, even in case of an error
      client.release()
    }
  }

  async getProduct(id: number): Promise<QueryResult> {
    const client = await getGlobalClient()
    try {
      const queryString = 'SELECT * FROM products WHERE id = $1'
      const value = [id]
      const result = await client.query(queryString, value)
      return result
    } catch (err) {
      throw err
    } finally {
      // Always release the client back to the pool, even in case of an error
      client.release()
    }
  }

  async updateProduct(id: number, data: CreateProduct): Promise<QueryResult> {
    const client = await getGlobalClient()
    try {
      const queryString =
        'UPDATE products SET name = $1, price = $2, category_id = $3 WHERE id = $4 RETURNING *'
      const value = [data.name, data.price, data.categoryId, id]
      const result = await client.query(queryString, value)
      return result
    } catch (err) {
      throw err
    } finally {
      // Always release the client back to the pool, even in case of an error
      client.release()
    }
  }

  async deleteProduct(id: number): Promise<QueryResult> {
    const client = await getGlobalClient()
    try {
      const queryString = 'DELETE FROM products WHERE id = $1'
      const value = [id]
      const result = await client.query(queryString, value)
      return result
    } catch (err) {
      throw err
    } finally {
      // Always release the client back to the pool, even in case of an error
      client.release()
    }
  }
}

const productService = new ProductServices()

export default productService
