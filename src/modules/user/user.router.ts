import express from 'express'
import { userController } from './user.controller'

const userRouter = express.Router()

userRouter.post('/users', userController.CreateUsers)
userRouter.get('/users', userController.getAllUsers)
userRouter.put('/users/:userId', userController.updateUserRole)

export default userRouter
