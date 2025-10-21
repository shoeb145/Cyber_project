import mongoose from "mongoose";

const ModuleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  order: {
    type: Number,
  },
  isLocked: { type: Boolean, default: true },
  unlockCondition: { type: String, default: "Complete previous module" },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
});

export default mongoose.model("Module", ModuleSchema);
