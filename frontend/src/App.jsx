import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./home_page.css";
import Hero from "./components/Hero";
import Home_page from "./components/Home_page";
import BenefitsSection from "./components/BenefitsSection/BenefitsSection";
import CounterSection from "./components/CounterSection/CounterSection";
import VideoSection from "./components/VideoSection/VideoSection";
import CaseStudiesSection from "./components/CaseStudiesSection/CaseStudiesSection";
import ReviewSection from "./components/ReviewSection/ReviewSection";
import Dashboard from "./components/Dashboard";
import Modules from "./components/Modules";
import Paths from "./components/Paths";
import Certificates from "./components/Certificates";
import Badges from "./components/Badges";
import ShadcnDemo from "./components/ShadcnDemo";
import SignupPage from "./pages/SignupPage";
import CourseList from "./components/AddCourse/CourseList";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./lib/PrivateRoute";
import AdminDashboard from "./pages/AdminPages/AdminDashboard";
import axios from "axios";
import HomePage from "./pages/HomePage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await axios.get("http://localhost:5001/api/user/me", {
        withCredentials: true,
      });
      setUser(user.data);
    };

    fetchUser();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/courses"
            element={<AdminDashboard user={user} />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/modules"
            element={
              <PrivateRoute>
                <Modules />
              </PrivateRoute>
            }
          />
          <Route
            path="/paths"
            element={
              <PrivateRoute>
                <Paths />
              </PrivateRoute>
            }
          />
          <Route
            path="/certificates"
            element={
              <PrivateRoute>
                <Certificates />
              </PrivateRoute>
            }
          />
          <Route path="/badges" element={<Badges />} />
          <Route path="/shadcn-demo" element={<ShadcnDemo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
