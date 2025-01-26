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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const user_model_1 = require("./user.model");
const createUserFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(payload);
    return result;
});
const getUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find();
    return result;
});
const getUserByEmailFromDB = (userEmail, role) => __awaiter(void 0, void 0, void 0, function* () {
    // const decoded = verifyToken(token, config.jwt_access_secret as string);
    // const { userEmail, role} = decoded
    let result = null;
    if (role === 'user') {
        result = yield user_model_1.User.findOne({ email: userEmail });
    }
    if (role === 'admin') {
        result = yield user_model_1.User.findOne({ email: userEmail });
    }
    return result;
});
exports.userServices = {
    createUserFromDB,
    getUserFromDB,
    getUserByEmailFromDB
};
