const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.isAutheticatedUser = catchAsyncErrors(async (req, res, next) => {
    
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please  Login to access the resource", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);
  next();
});
