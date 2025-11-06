import Jwt from "jsonwebtoken";
import User from "../models/User.js";

const authorization = async (req, res, next) => {
  try {
    let token;

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // 2️⃣ Optional: fallback to Authorization header
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    console.log(token);
    if (!token) return res.status(401).json({ message: "unauthorized" });

    const decoded = Jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authorization;
