// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarNav = document.querySelector('.navbar-nav');
  
  navbarToggler.addEventListener('click', function() {
    navbarNav.classList.toggle('show');
    
    // Animate hamburger icon
    const spans = this.querySelectorAll('.hamburger span');
    if (navbarNav.classList.contains('show')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -8px)';
      spans[3].style.opacity = '0';
    } else {
      spans.forEach(span => {
        span.style.transform = '';
        span.style.opacity = '';
      });
    }
  });
  
  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navbarNav.classList.remove('show');
      // Reset hamburger icon
      const spans = document.querySelectorAll('.hamburger span');
      spans.forEach(span => {
        span.style.transform = '';
        span.style.opacity = '';
      });
    });
  });
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});

// Scroll to top button functionality
window.addEventListener('scroll', function() {
  const scrollToTopBtn = document.createElement('div');
  scrollToTopBtn.id = 'scrollToTopBtn';
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollToTopBtn.style.display = 'none';
  scrollToTopBtn.style.position = 'fixed';
  scrollToTopBtn.style.bottom = '30px';
  scrollToTopBtn.style.right = '30px';
  scrollToTopBtn.style.width = '50px';
  scrollToTopBtn.style.height = '50px';
  scrollToTopBtn.style.backgroundColor = 'var(--primary)';
  scrollToTopBtn.style.color = 'white';
  scrollToTopBtn.style.borderRadius = '50%';
  scrollToTopBtn.style.display = 'flex';
  scrollToTopBtn.style.justifyContent = 'center';
  scrollToTopBtn.style.alignItems = 'center';
  scrollToTopBtn.style.cursor = 'pointer';
  scrollToTopBtn.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
  scrollToTopBtn.style.transition = 'all 0.3s';
  scrollToTopBtn.style.zIndex = '999';
  
  document.body.appendChild(scrollToTopBtn);
  
  scrollToTopBtn.addEventListener('mouseover', function() {
    this.style.backgroundColor = 'var(--secondary)';
    this.style.transform = 'scale(1.1)';
  });
  
  scrollToTopBtn.addEventListener('mouseout', function() {
    this.style.backgroundColor = 'var(--primary)';
    this.style.transform = 'scale(1)';
  });
  
  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  if (window.pageYOffset > 300) {
    scrollToTopBtn.style.display = 'flex';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
});

// Animation on scroll
document.addEventListener('DOMContentLoaded', function() {
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.gallery-item, .contact-card, .full-width-image');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial state
  const animatedElements = document.querySelectorAll('.gallery-item, .contact-card, .full-width-image');
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
  });
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on load
});

// Image lazy loading
document.addEventListener('DOMContentLoaded', function() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => {
    imageObserver.observe(img);
  });
});