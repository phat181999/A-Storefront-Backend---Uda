import express from 'express'
import {
  createUser,
  signInUser,
} from '../../controllers/users/users.controller'

const userRouter = express.Router()
userRouter.post('/create-user', createUser)
userRouter.post('/sigin', signInUser)
export default userRouter
