import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthForm.css';

const API_URL = 'http://localhost:5001';

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login error');
      }

      localStorage.setItem('token', data.token);
      navigate('/chat');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-logo">LOGO</div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <button className="auth-btn" type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
        <div className="auth-link">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
        <div className="auth-link">
          <Link to="/">No account? Sign up</Link>
        </div>
      </form>
    </div>
  );
}

export default Login; 