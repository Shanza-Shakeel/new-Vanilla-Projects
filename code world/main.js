// Utility functions
async function loadHTML(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load ${path}`);
    return await res.text();
  } catch (err) {
    console.error(`Error loading HTML from ${path}:`, err);
    throw err;
  }
}

async function loadCSS(path) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = path;
    link.onload = resolve;
    link.onerror = () => reject(new Error(`Failed to load CSS: ${path}`));
    document.head.appendChild(link);
  });
}

async function loadJS(path) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = path;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Failed to load JS: ${path}`));
    document.body.appendChild(script);
  });
}

// Component loading
async function loadComponent(name) {
  const basePath = `assets/components/${name}/${name}`;
  const holder = document.querySelector(`[data-component="${name}"]`);
  
  if (!holder) {
    console.error(`Component holder not found for ${name}`);
    return;
  }

  try {
    // Load HTML
    const html = await loadHTML(`${basePath}.html`);
    holder.outerHTML = html;

    // Load CSS
    try {
      await loadCSS(`${basePath}.css`);
    } catch (cssErr) {
      console.warn(`No CSS for ${name}:`, cssErr.message);
    }
  } catch (err) {
    console.error(`Failed to load component ${name}:`, err);
  }
}

// Initialize carousel (now as a separate function)
async function initializeCarousel() {
  // Wait briefly to ensure DOM is ready
  await new Promise(resolve => setTimeout(resolve, 50));
  
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  if (!slides.length || !indicators.length || !prevBtn || !nextBtn) {
    console.error('Carousel elements missing');
    return;
  }

  let currentIndex = 0;

  function updateCarousel() {
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentIndex);
    });

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    updateCarousel();
  }

  nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
  prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToSlide(index));
  });

  updateCarousel(); // Initialize first slide
}

// Page rendering
async function renderPage(pagePath = 'pages/home/home.html') {
  const app = document.getElementById('app');
  try {
    // Load page HTML
    const pageHTML = await loadHTML(pagePath);
    app.innerHTML = pageHTML;

    // Load page CSS
    const pageName = pagePath.split('/').slice(-2, -1)[0];
    try {
      await loadCSS(`pages/${pageName}/${pageName}.css`);
    } catch (cssErr) {
      console.warn(`No CSS for page ${pageName}:`, cssErr.message);
    }

    // Initialize page-specific functionality
    if (pageName === 'home') {
      await initializeCarousel();
      
      // Load other home page JS if exists
      try {
        await loadJS(`pages/${pageName}/${pageName}.js`);
      } catch (jsErr) {
        console.warn(`No JS for page ${pageName}:`, jsErr.message);
      }
    }
  } catch (err) {
    console.error('Page rendering error:', err);
    app.innerHTML = `<p>Error loading page: ${err.message}</p>`;
  }
}

// Main initialization
async function initializeApp() {
  try {
    // Load core components first
    await loadComponent('navbar');
    await loadComponent('sidebar');
    await loadComponent('footer');
    
    // Load component JS
    await loadJS('assets/components/sidebar/sidebar.js');
    
    // Render initial page
    await renderPage();
  } catch (err) {
    console.error('App initialization failed:', err);
  }
}

// Start the application
document.addEventListener('DOMContentLoaded', initializeApp);

// for about page
document.addEventListener('DOMContentLoaded', function() {
  // Handle sidebar navigation to about page
  const aboutLink = document.querySelector('.sidebar-nav a[href="pages/about/about.html"]');
  if (aboutLink) {
      aboutLink.addEventListener('click', function(e) {
          e.preventDefault();
          window.location.href = 'pages/about/about.html';
      });
  }
  

});