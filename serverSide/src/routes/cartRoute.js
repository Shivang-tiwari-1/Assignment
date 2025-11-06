const { createUser, login } = require("../controllers/authentication");
const { addToCart, deleteCart, getAllCart, checkout } = require("../controllers/cart");
const { getProducts } = require("../controllers/product");
const authentication = require("../middleware/auth");

const router = require("express").Router();

//-----------------no login--------------------//
router.post("/cart", authentication, addToCart);
router.delete("/delcart/:id", authentication, deleteCart);
router.get("/getcart", authentication, getAllCart);
router.post("/checkout", authentication, checkout);

module.exports = router;
