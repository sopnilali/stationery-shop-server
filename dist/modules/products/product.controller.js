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
const createProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productData = req.body;
    const result = yield product_service_1.ProductService.createProduct(productData);
    if (result) {
        res.status(201).json({
            message: 'Product created successfully',
            success: true,
            data: result,
        });
    }
});
const GetallProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.query;
        // Retrieve products based on query parameters
        const products = yield product_service_1.ProductService.getAllProducts(productData);
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
const getSpecificProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_service_1.ProductService.getProductById(req.params.productId);
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
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productData = req.body;
    const productId = req.params.productId;
    const result = yield product_service_1.ProductService.updateProductById(productId, productData);
    if (result) {
        res.status(200).json({
            message: 'Product updated successfully',
            success: true,
            data: result,
        });
    }
});
// const GetProducts = (req: Request, res: Response) => {
//     const { searchTerm } = req.query;
//     if(!searchTerm){
//         Products.find();
//         res.json({
//             "message": "All products fetched successfully",
//             "success": true,
//             "data":
//         })
//     }
// }
exports.productController = {
    createProducts,
    GetallProducts,
    getSpecificProduct,
    updateProduct,
};
