const { createUser, login } = require("../controllers/authentication");
const { getProducts } = require("../controllers/product");
const authentication = require("../middleware/auth");

const router = require("express").Router();

//-----------------no login--------------------//
router.post("/product", authentication, getProducts);

module.exports = router;
