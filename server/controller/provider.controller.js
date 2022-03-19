const validator = require("validator");
const Provider = require("../models/provider.model");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

// Create a tiffin service -- Provider
exports.registerProvider = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;

  const newProvider = {
    nameRest: req.body.nameRest,
    addressRest: req.body.addressRest,
    restLocality: req.body.restLocality,
    contactNumber: req.body.contactNumber,
    city: req.body.city,
    state: req.body.state,
    outlet: req.body.outlet,
    cuisines: req.body.cuisines,
    images: req.body.images,
    workDays: req.body.workDays,
    ownRole: req.body.ownRole,
    user: req.body.user,
  };

  if (!validator.isMobilePhone(newProvider.contactNumber, "en-IN")) {
    return next(new ErrorHandler("Please enter valid mobile number", 401));
  }

  const provider = await Provider.create(newProvider);

  res.status(201).send({
    success: true,
    provider,
  });
});
