import Module from "../models/Module.js";
import Courses from "../models/Courses.js";

export const createModule = async (req, res, next) => {
  try {
    const { title, description, order, courseId } = req.body;
    console.log(req.body);
    //  Validate inputs
    if (!title || !description || order === undefined || !courseId) {
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
      courseId: courseId,
      order,
    });

    const courses = await Courses.findById(courseId);
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

export const getModulesByCourse = async (req, res, next) => {
  try {
    const { id } = req.params; // Course ID

    if (!id) {
      const error = new Error("Course ID is required");
      error.code = 400;
      throw error;
    }

    // Find course
    const course = await Courses.findById(id).populate({
      path: "modules",
      options: { sort: { order: 1 } }, // Sort by order
    });
    console.log(course);

    if (!course) {
      const error = new Error("Course not found");
      error.code = 404;
      throw error;
    }

    console.log(course);
    res.status(200).json({
      success: true,
      course: {
        _id: course._id,
        title: course.title,
        detail: course.detail,
        type: course.type,
        complexity: course.complexity,
        hours: course.hours,
      },
      modules: course.modules,
      totalModules: course.modules.length,
    });
  } catch (error) {
    next(error);
  }
};

// export const createModule = async (req,res,next) =>{
//   try {

//   } catch (error) {
//     next(error)

//   }
// }
