const mongoose = require("mongoose")

const cartShema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Product is required"],
        ref: "products"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "User is required"],
        ref: "users"
    },
    qty: {
        type: Number,
        required: true,
        min: [1, "Quantity can not be less then 1."],
        default:1
    }
    
},
    { timestamps: true }
)

const Cart = new mongoose.model("carts", cartShema);
module.exports = Cart;