// backend/src/server.js

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// Módulos necesarios para cargar archivos CommonJS (como tus routers)
import { createRequire } from 'module'; 
import { fileURLToPath } from 'url';
import path from 'path';

// Configuración para usar require() con archivos CommonJS en un proyecto ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);


// --- Importaciones de Rutas ---
// 🚨 CORRECCIÓN: Usamos require() y accedemos a la propiedad .default para obtener el router exportado.
const gamesRouter = require("./routes/games.js").default; 
const authRouter = require("./routes/authRoutes.js").default; 

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Permite leer req.body para login/registro

// Rutas
app.use("/api/games", gamesRouter);
app.use("/api/auth", authRouter); // Añadimos las rutas de autenticación

// Ruta simple para verificar el servidor
app.get("/", (req, res) => {
  res.send("Servidor SteamStorm funcionando correctamente, incluyendo autenticación.");
});

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDB");

    // Escuchar en todas las interfaces para accesibilidad desde otros dispositivos
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
      console.log(`Accesible en red local: http://TU_IP_LOCAL:${PORT}/`);
      console.log(
        `Rutas de Autenticación: http://localhost:${PORT}/api/auth/register`
      );
    });
  })
  .catch((error) => console.error("Error al conectar MongoDB:", error));