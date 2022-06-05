const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const User = require('../models/User');

// @desc     Register user
// @route    POST ==>> /api/auth/register
// @access   Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  //   check if email already exists
  const emailAlreadyExists = await User.findOne({ email });
  if (email) {
    return next(new ErrorResponse(400, 'Email already exists'));
  }
  //   first register user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? 'admin' : 'user';
  //   create user
  const user = await User.create({ name, email, password, role });
  res
    .status(201)
    .json({ succes: true, message: 'Account created successfully' });
});
// @desc     Login user
// @route    POST ==>> /api/auth/login
// @access   Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse(400, 'Please provide email and password'));
  }
  //   Check for user
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorResponse(401, 'Invalid credentials'));
  }
  //   Check password
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse(401, 'Invalid credentials'));
  }
  sendTokenResponse(user, 200, res);
});

// Send token response
const sendTokenResponse = (user, statusCode, res) => {
  // create token
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  });
};
