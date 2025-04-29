const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Генерация JWT токена
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '24h' });
};

// Верификация JWT токена
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Генерация токена для подтверждения email
const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Генерация токена для сброса пароля
const generatePasswordResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

module.exports = {
  generateToken,
  verifyToken,
  generateVerificationToken,
  generatePasswordResetToken
}; 