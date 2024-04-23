const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full Name is required!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: [true, "User with this email already exists!"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required!"],
    },
  },
  { timestamps: true, collection: "users" }
);

module.exports = mongoose.model("User", userSchema);
