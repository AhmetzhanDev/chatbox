require('dotenv').config();

module.exports = {
  // Настройки MongoDB
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/chatbox',
  
  // Настройки email
  email: {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'your-email@gmail.com',
      pass: process.env.EMAIL_PASSWORD || 'your-app-password'
    }
  },
  
  // Настройки JWT
  jwtSecret: process.env.JWT_SECRET || 'chatbox-secret-key-2024',
  
  // URL фронтенда
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
}; 