import express from 'express'
import { productController } from './product.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()

router.post('/', auth(USER_ROLE.admin), productController.createNewProducts) // create new products routes
router.get('/', productController.getAllProducts)// get all products routes
router.get('/:productId', productController.getProductByID) // get all products routes by product id
router.put('/:productId', auth(USER_ROLE.admin), productController.updateProduct) // update product routes by product id and update specific products
router.delete('/:productId', auth(USER_ROLE.admin), productController.deleteProductbyID) // delete product routes by product id

export const productRoutes = router
