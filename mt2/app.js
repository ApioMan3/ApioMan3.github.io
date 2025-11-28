// ============================================
// MONIPA SPA - Main Application
// ============================================

// ===== STATE MANAGEMENT =====
const AppState = {
  currentPage: 'home',
  cart: JSON.parse(localStorage.getItem('carrito') || '[]'),
  productos: [],
  filtros: {
    categorias: [],
    marcas: [],
    variedades: []
  },
  currentFilters: {
    categorias: [],
    marcas: [],
    variedades: []
  },
  ordenamiento: 'az',
  paginaActual: 1,
  productosPorPagina: 12
};

// ===== UTILITY FUNCTIONS =====
const Utils = {
  showNotification(message, duration = 3000) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), duration);
  },

  updateCartBadge() {
    const count = AppState.cart.reduce((sum, item) => sum + item.Cantidad, 0);
    document.getElementById('cart-badge').textContent = count;
    document.getElementById('cart-badge-mobile').textContent = count;
  },

  saveCart() {
    localStorage.setItem('carrito', JSON.stringify(AppState.cart));
    this.updateCartBadge();
  },

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// ===== ROUTER =====
const Router = {
  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  },

  handleRoute() {
    const hash = window.location.hash.slice(1) || 'home';
    this.navigateTo(hash);
  },

  navigateTo(page) {
    AppState.currentPage = page;
    this.updateActiveLinks(page);
    this.renderPage(page);
    Utils.scrollToTop();
    this.closeDrawer();
  },

  updateActiveLinks(page) {
    document.querySelectorAll('.nav-link, .drawer-link').forEach(link => {
      link.classList.toggle('active', link.dataset.page === page);
    });
  },

  renderPage(page) {
    const app = document.getElementById('app');

    switch (page) {
      case 'home':
        app.innerHTML = HomePage.render();
        HomePage.init();
        break;
      case 'tienda':
        app.innerHTML = TiendaPage.render();
        TiendaPage.init();
        break;
      case 'carrito':
        app.innerHTML = CarritoPage.render();
        CarritoPage.init();
        break;
      default:
        app.innerHTML = HomePage.render();
        HomePage.init();
    }
  },

  closeDrawer() {
    document.getElementById('drawer').classList.remove('active');
    document.getElementById('drawer-overlay').classList.remove('active');
    document.body.style.overflow = '';
  }
};

// ===== HOME PAGE =====
const HomePage = {
  render() {
    return `
      <div class="page">
        <!-- Hero Banner -->
        <section class="hero-banner">
          <div class="banner-slider-wrapper">
            <div class="banner-slider" id="banner-slider"></div>
          </div>
          <button class="banner-arrow left" id="arrow-left">‹</button>
          <button class="banner-arrow right" id="arrow-right">›</button>
          <div class="banner-dots" id="banner-dots"></div>
        </section>

        <!-- Historia -->
        <section class="section historia-section">
          <div class="container">
            <h2 class="section-title">Nuestra Historia</h2>
            <p class="section-subtitle">
              Monipa nace del amor por los animales. Su nombre viene de las tres compañeras que inspiraron este proyecto:
              <strong>MOra</strong>, <strong>NIco</strong> y <strong>PAmela</strong>.
            </p>
            <div class="perritas-grid">
              <div class="perrita-card">
                <img src="img/mora.png" alt="Mora">
                <div class="perrita-content">
                  <h3>Mora</h3>
                  <p>Alegre y curiosa, inspiró los primeros juguetes del local.</p>
                </div>
              </div>
              <div class="perrita-card">
                <img src="img/nico.png" alt="Nico">
                <div class="perrita-content">
                  <h3>Nico</h3>
                  <p>Tranquilo y fiel, inspiró nuestra línea outdoor.</p>
                </div>
              </div>
              <div class="perrita-card">
                <img src="img/pamela.png" alt="Pamela">
                <div class="perrita-content">
                  <h3>Pamela</h3>
                  <p>Coqueta y dulce, nos enseñó que cada mascota merece estilo.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Misión -->
        <section class="section mision-section">
          <div class="container">
            <h2 class="section-title">Nuestra Misión</h2>
            <p>Promover el bienestar animal a través de productos de calidad y un enfoque responsable hacia nuestros peludos amigos.</p>
          </div>
        </section>

        <!-- Valores -->
        <section class="section valores-section">
          <div class="container">
            <h2 class="section-title">Valores que nos guían</h2>
            <div class="grid grid-3">
              <div class="card">
                <img src="img/placeholder1.jpg" alt="Amor" class="card-image">
                <div class="card-content">
                  <h3 class="card-title">Amor</h3>
                  <p class="card-text">Cada producto está hecho con dedicación y respeto.</p>
                </div>
              </div>
              <div class="card">
                <img src="img/placeholder2.jpg" alt="Confianza" class="card-image">
                <div class="card-content">
                  <h3 class="card-title">Confianza</h3>
                  <p class="card-text">Solo trabajamos con materiales seguros y duraderos.</p>
                </div>
              </div>
              <div class="card">
                <img src="img/placeholder3.jpg" alt="Comunidad" class="card-image">
                <div class="card-content">
                  <h3 class="card-title">Comunidad</h3>
                  <p class="card-text">Apoyamos refugios locales y fomentamos la adopción.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Testimonios -->
        <section class="section testimonios-section">
          <div class="container">
            <h2 class="section-title">Historias Felices</h2>
            <div class="testimonios-grid">
              <div class="testimonio-card">
                <p>"Gracias a Monipa, mi perrito tiene su juguete favorito. ¡No lo suelta más!"</p>
                <p class="testimonio-author">— Claudia</p>
              </div>
              <div class="testimonio-card">
                <p>"El servicio fue excelente, y se nota el amor por los animales."</p>
                <p class="testimonio-author">— Lucas</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Contacto -->
        <section class="section contacto-section">
          <div class="container">
            <h2 class="section-title">Contactanos</h2>
            <p class="section-subtitle">¿Querés conocernos más o hacer un pedido especial? ¡Escribinos!</p>
            <a href="mailto:contacto@monipa.com" class="btn btn-dark">Enviar mensaje</a>
          </div>
        </section>
      </div>
    `;
  },

  init() {
    this.initBanner();
    this.initScrollAnimations();
  },

  initBanner() {
    const banners = [
      { img: 'img/placeholder1.jpg', btnText: 'Ver Tienda', btnPos: { top: '70%', left: '50%' } },
      { img: 'img/placeholder2.jpg', btnText: 'Descubrir', btnPos: { top: '70%', left: '50%' } },
      { img: 'img/placeholder3.jpg', btnText: 'Explorar', btnPos: { top: '70%', left: '50%' } }
    ];

    const slider = document.getElementById('banner-slider');
    const dotsContainer = document.getElementById('banner-dots');
    let currentSlide = 0;

    banners.forEach((banner, index) => {
      const slide = document.createElement('div');
      slide.className = 'banner-slide';
      slide.innerHTML = `
        <img src="${banner.img}" alt="Banner ${index + 1}">
        <div class="banner-overlay">
          <button class="banner-button" style="top: ${banner.btnPos.top}; left: ${banner.btnPos.left};" onclick="window.location.hash='tienda'">
            ${banner.btnText}
          </button>
        </div>
      `;
      slider.appendChild(slide);

      const dot = document.createElement('div');
      dot.className = `banner-dot ${index === 0 ? 'active' : ''}`;
      dot.onclick = () => goToSlide(index);
      dotsContainer.appendChild(dot);
    });

    const goToSlide = (index) => {
      currentSlide = index;
      slider.style.transform = `translateX(-${currentSlide * 100}%)`;
      document.querySelectorAll('.banner-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    };

    document.getElementById('arrow-left').onclick = () => {
      currentSlide = (currentSlide - 1 + banners.length) % banners.length;
      goToSlide(currentSlide);
    };

    document.getElementById('arrow-right').onclick = () => {
      currentSlide = (currentSlide + 1) % banners.length;
      goToSlide(currentSlide);
    };

    setInterval(() => {
      currentSlide = (currentSlide + 1) % banners.length;
      goToSlide(currentSlide);
    }, 5000);
  },

  initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => observer.observe(section));
  }
};

// ===== TIENDA PAGE =====
const TiendaPage = {
  render() {
    return `
      <div class="page tienda-page">
       <div> <br></div>
        <div class="tienda-container">
          <aside class="filtros-section" id="filtros-section">
            <h2 class="filtros-title">Filtros</h2>
            <div id="filtros-content"></div>
          </aside>
          
          <div class="productos-section">
            <button class="btn-toggle-filtros" id="btn-toggle-filtros">
              <span class="icono-flecha">▲</span>
            </button>
            
            <div class="productos-header">
              <div class="productos-count" id="productos-count"></div>
              <div class="ordenamiento">
                <label for="ordenar">Ordenar por:</label>
                <select id="ordenar">
                  <option value="az">A-Z</option>
                  <option value="za">Z-A</option>
                  <option value="precio-asc">Menor precio</option>
                  <option value="precio-desc">Mayor precio</option>
                </select>
              </div>
            </div>
            
            <div class="productos-grid" id="productos-grid"></div>
            <div class="paginacion" id="paginacion"></div>
          </div>
        </div>
      </div>
    `;
  },

  async init() {
    await this.loadProductos();
    this.renderFiltros();
    this.renderProductos();
    this.initEventListeners();
  },

  async loadProductos() {
    if (AppState.productos.length > 0) return;

    try {
      const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTmj7fVop9bB2pbgijqtXe-11FrMPjm9vF_DSML427s0o_Ju1jagIKpZJstXodyvOeDn6Gh55LfAkPe/pub?output=csv');
      const csv = await response.text();
      const result = Papa.parse(csv, { header: true, skipEmptyLines: true });

      AppState.productos = result.data.map(p => ({
        ...p,
        Precio: parseFloat(p.Precio) || 0
      }));

      this.extractFiltros();
    } catch (error) {
      console.error('Error loading products:', error);
      AppState.productos = [];
    }
  },

  extractFiltros() {
    const categorias = new Set();
    const marcas = new Set();
    const variedades = new Set();

    AppState.productos.forEach(p => {
      if (p.Categoria) categorias.add(p.Categoria);
      if (p.Marca) marcas.add(p.Marca);
      if (p.Variedad) variedades.add(p.Variedad);
    });

    AppState.filtros = {
      categorias: Array.from(categorias).sort(),
      marcas: Array.from(marcas).sort(),
      variedades: Array.from(variedades).sort()
    };
  },

  renderFiltros() {
    const container = document.getElementById('filtros-content');

    const createFiltroGroup = (title, items, key) => `
      <div class="filtro-group">
        <h3>${title}</h3>
        <div class="filtro-options">
          ${items.map(item => `
            <div class="filtro-option">
              <input type="checkbox" id="${key}-${item}" value="${item}" data-filtro="${key}">
              <label for="${key}-${item}">${item}</label>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    container.innerHTML = `
      ${createFiltroGroup('Categoría', AppState.filtros.categorias, 'categorias')}
      ${createFiltroGroup('Marca', AppState.filtros.marcas, 'marcas')}
      ${createFiltroGroup('Variedad', AppState.filtros.variedades, 'variedades')}
    `;

    container.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const filtro = checkbox.dataset.filtro;
        const value = checkbox.value;

        if (checkbox.checked) {
          AppState.currentFilters[filtro].push(value);
        } else {
          AppState.currentFilters[filtro] = AppState.currentFilters[filtro].filter(v => v !== value);
        }

        AppState.paginaActual = 1;
        this.renderProductos();
      });
    });
  },

  getFilteredProductos() {
    return AppState.productos.filter(p => {
      const catMatch = AppState.currentFilters.categorias.length === 0 ||
        AppState.currentFilters.categorias.includes(p.Categoria);
      const marcaMatch = AppState.currentFilters.marcas.length === 0 ||
        AppState.currentFilters.marcas.includes(p.Marca);
      const varMatch = AppState.currentFilters.variedades.length === 0 ||
        AppState.currentFilters.variedades.includes(p.Variedad);

      return catMatch && marcaMatch && varMatch;
    });
  },

  getSortedProductos(productos) {
    const sorted = [...productos];

    switch (AppState.ordenamiento) {
      case 'az':
        return sorted.sort((a, b) => a.Titulo.localeCompare(b.Titulo));
      case 'za':
        return sorted.sort((a, b) => b.Titulo.localeCompare(a.Titulo));
      case 'precio-asc':
        return sorted.sort((a, b) => a.Precio - b.Precio);
      case 'precio-desc':
        return sorted.sort((a, b) => b.Precio - a.Precio);
      default:
        return sorted;
    }
  },

  renderProductos() {
    const filtered = this.getFilteredProductos();
    const sorted = this.getSortedProductos(filtered);

    const start = (AppState.paginaActual - 1) * AppState.productosPorPagina;
    const end = start + AppState.productosPorPagina;
    const paginated = sorted.slice(start, end);

    document.getElementById('productos-count').textContent =
      `${filtered.length} producto${filtered.length !== 1 ? 's' : ''} encontrado${filtered.length !== 1 ? 's' : ''}`;

    const grid = document.getElementById('productos-grid');
    grid.innerHTML = paginated.map(p => `
      <div class="producto-card">
        <img src="${p.Imagen || 'img/placeholder1.jpg'}" alt="${p.Titulo}" class="producto-image">
        <div class="producto-content">
          <h3 class="producto-title">${p.Titulo}</h3>
          <p class="producto-marca"><strong>Marca:</strong> ${p.Marca}</p>
          <p class="producto-variedad"><strong>Variedad:</strong> ${p.Variedad}</p>
          <p class="producto-precio">$${p.Precio.toFixed(2)}</p>
          <div class="producto-actions">
            <button class="btn-agregar" data-producto='${JSON.stringify(p)}'>
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('.btn-agregar').forEach(btn => {
      btn.addEventListener('click', () => {
        const producto = JSON.parse(btn.dataset.producto);
        this.agregarAlCarrito(producto);
      });
    });

    this.renderPaginacion(filtered.length);
  },

  renderPaginacion(total) {
    const totalPages = Math.ceil(total / AppState.productosPorPagina);
    const container = document.getElementById('paginacion');

    if (totalPages <= 1) {
      container.innerHTML = '';
      return;
    }

    let html = `
      <button ${AppState.paginaActual === 1 ? 'disabled' : ''} data-page="${AppState.paginaActual - 1}">Anterior</button>
    `;

    for (let i = 1; i <= totalPages; i++) {
      html += `<button class="${i === AppState.paginaActual ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }

    html += `
      <button ${AppState.paginaActual === totalPages ? 'disabled' : ''} data-page="${AppState.paginaActual + 1}">Siguiente</button>
    `;

    container.innerHTML = html;

    container.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const page = parseInt(btn.dataset.page);
        if (page > 0 && page <= totalPages) {
          AppState.paginaActual = page;
          this.renderProductos();
          Utils.scrollToTop();
        }
      });
    });
  },

  agregarAlCarrito(producto) {
    const existing = AppState.cart.find(item =>
      item.Titulo === producto.Titulo &&
      item.Marca === producto.Marca &&
      item.Variedad === producto.Variedad
    );

    if (existing) {
      existing.Cantidad++;
    } else {
      AppState.cart.push({ ...producto, Cantidad: 1 });
    }

    Utils.saveCart();
    Utils.showNotification('Producto agregado al carrito');
  },

  initEventListeners() {
    document.getElementById('ordenar').addEventListener('change', (e) => {
      AppState.ordenamiento = e.target.value;
      this.renderProductos();
    });

    const btnToggle = document.getElementById('btn-toggle-filtros');
    const filtrosSection = document.getElementById('filtros-section');

    btnToggle.addEventListener('click', () => {
      filtrosSection.classList.toggle('collapsed');
      btnToggle.classList.toggle('active');
    });
  }
};

// ===== CARRITO PAGE =====
const CarritoPage = {
  render() {
    return `
      <div class="page carrito-page">
        <div class="carrito-container">
          <h1 class="carrito-title">Carrito de Compras</h1>
          <div id="carrito-content"></div>
        </div>
      </div>
    `;
  },

  init() {
    this.renderCarrito();
  },

  renderCarrito() {
    const container = document.getElementById('carrito-content');

    if (AppState.cart.length === 0) {
      container.innerHTML = `
        <div class="carrito-vacio">
          <img src="img/carritovacio.png" alt="Carrito vacío">
          <h2>Tu carrito está vacío</h2>
          <a href="#tienda" class="btn">Ir a la tienda</a>
        </div>
      `;
      return;
    }

    const total = AppState.cart.reduce((sum, item) => sum + (item.Precio * item.Cantidad), 0);

    container.innerHTML = `
      <div class="carrito-items">
        ${AppState.cart.map((item, index) => `
          <div class="carrito-item">
            <img src="${item.Imagen || 'img/placeholder1.jpg'}" alt="${item.Titulo}" class="carrito-item-image">
            <div class="carrito-item-info">
              <h3 class="carrito-item-title">${item.Titulo}</h3>
              <p class="carrito-item-details"><strong>Marca:</strong> ${item.Marca}</p>
              <p class="carrito-item-details"><strong>Variedad:</strong> ${item.Variedad}</p>
              <p class="carrito-item-precio">$${item.Precio.toFixed(2)} c/u</p>
            </div>
            <div class="carrito-item-actions">
              <div class="cantidad-controls">
                <button class="cantidad-btn" data-index="${index}" data-action="decrease">-</button>
                <span class="cantidad-valor">${item.Cantidad}</span>
                <button class="cantidad-btn" data-index="${index}" data-action="increase">+</button>
              </div>
              <button class="btn-eliminar" data-index="${index}">Eliminar</button>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="carrito-summary">
        <div class="carrito-total">
          <span>Total:</span>
          <span class="carrito-total-valor">$${total.toFixed(2)}</span>
        </div>
        <div class="carrito-actions">
          <button class="btn-finalizar" id="btn-finalizar">Finalizar compra por WhatsApp</button>
          <button class="btn-vaciar" id="btn-vaciar">Vaciar carrito</button>
        </div>
      </div>
    `;

    this.initEventListeners();
  },

  initEventListeners() {
    document.querySelectorAll('.cantidad-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index);
        const action = btn.dataset.action;

        if (action === 'increase') {
          AppState.cart[index].Cantidad++;
        } else if (action === 'decrease' && AppState.cart[index].Cantidad > 1) {
          AppState.cart[index].Cantidad--;
        }

        Utils.saveCart();
        this.renderCarrito();
      });
    });

    document.querySelectorAll('.btn-eliminar').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index);
        AppState.cart.splice(index, 1);
        Utils.saveCart();
        this.renderCarrito();
        Utils.showNotification('Producto eliminado del carrito');
      });
    });

    const btnVaciar = document.getElementById('btn-vaciar');
    if (btnVaciar) {
      btnVaciar.addEventListener('click', () => {
        if (confirm('¿Estás seguro de vaciar el carrito?')) {
          AppState.cart = [];
          Utils.saveCart();
          this.renderCarrito();
          Utils.showNotification('Carrito vaciado');
        }
      });
    }

    const btnFinalizar = document.getElementById('btn-finalizar');
    if (btnFinalizar) {
      btnFinalizar.addEventListener('click', () => this.finalizarCompra());
    }
  },

  finalizarCompra() {
    const hora = new Date().getHours();
    let saludo = 'Hola';
    if (hora >= 6 && hora < 13) saludo = 'Buen día';
    else if (hora >= 13 && hora < 19) saludo = 'Buenas tardes';
    else saludo = 'Buenas noches';

    let mensaje = `${saludo}, quisiera realizar la compra de los siguientes productos:\n\n`;

    AppState.cart.forEach(item => {
      mensaje += `• ${item.Titulo} - ${item.Marca} - ${item.Variedad} - x${item.Cantidad}\n`;
    });

    const url = `https://wa.me/5491122513283?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  }
};

// ===== APP INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Hide loading screen
  setTimeout(() => {
    document.getElementById('loading-screen').classList.add('hidden');
  }, 1000);

  // Initialize cart badge
  Utils.updateCartBadge();

  // Initialize router
  Router.init();

  // Mobile menu
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawerClose = document.getElementById('drawer-close');

  hamburger.addEventListener('click', () => {
    drawer.classList.add('active');
    drawerOverlay.classList.add('active');
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  [drawerClose, drawerOverlay].forEach(el => {
    el.addEventListener('click', () => {
      drawer.classList.remove('active');
      drawerOverlay.classList.remove('active');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Navigation links
  document.querySelectorAll('.nav-link, .drawer-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      window.location.hash = page;
    });
  });
});
