import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AuthForm.css';

const API_URL = 'http://localhost:5001';

function EmailConfirmation() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        console.log('Starting email confirmation with token:', token);
        const response = await fetch(`${API_URL}/api/auth/confirm-email/${token}`);
        
        if (!response.ok) {
          navigate('/chat');
          return;
        }

        const data = await response.json();
        console.log('Email successfully confirmed:', data);
        
        localStorage.setItem('token', data.token);
        setTimeout(() => {
          navigate('/chat');
        }, 2000);
      } catch (error) {
        console.error('Error confirming email:', error);
        navigate('/chat');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      confirmEmail();
    } else {
      navigate('/chat');
    }
  }, [token, navigate]);

  return (
    <div className="auth-wrapper">
      <div className="auth-logo">LOGO</div>
      <div className="auth-form">
        <h2>Email Confirmation</h2>
        {loading ? (
          <div className="confirmation-message">
            <div className="confirmation-icon loading">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="11" stroke="#000" strokeWidth="2"/>
                <path d="M12 2C6.48 2 2 6.48 2 12" stroke="#000" strokeWidth="2">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 12 12"
                    to="360 12 12"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
            </div>
            <p>Please wait while we confirm your email...</p>
          </div>
        ) : (
          <div className="confirmation-message success">
            <div className="confirmation-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="12" fill="#000"/>
                <path d="M7 12L10 15L17 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Email Confirmed!</h3>
            <p>Redirecting to chat...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmailConfirmation; 