const mongoose = require("mongoose");
const User = require("../models/user.model.js");

// function to check if phone number is numeric
const isNumeric = (value) => {
  return /^\d+$/.test(value);
};

const validateUserFields = (req, res, next) => {
  const { fullName, email, phone } = req.body;
  // check if all required fields are present

  // return error if full name is not supplied
  if (!fullName) {
    return res.status(400).json({
      status: "failure",
      message: `Full Name is required`,
    });
  }
  // return error if email is not supplied
  if (!email) {
    return res.status(400).json({
      status: "failure",
      message: `Email address is required`,
    });
  }

  // return error if phone number is not supplied
  if (!phone) {
    return res.status(400).json({
      status: "failure",
      message: `Phone Number is required`,
    });
  }

  // return error if phone number is not of required length
  if (phone.length < 11) {
    return res.status(400).json({
      status: "failure",
      message: `A valid Phone Number is required`,
    });
  }

  //   check if phone number is valid
  const phoneNumberIsValid = isNumeric(phone);

  // return error if phone number is invalid
  if (!phoneNumberIsValid) {
    return res.status(400).json({
      status: "failure",
      message: `Phone Number is not in required format`,
    });
  }

  next();
};

const validateUserIdInParams = (req, res, next) => {
  const { userId } = req.params || req.body;

  // check if user id is provided
  if (!userId) {
    return res.status(400).json({
      status: "failure",
      message: "User id not supplied",
    });
  }

  // check if user id is a valid object id
  const userIdIsValid = mongoose.Types.ObjectId.isValid(userId);

  // return error if user id is not valid
  if (!userIdIsValid) {
    return res.status(400).json({
      status: "failure",
      message: "Invalid user id supplied",
    });
  }

  next();
};

const validateUserIdInBody = (req, res, next) => {
  const { userId } = req.body;

  // check if user id is provided
  if (!userId) {
    return res.status(400).json({
      status: "failure",
      message: "User id not supplied",
    });
  }

  // check if user id is a valid object id
  const userIdIsValid = mongoose.Types.ObjectId.isValid(userId);

  // return error if user id is not valid
  if (!userIdIsValid) {
    return res.status(400).json({
      status: "failure",
      message: "Invalid user id supplied",
    });
  }

  next();
};

const verifyEmailNotExisting = async (req, res, next) => {
  // Destructure email from request body
  const { email } = req.body;

  // checks db to see if email already registered
  const userWithEmailExists = await User.findOne({ email });

  // return error if email exists
  if (userWithEmailExists) {
    return res.status(400).json({
      status: "failure",
      message: "User with email already exists!",
    });
  }

  next();
};

const validatePinId = (req, res, next) => {
  const { pinId } = req.params || req.body;

  // check if pin id is provided
  if (!pinId) {
    return res.status(400).json({
      status: "failure",
      message: "Pin id not supplied",
    });
  }

  // check if pin id is a valid object id
  const pinIdIsValid = mongoose.Types.ObjectId.isValid(pinId);

  // return error if user id is not valid
  if (!pinIdIsValid) {
    return res.status(400).json({
      status: "failure",
      message: "Invalid pin id supplied",
    });
  }

  next();
};

const validatePinFields = (req, res, next) => {
  const { userId, title, lat, long } = req.body;
  // check if all required fields are present

  // return error if user id is not supplied
  if (!userId) {
    return res.status(400).json({
      status: "failure",
      message: `User ID is required`,
    });
  }
  // return error if pin title is not supplied
  if (!title) {
    return res.status(400).json({
      status: "failure",
      message: `Title is required`,
    });
  }

  // return error if lat is not supplied
  if (!lat) {
    return res.status(400).json({
      status: "failure",
      message: `lat is required`,
    });
  }

  // return error if long is not supplied
  if (!long) {
    return res.status(400).json({
      status: "failure",
      message: `long is required`,
    });
  }
  next();
};

module.exports = {
  validateUserFields,
  validateUserIdInParams,
  validateUserIdInBody,
  verifyEmailNotExisting,
  validatePinId,
  validatePinFields,
};
