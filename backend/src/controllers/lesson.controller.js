import Lesson from "../models/Lesson.js";
import Module from "../models/Module.js";
export const createLesson = async (req, res, next) => {
  try {
    const { title, markdownContent, id } = req.body;

    if (!title || !markdownContent || !id) {
      const error = new Error(
        "All fields (title, description, order) are required"
      );
      error.code = 400;
      throw error;
    }

    // const lesson =await Lesson.findOne({})
    const newLesson = await Lesson.create({
      title: title.trim(),
      moduleId: id,
      markdownContent,
    });

    const module = await Module.findById(id);
    if (!module) {
      const error = new Error("Module is not exist");
      error.code = 404;
      throw error;
    }
    module.lessons = newLesson._id;
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
export const getLessonsByModule = async (req, res, next) => {
  try {
    const { id } = req.params; // Module ID

    if (!id) {
      const error = new Error("Module ID is required");
      error.code = 400;
      throw error;
    }

    // Find module and populate its lessons
    const module = await Module.findById(id).populate({
      path: "lessons",
      options: { sort: { order: 1 } }, // Sort by order ascending
    });
    console.log(module);
    console.log(module.lessons, "this is lessons");
    if (!module) {
      const error = new Error("Module not found");
      error.code = 404;
      throw error;
    }
    console.log(module.lessons, "this is lessons");

    // Respond with clean structured data
    res.status(200).json({
      success: true,
      module: {
        _id: module._id,
        title: module.title,
        description: module.description,
        order: module.order,
        isLocked: module.isLocked,
        unlockCondition: module.unlockCondition,
        totalLessons: module.lessons.length,
      },
      lessons: module.lessons,
    });
  } catch (error) {
    next(error);
  }
};
