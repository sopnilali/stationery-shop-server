import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { OrderService } from "./order.service";
import { RequestHandler } from "express";
import AppError from "../../errors/AppError";

const createOrder = catchAsync(async (req, res) => {
  const user : any = req.user;
  const order = await OrderService.createOrdersfromDB(user, req.body, req.ip!);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Order placed successfully",
    data: order,
  });
});

const OrderStatusChanger: RequestHandler = catchAsync(async (req, res) => {
  const orderId = req.params.orderId;
  const order = await OrderService.OrderStatusChangerFromAdmininDB(orderId)
  if (!order) {
      throw new AppError(httpStatus.NOT_FOUND, 'Order not found');
  }

  if (order.status === 'Shipped' ) {
      throw new AppError(httpStatus.BAD_REQUEST, "Order already Shipped")
  }


  // Update the isBlocked property
  order.status = "Paid";
  await order.save();
  sendResponse(res, {
      success: true,
      message: 'Order Shipped successfully',
      statusCode: httpStatus.OK,
  })

})

const getOrdersByEmail = catchAsync(async (req, res) => {
  const order = await OrderService.getOrdersByEmailfromDB(req.user._id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Order retrieved successfully",
    data: order,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const order = await OrderService.getAllOrdersfromDB();
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Order retrieved successfully",
    data: order,
  });
});

const OrderCalculator = catchAsync(async (req, res) => {
  const result : any = await OrderService.CalculateOrderRevenuefromDB();

  result.map((order : any) =>
    res.send(order)
  )

  

  
  
})

const verifyPayment = catchAsync(async (req, res) => {
  const orderid = req.params.orderId
  const order = await OrderService.verifyPayment(orderid as string);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Order verified successfully",
    data: order,
  });
});


export const orderController = { createOrder, getOrdersByEmail, getAllOrders,OrderStatusChanger, verifyPayment, OrderCalculator };