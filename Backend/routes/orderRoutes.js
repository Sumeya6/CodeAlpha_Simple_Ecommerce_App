const express = require("express");
const router = express.Router();

const {
  createOrder,
  getUserOrders,
  getSingleOrder,
} = require("../controllers/orderController");
const authMiddleWare = require("../middleware/authMiddleware");
router.post("/", authMiddleWare, createOrder);

router.get("/", authMiddleWare, getUserOrders);

router.get("/:id", authMiddleWare, getSingleOrder);

module.exports = router;