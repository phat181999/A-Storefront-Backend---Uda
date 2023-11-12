import productRouter from '../routes/product/product.routers'

const express = require('express')

const rootRouter = express.Router()
rootRouter.use('/product', productRouter)

export default rootRouter
