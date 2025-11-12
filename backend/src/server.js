// backend/src/server.js

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import path from "path";

// === CONFIGURACIÓN PARA USAR require() EN ESM ===
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

// === IMPORTAR RUTAS ===
const gamesRouter = require("./routes/games.js").default;
const authRouter = require("./routes/authRoutes.js").default;

// === VARIABLES DE ENTORNO ===
dotenv.config();

// === CONFIGURAR APP EXPRESS ===
const app = express();

// === CORS PARA FRONTEND LOCAL ===
app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500",
      "http://localhost:5500",
      "http://localhost:5173", // por si usas Vite en el futuro
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// === MIDDLEWARE ===
app.use(express.json()); // para leer req.body

// === RUTAS PRINCIPALES ===
app.use("/api/games", gamesRouter);
app.use("/api/auth", authRouter);

// === RUTA BASE DE PRUEBA ===
app.get("/", (req, res) => {
  res.send("✅ Servidor SteamStorm funcionando correctamente (modo local).");
});

// === CONEXIÓN A MONGODB ===
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("📦 Conectado a MongoDB Atlas");

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`🌐 Accesible en red local: http://TU_IP_LOCAL:${PORT}/`);
      console.log(
        `🧩 Rutas disponibles:
         - /api/games
         - /api/games/top
         - /api/games/:appId
         - /api/auth/register`
      );
    });
  })
  .catch((error) => console.error("❌ Error al conectar MongoDB:", error));
