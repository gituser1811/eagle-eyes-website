/**
 * EAGLE EYES - MANPOWER CAROUSEL
 * Horizontal scroll with drag support and arrow navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  initManpowerCarousel();
});

function initManpowerCarousel() {
  const wrapper = document.querySelector('.manpower-track-wrapper');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');

  if (!wrapper) return;

  const getScrollStep = () => {
    const card = wrapper.querySelector('.manpower-card');
    return card ? card.offsetWidth + 24 : 340;
  };

  // Button Navigation
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      wrapper.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      wrapper.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
    });

    // Update button states
    const updateButtons = () => {
      const isStart = wrapper.scrollLeft <= 10;
      const isEnd = wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth - 10;
      
      prevBtn.style.opacity = isStart ? '0.4' : '1';
      prevBtn.style.pointerEvents = isStart ? 'none' : 'auto';
      
      nextBtn.style.opacity = isEnd ? '0.4' : '1';
      nextBtn.style.pointerEvents = isEnd ? 'none' : 'auto';
    };

    wrapper.addEventListener('scroll', updateButtons, { passive: true });
    updateButtons();
  }

  // Mouse Drag to Scroll
  let isDown = false;
  let startX;
  let scrollLeft;

  wrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    wrapper.classList.add('is-dragging');
    startX = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
  });

  wrapper.addEventListener('mouseleave', () => {
    isDown = false;
    wrapper.classList.remove('is-dragging');
  });

  wrapper.addEventListener('mouseup', () => {
    isDown = false;
    wrapper.classList.remove('is-dragging');
  });

  wrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag speed multiplier
    wrapper.scrollLeft = scrollLeft - walk;
  });
}
