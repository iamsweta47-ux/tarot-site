// =========================================================
// TAROT ATLAS — site script
// Handles: EN/HI language toggle (persisted), mobile nav,
// FAQ accordion, dropdown nav on touch devices.
// =========================================================

(function () {
  const root = document.documentElement;
  const STORAGE_KEY = 'tarotAtlasLang';

  function applyLang(lang) {
    if (lang === 'hi') {
      root.classList.add('lang-hi');
    } else {
      root.classList.remove('lang-hi');
    }
    document.querySelectorAll('.lang-switch button').forEach((btn) => {
      btn.classList.toggle('on', btn.dataset.lang === lang);
    });
    root.setAttribute('lang', lang === 'hi' ? 'hi' : 'en');
  }

  function initLangSwitch() {
    const saved = localStorage.getItem(STORAGE_KEY) || 'en';
    applyLang(saved);
    document.querySelectorAll('.lang-switch button').forEach((btn) => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        localStorage.setItem(STORAGE_KEY, lang);
        applyLang(lang);
      });
    });
  }

  function initMobileNav() {
    const toggle = document.querySelector('.hamburger');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      const expanded = links.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });

    // Touch-friendly dropdown (Minor Arcana submenu) inside mobile nav
    document.querySelectorAll('.dropdown > a').forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 860) {
          e.preventDefault();
          trigger.parentElement.classList.toggle('open');
        }
      });
    });
  }

  function initFaqAccordion() {
    document.querySelectorAll('.faq-item').forEach((item) => {
      const q = item.querySelector('.faq-q');
      if (!q) return;
      q.addEventListener('click', () => {
        const wasOpen = item.classList.contains('open');
        // Close siblings for a cleaner single-open accordion
        item.parentElement.querySelectorAll('.faq-item.open').forEach((el) => {
          if (el !== item) el.classList.remove('open');
        });
        item.classList.toggle('open', !wasOpen);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initLangSwitch();
    initMobileNav();
    initFaqAccordion();
  });
})();
