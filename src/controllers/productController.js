import productModel from "../models/productModel";
import { ERROR, STATUSCODE, SUCCESS } from "../utils/helpers";
import { ErrorResponse, SuccessResponse } from "../utils/responseHandler";

class productController {
    static createProduct = async (req, res) => {
        try {
            const isExist = await productModel.findOne({ name: req.body.name });
            if (isExist) {
                return ErrorResponse(res, STATUSCODE.BAD_REQUEST, ERROR.ALREADY_EXISTS,);
            }
            const product = new productModel(req.body);
            await product.save();
            return SuccessResponse(res, STATUSCODE.CREATED, "Product" + SUCCESS.CREATED, product);
        } catch (error) {
            console.log(error);
            return ErrorResponse(res, STATUSCODE.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, error);
        }
    }
    static getAllProducts = async (req, res) => {
        try {
            const products = await productModel.find();
            return SuccessResponse(res, STATUSCODE.OK, "Product" + SUCCESS.OK, products)
        } catch (error) {
            console.log(error);
            return ErrorResponse(res, STATUSCODE.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, error);
        }
    }
    static getProductsById = async (req, res) => {
        try {
            const product = await productModel.findById(req.params.id)
            return SuccessResponse(res, STATUSCODE.OK,"Product" + SUCCESS.OK, product)
        } catch (error) {
            console.log(error);
            return ErrorResponse(res, STATUSCODE.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, error)
        }
    }
    static editProduct = async(req, res) => {
        try {
            const isExist = await productModel.findById(req.params.id);
            if(!isExist){
                return ErrorResponse(res, STATUSCODE.NOT_FOUND, ERROR.NOT_FOUND)
            }
            const product = await productModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
            return SuccessResponse(res, STATUSCODE.OK,"Product" + SUCCESS.UPDATED, product)
        } catch (error) {
            console.log(error);
            return ErrorResponse(res, STATUSCODE.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, error)
        }
    }
    static deleteProduct = async(req, res) => {
        try {
            const product = await productModel.findByIdAndDelete(req.params.id);
            return SuccessResponse(res, STATUSCODE.OK, "Product" + SUCCESS.DELETED, product)
        } catch (error) {
            console.log(error);
            return ErrorResponse(res, STATUSCODE.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, error)
        }
    }
}

export default productController