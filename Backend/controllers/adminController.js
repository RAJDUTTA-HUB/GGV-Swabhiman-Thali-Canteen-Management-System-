const adminModel = require("../Models/admin.Model");
const { validationResult } = require("express-validator");
const adminService = require("../service/admin.service");
const blacklistTokenModel = require("../Models/BlacklistedTokenModel");
const productService = require("../service/product.service");
const jwt = require("jsonwebtoken");
const dailyMenuModel = require("../Models/dailyMenu.model");
const productModel = require("../Models/product.model");
const orderModel = require("../Models/order.model");

module.exports.registerAdmin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, department, email, password } = req.body;

  const existingAdmin = await adminModel.findOne({ email });
  if (existingAdmin) {
    return res.status(400).json({
      success: false,
      message: "You already have an account, please log in",
    });
  }
  const hashedPassword = await adminModel.hashPassword(password);
  const admin = await adminService.createAdmin({
    name,
    department,
    email,
    password: hashedPassword,
  });

  const token = admin.generateAuthToken();
  res.status(201).json({ token, admin });
};

module.exports.loginAdmin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const admin = await adminModel.findOne({ email }).select("+password");
  if (!admin) {
    return res.status(400).json("User not exists");
  }
  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json("Invalid email or password");
  }

  const token = admin.generateAuthToken();
  res.cookie("token", token, {
    httpOnly: true, // Prevents access via JavaScript
    secure: true, // Sends only over HTTPS
    sameSite: "Strict", // Prevents CSRF from other sites
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  });

  res.status(200).json({ token, admin });
};

module.exports.getAdminProfile = async (req, res, next) => {
  res.status(200).json(req.admin);
};

module.exports.adminLogout = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "Access denied | token not found" });
  }
  await blacklistTokenModel.create({ token });
  res.clearCookie("token");
  res.status(200).json({ message: "Admin log out " });
};

module.exports.createProduct = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name || !image) {
      throw new Error("Name and Image url is required");
    }
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const product = await productService.createProduct({
      name,
      image, // ✅ direct URL
      createdBy: decoded._id,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    next(error);
  }
};
module.exports.receiveSelectedIds = async (req, res) => {
  const { productIds } = req.body;

  if (!productIds || !productIds.length === 0) {
    return res.status(400).json({ message: "No products Ids received" });
  }
  const today = new Date().setHours(0, 0, 0, 0);

  const dailyMenu = await dailyMenuModel.findOneAndUpdate(
    { date: today },
    {
      products: productIds,
    },
    { upsert: true, new: true }
  );

  res.status(200).json({
    success: true,
    message: "Daily menu updated successfully",
    dailyMenu,
  });
};
module.exports.getDailyIdsData = async (req, res) => {
  try {
    const today = new Date().setHours(0, 0, 0, 0);

    const dailyMenu = await dailyMenuModel
      .findOne({
        date: today,
      })
      .populate("products");

    if (!dailyMenu) {
      return res.status(404).json({
        success: false,
        message: "No menu for today",
      });
    }

    res.status(200).json({
      success: true,
      products: dailyMenu.products, // full product data
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getProductIdData = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Product id is required" });
  }
  try {
    const data = await productModel.findById(id);
    if (!data) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.getAdminOrders = async (req, res) => {
  try {
    const id = req.admin._id;
    const admin = await adminModel.findById(id).populate({
      path: "orders",
      populate: {
        path: "productId",
        select: "name price image",
      },
    });
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    //  DATE WISE GROUPING
    const groupedOrders = {};

    admin.orders.forEach((o) => {
      const dateKey = new Date(o.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });

      if (!groupedOrders[dateKey]) {
        groupedOrders[dateKey] = {
          date: dateKey,
          orders: [],
          dayTotal: 0,
        };
      }

      groupedOrders[dateKey].orders.push({
        orderId: o._id,
        quantity: o.quantity,
        amount: o.amount,
        product: o.productId,
      });

      groupedOrders[dateKey].dayTotal += (o.productId?.price || 0) * o.quantity;
    });

    const result = Object.values(groupedOrders);

    const totalExpense = result.reduce((sum, d) => sum + d.dayTotal, 0);

    return res.status(200).json({
      success: true,
      data: result,
      totalExpense,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    if (!orders) {
      return res.status(404).json({ message: "Orders not found " });
    }
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports.clearOrder = async (req, res) => {
  const id = req.admin._id;
  await orderModel.deleteMany({ customerId: id });

  const admin = await adminModel.findByIdAndUpdate(
    id,
    { $set: { orders: [] } },
    { new: true }
  );

  res
    .status(200)
    .json({ success: true, message: "Admin orders cleared", admin });
};

