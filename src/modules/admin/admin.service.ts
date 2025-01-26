import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model"
import Blog from "../blog/blog.model";



const UserBlockFromAdmininDB = async (
    id: string,
) => {
    const result = await User.findById(id)
    return result
}


const deleteBlogContentFromAdminDB = async (id: string) => {
    const result = await Blog.deleteOne({_id: id})
    return result
}

export const AdminService = {
    UserBlockFromAdmininDB,
    deleteBlogContentFromAdminDB
}