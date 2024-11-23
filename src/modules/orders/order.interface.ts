import { productInterface } from '../products/product.interface'

export interface OrderRequest extends productInterface {
  email: string
  product: string | null
  quantity: number
  totalPrice: number
}
