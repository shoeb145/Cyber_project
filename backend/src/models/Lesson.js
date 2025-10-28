import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    markdownContent: {
      type: String,
      required: true,
      // this stores raw markdown text
    },
    videoUrl: {
      type: String,
      default: "",
    },
    resources: [
      {
        title: String,
        link: String,
      },
    ],
    duration: {
      type: Number, // minutes
      default: 5,
    },

    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
  },
  { timestamps: true }
);

export default mongoose.model("Lesson", LessonSchema);
