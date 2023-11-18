import express from 'express'
import { createCategory } from '../../controllers/categorys/categorys.controller'

const categoryRouter = express.Router()
categoryRouter.post('/create-category', createCategory)
export default categoryRouter
