import mongoose, { Schema } from "mongoose";

const TaskModel = new Schema({
  tittle: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    required: true,
    default: Date.now()
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
   UserId: { 
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }

});

// Check if model already exists before creating it
const usersTask = mongoose.models.UsersTasks || mongoose.model("UsersTasks", TaskModel);

export { usersTask };
