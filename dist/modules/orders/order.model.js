"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'], // required email field
        validate: {
            validator: (value) => validator_1.default.isEmail(value), // email validation function to validate email
            message: '{VALUE} is not a valid email type',
        },
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'product is required'],
        ref: 'products',
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, 'Quantity must be a positive number'],
        validate: {
            validator: function (value) {
                return value >= 0; // Ensure quantity is non-negative
            },
            message: 'Quantity must be a positive number',
        },
    },
    totalPrice: {
        type: Number,
        min: [0, 'TotalPrice must be a positive number'], // Ensure totalPrice is non-negative
        required: true,
    },
}, { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
// versionKey: false // You should be aware of the outcome after set to false
// Automatically adds `createdAt` and `updatedAt`
);
const Orders = (0, mongoose_1.model)('orders', orderSchema);
exports.default = Orders;
