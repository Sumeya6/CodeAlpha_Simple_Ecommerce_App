const Product = require("../models/Product");

// GET ALL PRODUCTS
const getAllProducts = async (req, res) => {

  try {

    const products = await Product.find();

    res.json(products);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


// GET SINGLE PRODUCT
const getSingleProduct = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};
// CREATE PRODUCT(Admin)
const createProduct = async (req, res) => {

  try {
     const { name, description, price, image, category, stock } = req.body;

      if (!name || !description || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

     const product = await Product.create({
      name,
      description,
      price,
      image,
      category,
      stock,
    });

    res.status(201).json(product);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


// UPDATE PRODUCT(Admin)
updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ message: "Product Updated", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PRODUCT(Admin)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

     res.json({ message: "Product Deleted", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
};