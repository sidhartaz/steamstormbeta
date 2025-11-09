import express from "express";
import axios from "axios";

const router = express.Router();

// 🔹 Ejemplo de endpoint: /api/games/import/730  (CS2)
router.get("/import/:appId", async (req, res) => {
  const { appId } = req.params;

  try {
    const response = await axios.get(
      `https://store.steampowered.com/api/appdetails?appids=${appId}`
    );

    const data = response.data[appId];

    if (!data.success) {
      return res.status(404).json({ error: "Juego no encontrado" });
    }

    // Extraemos la información principal
    const game = {
      appid: appId,
      name: data.data.name,
      type: data.data.type,
      description: data.data.short_description,
      developers: data.data.developers,
      publishers: data.data.publishers,
      price:
        data.data.price_overview?.final_formatted ||
        "Gratis o sin información",
      header_image: data.data.header_image,
      release_date: data.data.release_date?.date,
    };

    res.json(game);
  } catch (error) {
    console.error("Error al obtener datos de Steam:", error.message);
    res.status(500).json({ error: "Error al consultar la API de Steam" });
  }
});

export default router;
