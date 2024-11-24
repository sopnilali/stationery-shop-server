"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const productRouter = express_1.default.Router();
productRouter.post('/products', product_controller_1.productController.createNewProducts); // create new products routes
productRouter.get('/products', product_controller_1.productController.GetallProducts); // get all products routes
productRouter.get('/products/:productId', product_controller_1.productController.getProductByID); // get all products routes by product id
productRouter.put('/products/:productId', product_controller_1.productController.updateProduct); // update product routes by product id and update specific products
productRouter.delete('/products/:productId', product_controller_1.productController.deleteProductbyID); // delete product routes by product id
exports.default = productRouter;
