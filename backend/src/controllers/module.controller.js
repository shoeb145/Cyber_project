import Module from "../models/Module.js";
import Courses from "../models/Courses.js";

export const createModule = async (req, res, next) => {
  try {
    const { title, description, order, id } = req.body;
    //  Validate inputs
    if (!title || !description || order === undefined || !id) {
      const error = new Error(
        "All fields (title, description, order) are required"
      );
      error.code = 400;
      throw error;
    }

    //  Check if module already exists
    const existingModule = await Module.findOne({ title: title.trim() });
    if (existingModule) {
      const error = new Error("Module already exists");
      error.code = 409; // 409 = Conflict
      throw error;
    }

    // Create new module
    const newModule = await Module.create({
      title: title.trim(),
      description: description.trim(),
      order,
    });

    const courses = await Courses.findById(id);
    if (!courses) {
      const error = new Error("Courses is not exist");
      error.code = 404;
      throw error;
    }

    courses.modules.push(newModule._id);
    await courses.save();
    //  Send response
    res.status(201).json({
      success: true,
      message: "Module created successfully",
      module: newModule,
    });
  } catch (error) {
    next(error);
  }
};
