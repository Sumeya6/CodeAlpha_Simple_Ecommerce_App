const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,logoutUser
} = require("../controllers/authController");
const authMiddleWare = require("../middleware/authMiddleware");
router.post("/register", registerUser);
router.post("/login",loginUser);
router.post("/logout",authMiddleWare,  logoutUser);

module.exports = router;