"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const userRouter = express_1.default.Router();
userRouter.post('/users', user_controller_1.userController.CreateUsers); // create a new user routes
userRouter.get('/users', user_controller_1.userController.getAllUsers); // get all users route
userRouter.put('/users/:userId', user_controller_1.userController.updateUserRole); // update user role routes
exports.default = userRouter;
