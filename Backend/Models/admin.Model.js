const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema(
  {
    
    name: {
      type: String,
      required: true,
      minLength: [4, "Name must be at least 4 character"],
    },
    department: {
      type: String,
      required: true,
    },
    
    role: {
      type: String,
      default: "admin",
    },
    
    totalAmount: {
      type: Number,
      default: 0,
    },
    paymentOption: {
      type: String,
    
      enum: ["cash", "online"],
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    profilePic: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg", // 👈 default avatar
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  {
    timestamps: true, // createdAt & updatedAt auto add
  }
);

adminSchema.methods.generateAuthToken = function () {
    const token=jwt.sign({_id:this._id,role: this.role},process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
}
adminSchema.methods.comparePassword = async function (password) {
    
    return await bcrypt.compare(password, this.password);
};
adminSchema.statics.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports = mongoose.model("admin", adminSchema);
