import express from 'express'
import {
  createProduct,
  deteleProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from '../../controllers/product/product.controller'
import authService from '../../midlleware/auth/authentiaction'
const productRouter = express.Router()
productRouter.post('/create-product', authService.authorize, createProduct)
productRouter.get('/products', getAllProducts)
productRouter.get('/product/:id', getProduct)
productRouter.patch('/update-product/:id', updateProduct)
productRouter.delete('/delete-product/:id', deteleProduct)
export default productRouter
