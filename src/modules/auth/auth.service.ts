import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { createToken, verifyToken } from './auth.utils';
import { TLoginUser } from './auth.interface';
import { User } from '../user/user.model';
import { sendMail } from '../../utils/sendEmail';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is blocked

  const userStatus = user.isBlocked;

  if (userStatus === true) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken
  };
};


const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { userEmail } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistsByCustomEmail(userEmail);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is blocked
  const userStatus = user?.isBlocked;

  if (userStatus === true) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

const changePassword = async (userData: JwtPayload, payload: { oldPassword: string, newPassword: string }) => {


  const user = await User.isUserExistsByCustomEmail(userData.userEmail)
  console.log(user)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  const userStatus = user?.isBlocked;

  if (userStatus === true) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      email: userData.userEmail,
      role: userData.role
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    }
  )
  return null;
}

const forgetPassword = async (email: string) => {
  const user = await User.isUserExistsByCustomEmail(email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  // checking if the user is blocked
  const userStatus = user?.isBlocked;

  if (userStatus === true) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }
   const jetPayLoad = {
    userEmail: user.email,
    role: user.role,
   }

   const resetToken = createToken(
    jetPayLoad,
    config.jwt_access_secret as string,
    '20m',
  );

  const resetUILink = `${config.reset_pass_ui_link}?id=${user.email}&token=${resetToken} `;

  sendMail(user.email, resetUILink)

}

const restPassword = async (payload: { email: string; newPassword: string }, token: string)=> {

const decoded = verifyToken(token, config.jwt_access_secret as string)

if (payload.email !== decoded.userEmail) {
  console.log(payload.email, decoded.userEmail);
  throw new AppError(httpStatus.FORBIDDEN, ' User email is not match!');
}

 //hash new password
 const newHashedPassword = await bcrypt.hash(
  payload.newPassword,
  Number(config.bcrypt_salt_rounds),
);

await User.findOneAndUpdate(
  {
    email: decoded.userEmail,
    role: decoded.role,
  },
  {
    password: newHashedPassword,
    passwordChangedAt: new Date(),
  },
);

}



export const AuthServices = {
  loginUser,
  refreshToken,
  changePassword,
  forgetPassword,
  restPassword
};