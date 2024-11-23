import { model, Schema } from 'mongoose'
import validator from 'validator'
import { OrderRequest } from './order.interface'

const orderSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not a valid email type',
      },
    },
    product: {
      type: Schema.Types.ObjectId,
      required: [true, 'product is required'],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, 'Quantity must be a positive number'],
      validate: {
        validator: function (value: number): boolean {
          return value >= 0 // Ensure quantity is non-negative
        },
        message: 'Quantity must be a positive number',
      },
    },
    totalPrice: {
      type: Number,
      min: [0, 'TotalPrice must be a positive number'],
      required: true,
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
)

const Orders = model<OrderRequest>('orders', orderSchema)

export default Orders
