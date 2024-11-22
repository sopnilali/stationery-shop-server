//req and response from hit use

import { Request, Response } from 'express'
import Products from '../products/product.model'
import Orders from './order.model'
import { OrderService } from './order.service'

const createOrders = async (req: Request, res: Response) : Promise< any> => {
    const order = req.body
    const { email, product: productId, quantity, totalPrice } = order
    const product = await Products.findById(productId)

    if (!product?.quantity) {
        return res.status(404).json({
            message: 'Product Sold Out',
            status: false,
        })
    }

    // Reduce inventory
    product.quantity -= quantity
    await product?.save()

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
        data: savedOrder,
    })
}

const CalculateOrders = async (req: Request, res: Response) : Promise<void> =>  {
    const result = await OrderService.CalculateOrderRevenuefromDB();
    res.status(200).json({
        message: 'Revenue calculated successfully',
        status: true,
        data: result,
    })
}

export const OrderController = {
    createOrders,
    CalculateOrders,
}
