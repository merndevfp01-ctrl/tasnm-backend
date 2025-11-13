const productModel = require("../models/productModel");
const { ERROR, STATUSCODE, SUCCESS } = require("../utils/helpers");
const { ErrorResponse, SuccessResponse } = require("../utils/responseHandler");

const createProduct = async (req, res) => {
    try {
        const isExist = await productModel.findOne({ productName: req.body.productName });
        if (isExist) {
            return ErrorResponse(res, STATUSCODE.INTERNAL_SERVER_ERROR, ERROR.ALREADY_EXISTS,);
        }
        const product = new productModel(req.body);
        await product.save();
        return SuccessResponse(res, STATUSCODE.CREATED, "Product" + SUCCESS.CREATED, product);
    } catch (error) {
        console.log(error);
        return ErrorResponse(res, STATUSCODE.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, error);
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        return SuccessResponse(res, STATUSCODE.OK, "Product" + SUCCESS.OK, products)
    } catch (error) {
        console.log(error);
        return ErrorResponse(res, STATUSCODE.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, error);
    }
}

const getProductsById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id)
        return SuccessResponse(res, STATUSCODE.OK, "Product" + SUCCESS.OK, product)
    } catch (error) {
        console.log(error);
        return ErrorResponse(res, STATUSCODE.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, error)
    }
}

const editProduct = async (req, res) => {
    try {
        const isExist = await productModel.findById(req.params.id);
        if (!isExist) {
            return ErrorResponse(res, STATUSCODE.NOT_FOUND, ERROR.NOT_FOUND)
        }
        const product = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return SuccessResponse(res, STATUSCODE.OK, "Product" + SUCCESS.UPDATED, product)
    } catch (error) {
        console.log(error);
        return ErrorResponse(res, STATUSCODE.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, error)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id);
        return SuccessResponse(res, STATUSCODE.OK, "Product" + SUCCESS.DELETED, product)
    } catch (error) {
        console.log(error);
        return ErrorResponse(res, STATUSCODE.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, error)
    }
}

module.exports = { createProduct, getAllProducts, getProductsById, editProduct, deleteProduct }