// =============================================
// DIGIMARKET — Main Logic v2
// =============================================

// Íconos SVG por categoría (inline)
const CATEGORY_ICONS_SVG = {
  'Email Marketing': `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  'SEO': `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  'Redes Sociales': `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="5" r="3" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="19" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  'Automatización': `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  'Inteligencia Artificial': `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" stroke-width="1.5"/><path d="M8 12H16M12 8V16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  'Publicidad': `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  'Copywriting': `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10218 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  'Analytics': `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 20V10M12 20V4M6 20V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  'Programación': `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 18L22 12L16 6M8 6L2 12L8 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  'E-commerce': `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 6H21M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

const DEFAULT_ICON_SVG = ICONS.image;

function getCategoryIconSVG(cat) {
  return CATEGORY_ICONS_SVG[cat] || DEFAULT_ICON_SVG;
}

function formatPrice(price) {
  if (!price) return null;
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
}

let allProducts = [];
let activeCategory = 'todos';
let searchQuery = '';

function filterProducts() {
  return allProducts.filter(p => {
    const matchCat = activeCategory === 'todos' || p.categoria === activeCategory;
    const matchSearch = !searchQuery ||
      p.nombre.toLowerCase().includes(searchQuery) ||
      (p.descripcion_corta || '').toLowerCase().includes(searchQuery) ||
      p.categoria.toLowerCase().includes(searchQuery);
    return matchCat && matchSearch;
  });
}

function renderProductCard(p) {
  const price = formatPrice(p.precio_original);
  const imgContent = p.imagen_url
    ? `<img class="product-card__img" src="${p.imagen_url}" alt="${p.nombre}" loading="lazy" />`
    : `<div class="product-card__img-placeholder">${getCategoryIconSVG(p.categoria)}</div>`;

  const badgeHTML = p.destacado
    ? `<span class="product-card__badge">
        <span class="product-card__badge-icon">${ICONS.starFilled}</span>
        Destacado
      </span>`
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
          Ver más
          <span class="product-card__cta-icon">${ICONS.arrow}</span>
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

  grid.innerHTML = cats.map(cat => `
    <button class="category-pill" data-cat="${cat}">
      <span class="category-pill__icon">${getCategoryIconSVG(cat)}</span>
      <span>${cat}</span>
    </button>
  `).join('');

  cats.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.dataset.cat = cat;
    btn.textContent = cat;
    filtersBar.appendChild(btn);
  });

  footerCats.innerHTML = cats.map(cat => `<li><a href="#productos">${cat}</a></li>`).join('');

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
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.cat === cat));
  document.querySelectorAll('.category-pill').forEach(pill => pill.classList.toggle('active', pill.dataset.cat === cat));
}

function injectStaticIcons() {
  // Hero badge icon (rocket)
  const heroBadge = document.getElementById('heroBadgeIcon');
  if (heroBadge) heroBadge.innerHTML = ICONS.rocket;

  // Hero rocket visual
  const heroRocket = document.getElementById('heroRocketIcon');
  if (heroRocket) heroRocket.innerHTML = ICONS.rocket;

  // Hero arrow button
  const heroArrow = document.getElementById('heroArrowIcon');
  if (heroArrow) heroArrow.innerHTML = ICONS.arrow;

  // Search icon
  const searchIcon = document.getElementById('searchIconEl');
  if (searchIcon) searchIcon.innerHTML = ICONS.search;

  // Empty state icon
  const emptyIcon = document.getElementById('emptyIcon');
  if (emptyIcon) emptyIcon.innerHTML = ICONS.search;
}

async function init() {
  injectStaticIcons();
  try {
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

document.getElementById('filtersBar').addEventListener('click', e => {
  if (e.target.classList.contains('filter-btn')) {
    activeCategory = e.target.dataset.cat;
    updateActiveFilter(activeCategory);
    renderProducts();
  }
});

let searchTimeout;
document.getElementById('searchInput').addEventListener('input', e => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderProducts();
  }, 280);
});

document.getElementById('menuBtn').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('open');
});

init();
