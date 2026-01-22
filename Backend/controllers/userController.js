const blacklistTokenModel = require("../Models/BlacklistedTokenModel");
const userModel = require("../Models/user.Model");
const userService = require("../service/user.service");
const { validationResult } = require("express-validator");
const orderModel = require("../Models/order.model");
module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, department, enrollmentNo, email, password } = req.body;

  // 1️ Check if user already exists

  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "You already have an account, please log in",
    });
  }
  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    name,
    department,
    enrollmentNo,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();
  res.status(201).json({ token, user });
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: " Invalid email and password" });
  }
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email and password" });
  }

  const token = user.generateAuthToken();

  res.cookie("token", token, {
    httpOnly: true, // Prevents access via JavaScript
    secure: true, // Sends only over HTTPS
    sameSite: "Strict", // Prevents CSRF from other sites
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  });

  res.status(200).json({ token, user });
};

module.exports.getUserprofile = async (req, res, next) => {
  res.status(200).json(req.user);
};
module.exports.logout = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "No token found" });
  }

  await blacklistTokenModel.create({ token });

  res.clearCookie("token");
  res.status(200).json({ message: "User logged out" });
};

module.exports.getUserOrders = async (req, res) => {
  try {
    const id = req.user._id;
    const user = await userModel.findById(id)
    .populate({
      path: "orders",
      populate: {
        path: "productId",
        select: "name price image",
      },
    });
    console.log("User with orders:", user);
   


    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
      if (!user.orders || user.orders.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        totalExpense: 0,
      });
    }


    const products = user.orders.map((o) => ({
      orderId: o._id,
      quantity: o.quantity,
      amount: o.amount,
      product: o.productId,
      date: new Date(o.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit", // gives 25 instead of 2025
      }),
    }));
    const totalExpense = products.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    return res.status(200).json({
      success: true,
      data: products,
      totalExpense,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.clearUserOrder = async (req, res) => {
  const id = req.user._id;
    await orderModel.deleteMany({ customerId: id });
  const user = await userModel.findByIdAndUpdate(
    id,
    { $set: { orders: [] } },
    { new: true }
  );

  res
    .status(200)
    .json({ success: true, message: "Admin orders cleared", user });
}