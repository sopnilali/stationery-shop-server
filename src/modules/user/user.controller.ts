import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.sevice";

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
  console.log(userEmail, role)

  const result = await userServices.getUserByEmailFromDB(userEmail, role)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  })
});

export const UserController = {
  createUser,
  GetUsers,
  GetMe
}