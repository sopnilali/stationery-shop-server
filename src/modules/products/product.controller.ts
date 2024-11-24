//req and response from hit use
import { Request, Response } from 'express'
import { ProductService } from './product.service'

const createNewProducts = async (req: Request, res: Response) => {
  try {
    const productData = req.body
    const result = await ProductService.createProductsfromDB(productData)

    if (result) {
      res.status(201).json({
        message: 'Product created successfully',
        status: true,
        data: {
          _id: result._id,
          name: result.name,
          brand: result.brand,
          price: result.price,
          category: result.category,
          description: result.description,
          quantity: result.quantity,
          inStock: result.inStock,
          createdAt: result.createdAt,
          updatedAt: result.updatedAt,
        },
      })
    }
  } catch (error) {
    const stackerror = new Error()
    res.json({
      message: 'An error occurred while adding the product',
      status: false,
      error: error,
      stack: stackerror.stack,
    })
  }
}

const GetallProducts = async (req: Request, res: Response) => {
  try {
    const productData = req.query

    // Retrieve products based on query parameters
    const products = await ProductService.getAllProductsfromDB(productData)

    // Success response
    if (!products || products.length === 0) {
      res.status(404).json({
        message: 'Products Not Found ',
        status: false,
        data: [],
      })
    } else {
      res.json({
        message: 'Products retrieved Successfully ',
        status: true,
        data: products.map((product) => {
          return {
            _id: product._id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            category: product.category,
            description: product.description,
            quantity: product.quantity,
            inStock: product.inStock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
          }
        }),
      })
    }
  } catch (error: any) {
    // Handle unexpected errors
    const stackerror = new Error()
    res.json({
      message: 'An error occurred while retrieving products',
      status: false,
      error: error,
      stack: stackerror.stack,
    })
  }
}

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
          brand: product.brand,
          price: product.price,
          category: product.category,
          description: product.description,
          quantity: product.quantity,
          inStock: product.inStock,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
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
          brand: result.brand,
          price: result.price,
          category: result.category,
          description: result.description,
          quantity: result.quantity,
          inStock: result.inStock,
          createdAt: result.createdAt,
          updatedAt: result.updatedAt,
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
  GetallProducts,
  getProductByID,
  updateProduct,
  deleteProductbyID,
}
