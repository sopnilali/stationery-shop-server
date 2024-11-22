//req and response from hit use

import { Request, Response } from 'express'
import Products from '../products/product.model'
import Orders from './order.model'
import { OrderService } from './order.service'

const createOrders = async (
  req: Request,
  res: Response
): Promise<any | null> => {
  try {
    const order = req.body
    const { email, productId, quantity, totalPrice } = order

    // Fetch product details
    const productdetails = await Products.findById(productId)

    if (!productdetails) {
      return res.status(404).json({
        message: 'Product not found',
        status: false,
      })
    }

    if (productdetails.quantity < quantity) {
      return res.status(400).json({
        message: 'Insufficient stock for the requested quantity',
        status: false,
      })
    }

    // Update inventory
    productdetails.quantity -= quantity
    if (productdetails.quantity === 0) {
      productdetails.inStock = false
    }
    await productdetails.save()

    // Create the order
    const orderdetails = new Orders({
      email,
      productId,
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
        productId: savedOrder.productId,
        quantity: savedOrder.quantity,
        totalPrice: savedOrder.totalPrice,
        createdAt: savedOrder.createdAt,
        updatedAt: savedOrder.updatedAt,
      },
    })
  } catch (error) {
    console.error('Order creation error:', error)
    res.status(500).json({
      message: 'An error occurred while creating the order',
      status: false,
      error: error,
    })
  }
}

const CalculateOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await OrderService.CalculateOrderRevenuefromDB()
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: {
        totalRevenue: result[0].totalRevenue, // Total revenue calculated from all orders
      },
    })
  } catch (error) {
    res.json({
      message: 'An error occurred while calculating the revenue',
      status: false,
      error,
    })
  }
}

const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await OrderService.getAllOrdersfromDB()
    res.status(200).json({
      message: 'Orders retrieved successfully',
      status: true,
      data: orders,
    })
  } catch (error) {
    res.json({
      message: 'An error occurred while retrieving the orders',
      status: false,
      error,
    })
  }
}

export const OrderController = {
  createOrders,
  getAllOrders,
  CalculateOrders,
}
