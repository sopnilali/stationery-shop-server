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
exports.orderController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const order_service_1 = require("./order.service");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const order = yield order_service_1.OrderService.createOrdersfromDB(user, req.body, req.ip);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: "Order placed successfully",
        data: order,
    });
}));
const OrderStatusChanger = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.orderId;
    const order = yield order_service_1.OrderService.OrderStatusChangerFromAdmininDB(orderId);
    if (!order) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Order not found');
    }
    if (order.status === 'Shipped') {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Order already Shipped");
    }
    // Update the isBlocked property
    order.status = "Paid";
    yield order.save();
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Order Shipped successfully',
        statusCode: http_status_1.default.OK,
    });
}));
const getOrdersByEmail = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_service_1.OrderService.getOrdersByEmailfromDB(req.user._id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        message: "Order retrieved successfully",
        data: order,
    });
}));
const getAllOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_service_1.OrderService.getAllOrdersfromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        message: "Order retrieved successfully",
        data: order,
    });
}));
const OrderCalculator = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.OrderService.CalculateOrderRevenuefromDB();
    result.map((order) => res.send(order));
}));
const verifyPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderid = req.params.orderId;
    const order = yield order_service_1.OrderService.verifyPayment(orderid);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        message: "Order verified successfully",
        data: order,
    });
}));
exports.orderController = { createOrder, getOrdersByEmail, getAllOrders, OrderStatusChanger, verifyPayment, OrderCalculator };
