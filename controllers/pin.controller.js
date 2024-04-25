const Pin = require("../models/pin.model.js");
const User = require("../models/user.model.js");
require("dotenv").config();
const axios = require("axios");

// GET all pins
const getAllPins = async (req, res) => {
  try {
    // fetch pins from db
    const pins = await Pin.find();

    // check if db contains pins
    if (pins.length > 0) {
      return res.status(200).json({
        status: "success",
        message: "Pins found succesfully",
        pins,
      });
    } else {
      return res.status(200).json({
        status: "success",
        message: "No pin found",
      });
    }
  } catch (err) {
    // throw error if unable to find pin
    return res.status(500).json({
      status: "failure",
      message: "Unable to find pins",
      error: err,
    });
  }
};

// GET all user's pins
const getUserPins = async (req, res) => {
  const { userId } = req.params;

  // find user's pins from db
  Pin.find({ user: userId })
    .then((pins) => {
      if (pins.length > 0) {
        return res.status(200).json({
          status: "success",
          message: "Pins found succesfully",
          pins,
        });
      } else {
        return res.status(200).json({
          status: "success",
          message: "No pins available for this user",
          pins,
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        status: "failure",
        message: "Unable to fetch pins",
        error: err,
      });
    });
};

// fetch pin on google
const fetchPinWithId = async (req, res) => {
  const { placeId } = req.body;

  // await fetch(
  //   `https://places.googleapis.com/v1/places/${placeId}?fields=addressComponents&key=${process.env.GOOGLE_API_KEY}`,
  //   { method: "GET" }
  // )
  //   .then((response) => response.text())
  //   .then((result) => {
  //     return res.status(200).json({
  //       status: "success",
  //       message: "Place fetched successfully",
  //       place: result,
  //     });
  //   })
  //   .catch((err) => {
  //     return res.status(500).json({
  //       status: "error",
  //       message: "Unable to find place",
  //       error: err,
  //     });
  //   });

  await axios
    .get("https://maps.googleapis.com/maps/api/place/details/json", {
      params: {
        place_id: placeId,
        fields: "address_components",
        key: process.env.GOOGLE_API_KEY,
      },
    })
    .then((res) => {
      return res.status(200).json({
        status: "success",
        message: "Place fetched successfully",
        place: res,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message: "Unable to find place",
        error: err,
      });
    });
};

// CREATE a pin
const createPin = async (req, res) => {
  const { userId, title, lat, long } = req.body;

  const user = userId;

  // check if user exists in db before creating pin
  try {
    const userExists = await User.findById(user);
    if (!userExists) {
      return res.status(403).json({
        status: "failure",
        message: "User with supplied user id not existing!",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "success",
      message: "Unable to find user with supplied user id",
      error: err,
    });
  }

  // create pin if user exists
  Pin.create({
    user,
    title,
    lat,
    long,
  })
    .then((newPin) => {
      return res.status(201).json({
        status: "success",
        message: "Pins created succesfully",
        pin: newPin,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "failure",
        message: "Unable to create pin",
        error: err,
      });
    });
};

// UPDATE a pin
const updatePin = async (req, res) => {
  const { title, lat, long } = req.body;
  const { pinId } = req.params;

  const pinInfo = { title, lat, long };

  // Check if pin exists
  try {
    const pinExists = await Pin.findById(pinId);

    if (!pinExists) {
      return res.status(500).json({
        status: "failure",
        message: "Pin does not exist",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: "Unable to find pin",
      error: err,
    });
  }

  // update pin
  Pin.findByIdAndUpdate(pinId, { ...pinInfo }, { new: true })
    .then((newPin) => {
      return res.status(200).json({
        status: "success",
        message: "Pin updated successfully",
        pin: newPin,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "failure",
        message: "Unable to update pin",
        error: err,
      });
    });
};

module.exports = {
  getAllPins,
  getUserPins,
  createPin,
  updatePin,
  fetchPinWithId,
};
