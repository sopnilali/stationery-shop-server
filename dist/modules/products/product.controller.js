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
exports.productController = void 0;
const product_service_1 = require("./product.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../user/user.model");
const createNewProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, brand, category, description, price, productImg, quantity, stock } = req.body;
    const userId = yield user_model_1.User.findOne({ email: req.user.userEmail });
    const productData = {
        name,
        brand,
        category,
        description,
        price,
        productImg,
        quantity,
        author: userId === null || userId === void 0 ? void 0 : userId._id,
        stock,
    };
    const result = yield product_service_1.ProductService.createProductsfromDB(productData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product is created succesfully',
        data: {
            _id: result._id,
            name: result.name,
            brand: result.brand,
            category: result.category,
            description: result.description,
            price: result.price,
            productImg: result.productImg,
            quantity: result.quantity,
            author: result.author,
            stock: result.stock,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
        },
    });
}));
const getAllProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, sortBy = 'createdAt', sortOrder = 'desc', filter, minPrice, maxPrice, category, availability } = req.query;
    // Build query object
    let query = {};
    if (search) {
        query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { category: { $regex: search, $options: 'i' } },
            { author: { $regex: search, $options: 'i' } },
        ];
    }
    if (filter) {
        query.author = filter;
    }
    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice)
            query.price.$gte = parseFloat(minPrice);
        if (maxPrice)
            query.price.$lte = parseFloat(maxPrice);
    }
    if (category) {
        query.category = category;
    }
    if (availability) {
        query.stock = availability;
    }
    // Ensure sortBy is a string
    const validSortBy = typeof sortBy === 'string' ? sortBy : 'createdAt';
    const result = yield product_service_1.ProductService.getAllProductsfromDB(query, validSortBy, sortOrder);
    // Response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product fetched successfully",
        data: result.map((product) => ({
            _id: product._id,
            name: product.name,
            brand: product.brand,
            category: product.category,
            description: product.description,
            price: product.price,
            productImg: product.productImg,
            quantity: product.quantity,
            author: product.author,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        })),
    });
}));
// const GetallProducts = async (req: Request, res: Response) => {
//   try {
//     const productData = req.query
//     // Retrieve products based on query parameters
//     const products = await ProductService.getAllProductsfromDB(productData)
//     // Success response
//     if (!products || products.length === 0) {
//       res.status(404).json({
//         message: 'Products Not Found ',
//         status: false,
//         data: [],
//       })
//     } else {
//       res.json({
//         message: 'Products retrieved Successfully ',
//         status: true,
//         data: products.map((product) => {
//           return {
//             _id: product._id,
//             name: product.name,
//             brand: product.brand,
//             price: product.price,
//             category: product.category,
//             description: product.description,
//             quantity: product.quantity,
//             inStock: product.inStock,
//             createdAt: product.createdAt,
//             updatedAt: product.updatedAt,
//           }
//         }),
//       })
//     }
//   } catch (error: any) {
//     // Handle unexpected errors
//     const stackerror = new Error()
//     res.json({
//       message: 'An error occurred while retrieving products',
//       status: false,
//       error: error,
//       stack: stackerror.stack,
//     })
//   }
// }
const getProductByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_service_1.ProductService.getProductByIdfromDB(req.params.productId);
        if (product) {
            res.status(200).json({
                message: 'Product retrieved successfully',
                status: true,
                data: {
                    _id: product._id,
                    name: product.name,
                    brand: product.brand,
                    category: product.category,
                    description: product.description,
                    price: product.price,
                    productImg: product.productImg,
                    quantity: product.quantity,
                    author: product.author,
                    stock: product.stock,
                    createdAt: product.createdAt,
                    updatedAt: product.updatedAt,
                },
            });
        }
    }
    catch (error) {
        const stackerror = new Error();
        res.json({
            message: 'An error occurred while retrieving product',
            status: false,
            error: error,
            stack: stackerror.stack,
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const productId = req.params.productId;
        const result = yield product_service_1.ProductService.updateProductByIdfromDB(productId, productData);
        if (result) {
            res.status(200).json({
                message: 'Product updated successfully',
                status: true,
                data: {
                    _id: result._id,
                    name: result.name,
                    price: result.price,
                    category: result.category,
                    description: result.description,
                    quantity: result.quantity,
                    stock: result.stock,
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
const deleteProductbyID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const result = yield product_service_1.ProductService.deleteProductByIdfromDB(productId);
        if (result) {
            res.status(200).json({
                message: 'Product deleted successfully',
                status: true,
                data: {},
            });
        }
    }
    catch (error) {
        const stackerror = new Error();
        res.json({
            message: 'An error occurred while deleting product',
            status: false,
            error: error,
            stack: stackerror.stack,
        });
    }
});
exports.productController = {
    createNewProducts,
    getAllProducts,
    getProductByID,
    updateProduct,
    deleteProductbyID,
};
