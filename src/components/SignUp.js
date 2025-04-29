import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AuthForm.css';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', confirm: '' });
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

    // Проверка совпадения паролей
    if (form.password !== form.confirm) {
      setError('Пароли не совпадают');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
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
        throw new Error(data.error || 'Ошибка при регистрации');
      }

      alert('Регистрация успешна! Пожалуйста, проверьте вашу почту для подтверждения.');
      // Можно добавить редирект на страницу входа
      // navigate('/login');
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
        <h2>Sign up for free</h2>
        {error && <div className="auth-error">{error}</div>}
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
          {loading ? 'Загрузка...' : 'Sign up'}
        </button>
        <div className="auth-link">
          <Link to="/login">Already have an account? Log in</Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp; 