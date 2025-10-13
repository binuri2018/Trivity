import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const result = await register(formData.name, formData.email, formData.password);
    
    if (result.success) {
      setSuccess('Registration successful! You can now login.');
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="register-container">
      <div className="register-header">
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
          <h1>Join Trivity</h1>
        </div>
        <div className="header-right">
          <div className="auth-links">
            <Link to="/login" className="auth-link">Sign In</Link>
          </div>
        </div>
      </div>

      <div className="register-content">
        <div className="register-card">
          <div className="card-header">
            <h2>Create Your Account</h2>
            <p>Start your sustainability journey with Trivity today</p>
          </div>
          
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="form-input"
              />
            </div>
            
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
                placeholder="Create a strong password"
                required
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
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
            
            {success && (
              <div className="success-message">
                <span className="success-icon">✅</span>
                {success}
              </div>
            )}
            
            <button 
              type="submit" 
              className="register-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Creating Account...
                </>
              ) : (
                <>
                  <span className="btn-icon">🚀</span>
                  Create Account
                </>
              )}
            </button>
          </form>
          
          <div className="card-footer">
            <p>Already have an account? 
              <Link to="/login" className="link-primary"> Sign in here</Link>
            </p>
          </div>
        </div>
        
        <div className="register-benefits">
          <h3>What You'll Get</h3>
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">📊</div>
              <h4>Sustainability Dashboard</h4>
              <p>Track your environmental impact with real-time analytics and insights</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🎯</div>
              <h4>SDG Recommendations</h4>
              <p>Get personalized UN SDG goals tailored to your business needs</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">📈</div>
              <h4>Progress Tracking</h4>
              <p>Monitor your sustainability journey with detailed progress reports</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🌍</div>
              <h4>Carbon Footprint</h4>
              <p>Calculate and reduce your carbon emissions with our advanced tools</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">📋</div>
              <h4>Compliance Reports</h4>
              <p>Generate professional reports for stakeholders and compliance</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🤝</div>
              <h4>Expert Support</h4>
              <p>Access to sustainability experts and best practice guidance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
