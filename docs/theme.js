// wafoo theme helper: persist and apply selected theme across pages
// Usage: include this script and optionally add a <select id="theme"> or
// <select data-wf-theme> element. It auto-applies saved theme on load.
(function () {
  function get() {
    const v = localStorage.getItem("wf-theme");
    return v == null ? null : v; // null: unset, '': standard, 'theme-*': themed
  }
  function stripThemeClasses(el) {
    el.className = el.className
      .split(" ")
      .filter(Boolean)
      .filter(c => !c.startsWith("theme-"))
      .join(" ");
  }
  function setSelectValue(val) {
    const sel = document.querySelector("select[data-wf-theme], #theme");
    if (sel) sel.value = val || "";
  }
  function apply(theme) {
    const body = document.body;
    if (!body) return;
    if (typeof theme !== "undefined") {
      // Explicit change (including clearing)
      const t = theme || "";
      stripThemeClasses(body);
      if (t) body.classList.add(t);
      localStorage.setItem("wf-theme", t);
      setSelectValue(t);
      return;
    }
    // Auto apply on load
    const saved = get();
    if (saved !== null) {
      // User has a saved preference (possibly empty -> standard)
      stripThemeClasses(body);
      if (saved) body.classList.add(saved);
    }
    setSelectValue(saved || "");
  }
  function initSelector(selector) {
    const sel =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector || document.querySelector("select[data-wf-theme], #theme");
    if (!sel) return;
    sel.addEventListener("change", () => apply(sel.value));
  }
  window.WFTheme = { get, apply, set: apply, initSelector };
  document.addEventListener("DOMContentLoaded", () => {
    apply();
    initSelector();
  });
})();
