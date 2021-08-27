const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: [true, "Email already in use"],
      required: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", user);

module.exports = User;
