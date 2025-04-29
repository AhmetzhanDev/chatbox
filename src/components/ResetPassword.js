import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AuthForm.css';

function ResetPassword() {
  const [email, setEmail] = useState('');

  return (
    <div className="auth-wrapper">
      <div className="auth-logo">LOGO</div>
      <form className="auth-form">
        <h2 style={{fontSize: '24px', fontWeight: 600, textAlign: 'center', marginBottom: 24}}>
          Enter your email to reset your password
        </h2>
        <div className="auth-input-group">
          <input type="email" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <button className="auth-btn" type="submit">Reset password</button>
        <div className="auth-link">
          <Link to="/login">Cancel</Link>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword; 