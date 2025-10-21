import User from "../models/User.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { username, fullName, email, password } = req.body;

    if (!username || !fullName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.code = 409;
      throw error;
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const [newUser] = await User.create(
      [
        {
          username,
          fullName,
          email,
          password: hashPassword,
          avatar: "https://avatar.iran.liara.run/public/boy",
        },
      ],
      { session }
    );

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    await session.commitTransaction();

    // ✅ set token cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set true in production with HTTPS
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { user: newUser },
    });
  } catch (error) {
    // ✅ check transaction state before aborting
    if (session.inTransaction()) {
      await session.abortTransaction();
    }

    console.error("❌ Signup Error:", error);
    next(error);
  } finally {
    session.endSession(); // always end
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      const error = new Error("user does not exist");
      error.code = 401;
      throw error;
    }
    const hashPassword = user.password;
    const isValidPassword = await bcrypt.compare(password, hashPassword);
    if (!isValidPassword) {
      const error = new Error("invalid user");
      error.code = 401;
      throw error;
    }
    const secret = process.env.JWT_SECRET;
    const expire = process.env.JWT_EXPIRES_IN;
    const token = jwt.sign({ userId: user._id }, secret, {
      expiresIn: expire || "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set true in production with HTTPS
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      success: true,
      message: "user logged in ",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const verifyUser = async (req, res) => {
  try {
    console.log("hello");
    const token = req.cookies.token; // Get token from cookie
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token found" });
    }
    console.log(token, "hellllo");
    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded.userId, "hello");
    // Optional: check if user exists
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // ✅ Token valid
    res.status(200).json({
      success: true,
      message: "Authenticated",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
    next(error);
  }
};
