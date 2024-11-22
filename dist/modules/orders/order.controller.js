"use strict";
//req and response from hit use
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
exports.OrderController = void 0;
const product_model_1 = __importDefault(require("../products/product.model"));
const order_model_1 = __importDefault(require("./order.model"));
const order_service_1 = require("./order.service");
const createOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = req.body;
    const { email, productId, quantity, totalPrice } = order;
    const product = yield product_model_1.default.findById(productId);
    if (!(product === null || product === void 0 ? void 0 : product.quantity)) {
        return res.status(404).json({
            message: 'Product Sold Out',
            status: false,
        });
    }
    // Reduce inventory
    product.quantity -= quantity;
    yield (product === null || product === void 0 ? void 0 : product.save());
    // Create the order
    const orderdetails = new order_model_1.default({
        email,
        productId,
        quantity,
        totalPrice,
    });
    const savedOrder = yield order_service_1.OrderService.createOrdersfromDB(orderdetails);
    // Respond with the created order
    res.status(201).json({
        message: 'Order created successfully',
        status: true,
        data: savedOrder,
    });
});
const CalculateOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.OrderService.CalculateOrderRevenuefromDB();
    res.status(200).json({
        message: 'Revenue calculated successfully',
        status: true,
        data: result,
    });
});
exports.OrderController = {
    createOrders,
    CalculateOrders,
};
