// ====== CONFIGURACIÓN BASE ======
const API_BASE = "http://localhost:4000"; // backend local

// ====== IDS DE JUEGOS ======
const destacados = [730, 570, 440]; // CS2, Dota 2, TF2
const topJuegos = [1091500, 271590, 381210, 292030, 1174180, 440]; // Cyberpunk, GTA V, DBD, etc.
const semanales = [292030, 1174180, 945360]; // Witcher 3, RDR2, Among Us

// ====== FUNCIONES ======

// 🔹 Obtiene datos de un juego individual desde tu backend
async function obtenerJuego(appid) {
  const res = await fetch(`${API_BASE}/api/games/${appid}`);
  if (!res.ok) throw new Error(`Error al obtener juego ${appid}`);
  const data = await res.json();
  return data;
}

// 🔹 Convierte rating numérico (1–5) en estrellas
function generarEstrellas(rating) {
  let estrellasHTML = "";
  for (let i = 1; i <= 5; i++) {
    estrellasHTML += `<i class="fa${i <= rating ? "s" : "r"} fa-star" style="color: gold;"></i>`;
  }
  return `${estrellasHTML} <span style="color:#D9D9D9;">(${rating}/5)</span>`;
}

// 🔹 Crea una card para los destacados
function crearCardDestacado(info) {
  const div = document.createElement("div");
  div.classList.add("destacado-card");
  div.innerHTML = `
    <img src="${info.image}" alt="${info.name}">
    <div class="info">
      <h3>${info.name}</h3>
      <p>${info.genre}</p>
      <p><strong>Valoración:</strong> ${generarEstrellas(info.rating)}</p>
    </div>
  `;
  return div;
}

// 🔹 Carga los destacados con rotación automática
async function cargarDestacados() {
  const contenedor = document.querySelector(".juegos_destacados");
  contenedor.innerHTML = "<p>Cargando juegos destacados...</p>";

  const juegos = [];
  for (let id of destacados) {
    try {
      const info = await obtenerJuego(id);
      const card = crearCardDestacado(info);
      contenedor.appendChild(card);
      juegos.push(card);
    } catch (err) {
      console.error("Error al cargar juego destacado:", err);
    }
  }

  if (juegos.length === 0) return;

  let index = 0;
  juegos[index].classList.add("activo");

  setInterval(() => {
    juegos[index].classList.remove("activo");
    index = (index + 1) % juegos.length;
    juegos[index].classList.add("activo");
  }, 7000);
}

// 🔹 Crea las cards normales (para top y semanales)
function crearCardJuego(info) {
  const div = document.createElement("div");
  div.classList.add("juego-card");
  div.innerHTML = `
    <img src="${info.image}" alt="${info.name}" class="juego-img">
    <h4>${info.name}</h4>
    <p>${info.genre}</p>
    <p><strong>Valoración:</strong> ${generarEstrellas(info.rating)}</p>
  `;
  return div;
}

// 🔹 Carga secciones con juegos específicos
async function cargarSeccion(ids, contenedorSelector) {
  const contenedor = document.querySelector(contenedorSelector);
  contenedor.innerHTML = "<p>Cargando juegos...</p>";

  contenedor.innerHTML = "";
  for (let id of ids) {
    try {
      const info = await obtenerJuego(id);
      const card = crearCardJuego(info);
      contenedor.appendChild(card);
    } catch (err) {
      console.error("Error al cargar juego con ID", id, err);
    }
  }
}

// ====== EJECUCIÓN ======
cargarDestacados();
cargarSeccion(topJuegos, ".juegos_top");
cargarSeccion(semanales, ".juegos_semanales");
