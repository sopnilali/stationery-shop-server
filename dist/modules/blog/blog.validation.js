"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogContentValidationSchema = void 0;
const zod_1 = require("zod");
const createblogContentValidationSchema = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    author: zod_1.z.string(),
    isPublished: zod_1.z.boolean().optional(),
});
const updateblogContentValidationSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    content: zod_1.z.string().optional(),
    author: zod_1.z.string().optional(),
    isPublished: zod_1.z.boolean().optional(),
});
exports.blogContentValidationSchema = {
    createblogContentValidationSchema,
    updateblogContentValidationSchema
};
