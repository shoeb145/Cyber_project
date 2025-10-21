import Lesson from "../models/Lesson.js";
import Module from "../models/Module.js";
export const createLesson = async (req, res, next) => {
  try {
    const { title, markdownContent, order, id } = req.body;

    if (!title || !markdownContent || order === undefined || !id) {
      const error = new Error(
        "All fields (title, description, order) are required"
      );
      error.code = 400;
      throw error;
    }

    // const lesson =await Lesson.findOne({})
    const newLesson = await Lesson.create({
      title: title.trim(),
      markdownContent,
      order,
    });

    const module = await Module.findById(id);
    if (!module) {
      const error = new Error("Module is not exist");
      error.code = 404;
      throw error;
    }
    module.lessons.push(newLesson._id);
    await module.save();
    res.status(201).json({
      success: true,
      message: "lesson created successfully",
      lesson: newLesson,
    });
  } catch (error) {
    next(error);
  }
};
