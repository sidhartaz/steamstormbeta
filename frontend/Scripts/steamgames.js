
// ====== CONFIGURACIÓN BASE ======
const API_BASE = "http://127.0.0.1:4000"; // backend local

// ====== IDS DE JUEGOS ======
const destacados = [730, 570, 440]; // Counter-Strike 2, Dota 2, Team Fortress 2
const topJuegos = [271590, 1151640, 413150, 1623730, 632360]; // GTA V, Horizon, Stardew Valley, Palworld, Risk of Rain 2
const semanales = [774171, 1222140, 200510]; // Muse Dash, Detroit, XCOM

// ====== FUNCIONES ======

// 🔹 Obtener datos de un juego individual desde tu backend
async function obtenerJuego(appid) {
  try {
    const res = await fetch(`${API_BASE}/api/games/${appid}`);
    if (!res.ok) throw new Error(`Error al obtener juego ${appid}`);
    const data = await res.json();
    console.log(`🎮 Cargado ${data.name} (${appid})`);
    return data;
  } catch (err) {
    console.error(`❌ Error al obtener el juego ${appid}:`, err);
    return null;
  }
}

// 🔹 Obtener los juegos mejor valorados
async function obtenerJuegosTop() {
  try {
    const res = await fetch(`${API_BASE}/api/games/top`);
    if (!res.ok) throw new Error("Error al obtener top juegos");
    const data = await res.json();
    console.log(`🏆 Top juegos cargados (${data.length} resultados)`);
    return data;
  } catch (err) {
    console.error("❌ Error al obtener juegos top:", err);
    return [];
  }
}

// 🔹 Convierte rating (0-5) a estrellas
function generarEstrellas(valoracion) {
  const porcentaje = Math.min(100, Math.max(0, valoracion * 20));
  const estrellasLlenas = Math.round(porcentaje / 20);
  let estrellasHTML = "";
  for (let i = 1; i <= 5; i++) {
    estrellasHTML += `<i class="fa${i <= estrellasLlenas ? "s" : "r"} fa-star" style="color: gold;"></i>`;
  }
  return `${estrellasHTML} <span style="color:#D9D9D9;">(${valoracion.toFixed(1)}/5)</span>`;
}

// 🔹 Crear una card genérica de juego
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

// 🔹 Cargar los juegos destacados (rotación automática)
async function cargarDestacados() {
  const contenedor = document.querySelector(".juegos_destacados");
  contenedor.innerHTML = "<p>Cargando juegos destacados...</p>";

  try {
    contenedor.innerHTML = "";
    const juegos = [];

    for (let id of destacados) {
      const info = await obtenerJuego(id);
      if (!info) continue;
      const card = crearCardJuego(info);
      contenedor.appendChild(card);
      juegos.push(card);
    }

    // Animación de rotación
    let index = 0;
    if (juegos.length > 0) juegos[index].classList.add("activo");

    setInterval(() => {
      if (juegos.length === 0) return;
      juegos[index].classList.remove("activo");
      index = (index + 1) % juegos.length;
      juegos[index].classList.add("activo");
    }, 7000);
  } catch (err) {
    console.error("❌ Error al cargar destacados:", err);
    contenedor.innerHTML = "<p style='color:red;'>Error al cargar destacados.</p>";
  }
}

// 🔹 Cargar una lista de juegos (por IDs)
async function cargarSeccion(ids, contenedorSelector) {
  const contenedor = document.querySelector(contenedorSelector);
  contenedor.innerHTML = "<p>Cargando juegos...</p>";
  contenedor.innerHTML = "";

  for (let id of ids) {
    try {
      const info = await obtenerJuego(id);
      if (!info) continue;
      const card = crearCardJuego(info);
      contenedor.appendChild(card);
    } catch (err) {
      console.error(`❌ Error al cargar juego ${id}:`, err);
    }
  }
}

// 🔹 Cargar los juegos mejor valorados
async function cargarTopJuegos() {
  const contenedor = document.querySelector(".juegos_top");
  contenedor.innerHTML = "<p>Cargando juegos mejor valorados...</p>";

  try {
    const juegosTop = await obtenerJuegosTop();
    contenedor.innerHTML = "";

    for (const juego of juegosTop) {
      const card = crearCardJuego(juego);
      contenedor.appendChild(card);
    }
  } catch (err) {
    console.error("❌ Error al cargar los juegos top:", err);
    contenedor.innerHTML = "<p style='color:red;'>Error al cargar los juegos top.</p>";
  }
}

// ====== EJECUCIÓN INICIAL ======
cargarDestacados();
cargarTopJuegos();
cargarSeccion(semanales, ".juegos_semanales");

// ====== RANKING GLOBAL ======
async function cargarRankingGlobal() {
  const contenedor = document.querySelector(".juegos_ranking");
  contenedor.innerHTML = "<p>Cargando ranking global...</p>";

  try {
    const res = await fetch(`${API_BASE}/api/games`);
    const juegos = await res.json();

    const ordenados = juegos.sort((a, b) => b.reviews - a.reviews);
    contenedor.innerHTML = "";

    ordenados.forEach((juego, index) => {
      const card = document.createElement("div");
      card.classList.add("juego-card");
      card.innerHTML = `
        <h4>#${index + 1} — ${juego.name}</h4>
        <img src="${juego.image}" alt="${juego.name}">
        <p>${juego.genre}</p>
        <p><strong>Valoración:</strong> ${generarEstrellas(juego.rating)}</p>
        <p><strong>Votos:</strong> ${juego.reviews}</p>
      `;
      contenedor.appendChild(card);
    });
  } catch (err) {
    console.error("❌ Error al cargar ranking global:", err);
    contenedor.innerHTML = "<p style='color:red;'>Error al cargar ranking global.</p>";
  }
}

cargarRankingGlobal();

