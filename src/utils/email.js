const nodemailer = require('nodemailer');
const config = require('../config/config');

console.log('Инициализация nodemailer...');
console.log('Настройки SMTP:', {
  host: 'smtp.gmail.com',
  port: 465,
  user: config.email.auth.user
});

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: config.email.auth.user,
    pass: config.email.auth.pass
  },
  pool: true,
  maxConnections: 1,
  maxMessages: 100
});

const sendVerificationEmail = async (email, verificationToken) => {
  console.log('Подготовка к отправке email...');
  const verificationUrl = `${config.frontendUrl}/confirm-email/${verificationToken}`;
  console.log('URL подтверждения:', verificationUrl);
  
  const mailOptions = {
    from: `"Мин" <${config.email.auth.user}>`,
    to: email,
    subject: 'Подтверждение регистрации в Chatbox',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-bottom: 20px;">Добро пожаловать в Chatbox!</h2>
          <p style="color: #666; line-height: 1.6;">Спасибо за регистрацию! Для завершения процесса, пожалуйста, подтвердите ваш email, нажав на кнопку ниже:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #007AFF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
              Подтвердить Email
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">Если кнопка не работает, скопируйте и вставьте следующую ссылку в ваш браузер:</p>
          <p style="word-break: break-all; color: #007AFF; font-size: 14px;">${verificationUrl}</p>
          <p style="color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
            Это автоматическое письмо, пожалуйста, не отвечайте на него.<br>
            С уважением,<br>
            Мин
          </p>
        </div>
      </div>
    `
  };

  console.log('Параметры письма:', {
    from: mailOptions.from,
    to: mailOptions.to,
    subject: mailOptions.subject,
    verificationUrl
  });

  try {
    console.log('Попытка отправки email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email отправлен успешно:', info.response);
    return info;
  } catch (error) {
    console.error('Ошибка отправки email:', error);
    console.error('Детали ошибки:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      response: error.response
    });
    throw error;
  }
};

const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${config.frontendUrl}/reset-password/${resetToken}`;
  
  const mailOptions = {
    from: `"Мин" <${config.email.auth.user}>`,
    to: email,
    subject: 'Сброс пароля в Chatbox',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-bottom: 20px;">Сброс пароля</h2>
          <p style="color: #666; line-height: 1.6;">Вы получили это письмо, потому что запросили сброс пароля для вашего аккаунта. Нажмите на кнопку ниже, чтобы установить новый пароль:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #007AFF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
              Сбросить пароль
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">Если вы не запрашивали сброс пароля, проигнорируйте это письмо.</p>
          <p style="color: #666; font-size: 14px;">Ссылка действительна в течение 1 часа.</p>
          <p style="color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
            Это автоматическое письмо, пожалуйста, не отвечайте на него.<br>
            С уважением,<br>
            Мин
          </p>
        </div>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email для сброса пароля отправлен успешно:', info.response);
    return info;
  } catch (error) {
    console.error('Ошибка отправки email для сброса пароля:', error);
    throw error;
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail
}; 