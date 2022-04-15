const validator = require("validator");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Provider = require("../models/provider.model");

// Create a tiffin service -- Provider
exports.registerProvider = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;

  const newProvider = {
    name: req.user.name,
    email: req.user.email,
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

exports.getRestProvidersDetails = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;

  const provider = await Provider.findOne({ user: req.body.user });
  console.log(provider.ownRole);
  res.status(200).send({
    success: true,
    provider,
  });
});

exports.updateRestProviderDetails = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;

  const newRestProvider = {
    name: req.user.name,
    email: req.user.email,
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
  };

  if (!validator.isMobilePhone(newRestProvider.contactNumber, "en-IN")) {
    return next(new ErrorHandler("Please enter valid mobile number", 401));
  }

  const provider = await Provider.findOneAndUpdate(
    req.body.user,
    newRestProvider,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).send({
    success: true,
    provider,
  });
});
