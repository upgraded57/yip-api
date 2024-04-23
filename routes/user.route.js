const router = require("express").Router();
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/user.controller.js");

// middlewares
const {
  validateUserFields,
  validateUserIdInParams,
  verifyEmailNotExisting,
} = require("../middlewares/validateFields.middleware.js");

// GET all users
router.get("/", getAllUsers);

// GET a single user
router.get("/:userId", validateUserIdInParams, getUser);

// LOGIN a user
router.post("/login", loginUser);
// CREATE a user
router.post("/", validateUserFields, verifyEmailNotExisting, createUser);

// UPDATE a user
router.patch("/:userId", validateUserIdInParams, updateUser);

// DELETE a user
router.delete("/:userId", validateUserIdInParams, deleteUser);

module.exports = router;
