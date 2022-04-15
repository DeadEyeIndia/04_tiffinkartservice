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

exports.getAllTiffinServices = catchAsyncError(async (req, res, next) => {
  const providersCount = await Provider.countDocuments();
  const providers = await Provider.find();

  res.status(200).send({
    success: true,
    providersCount,
    providers,
  });
});

// GET ALL TIFFIN SERVICE PROVIDER -- ADMIN
exports.getAllTiffinAdmin = catchAsyncError(async (req, res, next) => {
  const tiffinsCount = await Provider.countDocuments();
  const tiffins = await Provider.find();

  res.status(200).send({
    success: true,
    tiffinsCount,
    tiffins,
  });
});

// GET SINGLE TIFFIN SERVICES -- ADMIN
exports.getSingleTiffinAdmin = catchAsyncError(async (req, res, next) => {
  const tiffinProvider = await Provider.findById(req.params.id);

  if (!tiffinProvider) {
    return next(
      new ErrorHandler(
        `Tiffin Provider does not exist with ID: ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).send({
    success: true,
    tiffinProvider,
  });
});

// GET UPDATE TIFFIN SERVICES -- ADMIN
exports.updateTiffinAdmin = catchAsyncError(async (req, res, next) => {
  const newTiffinDataAdmin = {
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

  const provider = await Provider.findByIdAndUpdate(
    req.params.id,
    newTiffinDataAdmin,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).send({
    success: true,
  });
});

// GET DELETE TIFFIN SERVICES -- ADMIN
exports.deleteTiffinProviderAdmin = catchAsyncError(async (req, res, next) => {
  const tiffinProvider = await Provider.findById(req.params.id);

  if (!tiffinProvider) {
    return next(
      new ErrorHandler(
        `Tiffin Provider does not exist with ID: ${req.params.id}`,
        404
      )
    );
  }

  await tiffinProvider.remove();

  res.status(200).send({
    success: true,
    message: "Provider deleted successfully",
  });
});
