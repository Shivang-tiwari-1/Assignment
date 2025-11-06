const { createUser, login } = require("../controllers/authentication");

const router = require("express").Router();

//-----------------no login--------------------//
router.post("/createuser", createUser);

router.post("/login", login);

module.exports = router;
