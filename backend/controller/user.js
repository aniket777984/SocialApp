const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const sendToken =  require("../utils/jwtToken");
const Post = require("../models/Post");
const sendEmail =  require("../utils/sendMail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const ApiFeatures = require("../utils/apiFeatures");

exports.register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User Already Exist", 400));
  }

  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "SocialAppUsers",
    width: 150,
    crop: "scale",
  });

  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id:myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(user, 200, res);
});

exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
   
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email and Password", 400));
  }

  const user = await User.findOne({ email }).select("+password").populate("followers following posts");
  if(!user){
    return next(new ErrorHandler("User doesn't exist" , 400));
  }
  
  const isPasswordMatched  = await user.matchPassword(password);
  
  if(!isPasswordMatched){
    return next(new ErrorHandler("Incorrect password" , 400));
  }

  sendToken(user, 200, res);

});

// Logout User
exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

exports.followUser = catchAsyncError(async(req,res,next)=>{

  const userToFollow = await User.findById(req.params.id);
  const loggedInUser = await User.findById(req.user._id);

  if(!userToFollow){
    return next(new ErrorHandler("User not found" , 404));
  }

  if(loggedInUser.following.includes(userToFollow._id)){

    const indexFollowing = loggedInUser.following.indexOf(userToFollow._id);
    const indexFollowers = userToFollow.followers.indexOf(loggedInUser._id);

    userToFollow.followers.splice(indexFollowers,1);
    loggedInUser.following.splice(indexFollowing,1);

    await loggedInUser.save();
    await userToFollow.save();

    res.status(200).json({
      success : true,
      message :"User Unfolllowed",
    })

  }else{
    loggedInUser.following.push(userToFollow._id);
    userToFollow.followers.push(loggedInUser._id);
  
    await loggedInUser.save();
    await userToFollow.save();
  
    res.status(200).json({
      success : true,
      message :"User Followed",
    })
  }
});

exports.updatePassword = catchAsyncError(async(req,res,next)=>{
  const user = await User.findById(req.user._id).select("+password");
   
  const {oldPassword , newPassword} =  req.body;
  if(!oldPassword || !newPassword){
    return next(new ErrorHandler("Please enter old  and new Password" ,  400));
  }


  const isPasswordMatched  = await user.matchPassword(oldPassword);
  
  if(!isPasswordMatched){
    return next(new ErrorHandler("Incorrect old password" , 400));
  }
 
  user.password =  newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message : "Password Updated",
  })

});

exports.updateProfile =   catchAsyncError(async(req,res,next)=>{
  
  const user = await User.findById(req.user._id);
  const {name , email,avatar} =  req.body;
  if(!name && !email){
    return next(new ErrorHandler("Please Enter the details to update" , 40));
  }
  if(name)
  user.name = name;
  if(email)
  user.email =  email;

  if(avatar){
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    const myCloud = await cloudinary.v2.uploader.upload(avatar,{
      folder: "SocialAppUsers",
      width: 150,
      crop: "scale",
    });
    user.avatar.public_id = myCloud.public_id;
    user.avatar.url = myCloud.secure_url;
  }

  await user.save();
  res.status(200).json({
    success : true,
    message : "Profile Updated",
  })

});

exports.deleteMyProfile = catchAsyncError(async(req,res,next)=>{
  const user = await User.findById(req.user._id);
  const posts  = user.posts;
  const followers =  user.followers;
  const following = user.following;
  const userId  = user._id;
  
  //Removing avatar of user Profile
  await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  
  await user.remove();

  // Logout user after deleting the user
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  // Deleting all post made by the user
  for (let i = 0; i < posts.length; i++) {
    const post = await Post.findById(posts[i]);
    await cloudinary.v2.uploader.destroy(post.image.public_id);
    await post.remove();
  }
 
  // Removing User from Followers Following
  for (let i = 0; i < followers.length; i++) {
    const follower = await User.findById(followers[i]);

    const index = follower.following.indexOf(userId);
    follower.following.splice(index, 1);
    await follower.save();
  }

  // Removing User from Following's Followers
  for (let i = 0; i < following.length; i++) {
    const follows = await User.findById(following[i]);

    const index = follows.followers.indexOf(userId);
    follows.followers.splice(index, 1);
    await follows.save();
  }

  // removing all comments of the user from all posts
  const allPosts = await Post.find();

  for (let i = 0; i < allPosts.length; i++) {
    const post = await Post.findById(allPosts[i]._id);

    for (let j = 0; j < post.comments.length; j++) {
      if (post.comments[j].user.toString() === userId.toString()) {
        post.comments.splice(j, 1);
      }
    }
    await post.save();
  }

  
  // removing all likes of the user from all posts

  for (let i = 0; i < allPosts.length; i++) {
    const post = await Post.findById(allPosts[i]._id);

    for (let j = 0; j < post.likes.length; j++) {
      if (post.likes[j].toString() === userId.toString()) {
        post.likes.splice(j, 1);
    }
  }
    await post.save();
  }


  res.status(200).json({
    success  :"true",
    message  :"Profile Deleted",
  })
});

exports.myProfile =  catchAsyncError(async(req,res,next)=>{
  const user  = await User.findById(req.user._id).populate("posts followers following");

  res.status(200).json({
    success : true,
    user,
  })
});

exports.getUserProfile =  catchAsyncError(async(req,res,next)=>{
  const user  = await User.findById(req.params.id).populate("posts followers following");

  if(!user){
    return next(new ErrorHandler("User not Found" , 404));
  }

  res.status(200).json({
    success : true,
    user,
  })
});

exports.getAllUsers = catchAsyncError(async(req,res,next)=>{

  const apiFeature = new ApiFeatures(User.find(), req.query).search()
  const users = await apiFeature.query;
  res.status(200).json({
    success : true,
    users,
  })
});

// Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();
  await user.save({ vaidateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset Token is : - \n\n ${resetPasswordUrl} \n\n If You have not requested this email then ,  please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: "SocialApp Password Recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sen to ${user.email} succesfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ vaidateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // Creating Token Hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Reset Password Token is Inavalid or has been expired",401));
  }

  // if (req.body.password !== req.body.confirmPassword) {
  //   return next(new ErrorHandler("Password doesnt Match", 400));
  // }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password Updated",
  });
});

exports.getMyPosts = catchAsyncError(async(req,res,next)=>{
  const user = await User.findById(req.user._id);
  const posts=[];
  for(let i =0;i<user.posts.length;i++){
    const post =  await Post.findById(user.posts[i]).populate("likes comments.user owner");
    posts.push(post);
  }
  res.status(200).json({
    success : true,
    posts,
  })
});

exports.getUserPosts = catchAsyncError(async(req,res,next)=>{
  const user = await User.findById(req.params.id);
  const posts=[];
  for(let i =0;i<user.posts.length;i++){
    const post =  await Post.findById(user.posts[i]).populate("likes comments.user owner");
    posts.push(post);
  }
  res.status(200).json({
    success : true,
    posts,
  })
});



