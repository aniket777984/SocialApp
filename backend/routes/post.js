const express = require("express");
const {createPost,likeAndUnlikePost,deletePost, getPostOfFollowing, updateCaption, commentOnPost, deleteComment,} = require("../controller/post");
const router = express.Router();
const { isAutheticatedUser } = require("../middlewares/auth");

router.route("/post/upload").post(isAutheticatedUser, createPost);
router
  .route("/post/:id")
  .get(isAutheticatedUser, likeAndUnlikePost).put(isAutheticatedUser,updateCaption)
  .delete(isAutheticatedUser, deletePost);

router.route('/posts').get(isAutheticatedUser,getPostOfFollowing);
router.route("/post/comment/:id").put(isAutheticatedUser ,commentOnPost).delete(isAutheticatedUser,deleteComment)

module.exports = router;
