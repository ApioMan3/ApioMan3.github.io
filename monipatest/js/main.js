document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector(".contenedor-inicio");
  if (main) main.style.display = "block";

  const slidesData = [
    {
      pcimage: "img/banner/banner1-desktop.jpg",
      celimage: "img/banner/banner1-mobile.jpg",
      buttonText: "VER PRODUCTOS",
      buttonbackground: "#FFFFFF",
      buttoncolor: "#000000",
      buttonXAxis: 50,
      buttonYAxis: 70,
      buttonSize: 16,
      link: "#categorias"
    },
    {
      pcimage: "img/banner/banner2-desktop.jpg",
      celimage: "img/banner/banner2-mobile.jpg",
      buttonText: "PROMOCIONES",
      buttonbackground: "#e9ca99",
      buttoncolor: "#4e3418",
      buttonXAxis: 25,
      buttonYAxis: 50,
      buttonSize: 16,
      link: "#historia"
    },
    {
      pcimage: "img/banner/banner3-desktop.jpg",
      celimage: "img/banner/banner3-mobile.jpg",
      buttonText: "CONTACTAR",
      buttonbackground: "#d67c3c",
      buttoncolor: "#fff",
      buttonXAxis: 70,
      buttonYAxis: 65,
      buttonSize: 16,
      link: "#contacto"
    },
    {
      pcimage: "img/banner/banner4-desktop.jpg",
      celimage: "img/banner/banner4-mobile.jpg",
      buttonText: "CONTACTAR",
      buttonbackground: "#d67c3c",
      buttoncolor: "#fff",
      buttonXAxis: 70,
      buttonYAxis: 65,
      buttonSize: 16,
      link: "#contacto"
    }
  ];

  const slider = document.getElementById("banner-slider");
  const dotsContainer = document.getElementById("banner-dots");
  const arrowLeft = document.getElementById("arrow-left");
  const arrowRight = document.getElementById("arrow-right");

  slidesData.forEach((s, i) => {
    const slide = document.createElement("div");
    slide.className = "banner-slide";
    const img = document.createElement("img");
    img.src = window.innerWidth < 768 ? s.celimage : s.pcimage;
    slide.appendChild(img);

    if (s.buttonText) {
      const btn = document.createElement("button");
      btn.className = "banner-button";
      btn.textContent = s.buttonText;
      btn.style.background = s.buttonbackground;
      btn.style.color = s.buttoncolor;
      btn.style.fontSize = (s.buttonSize || 16) + "px";
      btn.style.left = s.buttonXAxis + "%";
      btn.style.top = s.buttonYAxis + "%";
      btn.addEventListener("click", () => {
        if (s.link) location.href = s.link;
      });
      slide.appendChild(btn);
    }

    slider.appendChild(slide);

    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => setSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);
  let current = 0;
  let autoInterval = null;

  function updatePosition(index) {
    const width = slider.clientWidth;
    slider.style.transition = "transform 0.5s ease";
    slider.style.transform = `translateX(${ - index * width }px)`;
    dots.forEach(d => d.classList.remove("active"));
    dots[index].classList.add("active");
  }

  function setSlide(index) {
    current = Math.max(0, Math.min(index, slidesData.length - 1));
    updatePosition(current);
    resetAuto();
  }

  function nextSlide() {
    setSlide((current + 1) % slidesData.length);
  }

  function prevSlide() {
    setSlide((current - 1 + slidesData.length) % slidesData.length);
  }

  function startAuto() {
    stopAuto();
    autoInterval = setInterval(nextSlide, 5000);
  }
  function stopAuto() {
    if (autoInterval) clearInterval(autoInterval);
  }
  function resetAuto() {
    stopAuto();
    startAuto();
  }
  startAuto();

  arrowLeft.addEventListener("click", prevSlide);
  arrowRight.addEventListener("click", nextSlide);

  window.addEventListener("resize", () => {
    slider.querySelectorAll("img").forEach((img, idx) => {
      img.src = window.innerWidth < 768 ? slidesData[idx].celimage : slidesData[idx].pcimage;
    });
    updatePosition(current);
  });

  // Fade-in animaciones
  const fadeSections = document.querySelectorAll(".fade-section");
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  fadeSections.forEach(s => io.observe(s));
});
