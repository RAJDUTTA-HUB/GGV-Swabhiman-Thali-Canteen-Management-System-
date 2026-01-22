const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 10
    },
    image: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",       // Usually only admin can add products
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
