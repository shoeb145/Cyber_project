import mongoose from "mongoose";
import bcrypt, { genSalt } from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 56,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/[^\s@]+@[^\s@]+\.[^\s@]+/, "please fill a valid email address"],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    verifiedToken: String,
    tokenExpireDate: Date,
    password: {
      type: String,
      required: true,
      minlength: 6,
      unique: true,
      select: false,
    },
    avatar: {
      type: String,
      required: true,
    },
     /* ✅ Login Streak System */
    lastLoginDate: {
      type: Date,
    },
    currentStreak: {
      type: Number,
      default: 0,
    },
    maxStreak: {
      type: Number,
      default: 0,
    },
    token: {
      type: Number,
      default: 30,
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    coursesTaken: [
      {
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Courses" },
        completed: { type: Boolean, default: false },
        unlocked: { type: Boolean, default: false },
        progress: [
          {
            moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
            lessonsCompleted: [
              { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
            ],
          },
        ],
        score: { type: Number, default: 0 },
        completedAt: { type: Date },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
