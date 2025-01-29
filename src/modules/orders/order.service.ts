import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface'
import Products from '../products/product.model';
import Order from './order.model';
import { orderUtils } from './order.utils';

const createOrdersfromDB = async (user: any, payload: { products: {product: string; quantity: number}[] },
  client_ip: string
 ) => {

  if(!payload?.products?.length) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "Order is not specified");
  }
  const products = payload.products;

  let totalPrice = 0;
  const productDetails = await Promise.all(
    products.map(async (item) => {
      const product = await Products.findById(item.product);
      if (product) {
        const subtotal = product ? (product.price || 0) * item.quantity : 0;
        totalPrice += subtotal;
        return item;
      }
    })
  );

  let order : any = await Order.create({
    user : user._id,
    products: productDetails,
    totalPrice,
  });

   // payment integration
   const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: "BDT",
    customer_name: user.name,
    customer_address: user.address,
    customer_email: user.userEmail,
    customer_phone: user.phone,
    customer_city: user.city,
    client_ip,
  };
  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    order = await Order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
}

const verifyPayment = async (orderid: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(orderid);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        "transaction.id": orderid,
      },
      {
        "transaction.bank_status": verifiedPayment[0].bank_status,
        "transaction.sp_code": verifiedPayment[0].sp_code,
        "transaction.sp_message": verifiedPayment[0].sp_message,
        "transaction.transactionStatus": verifiedPayment[0].transaction_status,
        "transaction.method": verifiedPayment[0].method,
        "transaction.date_time": verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == "Success"
            ? "Paid"
            : verifiedPayment[0].bank_status == "Failed"
            ? "Pending"
            : verifiedPayment[0].bank_status == "Cancel"
            ? "Cancelled"
            : "",
      }
    );
  }

  return verifiedPayment;
};

const OrderStatusChangerFromAdmininDB = async (
    id: string,
) => {
    const result = await Order.findById(id)
    return result
}


const deleteOrdersfromDB = async (orderid: any) => {
  const result = await Order.deleteOne(orderid);
  return result
}

const getOrdersByEmailfromDB = async (emailId : string) => {
  const result = await Order.find({user: emailId})
  return result
}

const getAllOrdersfromDB = async () => {
  const result = await Order.find().populate({path: "user"})
  return result
}



const CalculateOrderRevenuefromDB = async () => {
  const result = await Order.aggregate([
    //stage-1
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' }, // total price to the product ordered
      },
    },
  ]).project({
    // only show the calculate total revenue
    _id: 0,
    totalRevenue: 1,
  })
  return result
}

export const OrderService = {
  createOrdersfromDB,
  getOrdersByEmailfromDB,
  getAllOrdersfromDB,
  deleteOrdersfromDB,
  OrderStatusChangerFromAdmininDB,
  verifyPayment,
  CalculateOrderRevenuefromDB,
}
