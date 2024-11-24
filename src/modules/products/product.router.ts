import express from 'express'
import { productController } from './product.controller'

const productRouter = express.Router()

productRouter.post('/products', productController.createNewProducts) // create new products routes
productRouter.get('/products', productController.GetallProducts) // get all products routes
productRouter.get('/products/:productId', productController.getProductByID) // get all products routes by product id
productRouter.put('/products/:productId', productController.updateProduct) // update product routes by product id and update specific products
productRouter.delete('/products/:productId',productController.deleteProductbyID) // delete product routes by product id

export default productRouter
