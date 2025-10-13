import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSustainability } from '../contexts/SustainabilityContext';
import './SustainabilityReadiness.css';

const SustainabilityReadiness = () => {
  const [activeTab, setActiveTab] = useState('General');
  const { user, logout } = useAuth();
  const { answers, updateAnswer, submitAnswers, isSubmitted } = useSustainability();

  const questions = {
    General: [
      "Is Sustainability important in your company",
      "Does your company have a team to look at the Sustainability aspects of the business",
      "Do you think Sustainability is crucial for every company",
      "Does your have a clear understanding of what ESG means in Sustainability"
    ],
    Environment: [
      "IS your company aware of its carbon footprint",
      "Are there steps planned to reduce the carbon footprint of the company?",
      "Is your company aware of its energy usage?",
      "Is your company aware of its impact on air and water quality?",
      "Are you aware of the natural resources used by your company?"
    ],
    Social: [
      "Does your company have an equal employment opportunities for both genders?",
      "Are you satisfied with the company's culture?",
      "Is your company aware on the important of mental wellbeing?",
      "Are you satisfied with the company's working environment?",
      "Does your company provided equal career advancement opportunities to its employees?",
      "Do you feel safe working in your company?",
      "Are the company policies fair to the employees?",
      "Does your company's policies keep up with the times?(e.g. how your company support employees in response to the pandemic)",
      "Can you trust the management to handle difficult situations fairly?(e.g. sexual harassment, bullying, discrimination)"
    ],
    Governance: [
      "Does your company have a balance of board composition? (Gender, representative)",
      "Is the management team aware about importance of corporate culture within the company?",
      "Is your management aware of any unethical behavior on the ground?",
      "Does your company have a board of directors to hold the CEO accountable?",
      "Does your company have any PDPA policies?",
      "Does your company have a team to manage data and its protection?",
      "Does your company priorities diversity and inclusivity?",
      "Can you trust the management to make ethical decisions?",
      "Are there processes in place to prevent corruption and bribery of the company's people and resources?"
    ]
  };

  const handleAnswerChange = (question, answer) => {
    updateAnswer(question, answer);
  };

  const handleSaveDraft = () => {
    // Save draft functionality - data is automatically saved to context
    alert('Draft saved successfully!');
  };

  const handleSubmit = () => {
    submitAnswers();
    alert('Answers submitted successfully! Your scores have been calculated.');
  };

  const tabs = ['General', 'Environment', 'Social', 'Governance'];

  return (
    <div className="sustainability-container">
      <div className="sustainability-header">
        <h1>New Carbon Emission Data</h1>
        <div className="user-info">
          <span className="user-icon">👤</span>
          <span>{user?.name || 'Demo User'}</span>
          <span className="premium-badge">Premium User</span>
        </div>
      </div>

      <div className="sustainability-layout">
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
              <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
              <li><Link to="/sustainability" className="nav-link active">Sustainability Readiness Index</Link></li>
              <li><Link to="/sdgs-form" className="nav-link">Recommended UN SDGs</Link></li>
              <li><Link to="/data-center" className="nav-link">Data Center</Link></li>
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
          <div className="intro-text">
            By answering the question below, our algorithm will be able to gauge your company's readiness for sustainable business processes.
          </div>

          <div className="tabs">
            {tabs.map(tab => (
              <button
                key={tab}
                className={`tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="questions-section">
            <h2 className="section-title">{activeTab}</h2>
            <div className="questions-container">
              {questions[activeTab].map((question, index) => (
                <div key={index} className="question-card">
                  <h3 className="question-text">{question}</h3>
                  <div className="answer-options">
                    <label className="radio-option">
                      <input
                        type="radio"
                        name={`question-${activeTab}-${index}`}
                        value="Yes"
                        checked={answers[question] === 'Yes'}
                        onChange={() => handleAnswerChange(question, 'Yes')}
                      />
                      <span className="radio-label">Yes</span>
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name={`question-${activeTab}-${index}`}
                        value="No"
                        checked={answers[question] === 'No'}
                        onChange={() => handleAnswerChange(question, 'No')}
                      />
                      <span className="radio-label">No</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="action-buttons">
            <button className="save-draft-btn" onClick={handleSaveDraft}>
              Save Draft
            </button>
            <button className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityReadiness;
