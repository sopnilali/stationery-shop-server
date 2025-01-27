import mongoose from 'mongoose';
import { TProductInterface } from './product.interface'
import Products from './product.model'
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

const createProductsfromDB = async (
  payload: TProductInterface
): Promise<TProductInterface> => {
  const result = await Products.create(payload)
  return result
}
const getAllProductsfromDB = async (query: any, validSortBy: any, sortOrder: any) => {
   // Fetch blogs from DB with sorting
   const result = await Products.find(query).sort({ [validSortBy]: sortOrder === 'asc' ? 1 : -1 }).populate({
    path: 'author'})
  return result
}
const getProductByIdfromDB = async (productid: string) => {
  const result = await Products.findById(productid).populate({path: 'author'})
  return result
}

const updateProductByIdfromDB = async (
  productid: string,
  payload: TProductInterface
) => {
  const result = await Products.findByIdAndUpdate(productid, payload, {
    new: true,
  })
  return result
}

const deleteProductByIdfromDB = async (productid: string) => {
  const result = await Products.findByIdAndDelete(productid)
  return result
}

export const ProductService = {
  createProductsfromDB,
  getAllProductsfromDB,
  getProductByIdfromDB,
  updateProductByIdfromDB,
  deleteProductByIdfromDB,
}
