"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.user), order_controller_1.orderController.createOrder); // create a new order
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.user), order_controller_1.orderController.getOrdersByEmail); // get all the orders by email
router.get('/all', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), order_controller_1.orderController.getAllOrders); // get all the orders
router.patch('/:orderId/confirm', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), order_controller_1.orderController.OrderStatusChanger);
router.patch('/:orderId/verify', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), order_controller_1.orderController.verifyPayment); // verify order
router.get('/revenue', order_controller_1.orderController.OrderCalculator); // calculate the total amount of revenue
exports.orderRoutes = router;
