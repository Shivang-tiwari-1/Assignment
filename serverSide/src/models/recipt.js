const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReciptSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    total: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Recipt = mongoose.model("recipt", ReciptSchema);
module.exports = Recipt;
