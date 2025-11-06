const Cart = require("../models/cart");
const Product = require("../models/product");
const Recipt = require("../models/recipt");
const User = require("../models/user");

exports.addToCart = async (req, res) => {
  try {
    const { productid } = req.query;
    const { quantity } = req.body;
    if (
      !productid ||
      productid === undefined ||
      !quantity ||
      quantity === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "required param or data not available",
      });
    }

    const findproduct = await Product.findById(productid);
    if (findproduct === undefined || findproduct === null || !findproduct) {
      return res.status(400).json({
        success: false,
        message: "product does not exists",
      });
    }
    console.log(findproduct.price, req.body.quantity);
    const addToCart = await Cart.findOneAndUpdate(
      {
        userId: req.user.id,
        name: findproduct.name,
      },
      {
        $set: {
          name: findproduct.name,
          price: findproduct.price,
        },
        $inc: {
          qty: req.body.quantity,
          sum: Number(findproduct.price) * req.body.quantity,
        },
      },
      {
        new: true, // return updated document
        upsert: true,
      }
    );

    if (addToCart) {
      return res.status(200).json({ data: addToCart });
    }
  } catch (error) {
    throw new Error(`error occurred ${error}`);
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id === undefined) {
      return res.status(400).json({
        success: false,
        message: "required param or data not available",
      });
    }
    const findCart = await Cart.findById(id);
    console.log(findCart);
    if (findCart === undefined || findCart === null || !findCart) {
      return res.status(400).json({
        success: false,
        message: "cart does not exists",
      });
    }
    const delte = await Cart.findByIdAndDelete(id);
    if (delte) {
      return res.status(200).json({ data: delte });
    }
  } catch (error) {
    throw new Error(`error occurred ${error}`);
  }
};

exports.getAllCart = async (req, res) => {
  try {
    const getAll = await Cart.find();
    if (getAll.length > 0) {
      return res.status(200).json({
        success: true,
        message: "cart data fetched",
        data: getAll,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "no carts found",
      });
    }
  } catch (error) {
    throw new Error(`error occurred ${error}`);
  }
};

exports.checkout = async (req, res) => {
  try {
    const { cartItems } = req.body;
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Missing customer info or empty cart",
      });
    }

    const user = await User.findById(req.user.id);
    if (user === undefined) {
      return res.status(400).json({
        success: false,
        message: "user does nto exists",
      });
    }

    const total = cartItems.reduce((sum, item) => {
      return sum + item.price * item.qty;
    }, 0);

    console.log(total);

    const createRecipt = Recipt.create({
      name: user.name,
      phone: user.phone,
      total: total,
    });
    if (!createRecipt) {
      return res.status(400).json({
        success: false,
        message: "could not create the user",
      });
    }

    const result = await Cart.deleteMany({ userId: req.user.id });
    if (result) {
      return res.status(200).json({
        success: true,
        message: "All cart items deleted",
        deletedCount: createRecipt,
      });
    }
  } catch (error) {
    throw new Error(`error occurred ${error}`);
  }
};
