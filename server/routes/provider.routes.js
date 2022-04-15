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

module.exports = router;
