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

    const result = await User.findOne({ email: userEmail })
    return result;

}

const updateUserContentFromDB = async (
    id: string,
    payload: TUser
) => {
    const result = await User.findByIdAndUpdate(id, payload, {
        new: true,
    })
    return result
}



export const userServices = {
    createUserFromDB,
    getUserFromDB,
    getUserByEmailFromDB,
    updateUserContentFromDB
}