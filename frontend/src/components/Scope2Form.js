import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Scope2Form.css';

const Scope2Form = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    year: '2018',
    facilityId: '2',
    electricityConsumption: '23',
    units: 'Btu',
    calculationApproach: 'Purchased Electricity - M',
    emissionFactor: 'Grid Average/Location E',
    customEmissionFactor: 'Not Applicable'
  });

  const years = ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];
  const facilityIds = ['1', '2', '3', '4', '5'];
  const units = ['Btu', 'kWh', 'MWh', 'GJ', 'MMBtu'];
  const calculationApproaches = [
    'Purchased Electricity - M',
    'Purchased Electricity - L',
    'Purchased Electricity - S'
  ];
  const emissionFactors = [
    'Grid Average/Location E',
    'Grid Average/Location M',
    'Grid Average/Location S'
  ];
  const customEmissionFactors = [
    'Not Applicable',
    'Custom Factor 1',
    'Custom Factor 2'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Scope 2 data submitted:', formData);
    alert('Scope 2 data saved successfully!');
    // Navigate back to Data Center
    navigate('/data-center');
  };

  const handleCancel = () => {
    navigate('/data-center');
  };

  return (
    <div className="scope2-container">
      <div className="scope2-header">
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
          <h1>Scope 2: Purchased Electricity</h1>
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

      <div className="scope2-layout">
        <div className="sidebar">
          <nav className="sidebar-nav">
            <ul className="primary-nav">
              <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
              <li><Link to="/sustainability" className="nav-link">Sustainability Readiness Index</Link></li>
              <li><Link to="/sdgs-form" className="nav-link">Recommended UN SDGs</Link></li>
              <li><Link to="/data-center" className="nav-link">Data Center</Link></li>
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
          <div className="intro-section">
            <p className="intro-text">
              Electricity and other sources of energy purchased from your local utility (that is not combusted on-site). 
              Examples include electricity, steam, and chilled or hot water. To generate this energy, utilities combust coal, 
              natural gas, and other fossil fuel, emitting carbon dioxide, methane, and nitrous oxide in the process.
            </p>
          </div>

          <div className="data-required-section">
            <h3>Data required</h3>
            <ul>
              <li>Energy source</li>
              <li>Energy usage</li>
              <li>Units (kWh for electricity)</li>
            </ul>
          </div>

          <div className="form-section">
            <h3 className="form-title">Electrical consumption 1</h3>
            <form onSubmit={handleSubmit} className="scope2-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Year</label>
                  <select
                    value={formData.year}
                    onChange={(e) => handleInputChange('year', e.target.value)}
                    className="form-select"
                  >
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Facility ID</label>
                  <div className="select-wrapper">
                    <select
                      value={formData.facilityId}
                      onChange={(e) => handleInputChange('facilityId', e.target.value)}
                      className="form-select"
                    >
                      {facilityIds.map(id => (
                        <option key={id} value={id}>{id}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Amount of Electricity consumption</label>
                  <input
                    type="text"
                    value={formData.electricityConsumption}
                    onChange={(e) => handleInputChange('electricityConsumption', e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Units</label>
                  <select
                    value={formData.units}
                    onChange={(e) => handleInputChange('units', e.target.value)}
                    className="form-select"
                  >
                    {units.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Calculation Approach</label>
                  <select
                    value={formData.calculationApproach}
                    onChange={(e) => handleInputChange('calculationApproach', e.target.value)}
                    className="form-select"
                  >
                    {calculationApproaches.map(approach => (
                      <option key={approach} value={approach}>{approach}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Emission Factor</label>
                  <select
                    value={formData.emissionFactor}
                    onChange={(e) => handleInputChange('emissionFactor', e.target.value)}
                    className="form-select"
                  >
                    {emissionFactors.map(factor => (
                      <option key={factor} value={factor}>{factor}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Custom Emission Factor</label>
                  <select
                    value={formData.customEmissionFactor}
                    onChange={(e) => handleInputChange('customEmissionFactor', e.target.value)}
                    className="form-select"
                  >
                    {customEmissionFactors.map(factor => (
                      <option key={factor} value={factor}>{factor}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" onClick={handleCancel} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scope2Form;
