const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    type: String,
    required: true,
    min: 1,
    trim: true
  }
});

module.exports = User;
