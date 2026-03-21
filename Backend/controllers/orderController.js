const Order = require("../models/Order");


// CREATE ORDER
const createOrder = async (req, res) => {

  try {

    const { user, products, totalPrice } = req.body;

    const order = await Order.create({
      user,
      products,
      totalPrice
    });

    res.status(201).json(order);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


// GET USER ORDERS
const getUserOrders = async (req, res) => {

  try {

    const orders = await Order.find({
      user: req.params.userId
    }).populate("products.product");

    res.json(orders);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};
//ADD TO CART
const addToCart(req,res,next){
  
}

module.exports = {
  createOrder,
  getUserOrders
};