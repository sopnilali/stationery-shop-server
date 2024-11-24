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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_service_1 = require("./product.service");
const createNewProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const result = yield product_service_1.ProductService.createProductsfromDB(productData);
        if (result) {
            res.status(201).json({
                message: 'Product created successfully',
                status: true,
                data: {
                    _id: result._id,
                    name: result.name,
                    brand: result.brand,
                    price: result.price,
                    category: result.category,
                    description: result.description,
                    quantity: result.quantity,
                    inStock: result.inStock,
                    createdAt: result.createdAt,
                    updatedAt: result.updatedAt,
                },
            });
        }
    }
    catch (error) {
        const stackerror = new Error();
        res.json({
            message: 'An error occurred while adding the product',
            status: false,
            error: error,
            stack: stackerror.stack,
        });
    }
});
const GetallProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.query;
        // Retrieve products based on query parameters
        const products = yield product_service_1.ProductService.getAllProductsfromDB(productData);
        // Success response
        if (!products || products.length === 0) {
            res.status(404).json({
                message: 'Products Not Found ',
                status: false,
                data: [],
            });
        }
        else {
            res.json({
                message: 'Products retrieved Successfully ',
                status: true,
                data: products.map((product) => {
                    return {
                        _id: product._id,
                        name: product.name,
                        brand: product.brand,
                        price: product.price,
                        category: product.category,
                        description: product.description,
                        quantity: product.quantity,
                        inStock: product.inStock,
                        createdAt: product.createdAt,
                        updatedAt: product.updatedAt,
                    };
                }),
            });
        }
    }
    catch (error) {
        // Handle unexpected errors
        const stackerror = new Error();
        res.json({
            message: 'An error occurred while retrieving products',
            status: false,
            error: error,
            stack: stackerror.stack,
        });
    }
});
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
                    price: product.price,
                    category: product.category,
                    description: product.description,
                    quantity: product.quantity,
                    inStock: product.inStock,
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
                    brand: result.brand,
                    price: result.price,
                    category: result.category,
                    description: result.description,
                    quantity: result.quantity,
                    inStock: result.inStock,
                    createdAt: result.createdAt,
                    updatedAt: result.updatedAt,
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
    GetallProducts,
    getProductByID,
    updateProduct,
    deleteProductbyID,
};
