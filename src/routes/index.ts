import categoryRouter from './categorys/categorys.routes'
import productRouter from './product/product.routers'
import userRouter from './users/users.routes'

const express = require('express')

const rootRouter = express.Router()
rootRouter.use('/product', productRouter)
rootRouter.use('/category', categoryRouter)
rootRouter.use('/user', userRouter)

export default rootRouter
