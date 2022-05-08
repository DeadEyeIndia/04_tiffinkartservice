const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  const options = {
    expires: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    path: "/",
    sameSite: "strict",
  };

  // {
  //     expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  //     httpOnly: false,
  //     secure: true,
  //   }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
