import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './DataCenter.css';

const DataCenter = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    exclusions: '',
    facilityId: '1',
    company: '',
    country: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddFacility = () => {
    // Add facility logic
    console.log('Adding facility:', formData);
    alert('Facility added successfully!');
  };

  const handleInputData = (scope, category) => {
    // Handle input data for different scopes and categories
    console.log(`Input data for ${scope} - ${category}`);
    
    // Navigate to specific form based on scope and category
    if (scope === 'Scope 2' && category === 'Purchased Electricity') {
      navigate('/scope2-form');
    } else {
      alert(`Opening data input form for ${scope} - ${category}`);
    }
  };

  return (
    <div className="data-center-container">
      <div className="data-center-header">
        <div className="header-left">
          <div className="trivity-logo">
            <div className="logo-leaves">
              <div className="leaf green"></div>
              <div className="leaf yellow"></div>
            </div>
            <span className="logo-text">Trivity</span>
          </div>
        </div>
        <div className="header-center">
          <h1>New Carbon Emission Data</h1>
        </div>
        <div className="header-right">
          <div className="user-profile">
            <div className="user-icon">👤</div>
            <div className="user-info">
              <div className="user-name">{user?.name || 'uditha'}</div>
              <div className="user-type">Premium User</div>
            </div>
          </div>
        </div>
      </div>

      <div className="data-center-layout">
        <div className="sidebar">
          <nav className="sidebar-nav">
            <ul className="primary-nav">
              <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
              <li><Link to="/sustainability" className="nav-link">Sustainability Readiness Index</Link></li>
              <li><Link to="/sdgs-form" className="nav-link">Recommended UN SDGS</Link></li>
              <li><Link to="/data-center" className="nav-link active">Data Center</Link></li>
              <li><a href="#" className="nav-link">User Profile</a></li>
            </ul>
            
            <div className="nav-divider"></div>
            
            <div className="coming-soon">
              <h3>Coming Soon</h3>
              <ul>
                <li><a href="#" className="nav-link disabled">Green Financing</a></li>
                <li><a href="#" className="nav-link disabled">Green Exchange</a></li>
                <li><a href="#" className="nav-link disabled">Sustainability Frameworks</a></li>
                <li><a href="#" className="nav-link disabled">Report Generation</a></li>
                <li><a href="#" className="nav-link disabled">Water Usage</a></li>
                <li><a href="#" className="nav-link disabled">Supply Chain Mgmt</a></li>
                <li><a href="#" className="nav-link disabled">Biodiversity</a></li>
              </ul>
            </div>
          </nav>

          <div className="sign-out">
            <button onClick={logout} className="sign-out-link">Sign out</button>
          </div>
        </div>

        <div className="main-content">
          {/* Section 1: Date and Exclusions */}
          <div className="form-section">
            <div className="section-row">
              <div className="input-group">
                <label>Start Date</label>
                <div className="date-input">
                  <input
                    type="text"
                    placeholder="dd/mm/yyyy"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                  />
                  <span className="calendar-icon">📅</span>
                </div>
              </div>
              <div className="input-group">
                <label>End Date</label>
                <div className="date-input">
                  <input
                    type="text"
                    placeholder="dd/mm/yyyy"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                  />
                  <span className="calendar-icon">📅</span>
                </div>
              </div>
              <div className="input-group">
                <label>Exclusions(yy/mm)</label>
                <input
                  type="text"
                  value={formData.exclusions}
                  onChange={(e) => handleInputChange('exclusions', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Facility Information */}
          <div className="form-section">
            <div className="section-row">
              <div className="input-group">
                <label>Facility ID</label>
                <select
                  value={formData.facilityId}
                  onChange={(e) => handleInputChange('facilityId', e.target.value)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div className="input-group">
                <label>Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                />
              </div>
              <div className="add-facility-btn">
                <button onClick={handleAddFacility} className="btn btn-primary">
                  Add Facility
                </button>
              </div>
            </div>
          </div>

          {/* Section 3: Carbon Emission Scope 1 */}
          <div className="form-section">
            <h2 className="scope-title">Carbon Emission Scope 1: Incomplete</h2>
            <div className="scope-categories">
              <div className="category-card">
                <h3>Stationary Combustion</h3>
                <button 
                  onClick={() => handleInputData('Scope 1', 'Stationary Combustion')}
                  className="btn btn-input-data"
                >
                  Input Data
                </button>
              </div>
              <div className="category-card">
                <h3>Mobile Combustion</h3>
                <button 
                  onClick={() => handleInputData('Scope 1', 'Mobile Combustion')}
                  className="btn btn-input-data"
                >
                  Input Data
                </button>
              </div>
              <div className="category-card">
                <h3>Refrigerants(Beta)</h3>
                <button 
                  onClick={() => handleInputData('Scope 1', 'Refrigerants')}
                  className="btn btn-input-data"
                >
                  Input Data
                </button>
              </div>
            </div>
          </div>

          {/* Section 4: Carbon Emission Scope 2 */}
          <div className="form-section">
            <h2 className="scope-title">Carbon Emission Scope 2: Incomplete</h2>
            <div className="scope-categories">
              <div className="category-card">
                <h3>Purchased Electricity</h3>
                <button 
                  onClick={() => handleInputData('Scope 2', 'Purchased Electricity')}
                  className="btn btn-input-data"
                >
                  Input Data
                </button>
              </div>
            </div>
          </div>

          {/* Section 5: Carbon Emission Scope 3 */}
          <div className="form-section">
            <h2 className="scope-title">Carbon Emission Scope 3: Incomplete</h2>
            <div className="scope-categories">
              <div className="category-card">
                <h3>Transportation</h3>
                <button 
                  onClick={() => handleInputData('Scope 3', 'Transportation')}
                  className="btn btn-input-data"
                >
                  Input Data
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="navigation-buttons">
            <button className="btn btn-secondary">Previous</button>
            <button className="btn btn-primary">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCenter;
