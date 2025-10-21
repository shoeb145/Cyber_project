import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import roleCheck from "@/lib/RoleCheck";

function SignupInput(props) {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    email: "",
    fullName: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({}); // NEW: Track touched fields
  const [isValid, setIsValid] = useState(false);
  const emailRef = useRef();
  const fullNameRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault(); // prevent form submission
      nextRef.current.focus(); // focus next input
    }
  };

  const userSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    fullName: z
      .string()
      .min(3, { message: "Full name must be at least 3 characters" }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  });

  // Validate form on every change
  useEffect(() => {
    const result = userSchema.safeParse(formdata);

    if (result.success) {
      setErrors({});
      setIsValid(true);
    } else {
      if (result?.error?.issues) {
        const fieldErrors = {};

        result.error.issues.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });

        setErrors(fieldErrors);
        setIsValid(false);
        console.log(fieldErrors);
      }
    }
  }, [formdata]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
    // Mark field as touched when user types
    if (!touched[name]) {
      setTouched({ ...touched, [name]: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      email: true,
      fullName: true,
      username: true,
      password: true,
    });

    try {
      // 🔹 Run Zod validation directly
      const validatedData = userSchema.parse(formdata);

      const response = await axios.post(
        "http://localhost:5001/api/auth/sign-up",
        validatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // ✅ must be here (not inside headers)
        }
      );
      console.log(response.data.success);

      console.log(response.data.data);
      console.log(response.data.data.user.role);
      console.log(response.data.data.user);

      if (response.data.success) {
        if (roleCheck(response.data.data.user?.role)) {
          console.log("✅ Signup successful:", response.data);
          // redirect user
          navigate("/dashboard"); // or any page like /login
        } else {
          console.log("✅ Signup successful:", response.data);
          // redirect user
          navigate("/dashboard"); // or any page like /login
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // 🔹 Collect field-specific messages
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
        console.warn("❌ Validation errors:", fieldErrors);
      } else if (axios.isAxiosError(error)) {
        console.error("❌ API Error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="bg-[#151f2e] h-fit w-2/6 rounded-xl text-white flex flex-col p-7 px-10">
      <h3 className="text-2xl self-start font-mono tracking-tighter">
        Create a Redzone Account
      </h3>
      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="self-start flex flex-col mt-4">
          <label htmlFor="email" className="self-start pb-1">
            Email
          </label>
          <input
            type="email"
            ref={emailRef}
            id="email"
            name="email"
            value={formdata.email}
            onChange={handleInputChange}
            onKeyDown={(e) => handleKeyDown(e, fullNameRef)}
            className={`h-10 bg-[#1e2939] w-96 px-3 border rounded-md ${
              touched.email && errors.email
                ? "border-red-500"
                : "border-gray-700"
            } focus:outline-none focus:border-[#d3ed05]`}
          />
          {touched.email && errors.email && (
            <span className="text-red-400 text-xs mt-1 self-start">
              {errors.email}
            </span>
          )}
        </div>

        {/* Full Name Field */}
        <div className="self-start flex flex-col mt-4">
          <label htmlFor="fullName" className="self-start pb-1">
            Full Name
          </label>
          <input
            ref={fullNameRef}
            type="text"
            id="fullName"
            name="fullName"
            value={formdata.fullName}
            onChange={handleInputChange}
            onKeyDown={(e) => handleKeyDown(e, usernameRef)}
            className={`h-10 bg-[#1e2939] w-96 px-3 border rounded-md ${
              touched.fullName && errors.fullName
                ? "border-red-500"
                : "border-gray-700"
            } focus:outline-none focus:border-[#d3ed05]`}
          />
          {touched.fullName && errors.fullName && (
            <span className="text-red-400 text-xs mt-1 self-start">
              {errors.fullName}
            </span>
          )}
        </div>

        {/* Username Field */}
        <div className="self-start flex flex-col mt-4">
          <label htmlFor="username" className="self-start pb-1">
            Username
          </label>
          <input
            type="text"
            ref={usernameRef}
            id="username"
            name="username"
            onKeyDown={(e) => handleKeyDown(e, passwordRef)}
            value={formdata.username}
            onChange={handleInputChange}
            className={`h-10 bg-[#1e2939] w-96 px-3 border rounded-md ${
              touched.username && errors.username
                ? "border-red-500"
                : "border-gray-700"
            } focus:outline-none focus:border-[#d3ed05]`}
          />
          {touched.username && errors.username && (
            <span className="text-red-400 text-xs mt-1 self-start">
              {errors.username}
            </span>
          )}
        </div>

        {/* Password Field */}
        <div className="self-start flex flex-col mt-4">
          <label htmlFor="password" className="self-start pb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            ref={passwordRef}
            value={formdata.password}
            onChange={handleInputChange}
            onKeyDown={(e) => handleKeyDown(e, passwordRef)}
            className={`h-10 bg-[#1e2939] w-96 px-3 border rounded-md ${
              touched.password && errors.password
                ? "border-red-500"
                : "border-gray-700"
            } focus:outline-none focus:border-[#d3ed05]`}
          />
          {touched.password && errors.password && (
            <span className="text-red-400 text-xs mt-1 self-start">
              {errors.password}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isValid}
          className={`mt-6 w-96 h-10 rounded-md font-medium transition-all ${
            isValid
              ? "bg-[#d3ed05] text-gray-800 hover:bg-[#c5dd05] cursor-pointer"
              : "bg-gray-600 text-gray-400 cursor-not-allowed opacity-50"
          }`}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupInput;
