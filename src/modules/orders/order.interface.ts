import { productInterface } from '../products/product.interface'

export interface OrderRequest extends productInterface {
  email: string
  productId: string | null
  quantity: number
  totalPrice: number
}
