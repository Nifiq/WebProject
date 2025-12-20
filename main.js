document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const closeBurger = document.querySelector('.burger--close');
  const mobileNav = document.querySelector('.nav--mobile');
  const submenuButtons = document.querySelectorAll('.mobile-item__title');

  if (burger && mobileNav) {
    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      lockScroll(); // Скрол
      mobileNav.classList.add('is-open');
    });
  }

  if (closeBurger && mobileNav) {
    closeBurger.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileNav.classList.remove('is-open');
      unlockScroll(); // Скрол
    });
  }

  submenuButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const parentItem = button.closest('.mobile-item');
      if (!parentItem) return;
      parentItem.classList.toggle('is-open');
    });
  });

  // Скрол
  let scrollPosition = 0;
  function lockScroll() {
    scrollPosition = window.scrollY;
    document.body.classList.add('is-locked');
    document.body.style.top = `-${scrollPosition}px`;
  }
  function unlockScroll() {
    document.body.classList.remove('is-locked');
    document.body.style.top = '';
    window.scrollTo(0, scrollPosition);
  }

  // ===== Функциональность отзывов =====
  const reviews = document.querySelectorAll(".review-card");
  const prevBtn = document.querySelector(".review-prev");
  const nextBtn = document.querySelector(".review-next");
  const pageIndicator = document.querySelector(".review-page");

  let currentIndex = 0; // текущий отзыв

  const updateReviewDisplay = () => {
    reviews.forEach((review, index) => {
      review.style.display = index === currentIndex ? "block" : "none";
    });
    if (pageIndicator) {
      pageIndicator.textContent = `${currentIndex + 1} / ${reviews.length}`;
    }
  };

  // Начальное отображение
  if (reviews.length > 0) {
    updateReviewDisplay();
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + reviews.length) % reviews.length;
      updateReviewDisplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % reviews.length;
      updateReviewDisplay();
    });
  }
});