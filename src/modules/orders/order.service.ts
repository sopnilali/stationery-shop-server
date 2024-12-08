import { OrderRequest } from './order.interface'
import Orders from './order.model'

const createOrdersfromDB = async (payload: OrderRequest) => {
  const result = await Orders.create(payload) // create a new order from database
  return result
}

const getAllOrdersfromDB = async () => {
  const result = await Orders.find().populate('product') // find all orders from the database
  return result
}

const CalculateOrderRevenuefromDB = async () => {
  const result = await Orders.aggregate([
    //stage-1
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' }, // total price to the product ordered
      },
    },
  ]).project({
    // only show the calculate total revenue
    _id: 0,
    totalRevenue: 1,
  })
  return result
}

export const OrderService = {
  createOrdersfromDB,
  getAllOrdersfromDB,
  CalculateOrderRevenuefromDB,
}
