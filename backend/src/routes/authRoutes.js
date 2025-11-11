// backend/src/routes/authRoutes.js

import express from 'express';
import jwt from 'jsonwebtoken';
// Importamos el modelo (que ya usa export default)
import User from '../models/User.js'; 

// Inicializamos el router
const router = express.Router();

// Función auxiliar para generar JWT
const generateToken = (id, username) => {
    // Utiliza la clave secreta definida en el archivo .env
    return jwt.sign({ id, username }, process.env.JWT_SECRET, {
        expiresIn: '30d', // El token expira en 30 días
    });
};

// --- RUTA DE REGISTRO (POST /api/auth/register) ---
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Por favor, complete todos los campos requeridos.' });
    }

    try {
        let userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El usuario ya existe con este correo electrónico.' });
        }
        
        userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: 'El nombre de usuario ya está en uso.' });
        }

        const user = await User.create({ username, email, password });

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            message: 'Registro exitoso.',
            token: generateToken(user._id, user.username), 
        });

    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ 
            message: 'Error en el servidor al registrar el usuario.',
            error: error.message 
        });
    }
});


// --- RUTA DE LOGIN (POST /api/auth/login) ---
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // 1. Buscar usuario
    const user = await User.findOne({ email });

    // 2. Validar usuario y contraseña
    if (user && (await user.matchPassword(password))) {
        
        // 3. Respuesta exitosa con Token
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            message: 'Inicio de sesión exitoso.',
            token: generateToken(user._id, user.username),
        });
    } else {
        // Fallo de autenticación
        return res.status(401).json({ message: 'Correo electrónico o contraseña inválidos.' });
    }
});

// Exportamos el router usando ES Modules
export default router;