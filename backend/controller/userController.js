const User = require("../models/userModel");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const validator = require("validator");
const jwtUtils = require("../utils/jwtUtils");



// Register User
//@POST API

exports.registerUser = async (req, res, next) => {
  const { name, email, mobile, password } = req.body;
  const requiredFields = ['name', 'email', 'password', "mobile"];
  const missingFields = requiredFields.filter(field => !(field in req.body));

  if (missingFields.length > 0) {
    return next(new ErrorHandler(`Please provide ${missingFields.join(', ')}`, 400));
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("Email already exists", 400));
  }
  
  if (!validator.isEmail(email)) {
    return next(new ErrorHandler("Please Enter a Valid Email", 400));
  }
  
  try {
    const user = await User({
      name,
      email,
      mobile,
      password,
    });
   
    await user.save();
    const token = jwtUtils.generateJWT(user._id);
    res.status(200).json({
      success: true,
      message:"User register successfully",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


// Login User
//@POST API

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const requiredFields = ['email', 'password'];
  const missingFields = requiredFields.filter(field => !(field in req.body));
  
  if (missingFields.length > 0) {
    return next(new ErrorHandler(`Please provide ${missingFields.join(', ')}`, 400));
  }
 try {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }
  const user = await User.findOne({
    email,
  }).select("+password");
  if (!user) {
    return next(new ErrorHandler(" Please provide correct email ", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Please provide correct password", 401));
  }
  const token = jwtUtils.generateJWT(user._id);
  res.status(200).json({
    success: true,
    user,
    token,
  });
 } catch (error) {
  return res.status(500).json({ error: "Internal Server Error" });
 }
});


exports.getProfileDetails = catchAsyncErrors(async (req, res, next) => {
  // const userId = req.user;
  try {
    const user = await User.findById(req.params.user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
// @des  to retrieve a list of users
// GET API

exports.getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return next(new ErrorHandler("User not found", 401));
    }

    const nonAdminUsers = users.filter(user => user.role !== "Admin");

    res.status(200).json({
      success: true,
      users: nonAdminUsers,
    });
  } catch (error) {
    return next(new ErrorHandler("Server error", 500));
  }
};


exports.addUser = async (req, res, next) => {
  const { name, email, mobile } = req.body;
  const requiredFields = ['name', 'email', 'mobile'];
  const missingFields = requiredFields.filter(field => !(field in req.body));

  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorHandler("Email already exists", 400));
    }
    if (!validator.isEmail(email)) {
      return next(new ErrorHandler("Please Enter a Valid Email", 400));
    }
    const newUser = new User({
      name,
      email,
      mobile,
    });
   
    await newUser.save();
    
    res.status(200).json({
      success: true,
      message: "User added successfully",
      newUser,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete existing User
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.user_id);

    if (!deletedUser) {
      return next(new ErrorHandler("User not found for the specified id", 404));
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// Update existing user
//@PUT API :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, mobile } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.user_id, {
      name,
      email,
      mobile,
    });

    
    if (!updatedUser || updatedUser.length === 0) {

      return next(new ErrorHandler("User not found for the specified id", 404));
    }
    if (!validator.isEmail(email)) {
      return next(new ErrorHandler("Please Enter Valid Email", 400));
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (err) {
    console.log('====================================');
    console.log(err.message);
    console.log('====================================');
  }
});



