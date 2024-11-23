import { model, Schema } from 'mongoose'
import { productInterface } from './product.interface'

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price must be a positive number'],
    },
    category: {
      type: String,
      enum: [
        'Writing',
        'Office Supplies',
        'Art Supplies',
        'Educational',
        'Technology',
      ],
      required: true,
    },
    description: { type: String, required: true },
    quantity: {
      type: Number,
      required: true,
      min: [0, 'Quantity must be a positive number'],
    },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
)

const Products = model<productInterface>('products', ProductSchema)

export default Products
