import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSustainability } from '../contexts/SustainabilityContext';
import './Results.css';

const Results = () => {
  const { user, logout } = useAuth();
  const { scores, isSubmitted } = useSustainability();

  // Calculate overall score and grade
  const overallScore = isSubmitted ? scores.overall : 0;
  const getGrade = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    if (score >= 50) return 'Poor';
    return 'Very Poor';
  };

  const getScoreDescription = (score) => {
    if (score >= 80) return 'Excellent understanding of Sustainability with comprehensive processes in place.';
    if (score >= 70) return 'Have a good understanding of Sustainability and there are processes in place to practise the requirements of Sustainability.';
    if (score >= 60) return 'Basic understanding of Sustainability with some processes in place.';
    if (score >= 50) return 'Limited understanding of Sustainability with minimal processes.';
    return 'Very limited understanding of Sustainability with no clear processes in place.';
  };

  const getMedalEligibility = (score) => {
    return score >= 60; // Award medal for scores 60% and above
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <h1>Sustainability Readiness Index</h1>
        <div className="user-info">
          <span className="user-icon">👤</span>
          <span>{user?.name || 'uditha'}</span>
          <span className="premium-badge">Premium User</span>
        </div>
      </div>

      <div className="results-layout">
        <div className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-leaves">
              <div className="leaf yellow"></div>
              <div className="leaf green"></div>
              <div className="leaf green"></div>
            </div>
            <h2>Trivity</h2>
          </div>
          
          <nav className="sidebar-nav">
            <ul>
              <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
              <li><Link to="/sustainability" className="nav-link active">Sustainability Readiness Index</Link></li>
              <li><a href="#" className="nav-link">Recommended UN SDGS</a></li>
              <li><a href="#" className="nav-link">Data Center</a></li>
              <li><a href="#" className="nav-link">User Profile</a></li>
            </ul>
            
            <div className="coming-soon">Coming Soon</div>
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
          <h2 className="results-title">Results</h2>
          
          {/* Total Score Section */}
          <div className="total-score-section">
            <div className="score-circle-container">
              <div className="score-circle">
                <div className="score-circle-inner">
                  <span className="score-grade">{getGrade(overallScore)}</span>
                  <span className="score-percentage">{overallScore}%</span>
                </div>
              </div>
            </div>
            <div className="score-description">
              <h3 className="description-title">What the Score Means</h3>
              <p className="description-text">{getScoreDescription(overallScore)}</p>
            </div>
          </div>

          {/* Medal Section */}
          {getMedalEligibility(overallScore) && (
            <div className="medal-section">
              <div className="medal-container">
                <div className="medal">
                  <div className="medal-inner">
                    <span className="medal-year">2021</span>
                    <span className="medal-text">Champion of Sustainability</span>
                  </div>
                </div>
              </div>
              <div className="medal-description">
                <p>You may proceed to add this medal on your public business profile as proof of your commitment to Sustainability.</p>
              </div>
            </div>
          )}

          {/* Score Breakdown Section */}
          <div className="score-breakdown-section">
            <h3 className="breakdown-title">Score Breakdown</h3>
            <div className="breakdown-circles">
              <div className="breakdown-item">
                <div className="breakdown-circle general">
                  <span className="breakdown-percentage">{isSubmitted ? scores.general : 0}%</span>
                </div>
                <span className="breakdown-label">General</span>
              </div>
              <div className="breakdown-item">
                <div className="breakdown-circle environmental">
                  <span className="breakdown-percentage">{isSubmitted ? scores.environmental : 0}%</span>
                </div>
                <span className="breakdown-label">Environment</span>
              </div>
              <div className="breakdown-item">
                <div className="breakdown-circle social">
                  <span className="breakdown-percentage">{isSubmitted ? scores.social : 0}%</span>
                </div>
                <span className="breakdown-label">Social</span>
              </div>
              <div className="breakdown-item">
                <div className="breakdown-circle governance">
                  <span className="breakdown-percentage">{isSubmitted ? scores.governance : 0}%</span>
                </div>
                <span className="breakdown-label">Governance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
