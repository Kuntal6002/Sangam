// src/App.jsx - Main application component
import React, { useState } from 'react';
import { ClerkProvider, SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import SignInPage from './components/SignInPage';
import Dashboard from './components/Dashboard';
import ProfilePage from './components/ProfilePage';
import './App.css';

function App() {
  if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
    return <div>Please add your Clerk publishable key to .env</div>;
  }

  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/sign-in/*" element={<SignInPage />} />
            <Route 
              path="/" 
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <RequireAuth>
                  <ProfilePage />
                </RequireAuth>
              } 
            />
          </Routes>
        </div>
      </Router>
    </ClerkProvider>
  );
}

// Authentication wrapper component
function RequireAuth({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <Navigate to="/sign-in" replace />
      </SignedOut>
    </>
  );
}

export default App;