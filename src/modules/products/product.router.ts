import express from 'express'
import { productController } from './product.controller'

const productRouter = express.Router()

productRouter.post('/products', productController.createNewProducts)
productRouter.get('/products', productController.GetallProducts)
productRouter.get('/products/:productId', productController.getProductByID)
productRouter.put('/products/:productId', productController.updateProduct)
productRouter.delete('/products/:productId',productController.deleteProductbyID)

export default productRouter
