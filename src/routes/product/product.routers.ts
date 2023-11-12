import express from 'express'
import { createProduct } from '../../controllers/product/product.controller'

const productRouter = express.Router()
productRouter.post('/create-product', createProduct)
export default productRouter
