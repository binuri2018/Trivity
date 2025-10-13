import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './SharedLayout.css';

const SharedLayout = ({ children, title = "Dashboard" }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="shared-container">
      <div className="shared-header">
        <h1>{title}</h1>
        <div className="user-info">
          <span className="user-icon">👤</span>
          <span>{user?.name || 'Demo User'}</span>
          <span className="premium-badge">Premium User</span>
        </div>
      </div>

      <div className="shared-layout">
        <div className="sidebar">
          <div className="logo">
            <div className="logo-squares">
              <div className="square yellow"></div>
              <div className="square teal"></div>
              <div className="square green"></div>
            </div>
            <span className="logo-text">Trivity</span>
          </div>
          
          <nav className="sidebar-nav">
            <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
              Dashboard
            </Link>
            <Link to="/sustainability" className={`nav-link ${isActive('/sustainability') ? 'active' : ''}`}>
              Sustainability Readiness Index
            </Link>
            <a href="#" className="nav-link">Recommended UN SDGs</a>
            <a href="#" className="nav-link">Data Center</a>
            <a href="#" className="nav-link">User Profile</a>
          </nav>

          <div className="coming-soon">
            <h3>COMING SOON</h3>
            <a href="#" className="nav-link disabled">Green Financing</a>
            <a href="#" className="nav-link disabled">Green Exchange</a>
            <a href="#" className="nav-link disabled">Sustainability Frameworks</a>
            <a href="#" className="nav-link disabled">Report Generation</a>
            <a href="#" className="nav-link disabled">Water Usage</a>
            <a href="#" className="nav-link disabled">Supply Chain Mgmt</a>
            <a href="#" className="nav-link disabled">Biodiversity</a>
          </div>

          <div className="sign-out">
            <button onClick={logout} className="sign-out-link">
              Sign out
            </button>
          </div>
        </div>

        <div className="main-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SharedLayout;
