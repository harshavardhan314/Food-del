const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // user schema fields
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
  },
  { minimize: false }
);

// Use mongoose.models to avoid OverwriteModelError in watch/hot-reload
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

module.exports = userModel;
