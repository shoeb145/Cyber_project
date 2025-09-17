import React, { useState } from 'react';
import './Modules.css';
import ModuleCard from './ModuleCard';
import Layout from './Layout';

// SVG Icons
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 21L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 7V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7 10H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const FilterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4H20V7L14 13V19L10 21V13L4 7V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Sample module data - would come from API in production
const moduleData = [
  {
    id: 1,
    title: "Introduction to Cybersecurity",
    description: "Learn the basics of cybersecurity, including key concepts and terminology.",
    difficulty: "Fundamental",
    category: "General",
    progress: 0,
    image: "/module-images/intro.jpg",
    estimatedTime: "3 hours",
    tags: ["beginner", "theory"]
  },
  {
    id: 2,
    title: "Network Security Fundamentals",
    description: "Understanding network protocols, architecture and security principles.",
    difficulty: "Easy",
    category: "Defensive",
    progress: 30,
    image: "/module-images/network.jpg",
    estimatedTime: "5 hours",
    tags: ["networking", "protocols", "defensive"]
  },
  {
    id: 3,
    title: "Web Application Pentesting",
    description: "Learn methodologies for finding and exploiting web application vulnerabilities.",
    difficulty: "Medium",
    category: "Offensive",
    progress: 0,
    image: "/module-images/webapp.jpg",
    estimatedTime: "8 hours",
    tags: ["pentesting", "web", "offensive"]
  },
  {
    id: 4,
    title: "Advanced Exploitation Techniques",
    description: "Advanced methods for exploiting complex vulnerabilities in systems.",
    difficulty: "Hard",
    category: "Offensive",
    progress: 0,
    image: "/module-images/exploit.jpg",
    estimatedTime: "10 hours",
    tags: ["exploitation", "advanced", "offensive"]
  },
  {
    id: 5,
    title: "Digital Forensics",
    description: "Methodologies and tools used to investigate cybersecurity incidents.",
    difficulty: "Medium",
    category: "Defensive",
    progress: 15,
    image: "/module-images/forensics.jpg",
    estimatedTime: "7 hours",
    tags: ["forensics", "analysis", "defensive"]
  },
  {
    id: 6,
    title: "Malware Analysis",
    description: "Techniques for analyzing malicious software and understanding its behavior.",
    difficulty: "Hard",
    category: "Defensive",
    progress: 0,
    image: "/module-images/malware.jpg",
    estimatedTime: "9 hours",
    tags: ["malware", "analysis", "defensive"]
  },
  {
    id: 7,
    title: "Cloud Security",
    description: "Security principles and practices specific to cloud environments.",
    difficulty: "Medium",
    category: "General",
    progress: 0,
    image: "/module-images/cloud.jpg",
    estimatedTime: "6 hours",
    tags: ["cloud", "aws", "azure"]
  },
  {
    id: 8,
    title: "Mobile Application Security",
    description: "Understanding vulnerabilities specific to mobile applications.",
    difficulty: "Medium",
    category: "Offensive",
    progress: 0,
    image: "/module-images/mobile.jpg",
    estimatedTime: "6 hours",
    tags: ["mobile", "android", "ios"]
  }
];

const Modules = () => {
  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [progressFilter, setProgressFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter modules based on user selections
  const filteredModules = moduleData.filter(module => {
    // Search term filtering
    const matchesSearchTerm = module.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            module.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            module.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Category filtering
    const matchesCategory = categoryFilter === 'All' || module.category === categoryFilter;
    
    // Difficulty filtering
    const matchesDifficulty = difficultyFilter === 'All' || module.difficulty === difficultyFilter;
    
    // Progress filtering
    const matchesProgress = progressFilter === 'All' || 
                          (progressFilter === 'Completed' && module.progress === 100) ||
                          (progressFilter === 'In Progress' && module.progress > 0 && module.progress < 100) ||
                          (progressFilter === 'Not Started' && module.progress === 0);
    
    return matchesSearchTerm && matchesCategory && matchesDifficulty && matchesProgress;
  });
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Toggle filters visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('All');
    setDifficultyFilter('All');
    setProgressFilter('All');
  };
  
  return (
    <Layout>
      <div className="modules-container">
      {/* Header section */}
      <div className="modules-header">
        <h1>MODULES</h1>
        <div className="breadcrumbs">
          <span>Pages</span> <span className="separator">/</span> <span className="current">Modules</span>
        </div>
      </div>
      
      {/* Search and filter section */}
      <div className="modules-search-filter">
        <div className="search-bar">
          <SearchIcon />
          <input 
            type="text" 
            placeholder="Search modules..." 
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <button className="filter-btn" onClick={toggleFilters}>
          <FilterIcon /> {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>
      
      {/* Filters section - visible when showFilters is true */}
      {showFilters && (
        <div className="filters-panel">
          <div className="filters-header">
            <h3>Filters</h3>
            <button className="clear-btn" onClick={clearFilters}>Clear All</button>
          </div>
          
          <div className="filters-grid">
            <div className="filter-group">
              <label>Category</label>
              <div className="filter-options">
                {['All', 'Offensive', 'Defensive', 'General'].map(category => (
                  <button 
                    key={category}
                    className={categoryFilter === category ? 'active' : ''}
                    onClick={() => setCategoryFilter(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="filter-group">
              <label>Difficulty</label>
              <div className="filter-options">
                {['All', 'Fundamental', 'Easy', 'Medium', 'Hard'].map(difficulty => (
                  <button 
                    key={difficulty}
                    className={difficultyFilter === difficulty ? 'active' : ''}
                    onClick={() => setDifficultyFilter(difficulty)}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="filter-group">
              <label>Progress</label>
              <div className="filter-options">
                {['All', 'Not Started', 'In Progress', 'Completed'].map(progress => (
                  <button 
                    key={progress}
                    className={progressFilter === progress ? 'active' : ''}
                    onClick={() => setProgressFilter(progress)}
                  >
                    {progress}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="selected-filters">
            {categoryFilter !== 'All' && (
              <div className="filter-tag">
                Category: {categoryFilter}
                <button onClick={() => setCategoryFilter('All')}><CloseIcon /></button>
              </div>
            )}
            {difficultyFilter !== 'All' && (
              <div className="filter-tag">
                Difficulty: {difficultyFilter}
                <button onClick={() => setDifficultyFilter('All')}><CloseIcon /></button>
              </div>
            )}
            {progressFilter !== 'All' && (
              <div className="filter-tag">
                Progress: {progressFilter}
                <button onClick={() => setProgressFilter('All')}><CloseIcon /></button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Module results count */}
      <div className="results-count">
        <span>{filteredModules.length} modules found</span>
      </div>
      
      {/* Modules grid */}
      <div className="modules-grid">
        {filteredModules.length > 0 ? (
          filteredModules.map(module => (
            <ModuleCard key={module.id} module={module} />
          ))
        ) : (
          <div className="no-results">
            <p>No modules match your search criteria.</p>
            <button className="reset-btn" onClick={clearFilters}>Reset Filters</button>
          </div>
        )}
      </div>
    </div>
    </Layout>
  );
};

export default Modules;