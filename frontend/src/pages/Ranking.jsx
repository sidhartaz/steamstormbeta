
import { useEffect, useState } from "react";
import axios from "axios";

export default function Ranking() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [sortBy, setSortBy] = useState("rating");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const gamesPerPage = 10;

  // ✅ Lista de 50 juegos (IDs de Steam)
 const appIds = [
  // 🎮 Top Populares y Competitivos
  "730", "570", "578080", "1172470", "252490", "381210", "271590", "1091500",
  "1506830", "1085660", "440", "359550", "1172470", "1222730", "1174180", "238960",
  "381210", "1245620", "1938090", "1551360",

  // 🧭 Estrategia y Simulación
  "394360", "289070", "292030", "236850", "1029780", "227300", "294100", "600760",
  "255710", "1124300", "1184370", "814380", "1850570", "281990", "447020", "1263850",
  "1158310", "1328670", "228380", "813780",

  // ⚔️ RPGs y Aventuras
  "582010", "367520", "1238810", "1248130", "1091500", "413150", "1259420", "1086940",
  "632360", "1174180", "105600", "1281930", "1361210", "1182480", "1551360", "548430",
  "632470", "4000", "8930", "582660",

  // 💀 Terror, Suspenso y Acción
  "418370", "1196590", "1016800", "319630", "1104840", "814380", "1623730", "1172380",
  "1872170", "239140", "594650", "1326470", "221100", "383870", "1672970", "1361000",
  "1150690", "1063730", "1127400", "22380",

  // 🚀 Indie, Plataformas y Casual
  "413150", "504230", "620980", "294100", "1222140", "362890", "200510", "1557740",
  "600370", "1113560", "972660", "1172470", "963630", "238960", "813780", "269210",
  "812140", "274190", "227940", "700330"
];


  // ✅ Carga de juegos en lotes de 10 para no saturar Render
  useEffect(() => {
    const fetchInBatches = async () => {
      const batchSize = 10;
      const total = appIds.length;
      let loaded = 0;

      try {
        for (let i = 0; i < total; i += batchSize) {
          const batch = appIds.slice(i, i + batchSize);

          const responses = await Promise.all(
            batch.map((id) =>
              axios.get(`https://steamstormbeta.onrender.com/api/games/import/${id}`)
            )
          );

          const newGames = responses.map((r) => r.data);
          setGames((prev) => [...prev, ...newGames]);

          // progreso visual
          loaded += batch.length;
          setProgress(Math.min((loaded / total) * 100, 100));

          // Espera entre lotes (para no saturar el backend free)
          await new Promise((res) => setTimeout(res, 800));
        }
      } catch (err) {
        console.error("Error al obtener los juegos:", err);
        setError("Error al cargar los juegos. Intenta más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchInBatches();
  }, []);

  // ✅ Loader con progreso visual
  if (loading && games.length === 0)
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-center text-gray-300">
        <p className="text-lg mb-3">
          Cargando juegos... {progress.toFixed(0)}%
        </p>
        <p className="text-sm mb-4">
          {Math.round((progress / 100) * appIds.length)} de {appIds.length} juegos cargados
        </p>
        <div className="w-3/4 sm:w-1/2 bg-gray-700 rounded-full h-4">
          <div
            className="bg-yellow-400 h-4 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    );

  if (error)
    return (
      <p className="text-center mt-10 text-red-500 font-semibold">
        {error}
      </p>
    );

  // ✅ Filtrado por género
  const filteredGames = games.filter(
    (g) => filter === "" || g.genre?.toLowerCase().includes(filter.toLowerCase())
  );

  // ✅ Ordenamiento dinámico
  const sortedGames = [...filteredGames].sort((a, b) => {
    if (sortBy === "reviews") return b.reviews - a.reviews;
    if (sortBy === "price") return b.price - a.price;
    return b.rating - a.rating;
  });

  // ✅ Paginación
  const totalPages = Math.ceil(sortedGames.length / gamesPerPage);
  const startIndex = (currentPage - 1) * gamesPerPage;
  const currentGames = sortedGames.slice(startIndex, startIndex + gamesPerPage);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="p-6 text-center text-white">
      <h1 className="text-4xl font-bold mb-6">
        Ranking de Juegos <span className="text-yellow-400">🔥</span>
      </h1>

      {/* Controles de filtrado y orden */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
        <select
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-yellow-400"
        >
          <option value="rating">Mejor valoración</option>
          <option value="reviews">Más reseñas</option>
          <option value="price">Precio más alto</option>
        </select>

        <select
          onChange={(e) => setFilter(e.target.value)}
          className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">Todos los géneros</option>
          <option value="action">Acción</option>
          <option value="strategy">Estrategia</option>
          <option value="adventure">Aventura</option>
          <option value="shooter">Shooter</option>
          <option value="rpg">RPG</option>
        </select>
      </div>

      {/* 🏆 Lista de juegos */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentGames.map((game, index) => (
          <div
            key={`${game.steamId || game._id}-${index}`}
            className={`p-4 rounded-xl shadow-lg hover:scale-105 transition-transform ${
              index === 0 && currentPage === 1
                ? "bg-yellow-500 text-black"
                : index === 1 && currentPage === 1
                ? "bg-gray-700"
                : index === 2 && currentPage === 1
                ? "bg-orange-600"
                : "bg-gray-900"
            }`}
          >
            <p className="text-sm text-gray-400 mb-2">
              # {(startIndex + index + 1)}
            </p>
            <img
              src={game.image}
              alt={game.name}
              className="rounded-lg mb-4 w-full h-48 object-cover"
            />
            <h2 className="text-2xl font-semibold mb-1">{game.name}</h2>
            <p className="text-gray-300 text-sm mb-2">{game.genre}</p>
            <p className="text-gray-200 mb-3">
              ⭐ {game.rating} | 🗨️ {game.reviews} reseñas
            </p>
            <p className="font-bold text-green-400">
              {game.price === 0 ? "Gratis" : `$${game.price}`}
            </p>
          </div>
        ))}
      </div>

      {/* 🔄 Paginación */}
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="bg-gray-800 px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-gray-700"
        >
          ⬅️ Anterior
        </button>

        <span className="text-lg font-semibold">
          Página {currentPage} de {totalPages}
        </span>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-800 px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-gray-700"
        >
          Siguiente ➡️
        </button>
      </div>
    </div>
  );
}
