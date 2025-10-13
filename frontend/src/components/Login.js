import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-header">
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
          <h1>Welcome Back</h1>
        </div>
        <div className="header-right">
          <div className="auth-links">
            <Link to="/register" className="auth-link">Sign Up</Link>
          </div>
        </div>
      </div>

      <div className="login-content">
        <div className="login-card">
          <div className="card-header">
            <h2>Sign In to Your Account</h2>
            <p>Enter your credentials to access your sustainability dashboard</p>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="form-input"
              />
            </div>
            
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}
            
            <button 
              type="submit" 
              className="login-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Signing In...
                </>
              ) : (
                <>
                  <span className="btn-icon">🚀</span>
                  Sign In
                </>
              )}
            </button>
          </form>
          
          <div className="card-footer">
            <p>Don't have an account? 
              <Link to="/register" className="link-primary"> Create one here</Link>
            </p>
          </div>
        </div>
        
        <div className="login-features">
          <h3>Why Choose Trivity?</h3>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🌱</div>
              <h4>Sustainability Tracking</h4>
              <p>Monitor your environmental impact with comprehensive analytics</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <h4>SDG Alignment</h4>
              <p>Align your business with UN Sustainable Development Goals</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📈</div>
              <h4>Progress Reports</h4>
              <p>Generate detailed reports on your sustainability journey</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
