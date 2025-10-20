import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './UserProfile.css';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Demo User',
    email: user?.email || 'demo@example.com',
    company: 'Trivity Solutions',
    position: 'Sustainability Manager',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    joinDate: 'January 2024',
    subscriptionType: 'Premium User'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  // const handleCancel = () => { // Remove unused function
  //   setIsEditing(false);
  //   // Reset to original data
  //   setProfileData({
  //     name: user?.name || 'Demo User',
  //     email: user?.email || 'demo@example.com',
  //     company: 'Trivity Solutions',
  //     position: 'Sustainability Manager',
  //     phone: '+1 (555) 123-4567',
  //     location: 'New York, NY',
  //     joinDate: 'January 2024',
  //     subscriptionType: 'Premium User'
  //   });
  // };

  return (
    <div className="profile-container">
      <div className="profile-header">
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
          <h1>User Profile</h1>
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

      <div className="profile-layout">
        <div className="sidebar">
          <nav className="sidebar-nav">
            <ul className="primary-nav">
              <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
              <li><Link to="/sustainability" className="nav-link">Sustainability Readiness Index</Link></li>
              <li><Link to="/sdgs-form" className="nav-link">Recommended UN SDGs</Link></li>
              <li><Link to="/data-center" className="nav-link">Data Center</Link></li>
              <li><Link to="/profile" className="nav-link active">User Profile</Link></li>
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
          <div className="profile-section">
            <div className="profile-card">
              <div className="profile-avatar">
                <div className="avatar-circle">
                  <span className="avatar-text">{profileData.name.charAt(0).toUpperCase()}</span>
                </div>
                <div className="avatar-status">
                  <div className="status-dot"></div>
                  <span>Active</span>
                </div>
              </div>

              <div className="profile-info">
                <h2>{profileData.name}</h2>
                <p className="profile-title">{profileData.position}</p>
                <p className="profile-company">{profileData.company}</p>
                <div className="profile-badge">
                  <span className="badge premium">{profileData.subscriptionType}</span>
                </div>
              </div>

              <div className="profile-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
                {isEditing && (
                  <button 
                    className="btn btn-success"
                    onClick={handleSave}
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </div>

            <div className="profile-details">
              <div className="details-section">
                <h3>Personal Information</h3>
                <div className="form-group">
                  <label>Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  ) : (
                    <p className="form-value">{profileData.name}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  ) : (
                    <p className="form-value">{profileData.email}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  ) : (
                    <p className="form-value">{profileData.phone}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={profileData.location}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  ) : (
                    <p className="form-value">{profileData.location}</p>
                  )}
                </div>
              </div>

              <div className="details-section">
                <h3>Professional Information</h3>
                <div className="form-group">
                  <label>Company</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="company"
                      value={profileData.company}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  ) : (
                    <p className="form-value">{profileData.company}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Position</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="position"
                      value={profileData.position}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  ) : (
                    <p className="form-value">{profileData.position}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Member Since</label>
                  <p className="form-value">{profileData.joinDate}</p>
                </div>

                <div className="form-group">
                  <label>Subscription Type</label>
                  <p className="form-value">{profileData.subscriptionType}</p>
                </div>
              </div>

              <div className="details-section">
                <h3>Account Settings</h3>
                <div className="settings-group">
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Email Notifications</h4>
                      <p>Receive updates about your sustainability progress</p>
                    </div>
                    <div className="setting-toggle">
                      <input type="checkbox" id="email-notifications" defaultChecked />
                      <label htmlFor="email-notifications" className="toggle-label"></label>
                    </div>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Weekly Reports</h4>
                      <p>Get weekly summaries of your sustainability metrics</p>
                    </div>
                    <div className="setting-toggle">
                      <input type="checkbox" id="weekly-reports" defaultChecked />
                      <label htmlFor="weekly-reports" className="toggle-label"></label>
                    </div>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Data Sharing</h4>
                      <p>Allow anonymous data sharing for research purposes</p>
                    </div>
                    <div className="setting-toggle">
                      <input type="checkbox" id="data-sharing" />
                      <label htmlFor="data-sharing" className="toggle-label"></label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
