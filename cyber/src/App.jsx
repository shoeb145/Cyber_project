import React from 'react';
import './App.css';
import './home_page.css';
import Hero from './components/Hero';
import Home_page from './components/Home_page';
import BenefitsSection from './components/BenefitsSection';
import VideoSection from './components/VideoSection';
function App() {
  return (
    <div className="App">
      <Hero />
      <Home_page />
      <BenefitsSection />
      <VideoSection />
    </div>
  );
}

export default App;
