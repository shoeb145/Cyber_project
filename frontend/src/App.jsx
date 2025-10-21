import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./home_page.css";
import Hero from "./components/Hero";
import Home_page from "./components/Home_page";
import BenefitsSection from "./components/BenefitsSection";
import CounterSection from "./components/CounterSection";
import VideoSection from "./components/VideoSection";
import CaseStudiesSection from "./components/CaseStudiesSection";
import ReviewSection from "./components/ReviewSection";
import Dashboard from "./components/Dashboard";
import Modules from "./components/Modules";
import Paths from "./components/Paths";
import Certificates from "./components/Certificates";
import Badges from "./components/Badges";
import ShadcnDemo from "./components/ShadcnDemo";
import SignupPage from "./pages/SignupPage";
import CourseList from "./pages/AdminPages/CourseList";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./lib/PrivateRoute";

function HomePage() {
  return (
    <>
      <Hero />
      <Home_page />
      <BenefitsSection />
      <VideoSection />
      <CounterSection />
      <CaseStudiesSection />
      <ReviewSection />
    </>
  );
}

function App() {
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
          <Route path="/admin/courses" element={<CourseList />} />
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
