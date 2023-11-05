import express from 'express'
import { ImageController } from '../../controllers/images/images.controller'

const imageRouter = express.Router()
imageRouter.get('/images/:width/:height/', ImageController)
export default imageRouter
