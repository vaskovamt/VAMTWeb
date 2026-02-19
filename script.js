// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarNav = document.querySelector('.navbar-nav');
  const hamburgerSpans = navbarToggler.querySelectorAll('.hamburger span');

  const updateHamburger = isOpen => {
    if (isOpen) {
      hamburgerSpans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      hamburgerSpans[1].style.opacity = '0';
      hamburgerSpans[2].style.transform = 'rotate(-45deg) translate(7px, -8px)';
      hamburgerSpans[3].style.opacity = '0';
    } else {
      hamburgerSpans.forEach(span => {
        span.style.transform = '';
        span.style.opacity = '';
      });
    }
  };

  const setMenuState = isOpen => {
    navbarNav.classList.toggle('show', isOpen);
    navbarToggler.setAttribute('aria-expanded', isOpen.toString());
    updateHamburger(isOpen);
  };

  setMenuState(navbarNav.classList.contains('show'));

  navbarToggler.addEventListener('click', function() {
    const isOpen = !navbarNav.classList.contains('show');
    setMenuState(isOpen);
  });
  
  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      setMenuState(false);
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navbarNav.classList.contains('show')) {
      setMenuState(false);
      navbarToggler.focus();
    }
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

  // Loading animation
  const loader = document.createElement('div');
  loader.className = 'loader';
  loader.innerHTML = '<i class="fas fa-ice-cream loader-icon"></i>';
  document.body.appendChild(loader);
  
  setTimeout(function() {
    loader.classList.add('hidden');
    setTimeout(function() {
      loader.remove();
    }, 500);
  }, 1500);

  // Scroll to top button
  const scrollToTopBtn = document.createElement('div');
  scrollToTopBtn.id = 'scrollToTopBtn';
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollToTopBtn.style.display = 'none';
  document.body.appendChild(scrollToTopBtn);

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.display = 'flex';
    } else {
      scrollToTopBtn.style.display = 'none';
    }
  });

  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Animation on scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.gallery-item, .contact-card, .full-width-image, .feature-item, .new-container');
    
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
  const animatedElements = document.querySelectorAll('.gallery-item, .contact-card, .full-width-image, .feature-item, .new-container');
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

  if (!('IntersectionObserver' in window)) {
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
    return;
  }

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
