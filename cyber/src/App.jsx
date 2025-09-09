import React from 'react';
import './App.css';
import './home_page.css';
import Hero from './components/Hero';
import Home_page from './components/Home_page';
import BenefitsSection from './components/BenefitsSection';
function App() {
  return (
    <div className="App">
      <Hero />
      <Home_page />
      <BenefitsSection />
    </div>
  );
}

export default App;
