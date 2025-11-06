const {
  createUser,
  login,
  refreshAcessToken,
  logout,
} = require("../controllers/authentication");
const authentication = require("../middleware/auth");

const router = require("express").Router();

router.post("/createuser", createUser);

router.post("/login", login);
router.post("/refreshToken", refreshAcessToken);
router.post("/logout", authentication, logout);

module.exports = router;
