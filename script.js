/* =========================================================
   Linbo Gong — Portfolio scripts
   - Theme toggle (saved to localStorage)
   - Mobile menu
   - Scroll reveal
   - Projects filters (projects.html)
   ========================================================= */

(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ---------- Theme ----------
  const THEME_KEY = "linbo-theme";
  const themeBtn = $("#themeToggle");
  const root = document.documentElement;

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeBtn) {
      themeBtn.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
      themeBtn.querySelector("[data-label]").textContent = theme === "light" ? "Light" : "Dark";
    }
  }

  function getInitialTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  setTheme(getInitialTheme());

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme");
      const next = current === "light" ? "dark" : "light";
      localStorage.setItem(THEME_KEY, next);
      setTheme(next);
    });
  }

  // ---------- Mobile menu ----------
  const hamburger = $("#hamburger");
  const mobilePanel = $("#mobilePanel");
  function closeMobileMenu() {
    if (!mobilePanel) return;
    mobilePanel.classList.remove("open");
    hamburger?.setAttribute("aria-expanded", "false");
  }

  if (hamburger && mobilePanel) {
    hamburger.addEventListener("click", () => {
      const isOpen = mobilePanel.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close on navigation
    $$("#mobilePanel a").forEach((a) => {
      a.addEventListener("click", () => closeMobileMenu());
    });
  }

  // Close menu on Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileMenu();
  });

  // ---------- Smooth scroll for in-page anchors ----------
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id.length < 2) return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      closeMobileMenu();
      const y = target.getBoundingClientRect().top + window.scrollY - 86;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  // ---------- Scroll reveal ----------
  const revealEls = $$(".reveal");
  if (revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  // ---------- Projects filters (projects.html only) ----------
  const filterBar = $("#filters");
  const tiles = $$(".project-tile[data-tags]");

  function setActiveFilter(btn) {
    $$(".filter", filterBar).forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  }

  function matches(tile, tag) {
    if (tag === "all") return true;
    const tags = (tile.getAttribute("data-tags") || "").split(",").map((t) => t.trim());
    return tags.includes(tag);
  }

  if (filterBar && tiles.length) {
    $$(".filter", filterBar).forEach((btn) => {
      btn.addEventListener("click", () => {
        const tag = btn.getAttribute("data-filter") || "all";
        setActiveFilter(btn);
        tiles.forEach((tile) => {
          tile.style.display = matches(tile, tag) ? "" : "none";
        });
      });
    });
  }

  // ---------- Footer year ----------
  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
