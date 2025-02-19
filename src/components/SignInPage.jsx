import React from 'react';
import { SignIn } from '@clerk/clerk-react';

function SignInPage() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome to SangamChat</h1>
        <p className="auth-subtitle">Sign in with your Sangam.ai account</p>
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      </div>
    </div>
  );
}

export default SignInPage;