import { model, Schema } from "mongoose";
import { TBlogContent } from "./blog.interface";


const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    isPublished: {
        type: Boolean,
        default: true
    },
}, { timestamps: true }
)

// filter out published documents
blogSchema.pre('find', function (next) {
    this.find({ isPublished: { $ne: false } });
    next();
});


blogSchema.pre('findOne', function (next) {
    this.find({ isPublished: { $ne: false } });
    next();
});



const Blog = model<TBlogContent>('blogs', blogSchema)

export default Blog;