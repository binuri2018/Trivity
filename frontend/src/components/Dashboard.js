import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSustainability } from '../contexts/SustainabilityContext';
import { useCarbonEmissions } from '../contexts/CarbonEmissionsContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { scores, isSubmitted } = useSustainability();
  const { carbonData, hasData } = useCarbonEmissions();
  const [sdgData] = useState(null); // Remove setSdgData since it's not used

  useEffect(() => {
    // Load SDG data from localStorage
    const savedSdgData = localStorage.getItem('sdgFormData');
    if (savedSdgData) {
      setSdgData(JSON.parse(savedSdgData));
    }
  }, []);

  const getScoreLevel = (score, isSubmitted) => {
    if (!isSubmitted) return { level: 'Not Started', color: '#6c757d' };
    if (score >= 80) return { level: 'Excellent', color: '#28a745' };
    if (score >= 60) return { level: 'Good', color: '#17a2b8' };
    if (score >= 40) return { level: 'Fair', color: '#ffc107' };
    return { level: 'Poor', color: '#dc3545' };
  };

  const getScoreMessage = (score, isSubmitted) => {
    if (!isSubmitted) return "Complete the Sustainability Readiness Index assessment to get your personalized score and recommendations";
    if (score >= 80) return "Excellent understanding of sustainability with comprehensive processes in place";
    if (score >= 60) return "Have a good understanding of sustainability and there are processes in place to practice the requirements of sustainability";
    if (score >= 40) return "Basic understanding of sustainability with some processes in place";
    return "Limited understanding of sustainability, needs improvement in processes";
  };

  const overallScore = isSubmitted ? scores.overall : 0;
  const scoreInfo = getScoreLevel(overallScore, isSubmitted);

  return (
    <div className="summary-container">
      <div className="summary-header">
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
          <h1>Summary</h1>
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

      <div className="summary-layout">
        <div className="sidebar">
          <nav className="sidebar-nav">
            <ul className="primary-nav">
              <li><Link to="/dashboard" className="nav-link active">Dashboard</Link></li>
              <li><Link to="/sustainability" className="nav-link">Sustainability Readiness Index</Link></li>
              <li><Link to="/sdgs-form" className="nav-link">Recommended UN SDGs</Link></li>
              <li><Link to="/data-center" className="nav-link">Data Center</Link></li>
              <li><Link to="/profile" className="nav-link">User Profile</Link></li>
            </ul>
            
            <div className="nav-divider"></div>
            
            <div className="coming-soon">
              <h3>Coming Soon</h3>
              <ul>
                <li><span className="nav-link disabled">Green Financing</span></li>
                <li><span className="nav-link disabled">Green Exchange</span></li>
                <li><span className="nav-link disabled">Sustainability Frameworks</span></li>
                <li><span className="nav-link disabled">Report Generation</span></li>
                <li><span className="nav-link disabled">Water Usage</span></li>
                <li><span className="nav-link disabled">Supply Chain Mgmt</span></li>
                <li><span className="nav-link disabled">Biodiversity</span></li>
              </ul>
            </div>
          </nav>

          <div className="sign-out">
            <button onClick={logout} className="sign-out-link">
              <span className="sign-out-icon">🚪</span>
              Sign out
            </button>
          </div>
        </div>

        <div className="main-content">
          {/* Sustainability Readiness Index Section */}
          <div className="summary-section">
            <h2 className="section-title">Sustainability Readiness Index</h2>
            <div className="sri-content">
              <div className="total-score-section">
                <div className="score-gauge">
                  <div className="gauge-container">
                    <div className="gauge" style={{ '--score': overallScore, '--color': scoreInfo.color }}>
                      <div className="gauge-fill"></div>
                      <div className="gauge-text">
                        <span className="score-level">{scoreInfo.level}</span>
                        <span className="score-percentage">{overallScore}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="score-explanation">
                    <h4>What the score means</h4>
                    <p>{getScoreMessage(overallScore, isSubmitted)}</p>
                  </div>
                </div>
                <div className="medals-section">
                  <h4>Medals obtained</h4>
                  <div className="medal">
                    <div className="medal-icon">🏆</div>
                    <div className="medal-text">2021 Champion of Sustainability</div>
                  </div>
                  <Link to="/sustainability" className="btn btn-primary">
                    Proceed to SRI
                  </Link>
                </div>
              </div>
              <div className="score-breakdown">
                <div className="breakdown-gauge">
                  <div className="mini-gauge" style={{ '--score': isSubmitted ? scores.general : 0, '--color': '#dc3545' }}>
                    <div className="mini-gauge-fill"></div>
                    <span className="mini-gauge-text">General</span>
                    <span className="mini-gauge-score">{isSubmitted ? scores.general : 0}%</span>
                  </div>
                </div>
                <div className="breakdown-gauge">
                  <div className="mini-gauge" style={{ '--score': isSubmitted ? scores.environmental : 0, '--color': '#dc3545' }}>
                    <div className="mini-gauge-fill"></div>
                    <span className="mini-gauge-text">Environment</span>
                    <span className="mini-gauge-score">{isSubmitted ? scores.environmental : 0}%</span>
                  </div>
                </div>
                <div className="breakdown-gauge">
                  <div className="mini-gauge" style={{ '--score': isSubmitted ? scores.social : 0, '--color': '#dc3545' }}>
                    <div className="mini-gauge-fill"></div>
                    <span className="mini-gauge-text">Social</span>
                    <span className="mini-gauge-score">{isSubmitted ? scores.social : 0}%</span>
                  </div>
                </div>
                <div className="breakdown-gauge">
                  <div className="mini-gauge" style={{ '--score': isSubmitted ? scores.governance : 0, '--color': '#dc3545' }}>
                    <div className="mini-gauge-fill"></div>
                    <span className="mini-gauge-text">Governance</span>
                    <span className="mini-gauge-score">{isSubmitted ? scores.governance : 0}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended UN SDG Goals Section */}
          <div className="summary-section">
            <h2 className="section-title">Recommended 17 UN SDG Goals</h2>
            <p className="section-description">Based on your company's profile here are your top 2 UN SDG Goals</p>
            <div className="sdg-recommendations">
              <div className="sdg-recommendation primary">
                <div className="sdg-icon primary">
                  <span className="sdg-number">7</span>
                  <div className="sdg-symbol">☀️</div>
                </div>
                <div className="sdg-info">
                  <h4>SDG 7: AFFORDABLE AND CLEAN ENERGY</h4>
                  <span className="sdg-label">Primary</span>
                  <p>Goals that are relevant with immediate opportunities</p>
                  <button className="btn btn-learn-more">Learn More</button>
                </div>
              </div>
              <div className="sdg-recommendation secondary">
                <div className="sdg-icon secondary">
                  <span className="sdg-number">13</span>
                  <div className="sdg-symbol">🌍</div>
                </div>
                <div className="sdg-info">
                  <h4>SDG 13: CLIMATE ACTION</h4>
                  <span className="sdg-label">Secondary</span>
                  <p>Goals that are relevant with long term opportunities</p>
                  <button className="btn btn-learn-more">Learn More</button>
                </div>
              </div>
            </div>
          </div>

          {/* Data Center Section */}
          <div className="summary-section">
            <h2 className="section-title">Data Center</h2>
            <div className="data-center-content">
              {hasData() ? (
                <div className="carbon-data-summary">
                  <h4>Carbon Emissions Data Summary</h4>
                  <div className="carbon-scopes">
                    {carbonData.scope1 && Object.keys(carbonData.scope1).length > 0 && (
                      <div className="scope-summary">
                        <h5>Scope 1: Direct Emissions</h5>
                        <p>Data available for {Object.keys(carbonData.scope1).length} category(ies)</p>
                      </div>
                    )}
                    {carbonData.scope2 && Object.keys(carbonData.scope2).length > 0 && (
                      <div className="scope-summary">
                        <h5>Scope 2: Indirect Emissions</h5>
                        <p>Data available for {Object.keys(carbonData.scope2).length} category(ies)</p>
                        {carbonData.scope2.purchasedElectricity && (
                          <div className="electricity-details">
                            <p><strong>Electricity Consumption:</strong> {carbonData.scope2.purchasedElectricity.electricityConsumption} {carbonData.scope2.purchasedElectricity.units}</p>
                            <p><strong>Year:</strong> {carbonData.scope2.purchasedElectricity.year}</p>
                            <p><strong>Facility ID:</strong> {carbonData.scope2.purchasedElectricity.facilityId}</p>
                          </div>
                        )}
                      </div>
                    )}
                    {carbonData.scope3 && Object.keys(carbonData.scope3).length > 0 && (
                      <div className="scope-summary">
                        <h5>Scope 3: Other Indirect Emissions</h5>
                        <p>Data available for {Object.keys(carbonData.scope3).length} category(ies)</p>
                      </div>
                    )}
                  </div>
                  <Link to="/data-center" className="btn btn-primary">
                    View/Edit Carbon Data
                  </Link>
                </div>
              ) : (
                <div>
                  <p>Sorry, there is no information available to show. Please click the button below to fill in the required information.</p>
                  <Link to="/data-center" className="btn btn-primary">
                    Proceed to Carbon Emissions Calculator
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
