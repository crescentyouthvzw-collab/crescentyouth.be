// Mobile menu toggle
document.getElementById('mobile-menu').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('active');
});

// Scroll to top button
document.querySelector('.to-top').addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Fade-in on scroll
const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -20px 0px'
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

