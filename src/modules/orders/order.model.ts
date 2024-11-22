import { model, Schema } from 'mongoose'
import { OrderRequest } from './order.interface'

const orderSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    validate: {
      validator: function (value: number): boolean {
        return value >= 0 // Ensure quantity is non-negative
      },
      message: 'Quantity must be a positive number', // Custom error message
    },
  },
  totalPrice: {
    type: Number,
    validate: {
      validator: (value: number): boolean => value > 0,
      message: `Quantity must be a positive number`,
    },
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const Orders = model<OrderRequest>('orders', orderSchema)

export default Orders
