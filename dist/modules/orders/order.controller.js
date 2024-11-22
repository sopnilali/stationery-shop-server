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
        const { email, productId, quantity, totalPrice } = order;
        // Fetch product details
        const productdetails = yield product_model_1.default.findById(productId);
        if (!productdetails) {
            return res.status(404).json({
                message: 'Product not found',
                status: false,
            });
        }
        if (productdetails.quantity < quantity) {
            return res.status(400).json({
                message: 'Insufficient stock for the requested quantity',
                status: false,
            });
        }
        // Update inventory
        productdetails.quantity -= quantity;
        if (productdetails.quantity === 0) {
            productdetails.inStock = false;
        }
        yield productdetails.save();
        // Create the order
        const orderdetails = new order_model_1.default({
            email,
            productId,
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
                productId: savedOrder.productId,
                quantity: savedOrder.quantity,
                totalPrice: savedOrder.totalPrice,
                createdAt: savedOrder.createdAt,
                updatedAt: savedOrder.updatedAt,
            },
        });
    }
    catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({
            message: 'An error occurred while creating the order',
            status: false,
            error: error,
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
        res.json({
            message: 'An error occurred while calculating the revenue',
            status: false,
            error,
        });
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_service_1.OrderService.getAllOrdersfromDB();
        res.status(200).json({
            message: 'Orders retrieved successfully',
            status: true,
            data: orders,
        });
    }
    catch (error) {
        res.json({
            message: 'An error occurred while retrieving the orders',
            status: false,
            error,
        });
    }
});
exports.OrderController = {
    createOrders,
    getAllOrders,
    CalculateOrders,
};
