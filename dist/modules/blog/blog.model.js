"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
    },
    isPublished: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });
// filter out published documents
blogSchema.pre('find', function (next) {
    this.find({ isPublished: { $ne: false } });
    next();
});
blogSchema.pre('findOne', function (next) {
    this.find({ isPublished: { $ne: false } });
    next();
});
const Blog = (0, mongoose_1.model)('blogs', blogSchema);
exports.default = Blog;
