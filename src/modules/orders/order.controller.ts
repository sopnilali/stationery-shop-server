//req and response from hit use

import { Request, Response } from 'express'
import Products from '../products/product.model'
import Orders from './order.model'
import { OrderService } from './order.service'

const createOrders = async (req: Request, res: Response): Promise<any> => {
  try {
    const order = req.body
    const { email, product, quantity, totalPrice } = order

    // Fetch product details
    const productdetails = await Products.findById(product) // fetch product details

    if (!productdetails) {
      return res.status(404).json({
        message: 'Product or Order not found',
        status: false,
      })
    }
    if (productdetails.quantity < quantity) {
      // if productdetails.quantity is less than quantity then show this error message
      return res.status(400).json({
        message: 'Insufficient stock for the requested quantity',
        status: false,
      })
    }

    // Update inventory
    productdetails.quantity -= quantity
    if (productdetails.quantity === 0) {
      // if product quantity is zero then product inStock to false
      productdetails.inStock = false
    }
    await productdetails.save() // update inventory

    // Create the order
    const orderdetails = new Orders({
      email,
      product,
      quantity,
      totalPrice,
    })

    // Ensure type compatibility here
    const savedOrder = await OrderService.createOrdersfromDB(orderdetails)

    res.status(201).json({
      message: 'Order created successfully',
      status: true,
      data: {
        _id: savedOrder._id,
        email: savedOrder.email,
        product: savedOrder.product,
        quantity: savedOrder.quantity,
        totalPrice: savedOrder.totalPrice,
        createdAt: savedOrder.createdAt,
        updatedAt: savedOrder.updatedAt,
      },
    })
  } catch (error) {
    const stackerror = new Error()
    res.status(500).json({
      message: 'An error occurred while creating the order',
      status: false,
      error: error,
      stack: stackerror.stack,
    })
  }
}

const CalculateOrders = async (req: Request, res: Response): Promise<any> => {
  try {
    const result = await OrderService.CalculateOrderRevenuefromDB()
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: {
        totalRevenue: result[0].totalRevenue, // Total revenue calculated from all orders
      },
    })
  } catch (error: any) {
    const stackerror = new Error()
    res.json({
      message: 'An error occurred while calculating the revenue',
      status: false,
      error: error,
      stack: stackerror.stack,
    })
  }
}

const getAllOrders = async (req: Request, res: Response): Promise<any> => {
  try {
    const orders = await OrderService.getAllOrdersfromDB()

    if (!orders || orders.length === 0) {
      res.status(404).json({
        message: 'Order Not Found ',
        status: false,
        data: [],
      })
    } else {
      res.status(200).json({
        message: 'Orders retrieved successfully',
        status: true,
        data: orders.map((order) => {
          return {
            _id: order._id,
            email: order.email,
            product: order.product,
            quantity: order.quantity,
            totalPrice: order.totalPrice,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
          }
        }),
      })
    }
  } catch (er) {
    const stackerror = new Error()
    res.json({
      message: 'An error occurred while retrieving the orders',
      status: false,
      error: er,
      stack: stackerror.stack,
    })
  }
}

export const OrderController = {
  createOrders,
  getAllOrders,
  CalculateOrders,
}
