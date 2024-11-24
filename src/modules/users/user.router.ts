import express from 'express'
import { userController } from './user.controller'

const userRouter = express.Router()

userRouter.post('/users', userController.CreateUsers) // create a new user routes
userRouter.get('/users', userController.getAllUsers) // get all users route
userRouter.put('/users/:userId', userController.updateUserRole) // update user role routes

export default userRouter
