/**
 * EAGLE EYES GROUP OF COMPANIES - MAIN JAVASCRIPT
 * Header, Mobile Navigation, Route Awareness, Back to Top & Utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNavigation();
  highlightActiveNav();
  initBackToTop();
});

/**
 * Sticky Header on Scroll
 */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Mobile Navigation Drawer
 */
function initMobileNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navDrawer = document.querySelector('.mobile-menu-drawer');
  const navBackdrop = document.querySelector('.mobile-menu-backdrop');
  const navLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer-footer a');

  if (!navToggle || !navDrawer || !navBackdrop) return;

  const toggleMenu = () => {
    const isOpen = navDrawer.classList.toggle('open');
    navToggle.classList.toggle('open');
    navBackdrop.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    navDrawer.classList.remove('open');
    navToggle.classList.remove('open');
    navBackdrop.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  navToggle.addEventListener('click', toggleMenu);
  navBackdrop.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navDrawer.classList.contains('open')) {
      closeMenu();
    }
  });
}

/**
 * Highlight Active Navigation Link based on current URL
 */
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  
  const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  allNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Back to Top Button
 */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('is-visible');
    } else {
      backToTopBtn.classList.remove('is-visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
