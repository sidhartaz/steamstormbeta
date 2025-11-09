import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import gamesRouter from "./routes/games.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/games", gamesRouter);

// Ruta simple para verificar el servidor
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
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
        `Ejemplo de ruta Steam: http://TU_IP_LOCAL:${PORT}/api/games/import/730`
      );
    });
  })
  .catch((error) => console.error("Error al conectar MongoDB:", error));
