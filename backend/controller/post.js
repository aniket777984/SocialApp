const Post = require("../models/Post");
const User = require("../models/User");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");


exports.createPost = catchAsyncError(async (req, res, next) => {
  
  const myCloud = await cloudinary.v2.uploader.upload(req.body.image , {
    folder : "SocialAppPosts",
  });

  const newPostData = {
    caption: req.body.caption,
    image: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
    owner: req.user._id,
  };

  const post = await Post.create(newPostData);
  const user = await User.findById(req.user._id);

  // Adding the post id to the post  array of logined user
  user.posts.unshift(post._id);

  await user.save();

  res.status(201).json({
    success: true,
    message : "Post Created",
  });
});

exports.deletePost = catchAsyncError(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorHandler("Post Not Found", 404));
  }

  if (post.owner.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("Unauthorized", 401));
  }
  
  await cloudinary.v2.uploader.destroy(post.image.public_id);
  await post.remove();
  const user = await User.findById(req.user._id);
  const index = user.posts.indexOf(req.params.id);
  user.posts.splice(index, 1);

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Post deleted",
  });
});

exports.likeAndUnlikePost = catchAsyncError(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorHandler("Post Not Found", 404));
  }

  if (post.likes.includes(req.user._id)) {
    const index = post.likes.indexOf(req.user._id);

    post.likes.splice(index, 1);
    await post.save();
    return res.status(200).json({
      success: true,
      message: "Post Unliked",
    });
  } else {
    post.likes.push(req.user._id);
    await post.save();
    return res.status(200).json({
      success: true,
      message: "Post Liked",
    });
  }
});

exports.getPostOfFollowing = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const posts = await Post.find({
    owner: {
      $in: user.following,
    },
  }).populate("owner likes comments.user");

  res.status(200).json({
    success: true,
    posts: posts.reverse(),
  });
});

exports.updateCaption = catchAsyncError(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorHandler("Post not found", 404));
  }

  if (post.owner.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("Unauthorized Access", 401));
  }

  post.caption = req.body.caption;
  await post.save();
  res.status(200).json({
    success: true,
    message: "Post Updated",
  });
});

exports.commentOnPost = catchAsyncError(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorHandler("Post not found", 404));
  }

  let commentIndex = -1;

  // Checking if comment already exists

  post.comments.forEach((item, index) => {
    if (item.user.toString() === req.user._id.toString()) {
      commentIndex = index;
    }
  });

  if (commentIndex !== -1) {
    post.comments[commentIndex].comment = req.body.comment;

    await post.save();

    return res.status(200).json({
      success: true,
      message: "Comment Updated",
    });
  } else {
    post.comments.push({
      user: req.user._id,
      comment: req.body.comment,
    });

    await post.save();
    return res.status(200).json({
      success: true,
      message: "Comment added",
    });
  }
});

exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Checking If owner wants to delete

    if (post.owner.toString() === req.user._id.toString()) {
      if (req.body.commentId === undefined) {
        return res.status(400).json({
          success: false,
          message: "Comment Id is required",
        });
      }

      post.comments.forEach((item, index) => {
        if (item._id.toString() === req.body.commentId.toString()) {
          return post.comments.splice(index, 1);
        }
      });

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Selected Comment has deleted",
      });
    } else {
      post.comments.forEach((item, index) => {
        if (item.user.toString() === req.user._id.toString()) {
          return post.comments.splice(index, 1);
        }
      });

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Your Comment has deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
