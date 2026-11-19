import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A task title is required."],
    trim: true,
    maxlength: [120, "Task titles can’t exceed 120 characters."],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, "Descriptions can’t exceed 1000 characters."],
    default: "",
  },
  priority: {
    type: String,
    enum: { values: ["Low", "Medium", "High"], message: "Priority must be Low, Medium, or High." },
    default: "Medium",
  },
  dueDate: {
    type: Date,
    default: null,
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: { createdAt: true, updatedAt: true },
  versionKey: false,
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
