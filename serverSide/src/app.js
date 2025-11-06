const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json({ limit: "32mb" }));
app.use(express.urlencoded({ extended: true, limit: "32mb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.COROS_PORT,
    credentials: true,
  })
);
app.use("/home", (req, res) => {
  res.json({ message: "hello" });
});
app.use("/api/auth", require("./routes/userRoute"));
app.use("/api/product", require("./routes/prodcutRoute"));
app.use("/api/cart", require("./routes/cartRoute"));

module.exports = app;
