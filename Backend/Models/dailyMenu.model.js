const mongoose = require("mongoose");

const dailyMenuSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
       expires: 86400 ,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("DailyMenu", dailyMenuSchema);
