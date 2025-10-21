import User from "../models/User.js";

User;
export const me = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("user not found");
      error.code = 401;
      throw error;
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
