const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const userController = require("../controllers/userController");
const { authUser, verifyUser } = require("../Middleware/auth.middleware");

router.post(
  "/register",
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
  userController.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.loginUser
);

router.get("/profile", authUser, userController.getUserprofile);
router.get("/logout", authUser, userController.logout);
router.get(
  "/user-orders",

  verifyUser,
  userController.getUserOrders
);
router.post(
  "/clear-user-orders",

  verifyUser,
  userController.clearUserOrder
);

module.exports = router;
