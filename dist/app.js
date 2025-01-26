"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const globalErrorhandler_1 = __importDefault(require("./middlewares/globalErrorhandler"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// CORS
app.use((0, cors_1.default)({
    origin: 'https://stationery-shop-client-six.vercel.app/', // Allow requests from this specific origi,
    credentials: true
}));
// application routes
app.use('/api/v2', routes_1.default);
// api route
app.get('/', (req, res) => {
    res.json({
        status: true,
        message: 'Welcome to Blog Project API!',
    });
});
app.use(globalErrorhandler_1.default);
//Not Found
app.use(notFound_1.default);
exports.default = app;
