const mongoose = require("mongoose");

const pinSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: [true, "User id not supplied!"],
    },
    title: {
      type: String,
      required: [true, "Location's title not supplied"],
    },
    lat: {
      type: Number,
      required: [true, "Location's latitude not supplied!"],
    },
    long: {
      type: Number,
      required: [true, "Phone number is required!"],
    },
  },
  { timestamps: true, collection: "pins" }
);

module.exports = mongoose.model("Pin", pinSchema);
