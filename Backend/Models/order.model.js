const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    amount: {
      type: Number,
    },
    paymentMode: {
      type: String,
      enum: ["Cash", "Online"],
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "SUCCESS"],
      default: "PENDING",
    },

    quantity: {
      type: Number,
      required: true,
    },
    isUsed: {
      type: Boolean,
      default: false, // QR ek baar use hoga
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
