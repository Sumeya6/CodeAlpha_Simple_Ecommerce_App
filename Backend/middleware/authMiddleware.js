const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleWare = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }
  try {
    const decoded = jwt.verify(token, "SECRET_KEY");

    req.user = await User.findById(decoded.id).select("-password");
    // req.user = decoded.id;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token failed" });
  }
};
module.exports = authMiddleWare;
