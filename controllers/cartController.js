const Cart = require("../models/Cart")
const { SUCCESS, STATUSCODE, ERROR } = require("../utils/helpers")
const { ErrorResponse, SuccessResponse } = require("../utils/responseHandler")

const addToCart = async (req, res) => {
    try {
        const { product, user } = req.body;
        if (!product || !user) {
            return ErrorResponse(res, STATUSCODE.NOT_FOUND, ERROR.NOT_FOUND)
        }
        const isExist = await Cart.findOne({ product, user });
        if (isExist) {
            return ErrorResponse(res, STATUSCODE.BAD_REQUEST, ERROR.ALREADY_EXISTS)
        }
        const cart = new Cart({ product, user });
        cart.save();
        return SuccessResponse(res, STATUSCODE.CREATED, SUCCESS.CREATED, cart)
    } catch (error) {
        console.log(error)
        return ErrorResponse(res, STATUSCODE.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, error)
    }
}

const getProductInCart = async (req, res) => {
    try {
        const { id } = req?.params;
        const cart = await Cart.findById(id).populate("product").populate("user")
        return SuccessResponse(res, STATUSCODE.OK, SUCCESS.OK, cart)
    } catch (error) {
        console.log(error)
        return ErrorResponse(STATUSCODE.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, error)
    }
}

const deleteCart = async (req, res) => {
    try {
        const { id } = req.params;
        const isExist = await Cart.findById(id);
        if (!isExist) {
            return ErrorResponse(res, STATUSCODE.NOT_FOUND, ERROR.NOT_FOUND)
        }
        const cart = await Cart.findByIdAndDelete(id)
        return SuccessResponse(res, STATUSCODE.OK, SUCCESS.DELETED, cart)
    } catch (error) {
        console.log(error);
        return ErrorResponse(res, STATUSCODE.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, error)
    }
}

const clearCart = async (req, res) => {
    try {
        const cart = await Cart.deleteMany();
        return SuccessResponse(res, STATUSCODE.OK, SUCCESS.DELETED, cart)
    } catch (error) {
        console.log(error);
        return ErrorResponse(STATUSCODE.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, error)
    }
}

module.exports = { addToCart, getProductInCart, clearCart, deleteCart }