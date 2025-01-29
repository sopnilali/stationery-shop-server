import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.sevice";
import { RequestHandler } from "express";
import { User } from "./user.model";

const createUser = catchAsync(async (req, res) => {
  const result = await userServices.createUserFromDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: {
      _id: result._id,
      name: result.name,
      email: result.email,
      phtoURL: result.photoURL,
    },
  })

})

const GetUsers = catchAsync(async (req, res) => {
  const result = await userServices.getUserFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users are retrieved succesfully',
    data: result,
  })
})

const GetMe = catchAsync(async (req, res) => {

  // let token : any = null;
  // if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
  //   token = req.headers.authorization.split(" ")[1];
  // }

  const { userEmail, role } = req.user;
  const result = await userServices.getUserByEmailFromDB(userEmail, role)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  })
})

const updateUserContent: RequestHandler = async (req, res) => {
  try {
    const userData = req.body
    const userId = req.params.id
    const result = await userServices.updateUserContentFromDB(
      userId,
      userData
    )
    if (result) {
      sendResponse(res, {
        success: true,
        message: 'User updated successfully',
        statusCode: httpStatus.OK,
        data: result,
      });
}
  } catch (error) {
    const stackerror = new Error()
    res.json({
      message: 'An error occurred while updating product',
      status: false,
      error: error,
      stack: stackerror.stack,
    })
  }

}


export const UserController = {
  createUser,
  GetUsers,
  GetMe,
  updateUserContent
}