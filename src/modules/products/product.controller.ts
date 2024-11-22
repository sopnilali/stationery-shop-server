//req and response from hit use
import { Request, Response } from 'express'
import { ProductService } from './product.service'
import { Error } from 'mongoose'

const createNewProducts = async (req: Request, res: Response) => {
  try {
    const productData = req.body
    const result = await ProductService.createProductsfromDB(productData)

    if (result) {
      res.status(201).json({
        message: 'Product created successfully',
        success: true,
        data: {
          _id: result._id,
          name: result.name,
          brand: result.brand,
          price: result.price,
          description: result.description,
          quantity: result.quantity,
          category: result.category,
          inStock: result.inStock,
          createdAt: result.createdAt,
          updatedAt: result.updatedAt,
        },
      })
    }

    // In case the service does not return a result
    res.status(500).json({
      message: 'Failed to create product',
      success: false,
    })
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while adding the product',
      success: false,
      error,
      stack: new Error('Something went wrong'),
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
        success: false,
        data: [],
      })
    } else {
      res.json({
        message: 'Products retrieved Successfully ',
        success: true,
        data: products,
      })
    }
  } catch (error) {
    // Handle unexpected errors
    res.status(500).json({
      message: 'An error occurred while retrieving products',
      success: false,
      error: error,
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
        success: true,
        data: product,
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while retrieving product',
      success: false,
      error,
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
        success: true,
        data: result,
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while updating product',
      success: false,
      error: error,
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
        success: true,
        data: {},
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while deleting product',
      success: false,
      error: error,
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
