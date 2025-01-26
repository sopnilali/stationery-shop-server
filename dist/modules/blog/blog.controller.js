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
exports.blogController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const blog_service_1 = require("./blog.service");
const user_model_1 = require("../user/user.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const createBlogContent = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    const userId = yield user_model_1.User.findOne({ email: req.user.userEmail });
    const blogData = {
        title,
        content,
        author: userId === null || userId === void 0 ? void 0 : userId._id,
    };
    const result = yield blog_service_1.blogServices.createBlogContentFromDB(blogData);
    // blog to save blogData to database
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Blog created successfully!",
        data: {
            _id: result._id,
            title: result.title,
            content: result.content,
            author: result.author,
        },
    });
}));
const getBlogContentByAuthorID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the user based on the email from the request
        const user = yield user_model_1.User.findOne({ email: req.user.userEmail });
        if (!user) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized user');
        }
        // Fetch the blog content using the user's email
        const blogContent = yield blog_service_1.blogServices.getBlogContentWithAuthorID(user._id);
        // Send the response with the blog content
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Blog fetched successfully",
            data: blogContent,
        });
    }
    catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});
const getSingleBlogContent = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield blog_service_1.blogServices.getSingleBlogContentFromDB(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Blog not found');
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Blog fetched successfully",
        data: {
            _id: result._id,
            title: result.title,
            content: result.content,
            author: result.author,
        },
    });
}));
const getBlogContent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, sortBy = 'createdAt', sortOrder = 'desc', filter } = req.query;
    // Build query object
    let query = {};
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { content: { $regex: search, $options: 'i' } },
        ];
    }
    if (filter) {
        query.author = filter;
    }
    // Ensure sortBy is a string
    const validSortBy = typeof sortBy === 'string' ? sortBy : 'createdAt';
    const result = yield blog_service_1.blogServices.getBlogContentFromDB(query, validSortBy, sortOrder);
    // Response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Blogs fetched successfully",
        data: result.map((blog) => ({
            _id: blog._id,
            title: blog.title,
            content: blog.content,
            author: blog.author,
        })),
    });
}));
const updateBlogContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogData = req.body;
        const blogid = req.params.id;
        const result = yield blog_service_1.blogServices.updateBlogContentFromDB(blogid, blogData);
        if (result) {
            (0, sendResponse_1.default)(res, {
                success: true,
                message: 'Blog updated successfully',
                statusCode: http_status_1.default.OK,
                data: {
                    _id: result._id,
                    title: result.title,
                    content: result.content,
                    author: result.author,
                },
            });
        }
    }
    catch (error) {
        const stackerror = new Error();
        res.json({
            message: 'An error occurred while updating product',
            status: false,
            error: error,
            stack: stackerror.stack,
        });
    }
});
const deleteBlogContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogid = req.params.id;
        const result = yield blog_service_1.blogServices.deleteBlogContentByIdfromDB(blogid);
        if (!(result === null || result === void 0 ? void 0 : result._id)) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, " blog not found");
        }
        const statuscode = 200;
        res.status(200).json({
            success: true,
            message: 'Blog deleted successfully',
            statusCode: statuscode,
        });
        if (result) {
            const statuscode = 200;
            res.status(200).json({
                success: true,
                message: 'Blog deleted successfully',
                statusCode: statuscode,
            });
        }
    }
    catch (error) {
        const stackerror = new Error();
        res.json({
            message: 'An error occurred while deleting blog',
            status: false,
            error: error,
            stack: stackerror.stack,
        });
    }
});
exports.blogController = {
    createBlogContent,
    getBlogContent,
    updateBlogContent,
    deleteBlogContent,
    getBlogContentByAuthorID,
    getSingleBlogContent
};
// In user.controller.ts
