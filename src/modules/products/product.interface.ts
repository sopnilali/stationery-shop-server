export interface productInterface {
  _id: string
  name: string
  brand: string
  price: number
  category: string
  description: string
  quantity: number
  inStock: boolean
  createdAt: NativeDate
  updatedAt: NativeDate
}

export interface searchTermQueryInterface {
  category?: string
  name?: string
  brand?: string
}
