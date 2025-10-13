import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSustainability } from '../contexts/SustainabilityContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { scores, isSubmitted } = useSustainability();

  const recentActivities = [
    { title: "Sustainability Assessment Completed", time: "2 hours ago" },
    { title: "ESG Report Generated", time: "1 day ago" },
    { title: "Carbon Footprint Analysis", time: "3 days ago" },
    { title: "Sustainability Goals Updated", time: "1 week ago" }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="user-info">
          <span className="user-icon">👤</span>
          <span>{user?.name || 'Demo User'}</span>
          <span className="premium-badge">Premium User</span>
        </div>
      </div>

      <div className="dashboard-layout">
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
              <li><Link to="/dashboard" className="nav-link active">Dashboard</Link></li>
              <li><Link to="/sustainability" className="nav-link">Sustainability Readiness Index</Link></li>
              <li><a href="#" className="nav-link">Recommended UN SDGs</a></li>
              <li><a href="#" className="nav-link">Data Center</a></li>
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
          <div className="welcome-section">
            <h2>Welcome back, {user?.name || 'User'}!</h2>
            <p>Here's your sustainability overview for today.</p>
          </div>

          <div className="score-card">
            <div>
              <h3>Overall Sustainability Score</h3>
              <p>Based on your latest assessment</p>
            </div>
            <div className="score-value">{isSubmitted ? scores.overall : 0}%</div>
          </div>

          <div className="category-cards">
            <div className="category-card">
              <h4>Environmental</h4>
              <div className="category-score">{isSubmitted ? scores.environmental : 0}%</div>
              <p>Carbon footprint & resource management</p>
            </div>
            <div className="category-card">
              <h4>Social</h4>
              <div className="category-score">{isSubmitted ? scores.social : 0}%</div>
              <p>Employee wellbeing & diversity</p>
            </div>
            <div className="category-card">
              <h4>Governance</h4>
              <div className="category-score">{isSubmitted ? scores.governance : 0}%</div>
              <p>Leadership & ethical practices</p>
            </div>
          </div>

          <div className="dashboard-row">
            <div className="sustainability-trends">
              <h3>Sustainability Trends</h3>
              <div className="chart-placeholder">
                📈 Sustainability Progress Chart
              </div>
              <div className="trend-info">
                <span>Last 30 days</span>
                <span className="percentage">+12% ↗</span>
              </div>
            </div>
            
            <div className="esg-breakdown">
              <h3>ESG Breakdown</h3>
              <div className="chart-placeholder">
                <div className="overall-score">{isSubmitted ? scores.overall : 0}%</div>
                <div>Overall ESG Score</div>
              </div>
              <div className="legend">
                <div className="legend-item">
                  <div className="legend-color environmental"></div>
                  <span>Environmental</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color social"></div>
                  <span>Social</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color governance"></div>
                  <span>Governance</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-row">
            <div className="recent-activity">
              <div className="recent-activity-header">
                <h3>Recent Activity</h3>
                <Link to="/sustainability">View All</Link>
              </div>
              <ul className="recent-activity-list">
                {recentActivities.map((activity, index) => (
                  <li key={index} className="recent-activity-item">
                    <div className="activity-bullet"></div>
                    <div className="activity-details">
                      <strong>{activity.title}</strong>
                      <span>{activity.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <Link to="/sustainability" className="btn btn-primary">
                <span className="btn-icon">📊</span>
                Take Assessment
              </Link>
              <button className="btn btn-secondary">
                <span className="btn-icon">📋</span>
                Generate Report
              </button>
              <button className="btn btn-secondary">
                <span className="btn-icon">🎯</span>
                Set Goals
              </button>
              <button className="btn btn-secondary">
                <span className="btn-icon">📈</span>
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
