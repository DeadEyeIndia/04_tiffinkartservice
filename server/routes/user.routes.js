const express = require("express");
const router = express.Router();

// Import Authenticated from auth.js
const {
  isAuthenticatedUser,
  isAuthorizedRole,
} = require("../middleware/auth.js");

// Imports from controller directory
const {
  registerUser,
  loginUser,
  logout,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  singleUser,
  updateUserRole,
  deleteUser,
} = require("../controller/user.controller");

// User Route API's
// Register User - POST
router.route("/register").post(registerUser);

// Login User - POST
router.route("/login").post(loginUser);

// Get User Details - POST
router
  .route("/me/details")
  .get(isAuthenticatedUser, isAuthorizedRole("user", "admin"), getUserDetails);

// After login change password - PUT
router
  .route("/change/password")
  .put(isAuthenticatedUser, isAuthorizedRole("user"), updatePassword);

// After login change user details - PUT
router
  .route("/me/change/details")
  .put(isAuthenticatedUser, isAuthorizedRole("user"), updateProfile);

// All User -- ADMIN
router
  .route("/admin/allusers")
  .get(isAuthenticatedUser, isAuthorizedRole("admin"), getAllUser);

// Single User -- ADMIN
router
  .route("/admin/single/user/:id")
  .get(isAuthenticatedUser, isAuthorizedRole("admin"), singleUser);

// Update User role -- ADMIN
router
  .route("/admin/user/role/:id")
  .put(isAuthenticatedUser, isAuthorizedRole("admin"), updateUserRole);

// Delete a user -- ADMIN
router
  .route("/admin/delete/user/:id")
  .delete(isAuthenticatedUser, isAuthorizedRole("admin"), deleteUser);

// Logout User - GET - ALL
router
  .route("/logout")
  .get(isAuthenticatedUser, isAuthorizedRole("user", "admin"), logout);

module.exports = router;
