//req and response from hit use

import { Request, Response } from 'express'
import Products from '../products/product.model'
import Orders from './order.model'
import { OrderService } from './order.service'

const createOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = req.body
    const { email, productId, quantity, totalPrice } = order
    const productdetails = await Products.findById(productId)

     // Check if the product exists
     if (!productdetails) {
        res.status(404).json({
          message: 'Product not found',
          status: false,
        });
        return;
      }

    // Check if there is enough stock
    if (productdetails.quantity < quantity) {
      res.status(400).json({
        message: 'Insufficient stock for the requested quantity',
        status: false,
      })
    }

    // Reduce inventory
    productdetails.quantity -= quantity

    // Update inStock status if quantity is zero
    if (productdetails?.quantity === 0) {
      productdetails.inStock = false
    }

    await Products.create(productdetails)

    // Create the order
    const orderdetails = new Orders({
      email,
      productId,
      quantity,
      totalPrice,
    })

    const savedOrder = await OrderService.createOrdersfromDB(orderdetails)

    // Respond with the created order
    res.status(201).json({
      message: 'Order created successfully',
      status: true,
      data: {
        _id: savedOrder._id,
        email: savedOrder.email,
        productId: savedOrder.productId,
        quantity: savedOrder.quantity,
        totalPrice: savedOrder.totalPrice,
        createdAt: savedOrder.createdAt,
        updatedAt: savedOrder.updatedAt,
      },
    })
  } catch (error) {
    res.json({
      message: 'An error occurred while creating the order',
      status: false,
      error,
    })
  }
}

const CalculateOrders = async (req: Request, res: Response): Promise<void> => {
  const result = await OrderService.CalculateOrderRevenuefromDB()
  res.status(200).json({
    message: 'Revenue calculated successfully',
    status: true,
    data: {
      totalRevenue: result[0].totalRevenue, // Total revenue calculated from all orders
    },
  })
}

const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  const orders = await OrderService.getAllOrdersfromDB()
  res.status(200).json({
    message: 'Orders retrieved successfully',
    status: true,
    data: orders,
  })
}

export const OrderController = {
  createOrders,
  getAllOrders,
  CalculateOrders,
}
