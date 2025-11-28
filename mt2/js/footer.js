function crearFooter() {
  const footer = document.getElementById("main-footer");
  footer.innerHTML = `
    <div class="footer-container">
      <p>&copy; ${new Date().getFullYear()} MONIPA. Todos los derechos reservados.</p>
      <nav>
        <a href="#">Aviso Legal</a> |
        <a href="#">Política de Privacidad</a> |
        <a href="#">Contacto</a>
      </nav>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", crearFooter);
