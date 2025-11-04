// wafoo UI helpers: tooltip, popover, dropdown (accessible)
// Exposes: WFUI.tooltip(trigger, tip, opts), WFUI.popover(trigger, panel, opts), WFUI.dropdown(root)
(function () {
  function on(el, evt, handler, opts) {
    el && el.addEventListener(evt, handler, opts);
  }
  function measureBox(el) {
    const prevHidden = el.hidden;
    const prevVis = el.style.visibility;
    const hadOpen = el.classList.contains("is-open");
    el.style.visibility = "hidden";
    el.hidden = false;
    el.classList.add("is-open");
    const w = el.offsetWidth || 180;
    const h = el.offsetHeight || 40;
    if (!hadOpen) el.classList.remove("is-open");
    el.hidden = prevHidden;
    el.style.visibility = prevVis || "";
    return { w, h };
  }
  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  function tooltip(trigger, tip, opts) {
    const cfg = Object.assign({ margin: 8 }, opts || {});
    function position() {
      const r = trigger.getBoundingClientRect();
      const { w, h } = measureBox(tip);
      const centerXRaw = r.left + r.width / 2;
      let centerX = centerXRaw;
      const minC = cfg.margin + w / 2,
        maxC = window.innerWidth - cfg.margin - w / 2;
      centerX = clamp(centerX, minC, maxC);
      const spaceAbove = r.top;
      const placeBelow = spaceAbove < h + cfg.margin + 10;

      tip.classList.toggle("is-top", !placeBelow);
      tip.classList.toggle("is-bottom", placeBelow);
      tip.style.position = "fixed";
      tip.style.left = Math.round(centerX) + "px";
      tip.style.top = Math.round(placeBelow ? r.bottom + cfg.margin : r.top) + "px";
      // arrow offset so arrow points to trigger center even if clamped
      const maxArrow = Math.max(0, w / 2 - 8);
      const arrowX = clamp(centerXRaw - centerX, -maxArrow, maxArrow);
      tip.style.setProperty("--wf-arrow-x", arrowX + "px");
    }
    function show(v) {
      if (v) position();
      tip.hidden = !v;
      tip.classList.toggle("is-open", v);
    }
    on(trigger, "mouseenter", () => show(true));
    on(trigger, "mouseleave", () => show(false));
    on(trigger, "focus", () => show(true));
    on(trigger, "blur", () => show(false));
    on(document, "keydown", e => {
      if (e.key === "Escape" && !tip.hidden) show(false);
    });
    on(
      window,
      "scroll",
      () => {
        if (!tip.hidden) position();
      },
      { passive: true }
    );
    on(window, "resize", () => {
      if (!tip.hidden) position();
    });
  }

  function focusablesIn(root) {
    return Array.from(
      root.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter(el => !el.hasAttribute("disabled"));
  }

  function ensureId(el, pref) {
    if (!el) return null;
    if (!el.id) el.id = (pref || "wf") + "-" + Math.random().toString(36).slice(2, 7);
    return el.id;
  }

  function popover(trigger, panel, opts) {
    const cfg = Object.assign({ margin: 8 }, opts || {});
    let lastFocus = null;
    // ARIA defaults
    if (!panel.hasAttribute("role")) panel.setAttribute("role", "dialog");
    const headerEl = panel.querySelector(".wf-popover__header, [data-popover-title]");
    if (headerEl && !panel.hasAttribute("aria-labelledby"))
      panel.setAttribute("aria-labelledby", ensureId(headerEl, "pv-title"));
    let lastPlacementAbove = false;
    function position() {
      const r = trigger.getBoundingClientRect();
      const { w, h } = measureBox(panel);
      const centerXRaw = r.left + r.width / 2;
      let centerX = centerXRaw;
      const minC = cfg.margin + w / 2,
        maxC = window.innerWidth - cfg.margin - w / 2;
      centerX = clamp(centerX, minC, maxC);
      const spaceBelow = window.innerHeight - r.bottom;
      const placeAbove = spaceBelow < h + cfg.margin + 10;

      lastPlacementAbove = placeAbove;
      const top = placeAbove ? r.top - h - cfg.margin : r.bottom + cfg.margin;
      panel.style.position = "fixed";
      panel.style.left = Math.round(centerX) + "px";
      panel.style.top = Math.round(top) + "px";
      panel.style.transform = "translateX(-50%)";
      panel.classList.toggle("is-arrow-top", placeAbove);
      panel.classList.toggle("is-arrow-bottom", !placeAbove);
      const maxArrow = Math.max(0, w / 2 - 10);
      const arrowX = clamp(centerXRaw - centerX, -maxArrow, maxArrow);
      panel.style.setProperty("--wf-arrow-x", arrowX + "px");
    }
    let ignoreDocClickUntil = 0;
    function open(v) {
      if (v) {
        lastFocus = document.activeElement;
        panel.hidden = false;
        panel.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
        position();
        const f = focusablesIn(panel);
        if (f.length) {
          requestAnimationFrame(() => requestAnimationFrame(() => f[0].focus()));
        } else {
          panel.setAttribute("tabindex", "-1");
          requestAnimationFrame(() => panel.focus());
        }
        // guard: ignore outside-clicks from the same gesture that triggered open
        ignoreDocClickUntil = performance.now() + 150;
      } else {
        panel.hidden = true;
        panel.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
        if (lastFocus && typeof lastFocus.focus === "function") {
          setTimeout(() => lastFocus.focus(), 0);
        }
      }
    }
    on(trigger, "click", () => open(panel.hidden));
    on(document, "click", e => {
      if (performance.now() < ignoreDocClickUntil) return;
      if (!panel.contains(e.target) && e.target !== trigger) {
        open(false);
      }
    });
    on(window, "resize", () => {
      if (!panel.hidden) position();
    });
    on(
      window,
      "scroll",
      () => {
        if (!panel.hidden) position();
      },
      { passive: true }
    );
    on(trigger, "keydown", e => {
      if (e.key === "Escape") {
        open(false);
      }
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open(panel.hidden);
      }
    });
    on(panel, "keydown", e => {
      if (e.key === "Escape") {
        open(false);
      }
      if (e.key === "Tab") {
        const f = focusablesIn(panel);
        if (!f.length) return;
        const i = f.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) {
          e.preventDefault();
          f[f.length - 1].focus();
        } else if (!e.shiftKey && i === f.length - 1) {
          e.preventDefault();
          f[0].focus();
        }
      }
    });
  }

  function dropdown(root) {
    if (!root) return;
    const btn = root.querySelector(".wf-dropdown__toggle");
    const menu = root.querySelector(".wf-dropdown__menu");
    if (!btn || !menu) return;
    if (!menu.hasAttribute("role")) menu.setAttribute("role", "menu");
    menu.querySelectorAll(".wf-dropdown__item").forEach(it => {
      if (!it.hasAttribute("role")) it.setAttribute("role", "menuitem");
    });
    let lastFocus = null;
    function items() {
      return Array.from(menu.querySelectorAll(".wf-dropdown__item"));
    }
    function open(v) {
      root.classList.toggle("is-open", v);
      btn.setAttribute("aria-expanded", String(v));
      menu.hidden = !v;
      if (v) {
        lastFocus = document.activeElement;
        const it = items();
        it.forEach(x => (x.tabIndex = -1));
        if (it.length) setTimeout(() => it[0].focus(), 0);
      } else {
        if (lastFocus && typeof lastFocus.focus === "function")
          setTimeout(() => lastFocus.focus(), 0);
      }
    }
    on(btn, "click", () => open(!root.classList.contains("is-open")));
    on(document, "click", e => {
      if (!root.contains(e.target)) open(false);
    });
    on(btn, "keydown", e => {
      if (e.key === "Escape") open(false);
      if ((e.key === "Enter" || e.key === " ") && menu.hidden) {
        e.preventDefault();
        open(true);
      }
      if (!menu.hidden && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
        e.preventDefault();
        const it = items();
        if (it.length) it[e.key === "ArrowDown" ? 0 : it.length - 1].focus();
      }
    });
    on(menu, "keydown", e => {
      if (e.key === "Escape") {
        open(false);
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const it = items();
        const i = it.indexOf(document.activeElement);
        if (i < 0) return;
        const n = e.key === "ArrowDown" ? (i + 1) % it.length : (i - 1 + it.length) % it.length;
        it[n].focus();
      }
      if (e.key === "Tab") {
        open(false);
      }
      if (e.key === "Enter" || e.key === " ") {
        const current = document.activeElement;
        if (current && current.classList.contains('wf-dropdown__item')) {
          e.preventDefault();
          open(false);
          btn.focus();
        }
      }
    });
    on(menu, 'click', (e)=>{
      const item = e.target.closest('.wf-dropdown__item');
      if (item) { e.preventDefault(); open(false); btn.focus(); }
    });
  }

  function focusTrap(container) {
    function trap(e) {
      if (e.key !== "Tab") return;
      const f = focusablesIn(container);
      if (!f.length) return;
      const i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) {
        e.preventDefault();
        f[f.length - 1].focus();
      } else if (!e.shiftKey && i === f.length - 1) {
        e.preventDefault();
        f[0].focus();
      }
    }
    container.addEventListener("keydown", trap);
    return () => container.removeEventListener("keydown", trap);
  }

  function getBackgroundElements(excludeEl) {
    return Array.from(document.body.children).filter(
      el => el !== excludeEl && el.tagName !== "SCRIPT"
    );
  }

  function modal(trigger, overlay, opts) {
    const cfg = Object.assign({ closeSelectors: [".wf-modal__close", "[data-close]"] }, opts || {});
    const closeBtns = () =>
      cfg.closeSelectors.flatMap(sel => Array.from(overlay.querySelectorAll(sel)));
    let lastFocus = null;
    let untrap = null;
    // Portal overlay to body to avoid aria-hidden conflicts with ancestors
    let placeholder = null;
    function portalToBody() {
      if (overlay.parentElement !== document.body) {
        placeholder = document.createComment("wfui-modal-placeholder");
        overlay.parentNode.insertBefore(placeholder, overlay.nextSibling);
        document.body.appendChild(overlay);
      }
    }
    function restoreFromPortal() {
      if (placeholder && placeholder.parentNode) {
        placeholder.parentNode.insertBefore(overlay, placeholder.nextSibling);
        placeholder.remove();
        placeholder = null;
      }
    }
    let hiddenBg = [];
    // Enforce dialog semantics on inner .wf-modal if present
    const dlg = overlay.querySelector(".wf-modal");
    if (dlg) {
      if (!dlg.hasAttribute("role")) dlg.setAttribute("role", "dialog");
      dlg.setAttribute("aria-modal", "true");
      const title = dlg.querySelector(".wf-modal__title");
      if (title && !dlg.hasAttribute("aria-labelledby"))
        dlg.setAttribute("aria-labelledby", ensureId(title, "modal-title"));
    }
    let docTrap = null;
    function attachDocTrap() {
      docTrap = function (e) {
        if (e.key !== "Tab") return;
        if (!overlay.classList.contains("is-open")) return;
        const f = focusablesIn(overlay);
        if (!f.length) return;
        const i = f.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) {
          e.preventDefault();
          f[f.length - 1].focus();
        } else if (!e.shiftKey && i === f.length - 1) {
          e.preventDefault();
          f[0].focus();
        }
      };
      document.addEventListener("keydown", docTrap, true);
    }
    function detachDocTrap() {
      if (docTrap) {
        document.removeEventListener("keydown", docTrap, true);
        docTrap = null;
      }
    }
    function show(v) {
      if (v) portalToBody();
      overlay.classList.toggle("is-open", v);
      overlay.setAttribute("aria-hidden", String(!v));
      if (v) {
        // Save focus and move it BEFORE setting aria-hidden
        lastFocus = document.activeElement;
        const first = focusablesIn(overlay)[0];
        if (first) {
          first.focus();
          // Wait for focus to actually move before hiding background
          requestAnimationFrame(() => {
            hiddenBg = getBackgroundElements(overlay);
            hiddenBg.forEach(el => el.setAttribute("aria-hidden", "true"));
          });
        } else {
          hiddenBg = getBackgroundElements(overlay);
          hiddenBg.forEach(el => el.setAttribute("aria-hidden", "true"));
        }
        untrap = focusTrap(overlay);
        attachDocTrap();
      } else {
        hiddenBg.forEach(el => el.removeAttribute("aria-hidden"));
        hiddenBg = [];
        if (untrap) untrap();
        detachDocTrap();
        restoreFromPortal();
        if (lastFocus) {
          setTimeout(() => lastFocus.focus(), 0);
        }
      }
    }
    on(trigger, "click", () => show(true));
    closeBtns().forEach(btn => on(btn, "click", () => show(false)));
    on(overlay, "click", e => {
      if (e.target === overlay) {
        show(false);
      }
    });
    on(document, "keydown", e => {
      if (e.key === "Escape") show(false);
    });
    return { open: () => show(true), close: () => show(false) };
  }

  function offcanvas(openBtn, panel, overlay) {
    let lastFocus = null;
    let untrap = null;
    // Portal to body to avoid aria-hidden on ancestors
    let panelPh = null,
      overlayPh = null;
    function portalOC() {
      if (panel.parentElement !== document.body) {
        panelPh = document.createComment("wfui-oc-panel");
        panel.parentNode.insertBefore(panelPh, panel.nextSibling);
        document.body.appendChild(panel);
      }
      if (overlay.parentElement !== document.body) {
        overlayPh = document.createComment("wfui-oc-overlay");
        overlay.parentNode.insertBefore(overlayPh, overlay.nextSibling);
        document.body.appendChild(overlay);
      }
    }
    function restoreOC() {
      if (panelPh && panelPh.parentNode) {
        panelPh.parentNode.insertBefore(panel, panelPh.nextSibling);
        panelPh.remove();
        panelPh = null;
      }
      if (overlayPh && overlayPh.parentNode) {
        overlayPh.parentNode.insertBefore(overlay, overlayPh.nextSibling);
        overlayPh.remove();
        overlayPh = null;
      }
    }
    let hiddenBg = [];
    function setOpen(v) {
      if (v) portalOC();
      panel.hidden = !v;
      overlay.hidden = !v;
      panel.classList.toggle("is-open", v);
      overlay.classList.toggle("is-open", v);
      if (v) {
        // Save focus and move it BEFORE setting aria-hidden
        lastFocus = document.activeElement;
        const first = focusablesIn(panel)[0];
        if (first) {
          first.focus();
          // Wait for focus to actually move before hiding background
          requestAnimationFrame(() => {
            hiddenBg = getBackgroundElements(panel);
            hiddenBg.forEach(el => el.setAttribute("aria-hidden", "true"));
          });
        } else {
          hiddenBg = getBackgroundElements(panel);
          hiddenBg.forEach(el => el.setAttribute("aria-hidden", "true"));
        }
        untrap = focusTrap(panel);
      } else {
        hiddenBg.forEach(el => el.removeAttribute("aria-hidden"));
        hiddenBg = [];
        restoreOC();
        if (untrap) untrap();
        if (lastFocus) setTimeout(() => lastFocus.focus(), 0);
      }
    }
    on(openBtn, "click", () => setOpen(true));
    const closeBtn = panel.querySelector('[id$="close"], .wf-btn, [data-close]');
    if (closeBtn) on(closeBtn, "click", () => setOpen(false));
    on(overlay, "click", () => setOpen(false));
    on(document, "keydown", e => {
      if (e.key === "Escape") setOpen(false);
    });
    return { open: () => setOpen(true), close: () => setOpen(false) };
  }

  function tabs(container) {
    if (!container) return;
    const tablist = container.querySelector('[role="tablist"], .wf-tablist');
    const tabs = Array.from(container.querySelectorAll('[role="tab"], .wf-tab'));
    const panels = Array.from(container.querySelectorAll('[role="tabpanel"], .wf-tabpanel'));
    if (!tablist || tabs.length === 0 || panels.length === 0) return;

    // Setup ARIA relationships
    if (!tablist.hasAttribute("role")) tablist.setAttribute("role", "tablist");
    tabs.forEach((tab, i) => {
      if (!tab.hasAttribute("role")) tab.setAttribute("role", "tab");
      const panelId = ensureId(panels[i], "panel");
      const tabId = ensureId(tab, "tab");
      tab.setAttribute("aria-controls", panelId);
      panels[i].setAttribute("aria-labelledby", tabId);
      if (!panels[i].hasAttribute("role")) panels[i].setAttribute("role", "tabpanel");
    });

    function activate(index) {
      tabs.forEach((t, i) => {
        const isActive = i === index;
        t.setAttribute("aria-selected", String(isActive));
        t.setAttribute("tabindex", isActive ? "0" : "-1");
        t.classList.toggle("is-active", isActive);
        panels[i].setAttribute("aria-hidden", String(!isActive));
        panels[i].classList.toggle("is-active", isActive);
      });
      tabs[index].focus();
    }

    tabs.forEach((tab, i) => {
      on(tab, "click", () => activate(i));
      on(tab, "keydown", e => {
        let newIndex = i;
        if (e.key === "ArrowRight") newIndex = (i + 1) % tabs.length;
        else if (e.key === "ArrowLeft") newIndex = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === "Home") newIndex = 0;
        else if (e.key === "End") newIndex = tabs.length - 1;
        else return;
        e.preventDefault();
        activate(newIndex);
      });
    });

    // Initialize first tab as active
    const activeIndex = tabs.findIndex(
      t => t.classList.contains("is-active") || t.getAttribute("aria-selected") === "true"
    );
    activate(activeIndex >= 0 ? activeIndex : 0);
  }

  function sortableTable(table) {
    if (!table) return;
    // Create or find live region for announcements
    let liveRegion = document.getElementById("wf-table-status");
    if (!liveRegion) {
      liveRegion = document.createElement("div");
      liveRegion.id = "wf-table-status";
      liveRegion.setAttribute("role", "status");
      liveRegion.setAttribute("aria-live", "polite");
      liveRegion.className = "wf-sr-only";
      document.body.appendChild(liveRegion);
    }

    const sortButtons = Array.from(table.querySelectorAll(".wf-sort"));
    sortButtons.forEach(btn => {
      const th = btn.closest("th");
      if (!th) return;

      // Setup aria-describedby
      const statusId = "wf-sort-help";
      let helpText = document.getElementById(statusId);
      if (!helpText) {
        helpText = document.createElement("span");
        helpText.id = statusId;
        helpText.className = "wf-sr-only";
        helpText.textContent = "昇順または降順で並び替えるには、Enterキーを押してください";
        document.body.appendChild(helpText);
      }
      btn.setAttribute("aria-describedby", statusId);

      on(btn, "click", () => {
        const currentSort = th.getAttribute("aria-sort");
        const columnName = btn.textContent.trim();
        let newSort = "ascending";

        // Reset all other columns
        table.querySelectorAll("th[aria-sort]").forEach(otherTh => {
          if (otherTh !== th) otherTh.removeAttribute("aria-sort");
        });

        // Toggle current column
        if (currentSort === "ascending") newSort = "descending";
        else if (currentSort === "descending") newSort = "none";

        if (newSort === "none") th.removeAttribute("aria-sort");
        else th.setAttribute("aria-sort", newSort);

        // Announce to screen readers
        const announcement =
          newSort === "none"
            ? `${columnName}列のソートを解除しました`
            : `${columnName}列を${newSort === "ascending" ? "昇順" : "降順"}に並び替えました`;
        liveRegion.textContent = announcement;
      });
    });
  }

  window.WFUI = { tooltip, popover, dropdown, modal, offcanvas, tabs, sortableTable };

  // Auto-initialization
  document.addEventListener("DOMContentLoaded", () => {
    // Tooltip: data-wf-tooltip="tooltip-id"
    document.querySelectorAll("[data-wf-tooltip]").forEach(trigger => {
      const tipId = trigger.getAttribute("data-wf-tooltip");
      const tip = document.getElementById(tipId);
      if (tip) tooltip(trigger, tip);
    });

    // Popover: data-wf-popover="popover-id"
    document.querySelectorAll("[data-wf-popover]").forEach(trigger => {
      const panelId = trigger.getAttribute("data-wf-popover");
      const panel = document.getElementById(panelId);
      if (panel) popover(trigger, panel);
    });

    // Dropdown: auto-detect .wf-dropdown
    document.querySelectorAll(".wf-dropdown").forEach(root => dropdown(root));

    // Modal: data-wf-modal="overlay-id" on trigger
    document.querySelectorAll("[data-wf-modal]").forEach(trigger => {
      const overlayId = trigger.getAttribute("data-wf-modal");
      const overlay = document.getElementById(overlayId);
      if (overlay) modal(trigger, overlay);
    });

    // Offcanvas: data-wf-offcanvas="panel-id" on trigger
    document.querySelectorAll("[data-wf-offcanvas]").forEach(openBtn => {
      const panelId = openBtn.getAttribute("data-wf-offcanvas");
      const panel = document.getElementById(panelId);
      const overlayId = openBtn.getAttribute("data-wf-offcanvas-overlay") || panelId + "-overlay";
      const overlay = document.getElementById(overlayId);
      if (panel && overlay) offcanvas(openBtn, panel, overlay);
    });

    // Tabs: auto-detect [data-wf-tabs] or .wf-tabs
    document.querySelectorAll("[data-wf-tabs]").forEach(tablist => {
      // data-wf-tabs is on the tablist itself, use parent as container
      tabs(tablist.parentElement);
    });
    document.querySelectorAll(".wf-tabs").forEach(container => tabs(container));

    // Sortable tables: auto-detect .wf-table with .wf-sort
    document.querySelectorAll(".wf-table").forEach(table => {
      if (table.querySelector(".wf-sort")) sortableTable(table);
    });
  });
})();
