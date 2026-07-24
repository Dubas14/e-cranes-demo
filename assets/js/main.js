document.addEventListener('DOMContentLoaded', () => {

  // Слайдер «Технические предпосылки»
  const reasonsSlider = document.querySelector('.reasons__slider');
  if (reasonsSlider && typeof Swiper !== 'undefined') {
    const reasonsConfig = {
      loop: true,
      grabCursor: true,
      speed: 600,
      pagination: {
        el: '.reasons__pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.reasons__arrow--next',
        prevEl: '.reasons__arrow--prev',
      },
    };
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reasonsConfig.autoplay = {
        delay: 5000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      };
    }
    new Swiper(reasonsSlider, reasonsConfig);
  }

  // Слайдер «Экономический эффект» (6 уникальных слайдов — 2 баннера макета)
  const effectSlider = document.querySelector('.effect__slider');
  if (effectSlider && typeof Swiper !== 'undefined') {
    const effectConfig = {
      slidesPerView: 1,
      loop: true,
      grabCursor: true,
      spaceBetween: 20,
      speed: 600,
      navigation: {
        nextEl: '.effect__arrow--next',
        prevEl: '.effect__arrow--prev',
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1200: { slidesPerView: 3 },
      },
    };
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      effectConfig.autoplay = {
        delay: 5000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      };
    }
    new Swiper(effectSlider, effectConfig);
  }

  // общий автоплей для карточных слайдеров (уважает reduced-motion)
  const autoplayConfig = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? {}
    : { autoplay: { delay: 5000, pauseOnMouseEnter: true, disableOnInteraction: false } };

  // Слайдер «Наши работы» (4 уникальных кейса — 2 баннера макета)
  const casesSlider = document.querySelector('.cases__slider');
  if (casesSlider && typeof Swiper !== 'undefined') {
    new Swiper(casesSlider, {
      slidesPerView: 1,
      loop: true,
      grabCursor: true,
      spaceBetween: 20,
      speed: 600,
      navigation: { nextEl: '.cases__next', prevEl: '.cases__prev' },
      breakpoints: { 1024: { slidesPerView: 2 } },
      ...autoplayConfig,
    });
  }

  // Слайдер «Другие услуги» (слайды продублированы до 4 — для loop)
  const otherSlider = document.querySelector('.other__slider');
  if (otherSlider && typeof Swiper !== 'undefined') {
    new Swiper(otherSlider, {
      slidesPerView: 1,
      loop: true,
      grabCursor: true,
      spaceBetween: 20,
      speed: 600,
      navigation: { nextEl: '.other__next', prevEl: '.other__prev' },
      breakpoints: { 1024: { slidesPerView: 2 } },
      ...autoplayConfig,
    });
  }

  // Слайдер «Системы безопасности и противораскачивания» (3 баннера SMART CRANE)
  const safetySlider = document.querySelector('.safety__slider');
  if (safetySlider && typeof Swiper !== 'undefined') {
    new Swiper(safetySlider, {
      slidesPerView: 1,
      loop: true,
      grabCursor: true,
      speed: 600,
      navigation: { nextEl: '.safety__next', prevEl: '.safety__prev' },
      ...autoplayConfig,
    });
  }

  // Формы — заглушка отправки (интеграция на этапе Битрикса)
  document.querySelectorAll('form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // TODO: отправка на бэкенд Битрикса
    });
  });

  // Поле «Выберите файл» — показать имя выбранного файла
  document.querySelectorAll('.diag__file input[type="file"]').forEach((input) => {
    input.addEventListener('change', () => {
      const label = input.parentElement.querySelector('.diag__file-label');
      if (label) label.textContent = input.files.length ? input.files[0].name : 'Выберите файл';
    });
  });

  // Появление блоков при скролле
  const revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealItems.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealItems.forEach((el) => observer.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add('is-visible'));
  }

  // Попапы
  const openModal = (modal) => {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    const closeBtn = modal.querySelector('.modal__close');
    if (closeBtn) closeBtn.focus();
  };
  const closeModal = (modal) => {
    modal.hidden = true;
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-popup]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = document.getElementById(btn.dataset.popup);
      if (modal) openModal(modal);
    });
  });

  document.querySelectorAll('.modal').forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
    const closeBtn = modal.querySelector('.modal__close');
    if (closeBtn) closeBtn.addEventListener('click', () => closeModal(modal));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal:not([hidden])').forEach(closeModal);
    }
  });

  // Мобильное меню
  const burger = document.querySelector('.burger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (burger && mobileMenu) {
    const closeMenu = () => {
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Открыть меню');
      mobileMenu.hidden = true;
      document.body.classList.remove('menu-open');
    };
    burger.addEventListener('click', () => {
      const open = burger.getAttribute('aria-expanded') === 'true';
      if (open) {
        closeMenu();
      } else {
        burger.setAttribute('aria-expanded', 'true');
        burger.setAttribute('aria-label', 'Закрыть меню');
        mobileMenu.hidden = false;
        document.body.classList.add('menu-open');
      }
    });
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.hidden) closeMenu();
    });
  }
});
