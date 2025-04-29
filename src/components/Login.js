import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AuthForm.css';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-logo">LOGO</div>
      <form className="auth-form">
        <h2>Log in</h2>
        <div className="auth-input-group">
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="auth-input-group">
          <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <span className="auth-eye" onClick={() => setShowPassword((v) => !v)}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="#888" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="#888" strokeWidth="2"/></svg>
          </span>
          <div className="auth-forgot">
            <Link to="/reset-password">Forgot password?</Link>
          </div>
        </div>
        <button className="auth-btn" type="submit">Sign up</button>
        <div className="auth-link">
          <Link to="/">Don't have an account? Sign Up</Link>
        </div>
      </form>
    </div>
  );
}

export default Login; 