import { model, Schema } from 'mongoose'
import { OrderRequest } from './order.interface'

const orderSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
    },
    quantity: {
        type: Number,
    },
    totalPrice: {
        type: Number,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

const Orders = model<OrderRequest>('orders', orderSchema)

export default Orders
