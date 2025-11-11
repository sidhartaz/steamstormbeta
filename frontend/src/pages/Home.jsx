import { Link } from "react-router-dom";
import { Flame, Star } from "lucide-react";

export default function Home() {
  const featuredGames = [
    {
      id: 730,
      name: "Counter-Strike 2",
      image: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg",
    },
    {
      id: 570,
      name: "Dota 2",
      image: "https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg",
    },
    {
      id: 1091500,
      name: "Cyberpunk 2077",
      image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
    },
    {
      id: 1245620,
      name: "ELDEN RING",
      image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      {/* 🔥 Logo y título */}
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-3 mb-4">
          <Flame className="text-yellow-400 w-10 h-10" />
          <h1 className="text-5xl font-extrabold text-yellow-400 tracking-wide">
            SteamStorm
          </h1>
        </div>
        <p className="text-gray-300 max-w-lg mx-auto">
          Descubre los juegos más populares de Steam, analiza sus valoraciones y crea tu propio ranking personalizado.
        </p>
      </div>

      {/* ⭐ Recomendaciones */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {featuredGames.map((game) => (
          <div
            key={game.id}
            className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform"
          >
            <img
              src={game.image}
              alt={game.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold mb-1">{game.name}</h2>
              <p className="text-yellow-400 text-sm flex items-center gap-1">
                <Star className="w-4 h-4" /> Recomendado
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 🎯 Botones */}
      <div className="flex gap-4">
        <Link
          to="/ranking"
          className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold shadow-md transition-colors"
        >
          Ver Ranking 🔝
        </Link>
        <Link
          to="/register"
          className="bg-gray-800 hover:bg-gray-700 border border-yellow-400 text-yellow-400 px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Crear Cuenta 🚀
        </Link>
      </div>
    </div>
  );
}
