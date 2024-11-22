"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        validate: {
            validator: function (value) {
                return value >= 0; // Ensure quantity is non-negative
            },
            message: 'Quantity must be a positive number', // Custom error message
        },
    },
    totalPrice: {
        type: Number,
        validate: {
            validator: (value) => value > 0,
            message: `Quantity must be a positive number`,
        },
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
const Orders = (0, mongoose_1.model)('orders', orderSchema);
exports.default = Orders;
