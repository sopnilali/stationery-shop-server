import express from 'express'
import { productController } from './product.controller'

const productRouter = express.Router()

productRouter.post('/products', productController.createProducts)
productRouter.get('/products', productController.GetallProducts)
productRouter.get('/products/:productId', productController.getSpecificProduct)
productRouter.put('/products/:productId', productController.updateProduct)

export default productRouter
