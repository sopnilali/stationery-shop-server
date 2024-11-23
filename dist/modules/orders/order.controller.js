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
    try {
        const order = req.body;
        const { email, product, quantity, totalPrice } = order;
        // Fetch product details
        const productdetails = yield product_model_1.default.findById(product); // fetch product details
        if (!productdetails) {
            return res.status(404).json({
                message: 'Product or Order not found',
                status: false,
            });
        }
        if (productdetails.quantity < quantity) {
            // if productdetails.quantity is less than quantity then show this error message
            return res.status(400).json({
                message: 'Insufficient stock for the requested quantity',
                status: false,
            });
        }
        // Update inventory
        productdetails.quantity -= quantity;
        if (productdetails.quantity === 0) {
            // if product quantity is zero then product inStock to false
            productdetails.inStock = false;
        }
        yield productdetails.save(); // update inventory
        // Create the order
        const orderdetails = new order_model_1.default({
            email,
            product,
            quantity,
            totalPrice,
        });
        // Ensure type compatibility here
        const savedOrder = yield order_service_1.OrderService.createOrdersfromDB(orderdetails);
        res.status(201).json({
            message: 'Order created successfully',
            status: true,
            data: {
                _id: savedOrder._id,
                email: savedOrder.email,
                product: savedOrder.product,
                quantity: savedOrder.quantity,
                totalPrice: savedOrder.totalPrice,
                createdAt: savedOrder.createdAt,
                updatedAt: savedOrder.updatedAt,
            },
        });
    }
    catch (error) {
        const stackerror = new Error();
        res.status(500).json({
            message: 'An error occurred while creating the order',
            status: false,
            error: error,
            stack: stackerror.stack,
        });
    }
});
const CalculateOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.OrderService.CalculateOrderRevenuefromDB();
        res.status(200).json({
            message: 'Revenue calculated successfully',
            status: true,
            data: {
                totalRevenue: result[0].totalRevenue, // Total revenue calculated from all orders
            },
        });
    }
    catch (error) {
        const stackerror = new Error();
        res.json({
            message: 'An error occurred while calculating the revenue',
            status: false,
            error: error,
            stack: stackerror.stack,
        });
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_service_1.OrderService.getAllOrdersfromDB();
        if (!orders || orders.length === 0) {
            res.status(404).json({
                message: 'Order Not Found ',
                status: false,
                data: [],
            });
        }
        else {
            res.status(200).json({
                message: 'Orders retrieved successfully',
                status: true,
                data: orders.map((order) => {
                    return {
                        _id: order._id,
                        email: order.email,
                        product: order.product,
                        quantity: order.quantity,
                        totalPrice: order.totalPrice,
                        createdAt: order.createdAt,
                        updatedAt: order.updatedAt,
                    };
                }),
            });
        }
    }
    catch (er) {
        const stackerror = new Error();
        res.json({
            message: 'An error occurred while retrieving the orders',
            status: false,
            error: er,
            stack: stackerror.stack,
        });
    }
});
exports.OrderController = {
    createOrders,
    getAllOrders,
    CalculateOrders,
};
