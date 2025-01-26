import { TProductInterface } from '../products/product.interface'

export interface OrderRequest extends TProductInterface {
  email: string
  product: string
  quantity: number
  totalPrice: number
  createdAt: NativeDate
  updatedAt: NativeDate
}
