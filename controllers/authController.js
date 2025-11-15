const User = require("../models/User");
const jwt = require('jsonwebtoken');
const { SuccessResponse, ErrorResponse } = require("../utils/responseHandler");
const { SUCCESS, ERROR, STATUSCODE } = require("../utils/helpers");

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
}


const protect = async (req, res, next) => {
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


const register = async (req, res) => {
    try {
        const isExist = await User.findOne({email : req.body.email});
        if (isExist) {
            return ErrorResponse(res, STATUSCODE.BAD_REQUEST, ERROR.ALREADY_EXISTS);
        }
        const user = new User(req.body);
        await user.save();
        return SuccessResponse(res, STATUSCODE.OK, SUCCESS.REGISTER,{  user })
    } catch (error) {
        console.log(error)
        return ErrorResponse(res, STATUSCODE.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR);
    }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return ErrorResponse(res, STATUSCODE.NOT_FOUND, ERROR.USER_NOT_FOUND);
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return ErrorResponse(res, STATUSCODE.BAD_REQUEST, ERROR.BAD_REQUEST);
    }
    const token = generateToken(user._id);
    return SuccessResponse(res, STATUSCODE.OK, SUCCESS.LOGIN, { token, user });
  } catch (error) {
    console.log(error);
    return ErrorResponse(res, STATUSCODE.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, error);
  }
};


module.exports = {register, login, protect}