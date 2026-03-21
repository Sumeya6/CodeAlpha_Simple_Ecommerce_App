const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");
const authMiddleWare = require("../middleware/authMiddleware");
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);

router.post("/", authMiddleWare, createProduct);
router.put("/:id", authMiddleWare, updateProduct);
router.delete("/:id", authMiddleWare, deleteProduct);

module.exports = router;