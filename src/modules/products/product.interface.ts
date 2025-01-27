import { Types } from "mongoose"

export interface TProductInterface {
  _id: string
  name: string
  brand: string;
  price: number
  category: string
  description: string
  productImg: string
  quantity: number
  stock: boolean
  author: Types.ObjectId | undefined
  createdAt: NativeDate
  updatedAt: NativeDate
}

export interface searchTermQueryInterface {
  price?: number
  brand?: string
  category?: string
  name?: string
  stock?:boolean
  author?: string
}

export interface IQuery { 
  author?: string; $or?: Array<
  { name: { $regex: string; $options: string } } 
  | 
  { category: { $regex: string; $options: string } }
  | 
  { author: { $regex: string; $options: string } } |
  { price: { $regex: string; $options: string } }
  >}

export interface IFilter {
  author?: string;
  priceRange?: { min: number; max: number };
  category?: string;
}


