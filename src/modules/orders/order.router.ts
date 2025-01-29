import express from 'express'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'
import { orderController } from './order.controller'

const router = express.Router()

router.post('/', auth(USER_ROLE.user), orderController.createOrder) // create a new order
router.get('/', auth(USER_ROLE.user), orderController.getOrdersByEmail) // get all the orders by email
router.get('/all', auth(USER_ROLE.admin), orderController.getAllOrders) // get all the orders
router.patch('/:orderId/confirm', auth(USER_ROLE.admin), orderController.OrderStatusChanger)
router.patch('/:orderId/verify',auth(USER_ROLE.admin), orderController.verifyPayment) // verify order
router.get('/revenue', orderController.OrderCalculator) // calculate the total amount of revenue

export const orderRoutes = router
