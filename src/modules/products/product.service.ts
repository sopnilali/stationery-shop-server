import { productInterface, searchTermQueryInterface } from "./product.interface";
import Products from "./product.model"

const createProduct = async (payload: productInterface ) : Promise<productInterface>=> {
    const result = await Products.create(payload);
    return result;
}
const getAllProducts = async(query: searchTermQueryInterface )=>{
    const result = await Products.find(query);
    return result;
}
const getProductById = async(productid : string ) => {
    const result = await Products.findById(productid);
    return result;
}

const updateProductById = async(productid : string, payload: productInterface ) => {
    const result = await Products.findByIdAndUpdate(productid, payload, {new: true});
    return result;
}

export const ProductService = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById
}