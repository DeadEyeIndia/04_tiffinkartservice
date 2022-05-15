const cloudinary = require("cloudinary");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/user.model");
const Provider = require("../models/provider.model");
const ApiFeatures = require("../utils/apifeatures");

// Create a tiffin service -- Provider
exports.registerTiffinService = catchAsyncError(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "tiffinservice",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;

  const provider = await Provider.create(req.body);

  res.status(201).send({
    success: true,
    provider,
  });
});

// Get All ProvidersData
exports.getAllTiffinServices = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 4;
  const providersCount = await Provider.countDocuments();
  // const providers = await Provider.find();

  const apiFeatures = new ApiFeatures(Provider.find(), req.query)
    .search()
    .filter();

  let providers = await apiFeatures.query;

  let filterProviderCount = providers.length;

  res.status(200).send({
    success: true,
    providers,
    providersCount,
    resultPerPage,
  });
});

// Get Users Provider Details
exports.getTiffinServiceDetails = catchAsyncError(async (req, res, next) => {
  const provider = await Provider.findOne({ user: req.params.user });

  res.status(200).send({
    success: true,
    provider,
  });
});

exports.getSingleProvider = catchAsyncError(async (req, res, next) => {
  const provider = await Provider.findById(req.params.id);

  if (!provider) {
    return next(
      new ErrorHandler(
        `Tiffin Provider does not exist with ID: ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).send({
    success: true,
    provider,
  });
});

// Update User Provider Details
exports.updateTiffinServiceDetails = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;

  const providerFind = Provider.findOne({ user: req.body.user });

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    for (let i = 0; i < providerFind.images.length; i++) {
      await cloudinary.v2.uploader.destroy(provider.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  const provider = await Provider.findOneAndUpdate(
    { user: req.user.id },
    req.body,
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

// GET ALL TIFFIN SERVICE PROVIDER -- ADMIN
exports.getAllTiffinForAdmin = catchAsyncError(async (req, res, next) => {
  const tiffinsCount = await Provider.countDocuments();
  const tiffins = await Provider.find();

  res.status(200).send({
    success: true,
    tiffinsCount,
    tiffins,
  });
});

// GET SINGLE TIFFIN SERVICES -- ADMIN
exports.getSingleTiffinForAdmin = catchAsyncError(async (req, res, next) => {
  const tiffinProvider = await Provider.findById(req.params.id);

  if (!tiffinProvider) {
    return next(
      new ErrorHandler(
        `Tiffin Provider does not exist with ID: ${req.params.id}`,
        404
      )
    );
    if (!tiffinProvider) {
      return next(
        new ErrorHandler(
          `Tiffin Provider does not exist with ID: ${req.params.id}`,
          404
        )
      );
    }
  }

  res.status(200).send({
    success: true,
    tiffinProvider,
  });
});

// GET UPDATE TIFFIN SERVICES -- ADMIN
exports.updateTiffinForAdmin = catchAsyncError(async (req, res, next) => {
  const updateTiffinByAdmin = {
    nameRest: req.body.nameRest,
    addressRest: req.body.addressRest,
    restLocality: req.body.restLocality,
    contactNumber: req.body.contactNumber,
    city: req.body.city,
    state: req.body.state,
    tiffinType: req.body.tiffinType,
    cuisines: req.body.cuisines,
    images: req.body.images,
    category: req.body.category,
    service: req.body.service,
  };

  const provider = await Provider.findByIdAndUpdate(
    req.params.id,
    updateTiffinByAdmin,
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

// GET DELETE TIFFIN SERVICES -- ADMIN
exports.deleteTiffinProviderForAdmin = catchAsyncError(
  async (req, res, next) => {
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
  }
);

exports.createProviderReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, providerId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const provider = await Provider.findById(providerId);

  const isReviewed = provider.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    provider.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    provider.reviews.push(review);
    provider.numOfReviews = provider.reviews.length;
  }

  let avg = 0;

  provider.reviews.forEach((rev) => {
    avg = avg + rev.rating;
  });

  provider.ratings = avg / provider.reviews.length;

  await provider.save({ validateBeforeSave: false });

  res.status(200).send({
    success: true,
  });
});

exports.allReviews = catchAsyncError(async (req, res, next) => {
  const providerReview = await Provider.findById(req.query.id);

  if (!providerReview) {
    return next(new ErrorHandler("Provider not found", 404));
  }

  res.status(200).send({
    success: true,
    reviews: providerReview.reviews,
  });
});
