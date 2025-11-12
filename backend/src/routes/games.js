// backend/src/routes/games.js
import express from "express";
import axios from "axios";
import Game from "../models/Game.js";
import { getFromCache, saveInCache } from "../cache.js";

const router = express.Router();


// 🔹 Obtener TODOS los juegos (ordenados por rating)
router.get("/", async (req, res) => {
  try {
    const games = await Game.find().sort({ rating: -1 });
    res.json(games);
  } catch (error) {
    console.error("Error al obtener los juegos:", error.message);
    res.status(500).json({ error: "Error al obtener los juegos" });
  }
});


// 🔹 Obtener los juegos mejor valorados (/api/games/top)
router.get("/top", async (req, res) => {
  try {
    const topGames = await Game.find().sort({ rating: -1 }).limit(20);
    res.json(topGames);
  } catch (error) {
    console.error("Error al obtener los juegos top:", error.message);
    res.status(500).json({ error: "Error al obtener los juegos top" });
  }
});


// 🔹 Obtener un juego individual (/api/games/:appId)
router.get("/:appId", async (req, res) => {
  const { appId } = req.params;

  try {
    // 1️⃣ Revisar caché
    const cachedGame = getFromCache(appId);
    if (cachedGame) return res.json(cachedGame);

    // 2️⃣ Buscar en MongoDB
    let game = await Game.findOne({ steamId: appId });

    // 3️⃣ Si no está, consultarlo en Steam
    if (!game) {
      console.log("🔵 Consultando Steam API:", appId);
      const response = await axios.get(
        `https://store.steampowered.com/api/appdetails?appids=${appId}`
      );

      const data = response.data[appId];
      if (!data.success) {
        return res.status(404).json({ error: "Juego no encontrado en Steam" });
      }

      const gameData = data.data;

      // Guardar en Mongo
      game = await Game.create({
        name: gameData.name,
        steamId: appId,
        genre: gameData.genres
          ? gameData.genres.map((g) => g.description).join(", ")
          : "Desconocido",
        price: gameData.price_overview
          ? gameData.price_overview.final / 100
          : 0,
        image: gameData.header_image,
        rating: Math.floor(Math.random() * 5) + 1,
        reviews: Math.floor(Math.random() * 5000) + 100,
      });
    }

    // 4️⃣ Guardar en caché
    saveInCache(appId, game);

    res.json(game);
  } catch (error) {
    console.error("Error al obtener juego individual:", error.message);
    res.status(500).json({ error: "Error al obtener el juego" });
  }
});


// 🔹 Importar manualmente un juego desde Steam (/api/games/import/:appId)
router.get("/import/:appId", async (req, res) => {
  const { appId } = req.params;

  try {
    // Revisar caché
    const cachedGame = getFromCache(appId);
    if (cachedGame) {
      console.log("🟢 Juego desde caché:", appId);
      return res.json(cachedGame);
    }

    console.log("🔵 Consultando Steam API:", appId);
    const response = await axios.get(
      `https://store.steampowered.com/api/appdetails?appids=${appId}`
    );

    const data = response.data[appId];
    if (!data.success) {
      return res.status(404).json({ error: "Juego no encontrado" });
    }

    const gameData = data.data;

    const game = await Game.findOneAndUpdate(
      { steamId: appId },
      {
        name: gameData.name,
        steamId: appId,
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

    saveInCache(appId, game);
    res.json(game);
  } catch (error) {
    console.error("Error al importar juego:", error.message);
    res.status(500).json({ error: "Error al consultar la API de Steam" });
  }
});


// 🔹 Votar un juego 👍 👎
router.post("/vote/:steamId", async (req, res) => {
  const { steamId } = req.params;
  const { vote } = req.body; // +1 o -1

  try {
    const game = await Game.findOneAndUpdate(
      { steamId },
      { $inc: { votes: vote } },
      { new: true }
    );

    if (!game) {
      return res.status(404).json({ error: "Juego no encontrado" });
    }

    res.json({ message: "Voto registrado", votes: game.votes });
  } catch (error) {
    console.error("Error al registrar voto:", error.message);
    res.status(500).json({ error: "Error al registrar voto" });
  }
});

export default router;
