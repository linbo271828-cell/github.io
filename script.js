/* Minimal, GitHub-Pages-safe JS:
   - theme toggle (localStorage)
   - mobile menu
   - smooth scroll for in-page anchors
   - reveal on scroll
   - footer year
*/

(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // Footer year
  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Theme
  const THEME_KEY = "linbo-theme";
  const root = document.documentElement;
  const themeBtn = $("#themeToggle");

  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    if (themeBtn) {
      themeBtn.setAttribute("aria-pressed", t === "light" ? "true" : "false");
      const label = themeBtn.querySelector("[data-label]");
      if (label) label.textContent = t === "light" ? "Light" : "Dark";
    }
  }

  function initialTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
    const prefersLight = window.matchMedia?.("(prefers-color-scheme: light)")?.matches;
    return prefersLight ? "light" : "dark";
  }

  applyTheme(initialTheme());

  themeBtn?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  });

  // Mobile menu
  const hamburger = $("#hamburger");
  const panel = $("#mobilePanel");

  function closePanel() {
    if (!panel) return;
    panel.classList.remove("open");
    hamburger?.setAttribute("aria-expanded", "false");
  }

  hamburger?.addEventListener("click", () => {
    if (!panel) return;
    const open = panel.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // close on link click (mobile)
  $$("#mobilePanel a").forEach(a => a.addEventListener("click", closePanel));

  // close on Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePanel();
  });

  // Smooth scroll (only for same-page anchors)
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id.length < 2) return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      closePanel();
      const y = target.getBoundingClientRect().top + window.scrollY - 86;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  // Reveal on scroll
  const els = $$(".reveal");
  if (els.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(ent => {
        if (ent.isIntersecting) ent.target.classList.add("show");
      });
    }, { threshold: 0.12 });

    els.forEach(el => io.observe(el));
  }
})();
