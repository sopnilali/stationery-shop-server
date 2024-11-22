import { model, Schema } from 'mongoose'
import { productInterface } from './product.interface'

const ProductSchema = new Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: function (value: number): boolean {
        return value >= 0 // Ensure price is non-negative
      },
      message: 'Price must be a positive number', // Custom error message
    },
  },
  category: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const Products = model<productInterface>('products', ProductSchema)

export default Products
