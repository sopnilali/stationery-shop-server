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
                success: true,
                data: result,
            });
        }
        // In case the service does not return a result
        res.status(500).json({
            message: 'Failed to create product',
            success: false,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'An error occurred while adding the product',
            success: false,
            error,
            stack: "An error occurred while adding the product"
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
                success: false,
                data: [],
            });
        }
        else {
            res.json({
                message: 'Products retrieved Successfully ',
                success: true,
                data: products,
            });
        }
    }
    catch (error) {
        // Handle unexpected errors
        res.status(500).json({
            message: 'An error occurred while retrieving products',
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
const getProductByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_service_1.ProductService.getProductByIdfromDB(req.params.productId);
        if (product) {
            res.status(200).json({
                message: 'Product retrieved successfully',
                success: true,
                data: product,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'An error occurred while retrieving product',
            success: false,
            error
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
                success: true,
                data: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'An error occurred while updating product',
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
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
                success: true,
                data: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'An error occurred while deleting product',
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.productController = {
    createNewProducts,
    GetallProducts,
    getProductByID,
    updateProduct,
    deleteProductbyID
};
