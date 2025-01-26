import express from 'express'
import { OrderController } from './order.controller'

const router = express.Router()

router.post('/', OrderController.createOrders) // create a new order
router.get('/', OrderController.getAllOrders) // get all the orders
router.get('/revenue', OrderController.CalculateOrders) // calculate the total amount of revenue

export const orderRoutes = router
