"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => validator_1.default.isEmail(value), // email validation
            message: '{VALUE} is not a valid email type', // email validation message to be displayed
        },
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user'], // user role admin or user
        default: 'user', // default user role
    },
}, { timestamps: true }); // Automatically adds `createdAt` and `updatedAt`
const User = (0, mongoose_1.model)('users', userSchema);
exports.default = User;
