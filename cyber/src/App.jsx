import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './home_page.css';
import Hero from './components/Hero';
import Home_page from './components/Home_page';
import BenefitsSection from './components/BenefitsSection';
import CounterSection from './components/CounterSection';
import VideoSection from './components/VideoSection';
import CaseStudiesSection from './components/CaseStudiesSection';
import ReviewSection from './components/ReviewSection';
import Dashboard from './components/Dashboard';

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
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
