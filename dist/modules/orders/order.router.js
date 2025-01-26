"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
router.post('/', order_controller_1.OrderController.createOrders); // create a new order
router.get('/', order_controller_1.OrderController.getAllOrders); // get all the orders
router.get('/revenue', order_controller_1.OrderController.CalculateOrders); // calculate the total amount of revenue
exports.orderRoutes = router;
