const Cart = require("../models/Cart")
const { SUCCESS, STATUSCODE, ERROR } = require("../utils/helpers")
const { ErrorResponse, SuccessResponse } = require("../utils/responseHandler")

const addToCart = async (req, res) => {
    try {
        const { product, user, qty } = req.body;
        if (!product || !user) {
            return ErrorResponse(res, STATUSCODE.NOT_FOUND, ERROR.NOT_FOUND)
        }
        const cartItem = await Cart.findOne({ product, user }).populate("product");
        console.log("Price", cartItem.product.price)
        if (cartItem) {
            cartItem.qty = cartItem.qty + (qty || 1);
            
            await cartItem.save();
            return SuccessResponse(res, STATUSCODE.OK, SUCCESS.OK, cartItem);
        } else {
            const cart = new Cart({ product, user, qty: qty || 1 });
            await cart.save();
            return SuccessResponse(res, STATUSCODE.CREATED, SUCCESS.CREATED, cart)
        }

    } catch (error) {
        console.log(error)
        return ErrorResponse(res, STATUSCODE.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, error)
    }
}

const decreaseQuantity = async (req, res) => {
    try {
        const { product, user, qty } = req.body;
        if (!product || !user) {
            return ErrorResponse(res, STATUSCODE.NOT_FOUND, ERROR.NOT_FOUND)
        }
        const cartItem = await Cart.findOne({ product, user });
        if (!cartItem) {
            return ErrorResponse(res, STATUSCODE.NOT_FOUND, ERROR.NOT_FOUND, error)
        }
        cartItem.qty = cartItem.qty - (qty || 1)
        await cartItem.save();
        return SuccessResponse(res, STATUSCODE.OK, SUCCESS.UPDATED)
    } catch (error) {
        console.log(error);
        return ErrorResponse(res, STATUSCODE.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, error)
    }
}

const getProductInCart = async (req, res) => {
    try {
        const { userId } = req?.params;
        const cart = await Cart.find({ user: userId }).populate("product").populate("user")
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

module.exports = { addToCart, getProductInCart, clearCart, deleteCart, decreaseQuantity }