const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
});

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

// Clean up old unique index on 'name' (only needed once)
userModel.collection.dropIndex("name_1").catch(() => {});

module.exports = userModel;
