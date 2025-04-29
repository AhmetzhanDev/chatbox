import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EmailConfirmation() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/confirm-email/${token}`);
        if (response.ok) {
          // Редирект на страницу чата после успешного подтверждения
          navigate('/chat');
        } else {
          // Обработка ошибки
          console.error('Ошибка подтверждения email');
        }
      } catch (error) {
        console.error('Ошибка при подтверждении email:', error);
      }
    };

    confirmEmail();
  }, [token, navigate]);

  return (
    <div className="auth-wrapper">
      <div className="auth-logo">LOGO</div>
      <div className="auth-form">
        <h2>Подтверждение email</h2>
        <p>Пожалуйста, подождите, пока мы подтверждаем ваш email...</p>
      </div>
    </div>
  );
}

export default EmailConfirmation; 