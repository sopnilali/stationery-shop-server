"use strict";
// res, req
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const CreateUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const result = yield user_service_1.userServices.createUserFromDB(userData); // create user from database
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
        });
    }
    catch (error) {
        const stackError = new Error(); // stack error
        res.status(500).json({
            status: false,
            message: 'An error occurred while creating the user',
            error: error,
            stack: stackError.stack,
        });
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_service_1.userServices.getAllUsersFromDB(); // get all use from database
        res.status(201).json({
            status: true,
            message: 'Users retrieved successfully',
            data: users.map((user) => {
                return {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    address: user.address,
                    phone: user.phone,
                    role: user.role,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                };
            }),
        });
    }
    catch (error) {
        const stackError = new Error();
        res.status(500).json({
            status: false,
            message: 'An error occurred while retrieving the users',
            error: error,
            stack: stackError.stack,
        });
    }
});
const updateUserRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const userRole = {
            role: 'admin',
        };
        if (userRole.role === 'admin') {
            const stackError = new Error();
            return res.json({
                status: false,
                message: 'Admin role cannot be updated',
                stack: stackError.stack,
            });
        }
        const result = yield user_service_1.userServices.updateUserRoleFromDB(userId, userRole); // update user to admin from database 
        res.status(200).json({
            status: true,
            message: 'User role updated successfully',
            data: result,
        });
    }
    catch (error) {
        const stackError = new Error();
        res.status(500).json({
            status: false,
            message: 'An error occurred while updating the user role',
            error: error,
            stack: stackError.stack,
        });
    }
});
exports.userController = {
    CreateUsers,
    getAllUsers,
    updateUserRole,
};
