import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import userModel from '../models/userModel'
import { ErrorResponse } from '../utils/responseHandler'
import { ERROR, STATUSCODE } from '../utils/helpers'
dotenv.config()

export const protect = async (req, res, next) => {
    try {
        const token = req.header.authorization?.split(" ")[1];
        if (!token) {
            return ErrorResponse(res, STATUSCODE.UNAUTHORIZED, ERROR.UNAUTHORIZED)
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id).select("-password");
        if (!user) {
            return ErrorResponse(res, STATUSCODE.NOT_FOUND, ERROR.NOT_FOUND)
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error)
        return ErrorResponse(res, STATUSCODE.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, error)
    }
}