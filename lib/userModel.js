import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  userID: String,
  trackedPosts: Object,
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
