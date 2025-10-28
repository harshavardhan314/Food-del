const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default:"user" },
    cartData: { type: Object, default: {} },
  },
  { minimize: false } 
// okavela idhi pettaka pothe empty obj ni remove chesthundi empty object ni save cheyadaniki allow chestundi 
);

const userModel = mongoose.models.User || mongoose.model("User", userSchema);


userModel.collection.dropIndex("name_1").catch(() => {});

module.exports = userModel;
