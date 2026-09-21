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


  function initAppInstall() {
    // Manifest link for pages that don't carry it in their HTML
    if (!document.querySelector('link[rel="manifest"]')) {
      const l = document.createElement('link');
      l.rel = 'manifest';
      l.href = '/manifest.json';
      document.head.appendChild(l);
    }
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }

    const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    if (standalone) return; // already inside the app

    const APK = '/downloads/tarot-atlas.apk';
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m0 0l-5-5m5 5l5-5M5 21h14"/></svg>';
    const buttons = [];

    function makeBtn(cls) {
      const a = document.createElement('a');
      a.className = cls;
      a.hidden = true;
      a.innerHTML = ICON + '<span lang-en>Download App</span><span lang-hi>ऐप डाउनलोड करें</span>';
      buttons.push(a);
      return a;
    }

    const heroRow = document.querySelector('.hero-cta-row');
    if (heroRow) heroRow.appendChild(makeBtn('btn'));

    const footCol = document.querySelector('.site-footer .footer-col');
    if (footCol) {
      const wrap = document.createElement('div');
      wrap.className = 'app-get';
      wrap.hidden = true;
      wrap.appendChild(makeBtn('btn btn-solid'));
      footCol.appendChild(wrap);
    }

    function reveal(b) {
      b.hidden = false;
      if (b.parentElement.classList.contains('app-get')) b.parentElement.hidden = false;
    }
    function hideAll() {
      buttons.forEach((b) => {
        b.hidden = true;
        if (b.parentElement.classList.contains('app-get')) b.parentElement.hidden = true;
      });
    }

    let deferred = null;
    let apkOk = false;

    function showApk() {
      buttons.forEach((b) => {
        b.href = APK;
        b.setAttribute('download', '');
        b.onclick = null;
        reveal(b);
      });
    }
    function showInstall() {
      buttons.forEach((b) => {
        b.href = '#';
        b.removeAttribute('download');
        b.onclick = (e) => {
          e.preventDefault();
          if (!deferred) return;
          deferred.prompt();
          deferred.userChoice.finally(() => { deferred = null; hideAll(); });
        };
        reveal(b);
      });
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferred = e;
      if (!apkOk) showInstall();
    });
    window.addEventListener('appinstalled', hideAll);

    // Show the APK button only if the file really exists on the site
    if (!isIOS) {
      fetch(APK, { method: 'HEAD', cache: 'no-store' })
        .then((r) => {
          const type = r.headers.get('content-type') || '';
          if (r.ok && type.indexOf('text/html') === -1) { apkOk = true; showApk(); }
        })
        .catch(() => {});
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    initLangSwitch();
    initMobileNav();
    initFaqAccordion();
    initAppInstall();
  });
})();
