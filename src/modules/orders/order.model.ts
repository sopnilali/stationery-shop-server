import { model, Schema } from 'mongoose'
import validator from 'validator'
import { OrderRequest } from './order.interface'

const orderSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'], // required email field
      validate: {
        validator: (value: string) => validator.isEmail(value), // email validation function to validate email
        message: '{VALUE} is not a valid email type',
      },
    },
    product: {
      type: Schema.Types.ObjectId,
      required: [true, 'product is required'],
      ref: 'products',
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
      min: [0, 'TotalPrice must be a positive number'], // Ensure totalPrice is non-negative
      required: true,
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
  // versionKey: false // You should be aware of the outcome after set to false

  // Automatically adds `createdAt` and `updatedAt`
)

const Orders = model<OrderRequest>('orders', orderSchema)

export default Orders
