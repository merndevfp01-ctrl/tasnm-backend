const mongoose = require("mongoose")

const cartShema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Product is required"],
        ref: "products"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "User ise required"],
        ref: "users"
    }
},
    { timestamps: true }
)

const Cart = new mongoose.model("carts", cartShema);
module.exports = Cart;