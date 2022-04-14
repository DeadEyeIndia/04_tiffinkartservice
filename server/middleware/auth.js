const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const catchAsyncError = require("./catchAsyncError");
const User = require("../models/user.model");
const Provider = require("../models/provider.model");

isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this website", 401));
  }

  const decodeData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodeData.id);
  req.provider = await Provider.findById(req.user);

  next();
});

isAuthorizedRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Roles: ${req.user.role} is not allowed to access`,
          403
        )
      );
    }

    next();
  };
};

isRestProvider = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes("provider")) {
      return next(new ErrorHandler(`You are not allowed to access`, 403));
    }

    next();
  };
};

const authJWT = {
  isAuthenticatedUser,
  isAuthorizedRole,
  isRestProvider,
};

module.exports = authJWT;
