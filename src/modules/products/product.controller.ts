//req and response from hit use
import { Request, Response } from 'express'
import { ProductService } from './product.service'

const createProducts = async (req: Request, res: Response) => {
  const productData = req.body
  const result = await ProductService.createProduct(productData)
  if (result) {
    res.status(201).json({
      message: 'Product created successfully',
      success: true,
      data: result,
    })
  }
}
const GetallProducts = async (req: Request, res: Response) => {
  try {
    const productData = req.query

    // Retrieve products based on query parameters
    const products = await ProductService.getAllProducts(productData)
    // Success response
    if(!products || products.length === 0) {
      res.status(404).json({
        message: 'Products Not Found ',
        success: false,
        data: [],
      })
    }
    else {
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
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

const getSpecificProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductService.getProductById(req.params.productId)
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
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

const updateProduct = async (req: Request, res: Response) => {
  const productData = req.body
  const productId = req.params.productId
  const result = await ProductService.updateProductById(productId, productData)
  if (result) {
    res.status(200).json({
      message: 'Product updated successfully',
      success: true,
      data: result,
    })
  }
}

// const GetProducts = (req: Request, res: Response) => {
//     const { searchTerm } = req.query;
//     if(!searchTerm){
//         Products.find();
//         res.json({
//             "message": "All products fetched successfully",
//             "success": true,
//             "data":
//         })
//     }
// }

export const productController = {
  createProducts,
  GetallProducts,
  getSpecificProduct,
  updateProduct,
}
