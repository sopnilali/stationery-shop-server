"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_router_1 = __importDefault(require("./modules/products/product.router"));
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// routes
app.use('/api/', product_router_1.default);
// home routes
app.get('/', (req, res) => {
    res.send({
        status: true,
        message: 'Welcome to the Stationery Shop API! ⚡',
    });
});
// error handling middleware start
app.all('*', (req, res, next) => {
    const error = new Error(`Could not found ${req.url}`);
    res.status(404);
    res.json({
        status: false,
        message: error.message,
    });
    next(error);
});
app.use((err, req, res, next) => {
    res.status(500).json({
        status: false,
        message: 'Internal Server Error',
    });
    next(err);
});
// error handling middleware end
exports.default = app;
