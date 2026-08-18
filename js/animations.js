/**
 * EAGLE EYES - ANIMATIONS
 * Professional subtle scroll reveals & timeline interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveals();
});

/**
 * Scroll Reveals with IntersectionObserver
 */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal-fade');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is unsupported
    revealElements.forEach(el => el.classList.add('is-visible'));
  }
}
