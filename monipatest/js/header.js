// Variables configurables
const headerConfig = {
  logoPath: "img/logo.png",
  siteTitle: "",
  navLinks: [
    { nombre: "Inicio", url: "/index.html" },
    { nombre: "Tienda", url: "/tienda.html" },
    { nombre: "Carrito", url: "/carrito.html" },
  ],
};

function crearHeader() {
  const header = document.getElementById("main-header");

  header.innerHTML = `
    <div class="header-container">
      <div class="logo-titulo">
        <a href="/index.html">
          <img src="${headerConfig.logoPath}" alt="Logo" class="logo" />
        </a>
        <h1>${headerConfig.siteTitle}</h1>
      </div>

      <button id="btn-hamburguesa" aria-label="Menú móvil" class="hamburger">
        <span></span><span></span><span></span>
      </button>

      <ul id="nav-links" class="nav-links">
        ${headerConfig.navLinks
          .map((link) => `<li><a href="${link.url}">${link.nombre}</a></li>`)
          .join("")}
      </ul>
    </div>

    <!-- Drawer móvil -->
    <div id="drawer-overlay" class="drawer-overlay"></div>
    <div id="drawer-menu" class="drawer-menu">
      <button id="btn-cerrar-drawer" aria-label="Cerrar menú">✕</button>
      <ul>
        ${headerConfig.navLinks
          .map((link) => `<li><a href="${link.url}">${link.nombre}</a></li>`)
          .join("")}
      </ul>
    </div>
  `;

  // Referencias
  const btnHamburguesa = document.getElementById("btn-hamburguesa");
  const drawerMenu = document.getElementById("drawer-menu");
  const drawerOverlay = document.getElementById("drawer-overlay");
  const btnCerrar = document.getElementById("btn-cerrar-drawer");

  // Abrir drawer
  btnHamburguesa.addEventListener("click", () => {
    drawerMenu.classList.add("active");
    drawerOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  // Cerrar drawer
  [drawerOverlay, btnCerrar].forEach((el) =>
    el.addEventListener("click", () => {
      drawerMenu.classList.remove("active");
      drawerOverlay.classList.remove("active");
      document.body.style.overflow = "";
    })
  );
}

document.addEventListener("DOMContentLoaded", crearHeader);
