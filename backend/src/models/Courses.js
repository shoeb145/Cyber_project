import mongoose from "mongoose";

const CoursesSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    detail: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tag: [
      {
        type: String,
      },
    ],
    hours: {
      type: Number,
      required: true,
    },
    complexity: {
      type: String,
      enum: ["Fundamental", "Medium", "Hard"],
      required: true,
    },
    type: {
      type: String,
      enum: ["General", "Defensive", "Offensive"],
      required: true,
    },
    modules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Courses", CoursesSchema);
