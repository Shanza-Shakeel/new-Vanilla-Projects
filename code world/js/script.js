document.addEventListener('DOMContentLoaded', function () {
    // Sidebar functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const contentWrapper = document.querySelector('.content-wrapper');
    const body = document.body;
  
    function toggleSidebar() {
      sidebar.classList.toggle('active');
      contentWrapper.classList.toggle('shifted');
  
      if (sidebar.classList.contains('active')) {
        body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleEscapeKey);
      } else {
        body.style.overflow = '';
        document.removeEventListener('keydown', handleEscapeKey);
      }
    }
  
    function closeSidebarOnClickOutside(e) {
      if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        closeSidebar();
      }
    }
  
    function handleEscapeKey(e) {
      if (e.key === 'Escape') {
        closeSidebar();
      }
    }
  
    function closeSidebar() {
      sidebar.classList.remove('active');
      contentWrapper.classList.remove('shifted');
      body.style.overflow = '';
      document.removeEventListener('keydown', handleEscapeKey);
    }
  
    menuToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleSidebar();
    });
  
    document.addEventListener('click', closeSidebarOnClickOutside);
  
    // Carousel functionality
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
  
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
  
    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
    });
  
    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
    });
  
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        goToSlide(index);
      });
    });
  
    // Initialize
    updateCarousel();
  
    // Handle window resize
    function handleResize() {
      if (window.innerWidth > 992 && sidebar.classList.contains('active')) {
        closeSidebar();
      }
    }
  
    window.addEventListener('resize', handleResize);
  });
// subscription 
  document.addEventListener('DOMContentLoaded', function() {
    // Add click event to all cards
    const cards = document.querySelectorAll('.training-card');
    
    cards.forEach(card => {
      card.addEventListener('click', function(e) {
        // Don't trigger if clicking on the arrow link
        if (!e.target.closest('.arrow-link')) {
          console.log('Card clicked:', this.querySelector('.card-title').textContent);
          // Add your card click functionality here
        }
      });
    });
    
    // Add hover effects for touch devices
    if ('ontouchstart' in window) {
      cards.forEach(card => {
        card.addEventListener('touchstart', function() {
          this.classList.add('hover');
        });
        
        card.addEventListener('touchend', function() {
          this.classList.remove('hover');
        });
      });
    }
  });
  // cta sports section 
  
  document.addEventListener('DOMContentLoaded', function() {
    // Logo hover effects
    const logoBoxes = document.querySelectorAll('.logo-box');
    
    logoBoxes.forEach(box => {
      box.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.2)';
      });
      
      box.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
      });
    });
    
    // Touch device support
    if ('ontouchstart' in window) {
      logoBoxes.forEach(box => {
        box.addEventListener('touchstart', function() {
          this.classList.add('hover');
        });
        
        box.addEventListener('touchend', function() {
          this.classList.remove('hover');
        });
      });
    }
  });