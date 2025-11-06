const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  sum: {
    type: Number,
    required: true,
  },
});

const Cart = mongoose.model("cart", CartSchema);
module.exports = Cart;
