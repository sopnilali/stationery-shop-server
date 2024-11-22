
export interface OrderRequest {
  email: string 
  productId: string | null
  quantity: number  
  totalPrice: number
}
