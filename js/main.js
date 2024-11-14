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

  const title = document.createElement("h1");
  title.classList.add("navbar-title");
  title.textContent = "Robinson Winiarczyk";
  navbar.appendChild(title);

  const menu = document.createElement("nav");
  menu.classList.add("navbar-menu");

  const links = [
    { text: "Inicio", href: "#inicio" },
    { text: "Sobre mi", href: "#acerca" },
    { text: "Habilidades", href: "#habilidades" },
    { text: "Proyectos", href: "#proyectos" }/*,
    { text: "Galeria", href: "#galeria" },*/
  ];

  links.forEach((linkData) => {
    const link = document.createElement("a");
    link.setAttribute("href", linkData.href);
    link.textContent = linkData.text;
    link.classList.add("active");

    link.addEventListener("click", smoothScroll);

    menu.appendChild(link);
  });

  navbar.appendChild(menu);

  return navbar;
}

function generateFooter() {
  const footer = document.createElement("footer");
  footer.classList.add("footer");
  const footerContent = document.createElement("div");
  const footerText = document.createElement("a");
  footerText.textContent = "RobinsonWiniarczyk@gmail.com - 2024";
  footerText.setAttribute("href","mailto:robinsonwiniarczyk@gmail.com?Subject=Contacto%20vía%20web");
  footerContent.appendChild(footerText);

  footer.appendChild(footerContent);
  return footer;
}

const navbarContainer = document.getElementById("navbar-container");
const generatedNavbar = generateNavbar();
navbarContainer.appendChild(generatedNavbar);
const footerContainer = document.getElementById("footer-container");
const generatedFooter = generateFooter();
footerContainer.appendChild(generatedFooter);

const images = {
  gc: [
    "img/gc/001.jpg",
    "img/gc/002.jpg",
    "img/gc/003.jpg",
    "img/gc/004.jpg",
    "img/gc/005.jpg",
    "img/gc/006.jpg",
    "img/gc/007.jpg"],
  gu: [
    "img/gu/001.jpg",
    "img/gu/002.jpg",
    "img/gu/003.jpg",
    "img/gu/004.jpg",
    "img/gu/005.jpg",
    "img/gu/006.jpg",
    "img/gu/007.jpg",
    "img/gu/008.jpg"],
  sgu: [
    "img/sguts/000.jpg",
    "img/sguts/001.jpg",
    "img/sguts/002.jpg",
    "img/sguts/003.jpg",
    "img/sguts/004.jpg",
    "img/sguts/005.jpg",
  ],
  sqe: [
    "img/sqe/001.jpg",
    "img/sqe/002.jpg",
  ],
  hpwg: [
    "img/hpwg/001.jpg",
    "img/hpwg/002.jpg",
    "img/hpwg/003.jpg",
    "img/hpwg/004.jpg",
    "img/hpwg/005.jpg",
  ],
  ta: [
    "img/ta/000.jpg",
    "img/ta/001.jpg",
    "img/ta/002.jpg",
    "img/ta/003.jpg",
    "img/ta/004.jpg",
  ],
};

let currentImages = [];
let currentIndex = 0;
function setupKeyListener() {
  document.addEventListener("keydown", handleKeyPress);
}

function removeKeyListener() {
  document.removeEventListener("keydown", handleKeyPress);
}

function handleKeyPress(event) {
  if (event.key === "ArrowLeft") {
    changeImage(-1);
  } else if (event.key === "ArrowRight") {
    changeImage(1);
  } else if (event.key === "Escape") {
    closeModal();
  }
}

function openModal(cardId) {
  const modal = document.getElementById("modal");
  const modalImage = document.getElementById("modal-image");

  if (images[cardId]) {
    currentImages = images[cardId];
    currentIndex = 0;
    modalImage.src = currentImages[currentIndex];
    modal.style.display = "flex";
    setupKeyListener();
  }
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
  removeKeyListener();
}

function changeImage(direction) {
  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = currentImages.length - 1;
  } else if (currentIndex >= currentImages.length) {
    currentIndex = 0;
  }
  document.getElementById("modal-image").src = currentImages[currentIndex];
}
