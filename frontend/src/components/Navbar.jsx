import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="font-bold text-xl">SteamStorm</div>
      <div className="flex gap-4">
        <Link to="/">Inicio</Link>
        <Link to="/ranking">Ranking</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Registro</Link>
        <Link to="/donations">Donaciones</Link>
      </div>
    </nav>
  );
}
