// res, req

import { Request, Response } from 'express'
import { userServices } from './user.service'

const CreateUsers = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const result = await userServices.createUserFromDB(userData)
    res.status(201).json({
      message: 'User created successfully',
      status: true,
      data: {
        _id: result._id,
        name: result.name,
        email: result.email,
        address: result.address,
        phone: result.phone,
        role: result.role,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      },
    })
  } catch (error) {
    const stackError = new Error()
    res.status(500).json({
      status: false,
      message: 'An error occurred while creating the user',
      error: error,
      stack: stackError.stack,
    })
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userServices.getAllUsersFromDB()
    res.status(201).json({
      status: true,
      message: 'Users retrieved successfully',
      data: users,
    })
  } catch (error) {
    const stackError = new Error()
    res.status(500).json({
      status: false,
      message: 'An error occurred while retrieving the users',
      error: error,
      stack: stackError.stack,
    })
  }
}

const updateUserRole = async (
  req: Request,
  res: Response
): Promise<any | void> => {
  try {
    const userId = req.params.userId
    const userRole = {
      role: 'admin',
    }
    if (userRole.role === 'admin') {
      const stackError = new Error()
      return res.json({
        status: false,
        message: 'Admin role cannot be updated',
        stack: stackError.stack,
      })
    }
    const result = await userServices.updateUserRoleFromDB(userId, userRole)
    res.status(200).json({
      status: true,
      message: 'User role updated successfully',
      data: result,
    })
  } catch (error) {
    const stackError = new Error()
    res.status(500).json({
      status: false,
      message: 'An error occurred while updating the user role',
      error: error,
      stack: stackError.stack,
    })
  }
}

export const userController = {
  CreateUsers,
  getAllUsers,
  updateUserRole,
}
