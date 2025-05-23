// ========= CAROUSEL CODE START ========= //
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;

// Updates which slide is visible
function updateCarousel() {
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentIndex);
  });

  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentIndex);
  });
}

// Handles slide navigation
function goToSlide(index) {
  currentIndex = (index + slides.length) % slides.length; // Wraps around
  updateCarousel();
}

// Event listeners
nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));

indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => goToSlide(index));
});

// Initialize first slide
updateCarousel();
// ========= CAROUSEL CODE END ========= //
  
    // Training Cards
    const cards = document.querySelectorAll('.training-card');
    
    cards.forEach(card => {
      card.addEventListener('click', function(e) {
        if (!e.target.closest('.arrow-link')) {
          console.log('Card clicked:', this.querySelector('.card-title').textContent);
          // Add your card click functionality here
        }
      });
      
      // Touch device support
      if ('ontouchstart' in window) {
        card.addEventListener('touchstart', function() {
          this.classList.add('hover');
        });
        
        card.addEventListener('touchend', function() {
          this.classList.remove('hover');
        });
      }
    });
  
    // Sports Promo Section
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
      
      // Touch device support
      if ('ontouchstart' in window) {
        box.addEventListener('touchstart', function() {
          this.classList.add('hover');
        });
        
        box.addEventListener('touchend', function() {
          this.classList.remove('hover');
        });
      }
    });
