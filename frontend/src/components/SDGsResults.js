import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './SDGsResults.css';

const SDGsResults = () => {
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState(null);
  const [recommendedSDGs, setRecommendedSDGs] = useState([]);

  useEffect(() => {
    // Load form data from localStorage
    const savedFormData = localStorage.getItem('sdgFormData');
    if (savedFormData) {
      const data = JSON.parse(savedFormData);
      setFormData(data);
      // Generate recommendations based on form data
      const recommendations = generateSDGRecommendations(data);
      setRecommendedSDGs(recommendations);
    }
  }, []);

  const generateSDGRecommendations = (data) => {
    // SDG recommendation algorithm based on company profile
    const recommendations = [];
    
    // Major Impact SDGs (immediate opportunities)
    const majorImpacts = [];
    
    // Medium Impact SDGs (relevant opportunities)
    const mediumImpacts = [];

    // Analyze company size and industry
    if (data.industry === 'Energy' || data.industry === 'Technology') {
      majorImpacts.push({
        id: 7,
        title: 'AFFORDABLE AND CLEAN ENERGY',
        color: '#fcc30b',
        icon: '☀️',
        description: 'Ensure access to affordable, reliable, sustainable and modern energy for all'
      });
    }

    if (data.industry === 'Manufacturing' || data.industry === 'Construction') {
      majorImpacts.push({
        id: 9,
        title: 'INDUSTRY, INNOVATION AND INFRASTRUCTURE',
        color: '#fd6925',
        icon: '🏭',
        description: 'Build resilient infrastructure, promote inclusive and sustainable industrialization'
      });
    }

    // Climate action is relevant for most companies
    mediumImpacts.push({
      id: 13,
      title: 'CLIMATE ACTION',
      color: '#3f7e44',
      icon: '🌍',
      description: 'Take urgent action to combat climate change and its impacts'
    });

    // Add more recommendations based on other factors
    if (data.companySize === 'MNC' || data.employeeCountries !== data.incorporationCountry) {
      mediumImpacts.push({
        id: 8,
        title: 'DECENT WORK AND ECONOMIC GROWTH',
        color: '#a21942',
        icon: '💼',
        description: 'Promote sustained, inclusive and sustainable economic growth'
      });
    }

    if (data.industry === 'Healthcare' || data.industry === 'Education') {
      mediumImpacts.push({
        id: 3,
        title: 'GOOD HEALTH AND WELL-BEING',
        color: '#4c9f38',
        icon: '❤️',
        description: 'Ensure healthy lives and promote well-being for all at all ages'
      });
    }

    // Default recommendations if no specific matches
    if (majorImpacts.length === 0) {
      majorImpacts.push({
        id: 7,
        title: 'AFFORDABLE AND CLEAN ENERGY',
        color: '#fcc30b',
        icon: '☀️',
        description: 'Ensure access to affordable, reliable, sustainable and modern energy for all'
      });
    }

    if (mediumImpacts.length === 0) {
      mediumImpacts.push({
        id: 13,
        title: 'CLIMATE ACTION',
        color: '#3f7e44',
        icon: '🌍',
        description: 'Take urgent action to combat climate change and its impacts'
      });
    }

    return [
      {
        category: 'Major Impacts',
        subtitle: 'Goals that are relevant with immediate opportunities',
        sdgs: majorImpacts.slice(0, 2) // Limit to 2 major impacts
      },
      {
        category: 'Medium Impacts',
        subtitle: 'Goals that are relevant with opportunities',
        sdgs: mediumImpacts.slice(0, 2) // Limit to 2 medium impacts
      }
    ];
  };

  if (!formData) {
    return (
      <div className="sdgs-container">
        <div className="sdgs-header">
          <h1>Recommended SDGs</h1>
          <div className="user-info">
            <span className="user-icon">👤</span>
            <span>{user?.name || 'Demo User'}</span>
            <span className="premium-badge">Premium User</span>
          </div>
        </div>
        <div className="no-data">
          <p>Please complete the company profile form first.</p>
          <Link to="/sdgs-form" className="btn btn-primary">Go to Form</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="sdgs-container">
      <div className="sdgs-header">
        <h1>Recommended SDGs</h1>
        <div className="user-info">
          <span className="user-icon">👤</span>
          <span>{user?.name || 'Demo User'}</span>
          <span className="premium-badge">Premium User</span>
        </div>
      </div>

      <div className="sdgs-layout">
        <div className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-squares">
              <div className="square yellow"></div>
              <div className="square teal"></div>
              <div className="square green"></div>
            </div>
            <h2>Trivity</h2>
          </div>
          
          <nav className="sidebar-nav">
            <ul>
              <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
              <li><Link to="/sustainability" className="nav-link">Sustainability Readiness Index</Link></li>
              <li><Link to="/sdgs-form" className="nav-link active">Recommended UN SDGs</Link></li>
              <li><Link to="/data-center" className="nav-link">Data Center</Link></li>
              <li><a href="#" className="nav-link">User Profile</a></li>
            </ul>
            
            <div className="coming-soon">COMING SOON</div>
            <ul>
              <li><a href="#" className="nav-link disabled">Green Financing</a></li>
              <li><a href="#" className="nav-link disabled">Green Exchange</a></li>
              <li><a href="#" className="nav-link disabled">Sustainability Frameworks</a></li>
              <li><a href="#" className="nav-link disabled">Report Generation</a></li>
              <li><a href="#" className="nav-link disabled">Water Usage</a></li>
              <li><a href="#" className="nav-link disabled">Supply Chain Mgmt</a></li>
              <li><a href="#" className="nav-link disabled">Biodiversity</a></li>
            </ul>
          </nav>

          <div className="sidebar-signout">
            <button onClick={logout} className="sign-out-link">Sign out</button>
          </div>
        </div>

        <div className="main-content">
          {recommendedSDGs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="sdg-category">
              <h2 className="category-title">{category.category}</h2>
              <p className="category-subtitle">{category.subtitle}</p>
              
              <div className="sdg-cards">
                {category.sdgs.map((sdg, index) => (
                  <div key={index} className="sdg-card" style={{ backgroundColor: sdg.color }}>
                    <div className="sdg-number">{sdg.id}</div>
                    <div className="sdg-icon">{sdg.icon}</div>
                    <div className="sdg-title">{sdg.title}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="results-actions">
            <Link to="/sdgs-form" className="btn btn-secondary">
              Update Company Profile
            </Link>
            <button className="btn btn-primary">
              Download Recommendations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SDGsResults;
