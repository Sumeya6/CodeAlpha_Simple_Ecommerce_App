const express = require("express");
const router = express.Router();

const {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
} = require("../controllers/cartController");

const authMiddleWare = require("../middleware/authMiddleware");

router.get("/", authMiddleWare, getCart);

router.post("/add", authMiddleWare, addToCart);

router.put("/update", authMiddleWare, updateCartItem);

router.delete("/remove", authMiddleWare, removeFromCart);

module.exports = router;