/* ===== Theme Toggle ===== */
(function() {
  const toggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  function getPreferredTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (toggle) toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', theme);
  }

  applyTheme(getPreferredTheme());

  if (toggle) {
    toggle.addEventListener('click', function() {
      const current = root.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }
})();

/* ===== Progress Bar ===== */
(function() {
  const bar = document.getElementById('progressBar');
  if (!bar) return;
  window.addEventListener('scroll', function() {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const p = h > 0 ? (window.scrollY / h) * 100 : 0;
    bar.style.width = p + '%';
  }, { passive: true });
})();

/* ===== Back to Top ===== */
(function() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', function() {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ===== Search Modal ===== */
(function() {
  const overlay = document.getElementById('searchOverlay');
  if (!overlay) return;

  function openSearch() {
    overlay.classList.add('active');
    var input = document.getElementById('searchInput');
    if (input) setTimeout(function() { input.focus(); }, 100);
  }

  function closeSearch() {
    overlay.classList.remove('active');
  }

  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      overlay.classList.contains('active') ? closeSearch() : openSearch();
    }
    if (e.key === 'Escape') closeSearch();
  });

  var closeBtn = document.getElementById('searchClose');
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeSearch();
  });
})();

/* ===== Category Filter ===== */
(function() {
  var btns = document.querySelectorAll('.category-btn');
  var cards = document.querySelectorAll('.blog-card[data-category]');
  if (!btns.length) return;

  btns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      btns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var cat = btn.getAttribute('data-category');
      cards.forEach(function(card) {
        if (cat === 'all' || card.getAttribute('data-category') === cat) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
})();
