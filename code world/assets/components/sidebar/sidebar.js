function initializeSidebar() {
  // Get all necessary elements
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const contentWrapper = document.querySelector('.content-wrapper');
  const sidebarLinks = document.querySelectorAll('.sidebar-nav a[data-page]');
  
  // Error handling for missing elements
  if (!menuToggle || !sidebar || !contentWrapper) {
    console.error('Sidebar elements missing:', {menuToggle, sidebar, contentWrapper});
    return;
  }

  // Toggle sidebar visibility
  function toggleSidebar() {
    sidebar.classList.toggle('active');
    sidebar.classList.toggle('open'); // Added to maintain your existing class
    contentWrapper.classList.toggle('shifted');
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
  }

  // Close sidebar
  function closeSidebar() {
    sidebar.classList.remove('active');
    sidebar.classList.remove('open'); // Added to maintain your existing class
    contentWrapper.classList.remove('shifted');
    document.body.style.overflow = '';
  }

  // Handle navigation clicks
  function handleNavigation(e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    
    // Close sidebar when a link is clicked (for mobile)
    closeSidebar();
    
    // Dispatch custom event to inform main.js to load the page
    const event = new CustomEvent('pageChange', {
      detail: { href }
    });
    document.dispatchEvent(event);
  }

  // Set up event listeners
  function setupEventListeners() {
    // Toggle button
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleSidebar();
    });

    // Close when clicking outside
    document.addEventListener('click', function(e) {
      if (!sidebar.contains(e.target) && e.target !== menuToggle) {
        closeSidebar();
      }
    });

    // Close with Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        closeSidebar();
      }
    });

    // Responsive behavior
    window.addEventListener('resize', function() {
      if (window.innerWidth > 992 && sidebar.classList.contains('active')) {
        closeSidebar();
      }
    });

    // Navigation links
    sidebarLinks.forEach(link => {
      link.addEventListener('click', handleNavigation);
    });
  }

  // Initialize everything
  setupEventListeners();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSidebar);
} else {
  initializeSidebar();
}