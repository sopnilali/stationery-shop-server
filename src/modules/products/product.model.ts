import { model, Schema } from 'mongoose'
import { TProductInterface } from './product.interface'

const ProductSchema = new Schema <TProductInterface>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price must be a positive number'], // if price is negative then price must be positive message show.
    },
    category: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
    productImg: { type: String, default: 'https://i.ibb.co.com/F40Mt4Y/touchicon-180.png'},
    author: {
      type: Schema.Types.ObjectId,
        ref: 'users',
    },
    stock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
)

const Products = model<TProductInterface>('products', ProductSchema)

export default Products
