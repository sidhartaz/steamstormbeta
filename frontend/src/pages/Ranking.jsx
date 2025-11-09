import { useEffect, useState } from "react";
import axios from "axios";

export default function Ranking() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const appIds = ["730", "570", "578080", "1172470", "252490"]; // CS2, Dota 2, PUBG, Apex, Rust

    const fetchGames = async () => {
      try {
        const responses = await Promise.all(
          appIds.map((id) =>
            axios.get(`https://steamstormbeta.onrender.com/api/games/import/${id}`)
          )
        );
        setGames(responses.map((r) => r.data));
      } catch (error) {
        console.error("Error al obtener los juegos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) return <p className="text-center mt-10 text-lg text-gray-400">Cargando juegos...</p>;

  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold mb-8">
        Ranking de Juegos <span className="text-gray-500">🔥</span>
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <div
            key={game._id || game.steamId}
            className="bg-gray-900 text-white p-4 rounded-xl shadow-lg hover:scale-105 transition-transform"
          >
            <img
              src={game.image}
              alt={game.name}
              className="rounded-lg mb-4 w-full"
            />
            <h2 className="text-2xl font-semibold mb-1">{game.name}</h2>
            <p className="text-gray-400 text-sm mb-2">{game.genre}</p>
            <p className="text-gray-300 mb-3">
              Valoración: ⭐ {game.rating} | Reseñas: {game.reviews}
            </p>
            <p className="font-bold text-green-400">
              {game.price === 0 ? "Gratis" : `$${game.price}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
