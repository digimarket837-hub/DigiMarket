// =============================================
// DIGIMARKET — Main Logic
// =============================================

// Íconos por categoría
const CATEGORY_ICONS = {
  'Email Marketing': '📧',
  'SEO': '🔍',
  'Redes Sociales': '📱',
  'Automatización': '⚙️',
  'Inteligencia Artificial': '🤖',
  'Publicidad': '📢',
  'Copywriting': '✍️',
  'Analytics': '📊',
  'E-commerce': '🛒',
  'Diseño': '🎨',
};

const DEFAULT_ICON = '💡';

// Estado global
let allProducts = [];
let activeCategory = 'todos';
let searchQuery = '';

// ---- HELPERS ----

function getCategoryIcon(cat) {
  return CATEGORY_ICONS[cat] || DEFAULT_ICON;
}

function formatPrice(price) {
  if (!price) return null;
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
}

function filterProducts() {
  return allProducts.filter(p => {
    const matchCat = activeCategory === 'todos' || p.categoria === activeCategory;
    const matchSearch =
      !searchQuery ||
      p.nombre.toLowerCase().includes(searchQuery) ||
      (p.descripcion_corta || '').toLowerCase().includes(searchQuery) ||
      p.categoria.toLowerCase().includes(searchQuery);
    return matchCat && matchSearch;
  });
}

// ---- RENDER FUNCTIONS ----

function renderProductCard(p) {
  const price = formatPrice(p.precio_original);

  const imgContent = p.imagen_url
    ? `<img class="product-card__img" src="${p.imagen_url}" alt="${p.nombre}" loading="lazy" />`
    : `<div class="product-card__img-placeholder">${getCategoryIcon(p.categoria)}</div>`;

  const badgeHTML = p.destacado
    ? `<span class="product-card__badge">⭐ Destacado</span>`
    : '';

  const priceHTML = price
    ? `<div class="product-card__price">
        <span class="product-card__price-label">Precio</span>
        <span class="product-card__price-value">${price}</span>
        ${p.comision_porcentaje ? `<span class="product-card__commission">+${p.comision_porcentaje}% comisión</span>` : ''}
      </div>`
    : `<div></div>`;

  return `
    <article class="product-card">
      <div class="product-card__img-wrap">
        ${imgContent}
        ${badgeHTML}
      </div>
      <div class="product-card__body">
        <span class="product-card__cat">${p.categoria}</span>
        <h3 class="product-card__name">${p.nombre}</h3>
        <p class="product-card__desc">${p.descripcion_corta || p.descripcion || ''}</p>
      </div>
      <div class="product-card__footer">
        ${priceHTML}
        <a class="product-card__cta" href="${p.enlace_afiliado}" target="_blank" rel="noopener noreferrer">
          Ver más →
        </a>
      </div>
    </article>
  `;
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const emptyState = document.getElementById('emptyState');
  const filtered = filterProducts();

  if (filtered.length === 0) {
    grid.innerHTML = '';
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
    grid.innerHTML = filtered.map(renderProductCard).join('');
  }
}

function renderCategories(cats) {
  const grid = document.getElementById('categoriesGrid');
  const filtersBar = document.getElementById('filtersBar');
  const footerCats = document.getElementById('footerCats');

  // Grilla de categorías (sección visual)
  grid.innerHTML = cats.map(cat => `
    <button class="category-pill" data-cat="${cat}">
      <span class="category-pill__icon">${getCategoryIcon(cat)}</span>
      <span>${cat}</span>
    </button>
  `).join('');

  // Botones de filtro
  cats.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.dataset.cat = cat;
    btn.textContent = cat;
    filtersBar.appendChild(btn);
  });

  // Footer links
  footerCats.innerHTML = cats.map(cat =>
    `<li><a href="#productos">${cat}</a></li>`
  ).join('');

  // Eventos category pills
  document.querySelectorAll('.category-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      activeCategory = pill.dataset.cat;
      updateActiveFilter(activeCategory);
      renderProducts();
      document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function updateActiveFilter(cat) {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cat === cat);
  });
  document.querySelectorAll('.category-pill').forEach(pill => {
    pill.classList.toggle('active', pill.dataset.cat === cat);
  });
}

// ---- INIT ----

async function init() {
  try {
    // Cargar todo en paralelo
    const [productos, categorias] = await Promise.all([
      supabase.getProductos(),
      supabase.getCategorias(),
    ]);

    allProducts = productos;
    renderCategories(categorias);
    renderProducts();

  } catch (err) {
    console.error('Error al inicializar:', err);
    document.getElementById('productsGrid').innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:40px;color:#6B7280">
        <p>⚠️ No se pudieron cargar los productos. Intentá más tarde.</p>
      </div>`;
    document.getElementById('categoriesGrid').innerHTML = '';
  }
}

// ---- EVENTOS ----

// Filtros
document.getElementById('filtersBar').addEventListener('click', e => {
  if (e.target.classList.contains('filter-btn')) {
    activeCategory = e.target.dataset.cat;
    updateActiveFilter(activeCategory);
    renderProducts();
  }
});

// Búsqueda (debounce)
let searchTimeout;
document.getElementById('searchInput').addEventListener('input', e => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderProducts();
  }, 280);
});

// Menú mobile
document.getElementById('menuBtn').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('open');
});

// Arrancar
init();
