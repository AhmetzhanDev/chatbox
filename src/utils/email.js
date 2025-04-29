const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: config.email.auth.user,
    pass: config.email.auth.pass
  }
});

const sendVerificationEmail = async (email, verificationToken) => {
  const verificationUrl = `${config.frontendUrl}/confirm-email/${verificationToken}`;
  
  const mailOptions = {
    from: `"Chatbox" <${config.email.auth.user}>`,
    to: email,
    subject: 'Подтверждение регистрации',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Добро пожаловать в Chatbox!</h2>
        <p>Для завершения регистрации, пожалуйста, подтвердите ваш email, нажав на кнопку ниже:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #007AFF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
            Подтвердить Email
          </a>
        </div>
        <p>Если кнопка не работает, скопируйте и вставьте следующую ссылку в ваш браузер:</p>
        <p style="word-break: break-all;">${verificationUrl}</p>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          Это автоматическое письмо, пожалуйста, не отвечайте на него.
        </p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email отправлен успешно');
  } catch (error) {
    console.error('Ошибка отправки email:', error);
    throw error;
  }
};

module.exports = {
  sendVerificationEmail
}; 