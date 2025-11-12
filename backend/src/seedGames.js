// backend/src/seedGames.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import axios from "axios";
import Game from "./models/Game.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const appIds = [
  // 🎮 Lista de juegos base (puedes agregar más IDs de Steam)
  730,     // Counter-Strike 2
  570,     // Dota 2
  440,     // Team Fortress 2
  292030,  // The Witcher 3
  1174180, // Red Dead Redemption 2
  945360,  // Among Us
  381210,  // Dead by Daylight
  1091500, // Cyberpunk 2077
  1085660, // Destiny 2
  774171   // Muse Dash
];

async function importarJuego(appId) {
  try {
    const response = await axios.get(
      `https://store.steampowered.com/api/appdetails?appids=${appId}`
    );

    const data = response.data[appId];
    if (!data.success) {
      console.log(`❌ No se pudo obtener el juego ${appId}`);
      return;
    }

    const gameData = data.data;
    const game = await Game.findOneAndUpdate(
      { steamId: String(appId) },
      {
        name: gameData.name,
        steamId: String(appId),
        genre: gameData.genres
          ? gameData.genres.map((g) => g.description).join(", ")
          : "Desconocido",
        price: gameData.price_overview
          ? gameData.price_overview.final / 100
          : 0,
        image: gameData.header_image,
        rating: Math.floor(Math.random() * 5) + 1,
        reviews: Math.floor(Math.random() * 5000) + 100,
      },
      { upsert: true, new: true }
    );

    console.log(`✅ Guardado: ${game.name}`);
  } catch (error) {
    console.error(`⚠️ Error con el juego ${appId}:`, error.message);
  }
}

async function main() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("📦 Conectado a MongoDB");

    for (const id of appIds) {
      await importarJuego(id);
    }

    console.log("🎉 Importación completada con éxito");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error general:", error.message);
  }
}

main();
