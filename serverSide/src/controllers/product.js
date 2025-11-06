const { default: axios } = require("axios");
const Product = require("../models/product");

exports.getProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    console.log("====", Number(limit));
    let start = 0;
    const products = await axios.get("https://fakestoreapi.com/products");
    if (products.data.length === 0) {
      return res.status(400).json({ message: "products not found " });
    }
    const limitedProducts = products.data.slice(0, limit);
    console.log(limitedProducts.length);
    start += limit;
    return res.status(200).json({
      success: true,
      count: limitedProducts.length,
      data: limitedProducts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};
