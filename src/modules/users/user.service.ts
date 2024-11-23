import { UserInferface } from './user.interface'
import User from './user.model'

const createUserFromDB = async (user: UserInferface) => {
  const result = await User.create(user)
  return result
}

const getAllUsersFromDB = async () => {
  const result = await User.find()
  return result
}
const updateUserRoleFromDB = async (
  userid: string,
  userRole: { role: string }
) => {
  const result = await User.findByIdAndUpdate(userid, userRole, { new: true })
  return result
}

export const userServices = {
  createUserFromDB,
  getAllUsersFromDB,
  updateUserRoleFromDB,
}
