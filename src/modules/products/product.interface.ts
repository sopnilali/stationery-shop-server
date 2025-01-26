import { Types } from "mongoose"

export interface TProductInterface {
  _id: string
  name: string
  price: number
  category: string
  description: string
  productImg: string
  quantity: number
  stock: boolean
  user: Types.ObjectId | undefined
  createdAt: NativeDate
  updatedAt: NativeDate
}

export interface searchTermQueryInterface {
  price?: number,
  category?: string
  name?: string
  stock?:Boolean
  author?: string
}

export interface IQuery { 
  author?: string; $or?: Array<{ title: { $regex: string; $options: string } } | { category: { $regex: string; $options: string } }>}
