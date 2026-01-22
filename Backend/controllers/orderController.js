const adminModel = require("../Models/admin.Model");
const orderModel = require("../Models/order.model");
const userModel = require("../Models/user.Model");

module.exports.mockPayment = async (req, res) => {
  const { productId, quantity, amount } = req.body;
  const customerId = req.user._id;
  const customerRole = req.user.role;

  const order = await orderModel.create({
    customerId,
    productId,
    quantity,
    amount: Number(amount),
    paymentMode: "Online",
    paymentStatus: "SUCCESS",
  });

  //add Order In  User orders
  if (customerRole == "user") {
    const user = await userModel.findById(customerId);

    user.totalAmount += amount;
    user.orders.push(order._id);
    await user.save();
  } else {
    const admin = await adminModel.findById(customerId);

    admin.totalAmount = (admin.totalAmount || 0) + Number(amount);
    admin.orders.push(order._id);
    await admin.save();
  }

  res.status(200).json({
    success: true,
    message: "Payment successFul",
    orderId: order._id,
    date: order.createdAt,
  });
};



module.exports.orderVerify = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Invalid QR" });
    }
    res.status(200).json({ success: true, message: "Order Verified", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

