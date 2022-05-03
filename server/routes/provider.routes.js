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
  registerProvider,
  getRestProvidersDetails,
  updateRestProviderDetails,
  getAllTiffinServices,
  getAllTiffinAdmin,
  getSingleTiffinAdmin,
  updateTiffinAdmin,
  deleteTiffinProviderAdmin,
} = require("../controller/provider.controller");

// Provider Route API's
router
  .route("/user/tiffin/register")
  .post(isAuthenticatedUser, isAuthorizedRole("user"), registerProvider);

router
  .route("/user/restaurant")
  .get(
    isAuthenticatedUser,
    isRestProvider("provider"),
    getRestProvidersDetails
  );

router
  .route("/user/restaurant/update")
  .put(
    isAuthenticatedUser,
    isRestProvider("provider"),
    updateRestProviderDetails
  );

router
  .route("/user/all/tiffin-services")
  .get(isAuthenticatedUser, getAllTiffinServices);

// ADMIN -- routes
router
  .route("/admin/allproviders")
  .get(isAuthenticatedUser, isAuthorizedRole("admin"), getAllTiffinAdmin);

router
  .route("/admin/single/provider/:id")
  .get(isAuthenticatedUser, isAuthorizedRole("admin"), getSingleTiffinAdmin);

router
  .route("/admin/update/provider/:id")
  .put(isAuthenticatedUser, isAuthorizedRole("admin"), updateTiffinAdmin);

router
  .route("/admin/delete/provider/:id")
  .delete(
    isAuthenticatedUser,
    isAuthorizedRole("admin"),
    deleteTiffinProviderAdmin
  );

module.exports = router;

// , isAuthorizedRole("user")
