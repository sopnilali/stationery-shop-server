"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const admin_service_1 = require("./admin.service");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const AdminBlockUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const user = yield admin_service_1.AdminService.UserBlockFromAdmininDB(userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (user.isBlocked === true) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User already blocked");
    }
    // Update the isBlocked property
    user.isBlocked = true;
    yield user.save();
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'User blocked successfully',
        statusCode: http_status_1.default.OK,
    });
}));
const DeleteBlogContentFromAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogid = req.params.id;
    const result = yield admin_service_1.AdminService.deleteBlogContentFromAdminDB(blogid);
    if (result.deletedCount === 0) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, " blog not found");
    }
    const statuscode = 200;
    res.status(200).json({
        success: true,
        message: 'Blog deleted successfully',
        statusCode: statuscode,
    });
}));
exports.adminController = {
    AdminBlockUser,
    DeleteBlogContentFromAdmin
};
