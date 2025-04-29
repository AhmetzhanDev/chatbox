const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const User = require('./models/User');
const { generateToken, verifyToken, generateVerificationToken } = require('./utils/token');
const { sendVerificationEmail } = require('./utils/email');
const config = require('./config/config');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Подключение к базе данных
connectDB();

// Регистрация пользователя
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Проверка существования пользователя
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
    }

    // Генерация токена подтверждения
    const verificationToken = generateVerificationToken();

    // Создание нового пользователя
    const user = new User({
      email,
      password,
      verificationToken
    });

    await user.save();

    // Отправка email с подтверждением
    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({ message: 'Регистрация успешна. Пожалуйста, проверьте ваш email для подтверждения.' });
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    res.status(500).json({ error: 'Ошибка при регистрации' });
  }
});

// Подтверждение email
app.get('/api/auth/confirm-email/:token', async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ error: 'Недействительный токен подтверждения' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    // Генерация JWT токена
    const authToken = generateToken(user._id);

    // Редирект на фронтенд с токеном
    res.redirect(`${config.frontendUrl}/chat?token=${authToken}`);
  } catch (error) {
    console.error('Ошибка подтверждения email:', error);
    res.status(500).json({ error: 'Ошибка подтверждения email' });
  }
});

// Вход пользователя
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }

    if (!user.isVerified) {
      return res.status(401).json({ error: 'Пожалуйста, подтвердите ваш email' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }

    const token = generateToken(user._id);
    res.json({ token });
  } catch (error) {
    console.error('Ошибка входа:', error);
    res.status(500).json({ error: 'Ошибка при входе' });
  }
});

// Защищенный маршрут
app.get('/api/auth/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Токен не предоставлен' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: 'Недействительный токен' });
    }

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    res.json(user);
  } catch (error) {
    console.error('Ошибка получения данных пользователя:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
}); 