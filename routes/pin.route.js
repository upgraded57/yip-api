const router = require("express").Router();

// controllers
const {
  getAllPins,
  getUserPins,
  createPin,
  updatePin,
  fetchPinWithId,
} = require("../controllers/pin.controller");

// middlewares
const {
  validateUserIdInBody,
  validateUserIdInParams,
  validatePinFields,
  validatePinId,
} = require("../middlewares/validateFields.middleware");

// GET all pins
router.get("/", getAllPins);

// GET location from google
router.get("/place", fetchPinWithId);

// GET a user's pins
router.get("/user/:userId", validateUserIdInParams, getUserPins);

// CREATE a user's pin
router.post("/", validateUserIdInBody, validatePinFields, createPin);

// UPDATE a pin
router.patch("/:pinId", validatePinId, updatePin);

module.exports = router;
