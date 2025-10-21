import User from "../models/User.js";
import Courses from "../models/Courses.js";

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
