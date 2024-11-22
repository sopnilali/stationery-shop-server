import { productInterface, searchTermQueryInterface } from './product.interface'
import Products from './product.model'

const createProductsfromDB = async (
  payload: productInterface
): Promise<productInterface> => {
  const result = await Products.create(payload)
  return result
}
const getAllProductsfromDB = async (query: searchTermQueryInterface) => {
  const result = await Products.find(query)
  return result
}
const getProductByIdfromDB = async (productid: string) => {
  const result = await Products.findById(productid)
  return result
}

const updateProductByIdfromDB = async (
  productid: string,
  payload: productInterface
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
