/* ========================================
   NAVIGATION & MOBILE MENU
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav a');
  const revealElements = document.querySelectorAll('.reveal');
  
  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
    });
  }
  
  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      nav.classList.remove('active');
    });
  });
  
  // Set active link based on current page
  setActiveNavLink();

  // Scroll reveal animations
  initScrollReveal(revealElements);
});

function setActiveNavLink() {
  const navLinks = document.querySelectorAll('nav a');
  const currentPath = window.location.pathname;
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (currentPath.includes(href) || 
        (currentPath === '/' && href === 'index.html') ||
        (currentPath.endsWith('/') && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ========================================
   SMOOTH SCROLL TO TOP
   ======================================== */

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

function toggleMobileMenu() {
  const nav = document.querySelector('nav');
  nav.classList.toggle('active');
}

/* ========================================
   SCROLL REVEAL ANIMATIONS
   ======================================== */

function initScrollReveal(nodes) {
  if (!nodes || nodes.length === 0) return;
  
  // Fallback for browsers without IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    nodes.forEach(node => node.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  nodes.forEach(node => observer.observe(node));
}
