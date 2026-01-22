const express = require("express");
const router = express.Router();
const orderController=require('../controllers/orderController');
const { authUser,allowRoles } = require("../Middleware/auth.middleware");
router.post("/mock-payment",
    authUser,
  allowRoles("user", "admin"),
  orderController.mockPayment
);
router.post("/verify",
    authUser,

  orderController.orderVerify
);
module.exports = router;