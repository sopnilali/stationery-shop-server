"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidationSchema = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    photoURL: zod_1.z.string(),
    password: zod_1.z.string({
        invalid_type_error: 'Password must be string',
    })
        .max(20, { message: 'Password can not be more than 20 characters' })
        .optional(),
    role: zod_1.z.string().optional(),
    isBlocked: zod_1.z.boolean().optional(),
});
exports.authValidationSchema = {
    createUserValidationSchema
};
