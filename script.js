// Header scroll effect
window.addEventListener('scroll', function() {
  const header = document.querySelector('.site-header');
  if (window.scrollY > 50) {
    header.style.background = 'rgba(0, 0, 0, 0.9)';
  } else {
    header.style.background = 'rgba(0, 0, 0, 0.9)';
  }
});

// Portfolio image loading animation
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
  const img = item.querySelector('img');
  img.addEventListener('load', () => {
    item.classList.add('loaded');
  });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
  });
}

// Smooth scroll for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Basic mobile menu toggle functionality
const createMobileMenu = () => {
  const header = document.querySelector('.header-wrap');
  const nav = document.querySelector('.main-nav');
  
  const mobileMenuButton = document.createElement('button');
  mobileMenuButton.classList.add('mobile-menu-toggle');
  mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
  
  header.insertBefore(mobileMenuButton, nav);
  
  mobileMenuButton.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
  });
};

// Initialize mobile menu on load
if (window.innerWidth <= 768) {
  createMobileMenu();
}

// Handle window resize
window.addEventListener('resize', () => {
  const nav = document.querySelector('.main-nav');
  if (window.innerWidth > 768) {
    nav.style.display = 'block';
  } else {
    nav.style.display = 'none';
    if (!document.querySelector('.mobile-menu-toggle')) {
      createMobileMenu();
    }
  }
});

// Gallery filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');
    
    const filterValue = button.getAttribute('data-filter');
    
    galleryItems.forEach(item => {
      if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// Lightbox functionality
const createLightbox = () => {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <span class="lightbox-close">&times;</span>
    <img src="" alt="Lightbox Image">
  `;
  document.body.appendChild(lightbox);
  
  const closeBtn = lightbox.querySelector('.lightbox-close');
  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });
  
  return lightbox;
};

const lightbox = createLightbox();
const lightboxImg = lightbox.querySelector('img');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const imgSrc = item.querySelector('img').src;
    lightboxImg.src = imgSrc;
    lightbox.classList.add('active');
  });
});

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
  }
});

// Close lightbox with escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('active')) {
    lightbox.classList.remove('active');
  }
});