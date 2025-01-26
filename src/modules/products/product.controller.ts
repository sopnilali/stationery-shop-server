//req and response from hit use
import { Request, RequestHandler, Response } from 'express'
import { ProductService } from './product.service'
import catchAsync from '../../utils/catchAsync'
import { IQuery } from './product.interface'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { User } from '../user/user.model'

const createNewProducts = catchAsync(async (req: Request, res: Response) => {
  const { name,brand, category, description, price, productImg, quantity, stock } = req.body

  const userId = await User.findOne({ email: req.user.userEmail })

  const productData: any = {
    name,
    brand,
    category,
    description,
    price,
    productImg,
    quantity,
    user: userId?._id,
    stock,
  }


  const result = await ProductService.createProductsfromDB(productData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is created succesfully',
    data: {
      _id: result._id,
      name: result.name,
      category: result.category,
      description: result.description,
      price: result.price,
      productImg: result.productImg,
      quantity: result.quantity,
      user: result.user,
      stock: result.stock,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    },
  })
})


const getAllProducts: RequestHandler = catchAsync(async (req, res) => {
  const { search, sortBy = 'createdAt', sortOrder = 'desc', filter } = req.query;

  // Build query object
  let query: IQuery = {};

  if (search) {
    query.$or = [
      { title: { $regex: search as string, $options: 'i' } },
      { category: { $regex: search as string, $options: 'i' } },
    ];
  }


  if (filter) {
    query.author = filter as string;
  }
  // Ensure sortBy is a string
  const validSortBy = typeof sortBy === 'string' ? sortBy : 'createdAt';

  const result = await ProductService.getAllProductsfromDB(query, validSortBy, sortOrder)
  // Response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Product fetched successfully",
    data: result.map((blog) => ({
      _id: blog._id,
      name: blog.name,
      category: blog.category,
      description: blog.description,
      price: blog.price,
      quantity: blog.quantity,
      stock: blog.stock,
      user: blog.user,
    })),
  });
})

// const GetallProducts = async (req: Request, res: Response) => {
//   try {
//     const productData = req.query

//     // Retrieve products based on query parameters
//     const products = await ProductService.getAllProductsfromDB(productData)

//     // Success response
//     if (!products || products.length === 0) {
//       res.status(404).json({
//         message: 'Products Not Found ',
//         status: false,
//         data: [],
//       })
//     } else {
//       res.json({
//         message: 'Products retrieved Successfully ',
//         status: true,
//         data: products.map((product) => {
//           return {
//             _id: product._id,
//             name: product.name,
//             brand: product.brand,
//             price: product.price,
//             category: product.category,
//             description: product.description,
//             quantity: product.quantity,
//             inStock: product.inStock,
//             createdAt: product.createdAt,
//             updatedAt: product.updatedAt,
//           }
//         }),
//       })
//     }
//   } catch (error: any) {
//     // Handle unexpected errors
//     const stackerror = new Error()
//     res.json({
//       message: 'An error occurred while retrieving products',
//       status: false,
//       error: error,
//       stack: stackerror.stack,
//     })
//   }
// }

const getProductByID = async (req: Request, res: Response) => {
  try {
    const product = await ProductService.getProductByIdfromDB(
      req.params.productId
    )
    if (product) {
      res.status(200).json({
        message: 'Product retrieved successfully',
        status: true,
        data: {
          _id: product._id,
          name: product.name,
          category: product.category,
          description: product.description,
          price: product.price,
          quantity: product.quantity,
          stock: product.stock,
          user: product.user
        },
      })
    }
  } catch (error: any) {
    const stackerror = new Error()
    res.json({
      message: 'An error occurred while retrieving product',
      status: false,
      error: error,
      stack: stackerror.stack,
    })
  }
}

const updateProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body
    const productId = req.params.productId
    const result = await ProductService.updateProductByIdfromDB(
      productId,
      productData
    )
    if (result) {
      res.status(200).json({
        message: 'Product updated successfully',
        status: true,
        data: {
          _id: result._id,
          name: result.name,
          price: result.price,
          category: result.category,
          description: result.description,
          quantity: result.quantity,
          stock: result.stock,
          user: result.user,
        },
      })
    }
  } catch (error) {
    const stackerror = new Error()
    res.json({
      message: 'An error occurred while updating product',
      status: false,
      error: error,
      stack: stackerror.stack,
    })
  }
}

const deleteProductbyID = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId
    const result = await ProductService.deleteProductByIdfromDB(productId)
    if (result) {
      res.status(200).json({
        message: 'Product deleted successfully',
        status: true,
        data: {},
      })
    }
  } catch (error) {
    const stackerror = new Error()
    res.json({
      message: 'An error occurred while deleting product',
      status: false,
      error: error,
      stack: stackerror.stack,
    })
  }
}

export const productController = {
  createNewProducts,
  getAllProducts,
  getProductByID,
  updateProduct,
  deleteProductbyID,
}
