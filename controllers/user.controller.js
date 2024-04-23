const User = require("../models/user.model.js");

// GET all users
const getAllUsers = async (req, res) => {
  const users = await User.find();

  //   return all users
  return res.status(200).json({
    status: "success",
    message: "Users found successfully",
    users,
  });
};

// GET a single user
const getUser = async (req, res) => {
  const { userId } = req.params;

  // find user in db using user id
  User.findById(userId)
    .then((user) => {
      if (user !== null) {
        return res.status(200).json({
          status: "success",
          message: "User found successfully",
          user,
        });
      } else {
        return res.status(500).json({
          status: "failure",
          message: "User not found",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        status: "failure",
        message: "Unable to find user",
        error: err,
      });
    });
};

// LOGIN a user
const loginUser = async (req, res) => {
  const email = req.body.email.toLowerCase();
  await User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(200).json({
          status: "success",
          message: "Login Successful",
          user,
        });
      } else {
        return res.status(400).json({
          status: "failure",
          message: "User does not exist",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        status: "failure",
        message: "Unable to login user",
        error: err,
      });
    });
};

// CREATE a user
const createUser = async (req, res) => {
  // Destructure new user info from request body
  const { fullName, email, phone } = req.body;

  // Create a new user
  User.create({
    fullName,
    email: email.toLowerCase(),
    phone,
  })
    .then((newUser) => {
      return res.status(201).json({
        status: "success",
        message: "User created successfully",
        user: newUser,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "failure",
        message: "Unable to create new user",
        error: err,
      });
    });
};

// UPDATE  a user
const updateUser = async (req, res) => {
  // Destructure user id from request url
  const { userId } = req.params;

  // Destructure user update info from request body
  const { fullName, email, phone } = req.body;
  const fields = { fullName, email, phone };

  // Find and update user
  User.findByIdAndUpdate(userId, { ...fields }, { new: true })
    .then((updatedUser) => {
      return res.status(200).json({
        status: "success",
        message: "User information updated successfully",
        user: updatedUser,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "failure",
        message: "Unable to update user",
        error: err,
      });
    });
};

// DELETE a user
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  // check if user exists
  const userExists = await User.findById(userId);

  // return error if user does not exist
  if (!userExists) {
    return res.status(500).json({
      status: "failure",
      message: "User not found",
    });
  }

  // delete user
  User.findByIdAndDelete(userId)
    .then(() => {
      return res.status(200).json({
        status: "success",
        message: "User deleted successfully",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "failure",
        message: "Unable to delete user",
        error: err,
      });
    });
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
