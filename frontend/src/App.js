import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SustainabilityProvider } from './contexts/SustainabilityContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import SustainabilityReadiness from './components/SustainabilityReadiness';
import Results from './components/Results';
import './App.css';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  return user ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  return !user ? children : <Navigate to="/dashboard" />;
}

function App() {
  return (
    <AuthProvider>
      <SustainabilityProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route 
                path="/login" 
                element={
                  <PublicRoute>
                    <div>
                      <Navbar />
                      <Login />
                    </div>
                  </PublicRoute>
                } 
              />
              <Route 
                path="/register" 
                element={
                  <PublicRoute>
                    <div>
                      <Navbar />
                      <Register />
                    </div>
                  </PublicRoute>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/sustainability" 
                element={
                  <ProtectedRoute>
                    <SustainabilityReadiness />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/results" 
                element={
                  <ProtectedRoute>
                    <Results />
                  </ProtectedRoute>
                } 
              />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </Router>
      </SustainabilityProvider>
    </AuthProvider>
  );
}

export default App;
