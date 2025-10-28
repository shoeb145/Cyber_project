import User from "../models/User.js";
import Courses from "../models/Courses.js";
import mongoose from "mongoose";
import Module from "../models/Module.js";
import Lesson from "../models/Lesson.js";

export const createCourse = async (req, res, next) => {
  try {
    const { title, detail, image, tag, hours, complexity, type } = req.body;
    if (!title || !detail || !image || !tag || !hours || !complexity || !type)
      return;
    const course = await Courses.findOne({ title });
    if (course) {
      const error = new Error("course already exist");
      error.code = 400;
      throw error;
    }
    const newCourse = await Courses.create({
      title,
      detail,
      image,
      tag,
      hours,
      complexity,
      type,
      createdBy: req.user._id, // store admin ID
    });
    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course: newCourse,
    });
  } catch (error) {
    next(error);
  }
};

export const getCourses = async (req, res, next) => {
  try {
    const courses = await Courses.find();
    if (!courses) {
      const error = new Error("empty");
      error.code = 204;
      throw error;
    }

    res
      .status(200)
      .json({ success: true, message: "all courses", course: courses });
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.params;
    const course = await Courses.findById(id).populate("modules");

    if (!course) return res.status(404).json({ error: "Course not found" });

    // Delete lessons for each module
    for (const module of course.modules) {
      await Lesson.deleteMany({ _id: { $in: module.lessons } }).session(
        session
      );
      await Module.findByIdAndDelete(module._id).session(session);
    }

    // Delete the course
    await Courses.findByIdAndDelete(id).session(session);

    await session.commitTransaction();
    res
      .status(200)
      .json({ message: "Course and related modules/lessons deleted" });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ error: "Failed to delete course" });
  } finally {
    session.endSession();
  }
};
export const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, detail, image, tag, hours, complexity, type } = req.body;

    const updatedCourse = await Courses.findByIdAndUpdate(
      id,
      { title, detail, image, tag, hours, complexity, type },
      { new: true }
    );

    if (!updatedCourse) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    console.log(updatedCourse);
    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Course not " });
  }
};
