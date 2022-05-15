const express = require("express");
const router = express.Router();

// Import Authenticated from auth.js
const {
  isAuthenticatedUser,
  isAuthorizedRole,
  isRestProvider,
} = require("../middleware/auth.js");

// Import from Provider controller
const {
  // registerProvider,
  registerTiffinService,
  getTiffinServiceDetails,
  getSingleProvider,
  updateTiffinServiceDetails,
  getAllTiffinServices,
  getAllTiffinForAdmin,
  getSingleTiffinForAdmin,
  updateTiffinForAdmin,
  deleteTiffinProviderForAdmin,
  createProviderReview,
  allReviews,
} = require("../controller/provider.controller");

// Provider Route API's

router
  .route("/provider/register")
  .post(isAuthenticatedUser, registerTiffinService);

router.route("/providers").get(getAllTiffinServices);

router.route("/user/restaurant/:user").get(getTiffinServiceDetails);

router.route("/provider/:id").get(getSingleProvider);

router
  .route("/user/restaurant/update")
  .put(
    isAuthenticatedUser,
    isRestProvider("provider"),
    updateTiffinServiceDetails
  );

router.route("/review").put(isAuthenticatedUser, createProviderReview);

router.route("/allreviews").get(allReviews);

// ADMIN -- routes
router
  .route("/admin/allproviders")
  .get(isAuthenticatedUser, isAuthorizedRole("admin"), getAllTiffinForAdmin);

router
  .route("/admin/single/provider/:id")
  .get(isAuthenticatedUser, isAuthorizedRole("admin"), getSingleTiffinForAdmin);

router
  .route("/admin/update/provider/:id")
  .put(isAuthenticatedUser, isAuthorizedRole("admin"), updateTiffinForAdmin);

router
  .route("/admin/delete/provider/:id")
  .delete(
    isAuthenticatedUser,
    isAuthorizedRole("admin"),
    deleteTiffinProviderForAdmin
  );

module.exports = router;
