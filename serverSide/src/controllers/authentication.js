const User = require("../models/user");
const { generateAccessToken } = require("../utils/generateTokens");
const jwt = require("jsonwebtoken");

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

exports.refreshAcessToken = async (req, res) => {
  try {
    console.log("|");
    console.log("refreshtoken starts");

    console.log("---->", req.cookies.refreshToken);
    const refreshAccessToken = await req.cookies.refreshToken;
    if (!refreshAccessToken) {
      return res.status(401).json({ message: "you need to be logged in" });
    }
    console.log(refreshAccessToken);
    let decodedToken;
    try {
      decodedToken = await jwt.verify(
        refreshAccessToken,
        process.env.REFRESH_TOKEN_SECRET
      );
    } catch (err) {
      return res
        .status(500)
        .json({ error: "verification failed", message: err.message });
    }

    const user = await User.findById(decodedToken?.id);
    if (!user) {
      console.log("test3->failed");
      return res.status(500).json({ error: "user not found" });
    } else {
      console.log("test3->passed");
    }

    if (refreshAccessToken !== user?.refreshToken) {
      console.log("test4->failed");
      return res
        .status(500)
        .json({ error: "incoming refresh token is not matching" });
    } else {
      console.log("test4->passed");
    }

    const { accessToken, refreshToken } = await generateAccessToken(user.id);
    console.log(accessToken, refreshToken);
    if (refreshToken && accessToken) {
      console.log("ssss");
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
        .json({ accessToken, refreshToken }, "Token refreshed successfully");
    }
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
};

exports.logout = async (req, res) => {
  try {
    console.log(req.user);
    const user = req.user;
    if (!user) {
      console.log("test1->failed");
      return res.status(500).json({ error: "user not found" });
    } else {
      console.log("test1->success");
    }

    const userExsist = await User.findByIdAndUpdate(
      user.id,
      { $unset: { refreshToken: 1 } },
      { new: true }
    );
    if (!userExsist) {
      console.log("test2->failed");
      return res.status(500).json({ message: "user does not exist" });
    } else {
      console.log("test2->success");
    }

    return res
      .status(200)
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .json(({}, "User logged out Successfully"));
  } catch (error) {
    throw new Error(`error occurred:${error.message}`);
  }
};
