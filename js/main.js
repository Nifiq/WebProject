document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');
  const body = document.body;

  if (!nav) return;

  // --- Burger: open/close mobile menu ---
  if (burger) {
    burger.addEventListener('click', (e) => {
      e.preventDefault();
      nav.classList.toggle('nav--open');
      body.classList.toggle('no-scroll', nav.classList.contains('nav--open'));
    });
  }

  // Helper: close all dropdowns
  const closeAllDropdowns = () => {
    nav.querySelectorAll('.nav__item--dropdown.open').forEach((li) => li.classList.remove('open'));
  };

  // --- Dropdowns: click to toggle on mobile ---
  nav.addEventListener('click', (e) => {
    const link = e.target.closest('.nav__item--dropdown > .nav__link');
    if (!link) return;

    // Only intercept click for submenu parents (esp. on mobile)
    // Prevent jumping to "#" and stop bubbling to document
    e.preventDefault();
    e.stopPropagation();

    const item = link.closest('.nav__item--dropdown');
    if (!item) return;

    // Close others, toggle current
    const willOpen = !item.classList.contains('open');
    closeAllDropdowns();
    if (willOpen) item.classList.add('open');
  });

  // Click outside: close dropdowns and (optionally) mobile menu
  document.addEventListener('click', (e) => {
    const clickInsideNav = nav.contains(e.target);
    const clickOnBurger = burger ? burger.contains(e.target) : false;

    if (!clickInsideNav && !clickOnBurger) {
      closeAllDropdowns();
      // Do NOT force-close the mobile menu here — matches your current behaviour (only burger closes it)
    }
  });

  // Esc: close dropdowns + mobile menu
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    closeAllDropdowns();
    nav.classList.remove('nav--open');
    body.classList.remove('no-scroll');
  });

  // Resize to desktop: clear mobile-only states
  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      closeAllDropdowns();
      nav.classList.remove('nav--open');
      body.classList.remove('no-scroll');
    }
  });
});
