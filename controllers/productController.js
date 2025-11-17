const Product = require("../models/Product");
const { ERROR, STATUSCODE, SUCCESS } = require("../utils/helpers");
const { ErrorResponse, SuccessResponse } = require("../utils/responseHandler");

const createProduct = async (req, res) => {
    try {
        const { name, description, category, price } = req.body;
        const isExist = await Product.findOne({ name });
        if (isExist) {
            return ErrorResponse(res, STATUSCODE.INTERNAL_SERVER_ERROR, ERROR.ALREADY_EXISTS,);
        }
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
        const product = new Product({
            name: name,
            description: description,
            category: category,
            price: price,
            image: imagePath,
            addedBy: req.user._id
        });
        await product.save();
        return SuccessResponse(res, STATUSCODE.CREATED, ("Product" + SUCCESS.CREATED), product);
    } catch (error) {
        console.log(error);
        return ErrorResponse(res, STATUSCODE.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, error);
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return SuccessResponse(res, STATUSCODE.OK, ("Product" + SUCCESS.OK), products)
    } catch (error) {
        console.log(error);
        return ErrorResponse(res, STATUSCODE.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, error);
    }
}

const getProductsById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        return SuccessResponse(res, STATUSCODE.OK, ("Product" + SUCCESS.OK), product)
    } catch (error) {
        console.log(error);
        return ErrorResponse(res, STATUSCODE.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, error)
    }
}

const editProduct = async (req, res) => {
    try {
        const { name, description, category, price } = req.body;
        const isExist = await Product.findById(req.params.id);
        if (!isExist) {
            return ErrorResponse(res, STATUSCODE.NOT_FOUND, ERROR.NOT_FOUND)
        }
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
        const product = await Product.findByIdAndUpdate(req.params.id, {
            name,
            description,
            category,
            price,
            image: imagePath
        },
            { new: true });
        return SuccessResponse(res, STATUSCODE.OK, ("Product" + SUCCESS.UPDATED), product)
    } catch (error) {
        console.log(error);
        return ErrorResponse(res, STATUSCODE.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, error)
    }
}

const softDeleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: { isDeleted: true, deletedAt: Date.now() } },
            { new: true }
        );
        if (!product) {
            return ErrorResponse(STATUSCODE.NOT_FOUND, ("Product" + ERROR.NOT_FOUND))
        }
        return SuccessResponse(res, STATUSCODE.OK, ("Product" + SUCCESS.DELETED), product)
    } catch (error) {
        console.log(error);
        return ErrorResponse(res, STATUSCODE.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, error)
    }
}

const restoreProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: { isDeleted: false } },
            { new: true }
        )
        if (!product) {
            return ErrorResponse(STATUSCODE.NOT_FOUND, ("Product " + ERROR.NOT_FOUND));
        }
        return SuccessResponse(res, STATUSCODE.OK, ("Product " + SUCCESS.RESTORE), product )
    } catch (error) {
        console.log(error);
        return ErrorResponse(STATUSCODE.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, error)
    }
}

const getDeletedProducts = async (req, res) => {
    try {
        const products = await Product.find({ isDeleted: true });
        return SuccessResponse(res, STATUSCODE.OK, ("Product" + SUCCESS.OK), products)
    } catch (error) {
        console.log(error);
        return ErrorResponse(res, STATUSCODE.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = { createProduct, getAllProducts, getProductsById, editProduct, softDeleteProduct, getDeletedProducts, restoreProduct }