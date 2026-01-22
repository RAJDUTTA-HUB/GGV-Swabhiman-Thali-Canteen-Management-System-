const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const AdminController = require("../controllers/adminController");
const { authAdmin ,verifyAdmin} = require("../Middleware/auth.middleware");

router.post(
  "/admin-register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("name")
      .isLength({ min: 3 })
      .withMessage(" Name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("department").notEmpty().withMessage("Department is required"),
    body("enrollmentNo").notEmpty().withMessage("Enrolment No is required"),
  ],
  AdminController.registerAdmin
);

router.post(
  "/admin-login",
  [
    body("email").isEmail().withMessage("Invalid Email"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  AdminController.loginAdmin
);

router.get(
  "/admin-profile",
  authAdmin,
  AdminController .getAdminProfile
);

router.get("/admin-logout", authAdmin, AdminController.adminLogout);

router.post(
  "/product-create",
  
  verifyAdmin,
  
  AdminController.createProduct
);

router.get(
  "/all-products",
  
  verifyAdmin,
  authAdmin,
  AdminController.getAllProducts
);
router.post(
  "/selected-ids",
 verifyAdmin,
  AdminController.receiveSelectedIds
);
router.get(
  "/daily-menu-data",

  AdminController.getDailyIdsData
);
router.get(
  "/product/:id",

  AdminController.getProductIdData
);
router.get(
  "/admin-orders",
 verifyAdmin,
  AdminController.getAdminOrders
);
router.get(
  "/all-orders",
 verifyAdmin,
  AdminController.getAllOrders
);
router.post(
  "/admin-clear-orders",
 verifyAdmin,
  AdminController.clearOrder
);


module.exports=router;