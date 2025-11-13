const mongoose = require("mongoose");
const {Schema} = mongoose;

const productSchema = new mongoose.Schema({
    productName: { type: String, required: [true, 'name is required'] },
    description: { type: String },
    category: { type: String, required: [true, 'category is required'] },
    price: { type: Number, required: [true, 'price is required'] },
    rating:{type: Number, required: [true, 'rating id reqired']},
    addedBy:{type: Schema.Types.ObjectId, ref: "user"},
    deletedAt:{type: Date, },
},
    { timestamps: true }
);

const productModel = mongoose.model('products', productSchema);
module.exports = productModel;