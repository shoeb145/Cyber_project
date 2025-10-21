import User from "../models/User.js";

const roleCheck = (allowedRoles) => (req, res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    const error = new Error("Forbidden");
    error.code = 403;
    return next(error);
  }
  next();
};

export default roleCheck;
