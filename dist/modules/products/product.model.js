"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be a positive number'], // if price is negative then price must be positive message show.
    },
    category: {
        type: String,
        required: true,
    },
    description: { type: String, required: true },
    productImg: { type: String, default: 'https://i.ibb.co.com/F40Mt4Y/touchicon-180.png' },
    quantity: {
        type: Number,
        required: true,
        min: [0, 'Quantity must be a positive number'], // if quantity is negative then quantity must be positive message show.
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
    },
    stock: { type: Boolean, default: true },
}, { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);
const Products = (0, mongoose_1.model)('products', ProductSchema);
exports.default = Products;
