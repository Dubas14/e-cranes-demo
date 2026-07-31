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

  // Слайдер «Причины перехода на аутсорсинг»
  const outsourceSlider = document.querySelector('.outsource__slider');
  if (outsourceSlider && typeof Swiper !== 'undefined') {
    new Swiper(outsourceSlider, {
      slidesPerView: 1,
      loop: true,
      grabCursor: true,
      spaceBetween: 20,
      speed: 600,
      navigation: { nextEl: '.outsource__next', prevEl: '.outsource__prev' },
      breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } },
      ...autoplayConfig,
    });
  }

  // Слайдер «Почему нам доверяют» (2 баннера макета)
  const trustSlider = document.querySelector('.trust__slider');
  if (trustSlider && typeof Swiper !== 'undefined') {
    new Swiper(trustSlider, {
      slidesPerView: 1,
      loop: true,
      grabCursor: true,
      speed: 600,
      navigation: { nextEl: '.trust__next', prevEl: '.trust__prev' },
      pagination: { el: '.trust__pagination', clickable: true },
      ...autoplayConfig,
    });
  }

  // Слайдер «Услуги, которые вам также могут понадобиться»
  const otherServicesSlider = document.querySelector('.other-services__slider');
  if (otherServicesSlider && typeof Swiper !== 'undefined') {
    new Swiper(otherServicesSlider, {
      slidesPerView: 1,
      loop: true,
      grabCursor: true,
      spaceBetween: 40,
      speed: 600,
      navigation: { nextEl: '.other-services__next', prevEl: '.other-services__prev' },
      breakpoints: { 1024: { slidesPerView: 2 } },
      ...autoplayConfig,
    });
  }

  // Табы сервисных программ
  const progTabs = document.querySelectorAll('.servprog__tab');
  if (progTabs.length) {
    progTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        progTabs.forEach((t) => {
          const on = t === tab;
          t.classList.toggle('is-active', on);
          t.setAttribute('aria-selected', on ? 'true' : 'false');
          const panel = document.getElementById(t.dataset.tab);
          if (panel) panel.hidden = !on;
        });
      });
    });
  }

  // FAQ — аккордеон (высоту анимирует CSS через grid-template-rows)
  document.querySelectorAll('.faq__q').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq__item');
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      if (item) item.classList.toggle('is-open', !open);
      const grid = btn.closest('.faq__grid');
      if (grid) syncFaqRows(grid);
    });
  });

  // Строка с раскрытой карточкой не растягивает соседей по высоте; остальные
  // строки остаются выровненными. Ряды считаются по offsetTop — работает и на
  // одноколоночном мобильном.
  function syncFaqRows(grid) {
    const items = [...grid.querySelectorAll('.faq__item')];
    items.forEach((el) => el.classList.remove('faq__item--fit'));
    const rows = new Map();
    items.forEach((el) => {
      const top = el.offsetTop;
      if (!rows.has(top)) rows.set(top, []);
      rows.get(top).push(el);
    });
    rows.forEach((row) => {
      if (row.some((el) => el.classList.contains('is-open'))) {
        row.forEach((el) => el.classList.add('faq__item--fit'));
      }
    });
  }

  const faqGrids = document.querySelectorAll('.faq__grid');
  if (faqGrids.length) {
    let faqResizeId;
    window.addEventListener('resize', () => {
      clearTimeout(faqResizeId);
      faqResizeId = setTimeout(() => faqGrids.forEach(syncFaqRows), 150);
    });
  }

  // Формы — заглушка отправки (интеграция на этапе Битрикса)
  document.querySelectorAll('form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // TODO: отправка на бэкенд Битрикса
      const modal = form.closest('.modal');
      if (modal) {
        form.reset();
        modal.hidden = true;
        document.body.style.overflow = '';
      }
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
    // в попапе с формой курсор сразу в поле, в текстовом — на крестике
    const first = modal.querySelector('.callback__form input') || modal.querySelector('.modal__close');
    if (first) first.focus();
  };
  const closeModal = (modal) => {
    modal.hidden = true;
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-popup]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = document.getElementById(btn.dataset.popup);
      if (!modal) return;
      // из мобильного меню: сначала закрыть его, иначе попап окажется под ним
      const burgerBtn = document.querySelector('.burger');
      const menu = document.getElementById('mobile-menu');
      if (menu && !menu.hidden && burgerBtn) burgerBtn.click();
      openModal(modal);
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

  // Кнопки заказа ведут к форме заявки (#zayavka — консультация, а на
  // страницах без нее баннер диагностики). Ссылки-кнопки уходят туда же
  // через href, здесь только <button>
  const orderTarget = document.getElementById('zayavka');
  if (orderTarget) {
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelectorAll(
      '.about__btn, .stats__btn, .geo__cta'
    ).forEach((btn) => {
      btn.addEventListener('click', () => {
        if (mobileMenu && !mobileMenu.hidden) {
          const burger = document.querySelector('.burger');
          if (burger) burger.click();
        }
        orderTarget.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
        const field = orderTarget.querySelector('input, textarea');
        // фокус после прокрутки, иначе браузер доводит ее рывком
        if (field) setTimeout(() => field.focus({ preventScroll: true }), smooth ? 700 : 0);
      });
    });
  }

  // Логотипы клиентов — бегущая строка: оборачиваем в трек и дублируем его,
  // копия нужна, чтобы лента не обрывалась на стыке
  document.querySelectorAll('.geo__clients').forEach((row) => {
    const logos = [...row.children];
    if (!logos.length) return;
    const track = document.createElement('div');
    track.className = 'geo__track';
    logos.forEach((el) => track.appendChild(el));
    // класс до замеров: пока ряд с flex-wrap, трек переносит логотипы
    // и его ширина равна ширине ряда, а не сумме элементов
    row.classList.add('is-marquee');
    row.appendChild(track);
    // трек уже ряда — на стыке копий появится пустота, добиваем повторами
    for (let i = 0; track.offsetWidth < row.offsetWidth && i < 40; i++) {
      track.appendChild(logos[i % logos.length].cloneNode(true));
    }
    const clone = track.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    row.appendChild(clone);
  });
});
