const User = require("../models/user");

exports.generateAccessToken = async (userId) => {
  console.log("GENERATING TOKEN STARTS");

  const user = await User?.findById(userId);
  if (!user) {
    console.log("test1->failed");
  } else {
    console.log("test1->success");
  }

  const accessToken = user?.generateAccessToken();
  if (!accessToken) {
    console.log("test2->failed");
  } else {
    console.log("test2->success");
  }

  const refreshToken = user?.generateRefreshToken();
  if (!refreshToken) {
    console.log("test3->failed");
  } else {
    console.log("test3->success");
  }

  user.refreshToken = refreshToken;
  if (!user.refreshToken) {
    console.log("test4->failed");
  } else {
    console.log("test4->success");
  }

  await user.save({ validateBeforeSave: false });

  console.log("all test passed");

  console.log("GENERATING TOKEN ENDS");
  return { accessToken, refreshToken };
};
