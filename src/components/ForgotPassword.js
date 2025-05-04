import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AuthForm.css';

const API_URL = 'http://localhost:5001';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error sending request');
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-wrapper">
        <div className="auth-logo">LOGO</div>
        <div className="auth-form">
          <h2>Check your email</h2>
          <div className="confirmation-message">
            <div className="confirmation-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="12" fill="#000"/>
                <path d="M7 12L10 15L17 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Instructions sent</h3>
            <p>We have sent password reset instructions to your email. Please check your inbox.</p>
          </div>
          <div className="auth-link" style={{marginTop: '24px'}}>
            <Link to="/login">Return to login</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-logo">LOGO</div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Forgot password?</h2>
        {error && (
          <div className="auth-error">
            <p>{error}</p>
          </div>
        )}
        <div className="auth-input-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button className="auth-btn" type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Send instructions'}
        </button>
        <div className="auth-link">
          <Link to="/login">Return to login</Link>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword; 