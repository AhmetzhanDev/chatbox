import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AuthForm.css';

const API_URL = 'http://localhost:5001';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration error');
      }

      setIsRegistered(true);
    } catch (err) {
      console.error('Registration error:', err);
      if (err.message === 'Failed to fetch') {
        setError('Could not connect to the server. Please check if the server is running and accessible.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (isRegistered) {
    return (
      <div className="auth-wrapper">
        <div className="auth-logo">LOGO</div>
        <div className="auth-form">
          <h2>Registration</h2>
          <div className="confirmation-message">
            <div className="confirmation-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="12" fill="#000"/>
                <path d="M7 12L10 15L17 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Check your email</h3>
            <p>Registration successful! Please check your email to confirm your account. The link is valid for 10 minutes.</p>
          </div>
          <div className="auth-link" style={{marginTop: '24px'}}>
            <Link to="/login">Already have an account? Login</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-logo">LOGO</div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Registration</h2>
        {error && (
          <div className="auth-error">
            <p>{error}</p>
            {error.includes('connect to the server') && (
              <button 
                className="auth-btn" 
                onClick={() => window.location.reload()} 
                style={{ marginTop: '10px', fontSize: '14px' }}
              >
                Try again
              </button>
            )}
          </div>
        )}
        <div className="auth-input-group">
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={form.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="auth-input-group">
          <input 
            type={showPassword ? 'text' : 'password'} 
            name="password" 
            placeholder="Password" 
            value={form.password} 
            onChange={handleChange} 
            required 
          />
          <span className="auth-eye" onClick={() => setShowPassword((v) => !v)}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="#888" strokeWidth="2"/>
              <circle cx="12" cy="12" r="3" stroke="#888" strokeWidth="2"/>
            </svg>
          </span>
        </div>
        <div className="auth-input-group">
          <input 
            type={showConfirm ? 'text' : 'password'} 
            name="confirm" 
            placeholder="Confirm password" 
            value={form.confirm} 
            onChange={handleChange} 
            required 
          />
          <span className="auth-eye" onClick={() => setShowConfirm((v) => !v)}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="#888" strokeWidth="2"/>
              <circle cx="12" cy="12" r="3" stroke="#888" strokeWidth="2"/>
            </svg>
          </span>
        </div>
        <button className="auth-btn" type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Sign up'}
        </button>
        <div className="auth-link">
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp; 