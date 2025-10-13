import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './SDGsForm.css';

const SDGsForm = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    isGovernmental: 'No',
    companySize: 'SME',
    incorporationCountry: 'Sri Lanka',
    employeeCountries: 'Sri Lanka',
    industry: '',
    companyDescription: ''
  });
  const [wordCount, setWordCount] = useState(0);

  const countries = [
    'Sri Lanka', 'India', 'Bangladesh', 'Pakistan', 'Nepal', 'Maldives',
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
    'France', 'Japan', 'China', 'Singapore', 'Malaysia', 'Thailand'
  ];

  const industries = [
    '---- select one ----',
    'Technology', 'Manufacturing', 'Healthcare', 'Finance', 'Education',
    'Agriculture', 'Energy', 'Transportation', 'Construction', 'Retail',
    'Hospitality', 'Media', 'Consulting', 'Real Estate', 'Other'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      companyDescription: value
    }));
    setWordCount(value.trim().split(/\s+/).filter(word => word.length > 0).length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (formData.industry === '' || formData.industry === '---- select one ----') {
      alert('Please select an industry');
      return;
    }
    
    if (wordCount < 100) {
      alert('Please provide at least 100 words about your company');
      return;
    }

    // Store form data in localStorage
    localStorage.setItem('sdgFormData', JSON.stringify(formData));
    
    // Navigate to results page
    navigate('/sdgs-results');
  };

  return (
    <div className="sdgs-container">
      <div className="sdgs-header">
        <div className="header-left">
          <div className="trivity-logo">
            <div className="logo-leaves">
              <div className="leaf yellow"></div>
              <div className="leaf green"></div>
              <div className="leaf green"></div>
            </div>
            <span className="logo-text">Trivity</span>
          </div>
        </div>
        <div className="header-center">
          <h1>17 UN SDG Goals</h1>
        </div>
        <div className="header-right">
          <div className="user-profile">
            <div className="user-icon">👤</div>
            <div className="user-info">
              <div className="user-name">{user?.name || 'Demo User'}</div>
              <div className="user-type">Premium User</div>
            </div>
          </div>
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
              <li><Link to="/profile" className="nav-link">User Profile</Link></li>
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
            <button onClick={logout} className="sign-out-link">
              <span className="sign-out-icon">🚪</span>
              Sign out
            </button>
          </div>
        </div>

        <div className="main-content">
          <div className="intro-text">
            The system will recommend you two UN SDG Goals out of the 17 goals based on your company's profile. These goals will give you a clear direction on where your company will have the most impact.
          </div>

          <form onSubmit={handleSubmit} className="sdgs-form">
            <div className="form-group">
              <label className="form-label">Is your company part of the Governmental Bodies?</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="isGovernmental"
                    value="Yes"
                    checked={formData.isGovernmental === 'Yes'}
                    onChange={(e) => handleInputChange('isGovernmental', e.target.value)}
                  />
                  <span className="radio-label">Yes</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="isGovernmental"
                    value="No"
                    checked={formData.isGovernmental === 'No'}
                    onChange={(e) => handleInputChange('isGovernmental', e.target.value)}
                  />
                  <span className="radio-label">No</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">If you're not part of the Governmental Bodies, what is the size of your company?</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="companySize"
                    value="Small"
                    checked={formData.companySize === 'Small'}
                    onChange={(e) => handleInputChange('companySize', e.target.value)}
                  />
                  <span className="radio-label">Small</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="companySize"
                    value="SME"
                    checked={formData.companySize === 'SME'}
                    onChange={(e) => handleInputChange('companySize', e.target.value)}
                  />
                  <span className="radio-label">SME</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="companySize"
                    value="MNC"
                    checked={formData.companySize === 'MNC'}
                    onChange={(e) => handleInputChange('companySize', e.target.value)}
                  />
                  <span className="radio-label">MNC</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Where is your company incorporated in?</label>
              <select
                className="form-select"
                value={formData.incorporationCountry}
                onChange={(e) => handleInputChange('incorporationCountry', e.target.value)}
              >
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Do you have any employees from a different country?</label>
              <select
                className="form-select"
                value={formData.employeeCountries}
                onChange={(e) => handleInputChange('employeeCountries', e.target.value)}
              >
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Which industry is your company in?</label>
              <select
                className="form-select"
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
              >
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Please share more about your company (Min 100 words)</label>
              <textarea
                className="form-textarea"
                value={formData.companyDescription}
                onChange={handleDescriptionChange}
                placeholder="Describe your company's mission, values, current sustainability initiatives, and areas where you'd like to make an impact..."
                rows="6"
              />
              <div className="word-count">Word Count: {wordCount}</div>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SDGsForm;
