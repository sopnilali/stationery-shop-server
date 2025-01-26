import {  Types } from "mongoose";

export interface TBlogContent {
    title: string
    content: string
    author: Types.ObjectId
    isPublished: boolean
    createdAt: NativeDate
    updatedAt: NativeDate
  }


 export interface IQuery { 
  author?: string; $or?: Array<{ title: { $regex: string; $options: string } } | { content: { $regex: string; $options: string } }>}