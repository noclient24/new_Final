import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, "Email required!"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password required!"]
  },
  about: {
    type: String,
    default: ""
  },
  ProfileURL: {
    type: String,
    default: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
  }
});

const userModel = mongoose.models.userModel || mongoose.model("userModel", userSchema);

export { userModel };
