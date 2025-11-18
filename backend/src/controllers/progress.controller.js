import Progress from "../models/Progress.js";
import Courses from "../models/Courses.js";
import Module from "../models/Module.js";
import Lesson from "../models/Lesson.js";
export const coursesProgress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId is required",
      });
    }

    // Get all progress docs for the user + course details + modules
    const progressDocs = await Progress.find({ userId })
      .populate({
        path: "courseId",
        select: "title thumbnail modules",
        populate: {
          path: "modules",
          select: "_id", // we only need _id count
        },
      });

    if (!progressDocs || progressDocs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User has not enrolled in any courses",
      });
    }

    // Summary counts
    const completedCourses = progressDocs.filter(
      (p) => p.status === "completed"
    ).length;

    const inProgressCourses = progressDocs.filter(
      (p) => p.status === "in-progress"
    ).length;

    // Build course progress list
    const courses = progressDocs.map((p) => {
      const totalModules =
        Array.isArray(p.courseId.modules) ? p.courseId.modules.length : 0;

      return {
        courseId: p.courseId._id,
        title: p.courseId.title,
        thumbnail: p.courseId.thumbnail,
        percentage: p.percentage,
        status: p.status,
        completedModules: p.completedModules.length,
        totalModules,
      };
    });

    return res.status(200).json({
      success: true,
      summary: {
        totalEnrolled: progressDocs.length,
        completedCount: completedCourses,
        inProgressCount: inProgressCourses,
      },
      courses,
    });
  } catch (error) {
    console.error("Error fetching course progress:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const enrollProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    if (!courseId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Provide userId and courseId",
      });
    }

    const progressExist = await Progress.findOne({ userId, courseId });

    if (progressExist) {
      return res.status(409).json({
        success: false,
        message: "User has already enrolled in the course",
      });
    }

    const progress = await Progress.create({
      userId,
      courseId
    });

    return res.status(201).json({
      success: true,
      message: "User enrolled successfully",
      data: progress,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};




export const lessonProgress= async (req, res) => {
  try {
    const { userId, courseId, moduleId, lessonId } = req.body;

    // 1. Basic validation
    if (!userId || !courseId || !moduleId || !lessonId) {
      return res.status(400).json({
        success: false,
        message: "userId, courseId, moduleId and lessonId are required",
      });
    }

    // 2. Check if user enrolled in course
    const progress = await Progress.findOne({ userId, courseId });
    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "User has not enrolled in this course",
      });
    }

    // 3. Validate module and lesson
    const moduleData = await Module.findById(moduleId);
    if (!moduleData) {
      return res.status(404).json({
        success: false,
        message: "Module not found",
      });
    }

    const lessonData = await Lesson.findById(lessonId);
    if (!lessonData) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
    }

    // 4. Add lesson to completed lessons (avoid duplicates)
    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
    }

    // 5. Auto-complete module (because each module has only one lesson)
    if (!progress.completedModules.includes(moduleId)) {
      progress.completedModules.push(moduleId);
    }

    // 6. Calculate percentage
    const course = await Courses.findById(courseId).populate("modules");
    const totalModules = course.modules.length;
    const completedModules = progress.completedModules.length;

    const percentage = Math.floor((completedModules / totalModules) * 100);
    progress.percentage = percentage;

    // 7. Update status
    if (percentage === 100) {
      progress.status = "completed";
      progress.completedAt = new Date();
    } else {
      progress.status = "in-progress";
    }

    progress.updatedAt = new Date();
    await progress.save();

    return res.status(200).json({
      success: true,
      message: "Lesson marked as completed",
      data: {
        completedLessons: progress.completedLessons,
        completedModules: progress.completedModules,
        percentage: progress.percentage,
        status: progress.status,
      },
    });
  } catch (error) {
    console.error("Error completing lesson:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
