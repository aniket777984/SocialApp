const express = require("express");
const { register, login, logout, followUser, updatePassword, updateProfile, deleteMyProfile, myProfile, getUserProfile, getAllUsers, forgotPassword, resetPassword, getMyPosts, getUserPosts } = require("../controller/user");
const router = express.Router();
const {isAutheticatedUser} = require("../middlewares/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/follow/:id").get(isAutheticatedUser,followUser);
router.route("/update/password").put(isAutheticatedUser,updatePassword);
router.route("/update/profile").put(isAutheticatedUser,updateProfile);
router.route("/delete/me").delete(isAutheticatedUser,deleteMyProfile);
router.route("/me").get(isAutheticatedUser,myProfile);
router.route("/my/posts").get(isAutheticatedUser,getMyPosts);
router.route("/userposts/:id").get(isAutheticatedUser,getUserPosts);
router.route("/user/:id").get(isAutheticatedUser , getUserProfile);
router.route("/users").get(isAutheticatedUser,getAllUsers);
router.route("/forgot/password").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

module.exports = router;
