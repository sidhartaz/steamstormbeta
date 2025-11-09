
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import Ranking from "../pages/Ranking";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Donations from "../pages/Donations";

export default function AppRouter() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/donations" element={<Donations />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
