import { OrderRequest } from './order.interface'
import Orders from './order.model'

const createOrdersfromDB = async (payload: OrderRequest) => {
  const result = await Orders.create(payload)
  return result
}

const getAllOrdersfromDB = async () => {
  const result = await Orders.find()
  return result
}

const CalculateOrderRevenuefromDB = async () => {
  const result = await Orders.aggregate([
    //stage-1
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]).project({
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
