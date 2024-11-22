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
const createProductsfromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.create(payload);
    return result;
});
const getAllProductsfromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.find(query);
    return result;
});
const getProductByIdfromDB = (productid) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findById(productid);
    return result;
});
const updateProductByIdfromDB = (productid, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findByIdAndUpdate(productid, payload, {
        new: true,
    });
    return result;
});
const deleteProductByIdfromDB = (productid) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findByIdAndDelete(productid);
    return result;
});
exports.ProductService = {
    createProductsfromDB,
    getAllProductsfromDB,
    getProductByIdfromDB,
    updateProductByIdfromDB,
    deleteProductByIdfromDB,
};
