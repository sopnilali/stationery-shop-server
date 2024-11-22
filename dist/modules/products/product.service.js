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
exports.ProductService = void 0;
const product_model_1 = __importDefault(require("./product.model"));
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.create(payload);
    return result;
});
const getAllProducts = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.find(query);
    return result;
});
const getProductById = (productid) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findById(productid);
    return result;
});
const updateProductById = (productid, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findByIdAndUpdate(productid, payload, {
        new: true,
    });
    return result;
});
exports.ProductService = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
};
