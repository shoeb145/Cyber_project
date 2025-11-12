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
        .json({ success: false, message: "Please fill in all required fields." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
  return res.status(409).json({
    success: false,
    message: "This email is already in use. Please log in or use a different one."
  });
}

if (password.length < 6) {
  return res.status(400).json({
    success: false,
    message: "Your password is too weak. Use at least  characters with letters and numbers."
  });
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

    // ✅ Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // ✅ Check user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email.",
      });
    }

    // ✅ Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }

    // ✅ Generate Token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    // ✅ Send cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // ✅ secure only on prod
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
        role: user.role,
        avatar: user.avatar,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    next(error);
  }
};

export const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token; // 🍪 JWT from cookie
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token found" });
    }

    // 🔐 Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 👤 Find user
    const user = await User.findById(decoded.userId).select("name role email");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // ✅ Authenticated
    return res.status(200).json({
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

    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export const signOut = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/", // 👈 This is critical
  });
  return res.status(200).json({ message: "Logged out successfully" });
  return res.status(200).json({ message: "Logged out successfully" });
};
