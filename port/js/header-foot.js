const toggleMenuOpen = () => document.body.classList.toggle("open");

function smoothScroll(event) {
  event.preventDefault();
  const targetId = event.currentTarget.getAttribute("href").substring(1);
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: "smooth" });
  }
}

function generateNavbar() {
  const navbar = document.createElement("nav");
  navbar.classList.add("navbar");

  const overlay = document.createElement("div");
  overlay.classList.add("navbar-overlay");
  overlay.setAttribute("onclick", "toggleMenuOpen()");
  navbar.appendChild(overlay);

  const burgerButton = document.createElement("button");
  burgerButton.setAttribute("type", "button");
  burgerButton.classList.add("navbar-burger");
  burgerButton.setAttribute("onclick", "toggleMenuOpen()");
  const burgerIcon = document.createElement("span");
  burgerIcon.classList.add("material-icons");
  burgerIcon.textContent = "menu";
  burgerButton.appendChild(burgerIcon);
  navbar.appendChild(burgerButton);

  // Crear el título
  const title = document.createElement("h1");
  title.classList.add("navbar-title");
  title.textContent = "Robinson Winiarczyk";
  navbar.appendChild(title);

  // Crear el menú
  const menu = document.createElement("nav");
  menu.classList.add("navbar-menu");

  // Crear los enlaces del menú
  const links = [
    { text: "Inicio", href: "#inicio" },
    { text: "Acerca de mi", href: "#acerca" },
    { text: "Habilidades", href: "#habilidades" },
    { text: "Proyectos", href: "#proyectos" }
  ];

  links.forEach((linkData) => {
    const link = document.createElement("a");
    link.setAttribute("href", linkData.href);
    link.textContent = linkData.text;
    link.classList.add("active");

    // Añadir evento de desplazamiento suave
    link.addEventListener("click", smoothScroll);

    menu.appendChild(link);
  });

  navbar.appendChild(menu);

  return navbar;
}

function generateFooter() {
  // Crear el elemento footer
  const footer = document.createElement("footer");
  footer.classList.add("footer");

  // Crear el contenido del footer
  const footerContent = document.createElement("div");
  const footerText = document.createElement("span");
  footerText.textContent = "2024 - Robinson Winiarczyk";
  footerContent.appendChild(footerText);

  footer.appendChild(footerContent);

  // Retornar el elemento footer generado
  return footer;
}

const navbarContainer = document.getElementById("navbar-container");
const generatedNavbar = generateNavbar();
navbarContainer.appendChild(generatedNavbar);
const footerContainer = document.getElementById("footer-container");
const generatedFooter = generateFooter();
footerContainer.appendChild(generatedFooter);
