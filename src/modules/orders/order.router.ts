import express from 'express'
import { OrderController } from './order.controller'

const orderRouter = express.Router()

orderRouter.post('/orders', OrderController.createOrders) // create a new order
orderRouter.get('/orders', OrderController.getAllOrders) // get all the orders
orderRouter.get('/orders/revenue', OrderController.CalculateOrders) // calculate the total amount of revenue

export default orderRouter
