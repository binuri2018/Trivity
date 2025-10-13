import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SustainabilityProvider } from './contexts/SustainabilityContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import SustainabilityReadiness from './components/SustainabilityReadiness';
import SDGsForm from './components/SDGsForm';
import SDGsResults from './components/SDGsResults';
import DataCenter from './components/DataCenter';
import Scope2Form from './components/Scope2Form';
import UserProfile from './components/UserProfile';
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
                    <Login />
                  </PublicRoute>
                } 
              />
              <Route 
                path="/register" 
                element={
                  <PublicRoute>
                    <Register />
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
                path="/sdgs-form" 
                element={
                  <ProtectedRoute>
                    <SDGsForm />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/sdgs-results" 
                element={
                  <ProtectedRoute>
                    <SDGsResults />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/data-center" 
                element={
                  <ProtectedRoute>
                    <DataCenter />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/scope2-form" 
                element={
                  <ProtectedRoute>
                    <Scope2Form />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <UserProfile />
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
