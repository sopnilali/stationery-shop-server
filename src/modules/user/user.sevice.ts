import { TUser } from "./user.interface";
import { User } from "./user.model";


const createUserFromDB = async (payload: TUser) => {
    const result = await User.create(payload)
    return result;
}

const getUserFromDB = async () => {
    const result = await User.find()
    return result;

}

const getUserByEmailFromDB = async (userEmail: string, role: string) => {
    
    // const decoded = verifyToken(token, config.jwt_access_secret as string);

    // const { userEmail, role} = decoded

    let result = null

    if (role === 'user') {
        result = await User.findOne({ email: userEmail })
    }
    if (role === 'admin') {
        result = await User.findOne({ email: userEmail })
    } 
    return result;

}



export const userServices = {
    createUserFromDB,
    getUserFromDB,
    getUserByEmailFromDB
}