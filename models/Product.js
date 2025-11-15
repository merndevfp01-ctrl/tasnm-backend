const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'name is required'] },
    image: { type: String, required: [true, 'image is required'] },
    description: { type: String },
    category: { type: String, required: [true, 'category is required'] },
    price: { type: Number, required: [true, 'price is required'] },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    deletedAt: { type: Date, },
},
    { timestamps: true }
);

const Product = mongoose.model('products', productSchema);
module.exports = Product;