const User = require("../models/user");
const { generateAccessToken } = require("../utils/generateTokens");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      password: req.body.password,
      phone: req.body.phone,
    });
    if (user) {
      console.log("test-1-passed");
    } else {
      console.log("test-1-failed");
      return res.status(500).json({ error: "user was not created" });
    }

    const Signed = await user.sign_password(user.password);
    if (Signed) {
      console.log("test2->passed");
      return res.status(200).json({ data: user });
    } else {
      console.log("test2->failed");
      return res.status(500).json({ error: "password was not signed" });
    }
  } catch (error) {
    throw new Error(`error occurred:${error}`);
  }
};
exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone && !password) {
      console.log("test3-> failed");
      return res
        .status(400)
        .json({ message: "email and password not avaialable" });
    } else {
      console.log("test3-> success");
    }

    const user = await User.findOne({ phone: phone });
    if (!user) {
      console.log("test4-> failed");
      return res.status(400).json({ message: "user not found" });
    } else {
      console.log("test4-> success");
    }

    const passwordCompare = await user.isPasswordCorrect(password);
    if (!passwordCompare) {
      console.log("test5-> failed");
      return res
        .status(401)
        .json({ message: "please login with correct credentials" });
    } else {
      console.log("test5-> success");
    }

    const loggedInUser = await User.findById(user.id).select(
      "-password -__v -date -verified  -refreshToken"
    );
    if (!loggedInUser) {
      console.log("test6-> failed");
      return res.status(400).json({ error: "no user found" });
    } else {
      console.log("test6->success");
    }

    const { accessToken, refreshToken } = await generateAccessToken(user.id);
    if (!accessToken || !refreshToken) {
      console.log("test8-> failed");
      return res.status(400).json({ error: "no token found" });
    } else {
      console.log("test8->success");
    }

    console.log("all test passed-user logged in");
    return res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .json(
        { user: loggedInUser, accessToken, refreshToken },
        "user logged in succesfully"
      );
  } catch (error) {
    throw new Error(`error occurred:${error}`);
  }
};
