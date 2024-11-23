import { productInterface } from '../products/product.interface'

export interface OrderRequest extends productInterface {
  email: string
  product: string
  quantity: number
  totalPrice: number
  createdAt: NativeDate
  updatedAt: NativeDate
}
