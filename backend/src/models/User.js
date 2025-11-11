import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: [true, 'El nombre de usuario es requerido.'], 
        unique: true 
    },
    email: { 
        type: String, 
        required: [true, 'El correo es requerido.'], 
        unique: true,
        match: [/.+@.+\..+/, 'Por favor, usa un correo electrónico válido.'] // Validación de formato de email
    },
    password: { 
        type: String, 
        required: [true, 'La contraseña es requerida.'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres.'] // Validación de longitud
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

// Middleware PRE-SAVE: Hashea la contraseña si ha sido modificada (al registrar o actualizar)
UserSchema.pre('save', async function(next) {
    // Si el campo 'password' no ha sido modificado, pasa al siguiente middleware
    if (!this.isModified('password')) {
        return next();
    }
    
    try {
        // Genera un salt (una cadena aleatoria) para añadir a la contraseña antes del hash
        const salt = await bcrypt.genSalt(10);
        // Hashea la contraseña y la almacena
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        // Pasa el error para que Mongoose lo capture
        next(error);
    }
});

// Método para comparar contraseñas durante el login
UserSchema.methods.matchPassword = async function(enteredPassword) {
    // Compara la contraseña ingresada (plana) con el hash almacenado
    return await bcrypt.compare(enteredPassword, this.password);
};

// Exporta el modelo usando ES Modules
export default mongoose.model('User', UserSchema);