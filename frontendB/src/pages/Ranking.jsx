
import { useEffect, useState, useMemo } from "react";
import axios from "axios";

export default function RankingMAL() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("score");
  const [currentPage, setCurrentPage] = useState(1);

  const gamesPerPage = 20;
  const API_URL = "https://steamstormbeta.onrender.com/api/games";

  // 💰 Limpieza robusta de precios
  const cleanPrice = (p) => {
    if (!p) return 0;
    if (typeof p === "string") {
      if (p.toLowerCase().includes("free")) return 0;
      const match = p.match(/[\d,.]+/);
      return match ? parseFloat(match[0].replace(",", ".")) : 0;
    }
    if (p > 2000) return p / 100; // precios en centavos
    return Number(p) || 0;
  };

  const normalize = (value, min, max) => (value - min) / (max - min || 1);

  // ⚙️ Carga de datos con límite seguro
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const { data } = await axios.get(API_URL);
        const top200 = data.slice(0, 200);
        setGames(top200);
      } catch (err) {
        setError("No se pudieron cargar los juegos.");
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  // 🧮 Ranking ponderado
  const rankedGames = useMemo(() => {
    if (!games.length) return [];
    const ratings = games.map((g) => g.rating || 0);
    const reviews = games.map((g) => g.reviews || 0);
    const prices = games.map((g) => cleanPrice(g.price));

    const minRating = Math.min(...ratings);
    const maxRating = Math.max(...ratings);
    const minReviews = Math.min(...reviews);
    const maxReviews = Math.max(...reviews);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return games.map((g) => {
      const normRating = normalize(g.rating || 0, minRating, maxRating);
      const normReviews = normalize(g.reviews || 0, minReviews, maxReviews);
      const normPrice = 1 - normalize(cleanPrice(g.price), minPrice, maxPrice);
      const score = normRating * 0.5 + normReviews * 0.3 + normPrice * 0.2;
      return { ...g, price: cleanPrice(g.price), score };
    });
  }, [games]);

  // 🔎 Filtro por búsqueda
  const filtered = rankedGames.filter((g) =>
    g.name?.toLowerCase().includes(search.toLowerCase())
  );

  // 🔽 Orden dinámico
  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "reviews":
        return b.reviews - a.reviews;
      case "price":
        return a.price - b.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return b.score - a.score;
    }
  });

  // 📄 Paginación
  const totalPages = Math.ceil(sorted.length / gamesPerPage);
  const startIndex = (currentPage - 1) * gamesPerPage;
  const currentGames = sorted.slice(startIndex, startIndex + gamesPerPage);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-gray-300">
        <p className="text-lg mb-3">Cargando ranking...</p>
        <div className="w-3/4 sm:w-1/2 bg-gray-700 rounded-full h-4">
          <div className="bg-yellow-400 h-4 rounded-full animate-pulse"></div>
        </div>
      </div>
    );

  if (error)
    return <p className="text-center mt-10 text-red-500 font-semibold">{error}</p>;

  // 🏆 Interfaz tipo MyAnimeList con enlaces a Steam
  return (
    <div className="max-w-6xl mx-auto p-4 text-white">
      <h1 className="text-4xl font-bold text-center mb-6 text-yellow-400">
        🎮 SteamStorm - Ranking Top 200
      </h1>

      {/* 🔍 Barra de búsqueda y orden */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar juego..."
          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 placeholder-gray-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400"
        >
          <option value="score">Ranking global</option>
          <option value="name">Nombre (A-Z)</option>
          <option value="reviews">Más reseñas</option>
          <option value="price">Más baratos</option>
        </select>
      </div>

      {/* 🧾 Tabla principal */}
      <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-900 text-gray-300">
            <tr>
              <th className="p-3 text-left w-16">#</th>
              <th className="p-3 text-left">Juego</th>
              <th className="p-3 text-center">Género</th>
              <th className="p-3 text-center">⭐ Puntuación</th>
              <th className="p-3 text-center">💬 Reseñas</th>
              <th className="p-3 text-center">💰 Precio</th>
            </tr>
          </thead>
          <tbody>
            {currentGames.map((game, index) => (
              <tr
                key={game._id || index}
                className="hover:bg-gray-700 transition-all duration-150 border-b border-gray-700"
              >
                <td className="p-3 font-bold text-yellow-400 text-center">
                  {startIndex + index + 1}
                </td>
                <td className="flex items-center gap-4 p-3">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-16 h-16 object-cover rounded-md shadow-md"
                  />
                  <a
                    href={`https://store.steampowered.com/app/${game.steamId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-blue-400 hover:text-yellow-400 transition-colors"
                  >
                    {game.name}
                  </a>
                </td>
                <td className="text-center p-3 text-gray-300">
                  {game.genre || "Desconocido"}
                </td>
                <td className="text-center p-3 font-bold text-blue-400">
                  {(game.score * 100).toFixed(1)}
                </td>
                <td className="text-center p-3 text-gray-300">
                  {game.reviews?.toLocaleString() || 0}
                </td>
                <td
                  className={`text-center p-3 font-semibold ${
                    game.price === 0 ? "text-green-400" : "text-gray-100"
                  }`}
                >
                  {game.price === 0 ? "Gratis" : `$${game.price.toFixed(2)}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔄 Controles de paginación */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-800 px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-gray-700"
        >
          ⬅️ Anterior
        </button>
        <span className="text-lg font-semibold">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-gray-800 px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-gray-700"
        >
          Siguiente ➡️
        </button>
      </div>

      <p className="text-center text-gray-400 mt-6">
        Ranking calculado localmente (rating + reseñas + precio).  
        Cada título enlaza directo a Steam 🎯
      </p>
    </div>
  );
}
