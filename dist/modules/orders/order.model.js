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
    },
    quantity: {
        type: Number,
    },
    totalPrice: {
        type: Number,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
const Orders = (0, mongoose_1.model)('orders', orderSchema);
exports.default = Orders;
