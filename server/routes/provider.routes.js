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
  updateTiffinServiceDetails,
  getAllTiffinServices,
  getAllTiffinForAdmin,
  getSingleTiffinForAdmin,
  updateTiffinForAdmin,
  deleteTiffinProviderForAdmin,
} = require("../controller/provider.controller");

// Provider Route API's

router.route("/user/tiffin/register").post(registerTiffinService);

router.route("/user/restaurant/:user").get(getTiffinServiceDetails);

router
  .route("/user/restaurant/update")
  .put(
    isAuthenticatedUser,
    isRestProvider("provider"),
    updateTiffinServiceDetails
  );

router.route("/user/all/tiffin-services").get(getAllTiffinServices);

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
