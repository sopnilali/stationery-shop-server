import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import config from "../../config";



const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
    expires: new Date(Date.now() + 3600000 * 24 * 7),
  });


  // Send response with accessToken
  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: httpStatus.OK,
    data: {
      accessToken: accessToken,
    },
  });
});

  //   res.status(200).json({
  //     success: true,
  //     message: 'Login successful',
  //     statusCode: 200,
  // });


  const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await AuthServices.refreshToken(refreshToken);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Access token is retrieved succesfully!',
      data: result,
    });
  });


  const changePassword = catchAsync(async (req, res) => {
    const { ...passwordData } = req.body;
    const result = await AuthServices.changePassword(req.user, passwordData);
    sendResponse(res, {
      success: true,
      message: 'Password changed successfully',
      statusCode: httpStatus.OK,
      data: result,
    })
  });

  const forgetPassword = catchAsync(async (req, res) => {
    const { email } = req.body;
    const result = await AuthServices.forgetPassword(email);
    sendResponse(res, {
      success: true,
      message: 'Password reset link has been sent to your email',
      statusCode: httpStatus.OK,
      data: result,
    });
  });

  const restPassword = catchAsync(async (req, res) => {

    let token : any = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(" ")[1];
    }

    const result = await AuthServices.restPassword(req.body, token);
    sendResponse(res, {
      success: true,
      message: 'Password reset successful',
      statusCode: httpStatus.OK,
      data: result,
    });
  })

  export const AuthController = {
    loginUser,
    refreshToken,
    changePassword,
    forgetPassword,
    restPassword
  };