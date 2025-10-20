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
            <Link to="/sdgs-form" className={`nav-link ${isActive('/sdgs-form') ? 'active' : ''}`}>
              Recommended UN SDGs
            </Link>
            <Link to="/data-center" className={`nav-link ${isActive('/data-center') ? 'active' : ''}`}>
              Data Center
            </Link>
            <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>
              User Profile
            </Link>
          </nav>

          <div className="coming-soon">
            <h3>COMING SOON</h3>
            <span className="nav-link disabled">Green Financing</span>
            <span className="nav-link disabled">Green Exchange</span>
            <span className="nav-link disabled">Sustainability Frameworks</span>
            <span className="nav-link disabled">Report Generation</span>
            <span className="nav-link disabled">Water Usage</span>
            <span className="nav-link disabled">Supply Chain Mgmt</span>
            <span className="nav-link disabled">Biodiversity</span>
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
