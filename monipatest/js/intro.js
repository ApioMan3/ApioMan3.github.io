document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro-container");
  const main = document.querySelector("main");
  const pawCount = Math.floor(Math.random() * 6) + 15; // entre 10 y 15
  //const sounds = ["toy2.mp3", "toy2.mp3", "toy2.mp3"];

  // Crear huellitas al azar
  for (let i = 0; i < pawCount; i++) {
    const paw = document.createElement("img");
    paw.src = "img/Paw.png";
    paw.className = "patita";
    const size = Math.random() * 40 + 40; // entre 40 y 80px
    const x = Math.random() * 100; // %
    const y = Math.random() * 100; // %
    const rot = Math.random() * 360; // grados
    const delay = Math.random() * 800; // ms
    paw.style.width = `${size}px`;
    paw.style.left = `${x}%`;
    paw.style.top = `${y}%`;
    paw.style.setProperty("--rot", `${rot}deg`);
    paw.style.animationDelay = `${delay}ms`;
    intro.appendChild(paw);
  }

  // Quitar la intro después de 2.8 segundos
  setTimeout(() => {
    intro.classList.add("fade-out");
    setTimeout(() => {
      intro.style.display = "none";
      main.style.display = "block";
    }, 1000);
  }, 2800);
});
