// backend/src/routes/authRoutes.js
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

const generateToken = (id, username) => {
  return jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// --- Registro ---
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Por favor, complete todos los campos.' });
  }

  try {
    let userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'El correo ya está en uso.' });

    userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: 'El nombre de usuario ya está en uso.' });

    const user = await User.create({ username, email, password });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      message: 'Registro exitoso.',
      token: generateToken(user._id, user.username),
    });
  } catch (error) {
    console.error('Error al registrar:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

// --- Login ---
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      message: 'Inicio de sesión exitoso.',
      token: generateToken(user._id, user.username),
    });
  } else {
    res.status(401).json({ message: 'Correo o contraseña incorrectos.' });
  }
});

export default router;
