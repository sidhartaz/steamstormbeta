// ==== script_Menu.js ====
const menu = document.getElementById('menu');
const menuToggle = document.getElementById('menu-toggle');

// Detecta el clic en el ícono para abrir/cerrar menú
menuToggle.addEventListener('click', () => {
  menu.classList.toggle('active');
});

// Agrega registro simple en consola (útil para depuración)
document.querySelectorAll('#menu a').forEach(link => {
  link.addEventListener('click', e => {
    console.log(`➡️ Click en: ${e.target.textContent.trim()}`);
  });
});
