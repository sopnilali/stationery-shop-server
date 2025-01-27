"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), product_controller_1.productController.createNewProducts); // create new products routes
router.get('/', product_controller_1.productController.getAllProducts); // get all products routes
router.get('/:productId', product_controller_1.productController.getProductByID); // get all products routes by product id
router.put('/:productId', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), product_controller_1.productController.updateProduct); // update product routes by product id and update specific products
router.delete('/:productId', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), product_controller_1.productController.deleteProductbyID); // delete product routes by product id
exports.productRoutes = router;
