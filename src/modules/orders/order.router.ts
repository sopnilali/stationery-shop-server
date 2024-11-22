import express from 'express'
import { OrderController } from './order.controller'

const orderRouter = express.Router()

orderRouter.post('/orders', OrderController.createOrders)
orderRouter.get('/orders/revenue', OrderController.CalculateOrders)

export default orderRouter
