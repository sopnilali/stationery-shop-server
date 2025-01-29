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
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const product_model_1 = __importDefault(require("../products/product.model"));
const order_model_1 = __importDefault(require("./order.model"));
const order_utils_1 = require("./order.utils");
const createOrdersfromDB = (user, payload, client_ip) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = payload === null || payload === void 0 ? void 0 : payload.products) === null || _a === void 0 ? void 0 : _a.length)) {
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, "Order is not specified");
    }
    const products = payload.products;
    let totalPrice = 0;
    const productDetails = yield Promise.all(products.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield product_model_1.default.findById(item.product);
        if (product) {
            const subtotal = product ? (product.price || 0) * item.quantity : 0;
            totalPrice += subtotal;
            return item;
        }
    })));
    let order = yield order_model_1.default.create({
        user: user._id,
        products: productDetails,
        totalPrice,
    });
    // payment integration
    const shurjopayPayload = {
        amount: totalPrice,
        order_id: order._id,
        currency: "BDT",
        customer_name: user.name,
        customer_address: user.address,
        customer_email: user.userEmail,
        customer_phone: user.phone,
        customer_city: user.city,
        client_ip,
    };
    const payment = yield order_utils_1.orderUtils.makePaymentAsync(shurjopayPayload);
    if (payment === null || payment === void 0 ? void 0 : payment.transactionStatus) {
        order = yield order_model_1.default.updateOne({
            transaction: {
                id: payment.sp_order_id,
                transactionStatus: payment.transactionStatus,
            },
        });
    }
    return payment.checkout_url;
});
const verifyPayment = (orderid) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedPayment = yield order_utils_1.orderUtils.verifyPaymentAsync(orderid);
    if (verifiedPayment.length) {
        yield order_model_1.default.findOneAndUpdate({
            "transaction.id": orderid,
        }, {
            "transaction.bank_status": verifiedPayment[0].bank_status,
            "transaction.sp_code": verifiedPayment[0].sp_code,
            "transaction.sp_message": verifiedPayment[0].sp_message,
            "transaction.transactionStatus": verifiedPayment[0].transaction_status,
            "transaction.method": verifiedPayment[0].method,
            "transaction.date_time": verifiedPayment[0].date_time,
            status: verifiedPayment[0].bank_status == "Success"
                ? "Paid"
                : verifiedPayment[0].bank_status == "Failed"
                    ? "Pending"
                    : verifiedPayment[0].bank_status == "Cancel"
                        ? "Cancelled"
                        : "",
        });
    }
    return verifiedPayment;
});
const OrderStatusChangerFromAdmininDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.findById(id);
    return result;
});
const deleteOrdersfromDB = (orderid) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.deleteOne(orderid);
    return result;
});
const getOrdersByEmailfromDB = (emailId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.find({ user: emailId });
    return result;
});
const getAllOrdersfromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.find().populate({ path: "user" });
    return result;
});
const CalculateOrderRevenuefromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.aggregate([
        //stage-1
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$totalPrice' }, // total price to the product ordered
            },
        },
    ]).project({
        // only show the calculate total revenue
        _id: 0,
        totalRevenue: 1,
    });
    return result;
});
exports.OrderService = {
    createOrdersfromDB,
    getOrdersByEmailfromDB,
    getAllOrdersfromDB,
    deleteOrdersfromDB,
    OrderStatusChangerFromAdmininDB,
    verifyPayment,
    CalculateOrderRevenuefromDB,
};
