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

  function schedule(root, opts) {
    if (!root) return;
    const cfg = Object.assign(
      {
        mode: "daily", // 'daily' or 'weekly'
        timeInterval: 60, // minutes: 15, 30, or 60
        timeRange: "all-day", // 'all-day', 'work1', 'work2'
        selectedDate: null, // ISO date string (YYYY-MM-DD)
        onSelect: null, // callback when selection changes
        onGenerate: null // callback to generate text
      },
      opts || {}
    );

    const timeRangePatterns = {
      "all-day": { label: "24時間表示", start: 0, end: 23 },
      work1: { label: "勤怠：ノーマル", start: 8, end: 18 },
      work2: { label: "勤怠：モダン", start: 10, end: 20 }
    };

    function getInitialWeekStart() {
      const today = new Date();
      const monday = new Date(today);
      monday.setDate(today.getDate() - today.getDay() + 1);
      if (monday.getDay() === 0) monday.setDate(monday.getDate() - 7); // Sunday -> previous Monday
      return monday;
    }

    const state = {
      selectedSlots: new Set(),
      isSelecting: false,
      displayMode: cfg.mode,
      selectedDate: cfg.selectedDate || new Date().toISOString().split("T")[0],
      currentWeekStart: getInitialWeekStart(),
      timeInterval: cfg.timeInterval,
      timeRangePattern: cfg.timeRange,
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ),
      lastSelectedSlot: null,
      rangeSelectionStart: null,
      isRangeSelecting: false
    };

    function generateTimeSlots() {
      const pattern = timeRangePatterns[state.timeRangePattern];
      const slots = [];
      for (let hour = pattern.start; hour <= pattern.end; hour++) {
        for (let minute = 0; minute < 60; minute += state.timeInterval) {
          if (hour === pattern.end && minute > 0) break;
          const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
          slots.push(timeString);
        }
      }
      return slots;
    }

    function getWeekDates() {
      const dates = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(state.currentWeekStart);
        date.setDate(state.currentWeekStart.getDate() + i);
        dates.push(date);
      }
      return dates;
    }

    function getSlotKey(date, time) {
      let dateStr;
      if (date instanceof Date) {
        dateStr = date.toISOString().split("T")[0];
      } else {
        dateStr = date;
      }
      return `${dateStr}-${time}`;
    }

    function getWeekdayLabel(date) {
      const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
      return weekdays[date.getDay()];
    }

    function isSlotSelected(date, time) {
      return state.selectedSlots.has(getSlotKey(date, time));
    }

    function toggleSlot(date, time, forceSelect = false) {
      const key = getSlotKey(date, time);
      if (forceSelect || !state.selectedSlots.has(key)) {
        state.selectedSlots.add(key);
      } else if (!forceSelect) {
        state.selectedSlots.delete(key);
      }
      updateDisplay();
      if (cfg.onSelect) cfg.onSelect(Array.from(state.selectedSlots));
    }

    function handleTimeSlotMouseDown(date, time) {
      if (!state.isMobile) {
        state.isSelecting = true;
        toggleSlot(date, time);
        state.lastSelectedSlot = getSlotKey(date, time);
        document.addEventListener("mouseup", handleGlobalMouseUp);
      }
    }

    function handleTimeSlotMouseEnter(date, time) {
      if (!state.isMobile && state.isSelecting) {
        const currentSlot = getSlotKey(date, time);
        if (currentSlot !== state.lastSelectedSlot) {
          toggleSlot(date, time);
          state.lastSelectedSlot = currentSlot;
        }
      }
    }

    function handleGlobalMouseUp() {
      state.isSelecting = false;
      state.lastSelectedSlot = null;
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    }

    function handleTimeSlotClick(date, time) {
      if (state.isMobile) {
        handleMobileTimeSlotClick(date, time);
      } else {
        handleTimeSlotMouseDown(date, time);
      }
    }

    function handleMobileTimeSlotClick(date, time) {
      const key = getSlotKey(date, time);
      if (!state.isRangeSelecting) {
        if (state.selectedSlots.has(key)) {
          toggleSlot(date, time);
        } else {
          state.rangeSelectionStart = { date, time };
          state.isRangeSelecting = true;
          updateDisplay();
        }
      } else {
        if (state.rangeSelectionStart) {
          selectTimeRange(
            state.rangeSelectionStart.date,
            state.rangeSelectionStart.time,
            date,
            time
          );
        }
        state.rangeSelectionStart = null;
        state.isRangeSelecting = false;
        updateDisplay();
      }
    }

    function selectTimeRange(startDate, startTime, endDate, endTime) {
      const timeSlots = generateTimeSlots();
      const startKey = getSlotKey(startDate, startTime);
      const endKey = getSlotKey(endDate, endTime);
      const startDateStr = startKey.split("-").slice(0, 3).join("-");
      const endDateStr = endKey.split("-").slice(0, 3).join("-");

      if (startDateStr === endDateStr) {
        const startIndex = timeSlots.indexOf(startTime);
        const endIndex = timeSlots.indexOf(endTime);
        const minIndex = Math.min(startIndex, endIndex);
        const maxIndex = Math.max(startIndex, endIndex);
        for (let i = minIndex; i <= maxIndex; i++) {
          toggleSlot(startDate, timeSlots[i], true);
        }
      } else {
        toggleSlot(endDate, endTime);
      }
    }

    function updateDisplay() {
      const dailyGrid = root.querySelector(".wf-schedule__time-grid");
      const weeklyGrid = root.querySelector(".wf-schedule__calendar-grid");
      const weeklyHeader = root.querySelector(".wf-schedule__calendar-header");
      const dailySection = root.querySelector(".wf-schedule__daily");
      const weeklySection = root.querySelector(".wf-schedule__weekly");
      const weekTitle = root.querySelector(".wf-schedule__week-title");
      const helpText = root.querySelector(".wf-schedule__help");

      // Mode switching
      if (dailySection) {
        dailySection.classList.toggle("is-hidden", state.displayMode !== "daily");
      }
      if (weeklySection) {
        weeklySection.classList.toggle("is-hidden", state.displayMode !== "weekly");
      }

      // Week title
      if (weekTitle && state.displayMode === "weekly") {
        weekTitle.textContent = `${state.currentWeekStart.getFullYear()}年${state.currentWeekStart.getMonth() + 1}月 週間表示`;
      }

      // Daily grid
      if (dailyGrid && state.displayMode === "daily") {
        const timeSlots = generateTimeSlots();
        const cols = state.timeInterval === 15 ? "4" : state.timeInterval === 30 ? "6" : "8";
        dailyGrid.className = `wf-schedule__time-grid cols-${cols}`;
        dailyGrid.innerHTML = timeSlots
          .map(time => {
            const selected = isSlotSelected(state.selectedDate, time);
            const isRangeStart =
              state.isRangeSelecting &&
              state.rangeSelectionStart &&
              state.rangeSelectionStart.time === time &&
              getSlotKey(state.rangeSelectionStart.date, time) === getSlotKey(state.selectedDate, time);
            let className = `wf-schedule__time-slot ${selected ? "is-selected" : ""}`;
            if (isRangeStart) className += " is-range-start";
            const eventHandlers = state.isMobile
              ? `onclick="handleTimeSlotClick('${state.selectedDate}', '${time}')"`
              : `onmousedown="handleTimeSlotMouseDown('${state.selectedDate}', '${time}')" onmouseenter="handleTimeSlotMouseEnter('${state.selectedDate}', '${time}')"`;
            return `<div class="${className}" data-time="${time}" ${eventHandlers}>${time}</div>`;
          })
          .join("");

        if (!state.isMobile) {
          dailyGrid.addEventListener("mouseleave", () => {
            state.isSelecting = false;
            state.lastSelectedSlot = null;
          });
          dailyGrid.addEventListener("selectstart", e => e.preventDefault());
          dailyGrid.addEventListener("contextmenu", e => {
            if (state.isSelecting) e.preventDefault();
          });
        }
      }

      // Weekly calendar
      if (weeklyGrid && state.displayMode === "weekly") {
        const timeSlots = generateTimeSlots();
        const weekDates = getWeekDates();

        // Header
        if (weeklyHeader) {
          weeklyHeader.innerHTML = `<div class="wf-schedule__time-label">時間</div>${weekDates
            .map(
              date =>
                `<div class="wf-schedule__date-header"><div class="wf-schedule__date-weekday">${getWeekdayLabel(date)}</div><div class="wf-schedule__date-day">${date.getMonth() + 1}/${date.getDate()}</div></div>`
            )
            .join("")}`;
        }

        // Grid
        weeklyGrid.innerHTML = timeSlots
          .map(time => {
            let rowHtml = `<div class="wf-schedule__week-time-label">${time.slice(0, 5)}</div>`;
            weekDates.forEach(date => {
              const selected = isSlotSelected(date, time);
              const dateStr = date.toISOString().split("T")[0];
              const isRangeStart =
                state.isRangeSelecting &&
                state.rangeSelectionStart &&
                state.rangeSelectionStart.time === time &&
                getSlotKey(state.rangeSelectionStart.date, time) === getSlotKey(dateStr, time);
              let className = `wf-schedule__week-time-slot ${selected ? "is-selected" : ""}`;
              if (isRangeStart) className += " is-range-start";
              const eventHandlers = state.isMobile
                ? `onclick="handleTimeSlotClick('${dateStr}', '${time}')"`
                : `onmousedown="handleTimeSlotMouseDown('${dateStr}', '${time}')" onmouseenter="handleTimeSlotMouseEnter('${dateStr}', '${time}')"`;
              rowHtml += `<div class="${className}" data-date="${dateStr}" data-time="${time}" ${eventHandlers}>${selected ? "選択中" : ""}</div>`;
            });
            return rowHtml;
          })
          .join("");

        if (!state.isMobile) {
          weeklyGrid.addEventListener("mouseleave", () => {
            state.isSelecting = false;
            state.lastSelectedSlot = null;
          });
          weeklyGrid.addEventListener("selectstart", e => e.preventDefault());
          weeklyGrid.addEventListener("contextmenu", e => {
            if (state.isSelecting) e.preventDefault();
          });
        }
      }

      // Help text
      if (helpText) {
        const pattern = timeRangePatterns[state.timeRangePattern];
        helpText.innerHTML = `クリックまたはドラッグして時間帯を選択してください（${pattern.label}: ${pattern.start}:00-${pattern.end}:00、${state.timeInterval}分刻み）${state.isMobile ? '<div style="font-size: 0.75rem; color: var(--wf-color-muted); margin-top: 0.25rem;">📱 スマホ：1回目のタップで開始、2回目のタップで終了時間を選択</div>' : ""}`;
      }
    }

    // Expose handlers globally for inline handlers
    window.handleTimeSlotMouseDown = handleTimeSlotMouseDown;
    window.handleTimeSlotMouseEnter = handleTimeSlotMouseEnter;
    window.handleTimeSlotClick = handleTimeSlotClick;

    // Initialize
    updateDisplay();

    return {
      getSelectedSlots: () => Array.from(state.selectedSlots),
      clearSelection: () => {
        state.selectedSlots.clear();
        state.rangeSelectionStart = null;
        state.isRangeSelecting = false;
        updateDisplay();
      },
      setMode: mode => {
        state.displayMode = mode;
        updateDisplay();
      },
      setTimeInterval: interval => {
        state.timeInterval = interval;
        state.selectedSlots.clear();
        updateDisplay();
      },
      setTimeRange: range => {
        state.timeRangePattern = range;
        state.selectedSlots.clear();
        updateDisplay();
      },
      setSelectedDate: date => {
        state.selectedDate = date;
        updateDisplay();
      },
      navigateWeek: direction => {
        const newWeekStart = new Date(state.currentWeekStart);
        newWeekStart.setDate(state.currentWeekStart.getDate() + direction * 7);
        state.currentWeekStart = newWeekStart;
        updateDisplay();
      },
      getCurrentWeekStart: () => {
        return new Date(state.currentWeekStart);
      },
      goToCurrentWeek: () => {
        state.currentWeekStart = getInitialWeekStart();
        updateDisplay();
      },
      generateText: () => {
        const slotsByDate = {};
        Array.from(state.selectedSlots).forEach(slot => {
          const parts = slot.split("-");
          const date = parts.slice(0, 3).join("-");
          const time = parts.slice(3).join(":");
          if (!slotsByDate[date]) slotsByDate[date] = [];
          slotsByDate[date].push(time);
        });
        if (Object.keys(slotsByDate).length === 0) return "";
        const results = [];
        Object.keys(slotsByDate)
          .sort()
          .forEach(date => {
            const times = slotsByDate[date].sort();
            const ranges = [];
            let rangeStart = times[0];
            let rangeEnd = times[0];
            for (let i = 1; i < times.length; i++) {
              const [prevHour, prevMinute] = times[i - 1].split(":").map(Number);
              const [currHour, currMinute] = times[i].split(":").map(Number);
              const prevTotalMinutes = prevHour * 60 + prevMinute;
              const currTotalMinutes = currHour * 60 + currMinute;
              if (currTotalMinutes === prevTotalMinutes + state.timeInterval) {
                rangeEnd = times[i];
              } else {
                const [endHour, endMinute] = rangeEnd.split(":").map(Number);
                let finalEndMinute = endMinute + state.timeInterval;
                let finalEndHour = endHour;
                if (finalEndMinute >= 60) {
                  finalEndMinute -= 60;
                  finalEndHour += 1;
                }
                const endTime = `${finalEndHour.toString().padStart(2, "0")}:${finalEndMinute.toString().padStart(2, "0")}`;
                ranges.push(`${rangeStart}-${endTime}`);
                rangeStart = times[i];
                rangeEnd = times[i];
              }
            }
            if (rangeStart) {
              const [endHour, endMinute] = rangeEnd.split(":").map(Number);
              let finalEndMinute = endMinute + state.timeInterval;
              let finalEndHour = endHour;
              if (finalEndMinute >= 60) {
                finalEndMinute -= 60;
                finalEndHour += 1;
              }
              const endTime = `${finalEndHour.toString().padStart(2, "0")}:${finalEndMinute.toString().padStart(2, "0")}`;
              ranges.push(`${rangeStart}-${endTime}`);
            }
            const dateFormatted = date.replace(/-/g, "/");
            results.push(`${dateFormatted} ${ranges.join(",")}`);
          });
        return results.join("\n");
      }
    };
  }

  function calendar(root, opts) {
    if (!root) return;
    // 既に初期化されている場合は再初期化しない
    if (root._wfCalendarInstance) {
      return root._wfCalendarInstance;
    }
    const cfg = Object.assign(
      {
        selectedDate: null, // ISO date string (YYYY-MM-DD)
        selectedDates: [], // Array of ISO date strings for multiple selection
        minDate: null, // ISO date string
        maxDate: null, // ISO date string
        weekStart: 1, // 0 = Sunday, 1 = Monday
        allowMultiple: false, // Allow multiple date selection
        allowRange: false, // Allow date range selection
        onSelect: null, // callback when date is selected
        onNavigate: null // callback when month changes
      },
      opts || {}
    );

    const weekdays = cfg.weekStart === 0 ? ["日", "月", "火", "水", "木", "金", "土"] : ["月", "火", "水", "木", "金", "土", "日"];

    // 初期表示日付を決定: 日付制限がある場合は制限範囲内に設定
    let initialDate = new Date();
    if (cfg.minDate) {
      const [minYear, minMonth] = cfg.minDate.split("-").map(Number);
      const minDateObj = new Date(minYear, minMonth - 1, 1);
      if (initialDate < minDateObj) {
        initialDate = minDateObj;
      }
    }
    if (cfg.maxDate) {
      const [maxYear, maxMonth] = cfg.maxDate.split("-").map(Number);
      const maxDateObj = new Date(maxYear, maxMonth - 1, 1);
      if (initialDate > maxDateObj) {
        initialDate = maxDateObj;
      }
    }

    const state = {
      currentDate: initialDate,
      selectedDate: cfg.selectedDate
        ? (() => {
            const [year, month, day] = cfg.selectedDate.split("-").map(Number);
            return new Date(year, month - 1, day);
          })()
        : null,
      selectedDates: new Set(cfg.selectedDates || []),
      rangeStart: null,
      rangeEnd: null,
      allowMultiple: cfg.allowMultiple,
      allowRange: cfg.allowRange
    };

    function getMonthStart(date) {
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      return monthStart;
    }

    function getMonthEnd(date) {
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      return monthEnd;
    }

    function getFirstDayOfWeek(date) {
      const firstDay = getMonthStart(date);
      let day = firstDay.getDay();
      if (cfg.weekStart === 1) {
        // Monday start: convert Sunday (0) to 6, others subtract 1
        day = day === 0 ? 6 : day - 1;
      }
      // Sunday start: use day as-is (0-6)
      return day;
    }

    function getDaysInMonth(date) {
      return getMonthEnd(date).getDate();
    }

    // ローカルタイムゾーンで日付文字列（YYYY-MM-DD）を取得
    function formatDateLocal(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    function isToday(date) {
      const today = new Date();
      return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
      );
    }

    function isSelected(date) {
      const dateStr = formatDateLocal(date);
      const selectedDateStr = state.selectedDate ? formatDateLocal(state.selectedDate) : null;
      return state.selectedDates.has(dateStr) || (selectedDateStr && dateStr === selectedDateStr);
    }

    function isDisabled(date) {
      const dateStr = formatDateLocal(date);
      if (cfg.minDate) {
        const minDateStr = cfg.minDate.includes("T") ? cfg.minDate.split("T")[0] : cfg.minDate;
        if (dateStr < minDateStr) return true;
      }
      if (cfg.maxDate) {
        const maxDateStr = cfg.maxDate.includes("T") ? cfg.maxDate.split("T")[0] : cfg.maxDate;
        if (dateStr > maxDateStr) return true;
      }
      return false;
    }

    function isInRange(date) {
      if (!state.rangeStart || !state.rangeEnd) return false;
      const dateStr = formatDateLocal(date);
      const startStr = formatDateLocal(state.rangeStart);
      const endStr = formatDateLocal(state.rangeEnd);
      return dateStr >= startStr && dateStr <= endStr;
    }

    function isRangeStart(date) {
      if (!state.rangeStart) return false;
      const dateStr = formatDateLocal(date);
      const startStr = formatDateLocal(state.rangeStart);
      return dateStr === startStr;
    }

    function isRangeEnd(date) {
      if (!state.rangeEnd) return false;
      const dateStr = formatDateLocal(date);
      const endStr = formatDateLocal(state.rangeEnd);
      return dateStr === endStr;
    }

    function handleDateClick(date) {
      const dateStr = formatDateLocal(date);
      if (isDisabled(date)) {
        return;
      }

      if (state.allowRange) {
        if (!state.rangeStart || (state.rangeStart && state.rangeEnd)) {
          state.rangeStart = date;
          state.rangeEnd = null;
        } else {
          if (date < state.rangeStart) {
            state.rangeEnd = state.rangeStart;
            state.rangeStart = date;
          } else {
            state.rangeEnd = date;
          }
        }
      } else if (state.allowMultiple) {
        if (state.selectedDates.has(dateStr)) {
          state.selectedDates.delete(dateStr);
        } else {
          state.selectedDates.add(dateStr);
        }
      } else {
        state.selectedDate = date;
        state.selectedDates.clear();
      }

      updateDisplay();
      if (cfg.onSelect) {
        if (state.allowRange) {
          if (state.rangeStart && state.rangeEnd) {
            cfg.onSelect({
              start: formatDateLocal(state.rangeStart),
              end: formatDateLocal(state.rangeEnd)
            });
          } else if (state.rangeStart) {
            // Range selection in progress
            cfg.onSelect({
              start: formatDateLocal(state.rangeStart),
              end: null
            });
          }
        } else if (state.allowMultiple) {
          cfg.onSelect(Array.from(state.selectedDates));
        } else {
          cfg.onSelect(dateStr);
        }
      }
      // Fire custom event
      root.dispatchEvent(
        new CustomEvent("wf-calendar-select", {
          detail: state.allowRange
            ? state.rangeStart && state.rangeEnd
              ? {
                  start: formatDateLocal(state.rangeStart),
                  end: formatDateLocal(state.rangeEnd)
                }
              : state.rangeStart
                ? {
                    start: formatDateLocal(state.rangeStart),
                    end: null
                  }
                : null
            : state.allowMultiple
              ? Array.from(state.selectedDates)
              : dateStr
        })
      );
    }

    function updateDisplay() {
      const header = root.querySelector(".wf-calendar__header");
      const title = root.querySelector(".wf-calendar__title");
      const grid = root.querySelector(".wf-calendar__grid");
      const weekdaysEl = root.querySelector(".wf-calendar__weekdays");

      // Update title
      if (title) {
        title.textContent = `${state.currentDate.getFullYear()}年${state.currentDate.getMonth() + 1}月`;
      }

      // Update weekdays
      if (weekdaysEl) {
        weekdaysEl.innerHTML = weekdays
          .map((day, index) => {
            const isWeekend = cfg.weekStart === 1 ? index >= 5 : index === 0 || index === 6;
            return `<div class="wf-calendar__weekday${isWeekend ? " wf-calendar__weekday--weekend" : ""}">${day}</div>`;
          })
          .join("");
      }

      // Update grid
      if (grid) {
        const monthStart = getMonthStart(state.currentDate);
        const monthEnd = getMonthEnd(state.currentDate);
        const firstDay = getFirstDayOfWeek(state.currentDate);
        const daysInMonth = getDaysInMonth(state.currentDate);
        const days = [];

        // Previous month days
        if (firstDay > 0) {
          const prevMonth = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() - 1, 0);
          const prevMonthDays = prevMonth.getDate();
          for (let i = firstDay - 1; i >= 0; i--) {
            const day = prevMonthDays - i;
            const date = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() - 1, day);
            days.push({ date, isOtherMonth: true });
          }
        }

        // Current month days
        for (let i = 1; i <= daysInMonth; i++) {
          const date = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth(), i);
          days.push({ date, isOtherMonth: false });
        }

        // Next month days (fill remaining cells)
        const remainingCells = 42 - days.length; // 6 rows × 7 days = 42
        for (let i = 1; i <= remainingCells; i++) {
          const date = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() + 1, i);
          days.push({ date, isOtherMonth: true });
        }

        grid.innerHTML = days
          .map(({ date, isOtherMonth }) => {
            const dateStr = formatDateLocal(date);
            let className = "wf-calendar__day";
            if (isToday(date)) className += " is-today";
            if (isSelected(date)) className += " is-selected";
            if (isDisabled(date)) className += " is-disabled";
            if (isOtherMonth) className += " is-other-month";
            if (state.allowRange) {
              if (isRangeStart(date)) className += " is-range-start";
              if (isRangeEnd(date)) className += " is-range-end";
              if (isInRange(date) && !isRangeStart(date) && !isRangeEnd(date)) className += " is-in-range";
            }

            return `<button type="button" class="${className}" data-date="${dateStr}" tabindex="${isDisabled(date) || isOtherMonth ? "-1" : "0"}">${date.getDate()}</button>`;
          })
          .join("");

        // Add event listeners
        grid.querySelectorAll(".wf-calendar__day").forEach(btn => {
          btn.addEventListener("click", () => {
            const dateStr = btn.getAttribute("data-date");
            // YYYY-MM-DD形式からローカルタイムゾーンでDateオブジェクトを作成
            const [year, month, day] = dateStr.split("-").map(Number);
            const date = new Date(year, month - 1, day);
            handleDateClick(date);
          });
        });
      }
    }

    function navigateMonth(direction) {
      const newDate = new Date(state.currentDate);
      newDate.setMonth(state.currentDate.getMonth() + direction);
      state.currentDate = newDate;
      updateDisplay();
      if (cfg.onNavigate) {
        cfg.onNavigate(state.currentDate.getFullYear(), state.currentDate.getMonth() + 1);
      }
    }

    // Initialize event listeners
    const prevBtn = root.querySelector('[data-action="prev"]');
    const nextBtn = root.querySelector('[data-action="next"]');

    if (prevBtn) {
      prevBtn.addEventListener("click", () => navigateMonth(-1));
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () => navigateMonth(1));
    }

    // Initialize display
    updateDisplay();

    const instance = {
      getSelectedDate: () => {
        return state.selectedDate ? formatDateLocal(state.selectedDate) : null;
      },
      getSelectedDates: () => {
        return Array.from(state.selectedDates);
      },
      getRange: () => {
        if (state.rangeStart && state.rangeEnd) {
          return {
            start: formatDateLocal(state.rangeStart),
            end: formatDateLocal(state.rangeEnd)
          };
        }
        return null;
      },
      setSelectedDate: date => {
        if (date) {
          // YYYY-MM-DD形式からローカルタイムゾーンでDateオブジェクトを作成
          const [year, month, day] = date.split("-").map(Number);
          state.selectedDate = new Date(year, month - 1, day);
        } else {
          state.selectedDate = null;
        }
        state.selectedDates.clear();
        updateDisplay();
      },
      setSelectedDates: dates => {
        state.selectedDates = new Set(dates || []);
        state.selectedDate = null;
        updateDisplay();
      },
      navigateMonth: direction => {
        navigateMonth(direction);
      },
      goToMonth: (year, month) => {
        state.currentDate = new Date(year, month - 1, 1);
        updateDisplay();
      },
      goToToday: () => {
        state.currentDate = new Date();
        updateDisplay();
      }
    };

    // Store instance reference and config
    root._wfCalendarInstance = instance;
    root._wfCalendarConfig = cfg;
    return instance;
  }

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

    // Code blocks with copy button: auto-detect [data-wf-codeblock]
    document.querySelectorAll("[data-wf-codeblock]").forEach(pre => codeblock(pre));

    // Schedule: auto-detect [data-wf-schedule] or .wf-schedule
    document.querySelectorAll("[data-wf-schedule], .wf-schedule").forEach(root => {
      const mode = root.getAttribute("data-wf-schedule-mode") || "daily";
      const timeInterval = parseInt(root.getAttribute("data-wf-schedule-interval")) || 60;
      const timeRange = root.getAttribute("data-wf-schedule-range") || "all-day";
      const selectedDate = root.getAttribute("data-wf-schedule-date");
      schedule(root, { mode, timeInterval, timeRange, selectedDate });
    });

    // Calendar: auto-detect [data-wf-calendar] or .wf-calendar
    document.querySelectorAll("[data-wf-calendar], .wf-calendar").forEach(root => {
      const selectedDate = root.getAttribute("data-wf-calendar-date");
      const allowMultiple = root.getAttribute("data-wf-calendar-multiple") === "true";
      const allowRange = root.getAttribute("data-wf-calendar-range") === "true";
      const weekStartAttr = root.getAttribute("data-wf-calendar-week-start");
      const weekStart = weekStartAttr !== null ? parseInt(weekStartAttr) : 1;
      const minDate = root.getAttribute("data-wf-calendar-min-date");
      const maxDate = root.getAttribute("data-wf-calendar-max-date");
      calendar(root, {
        selectedDate,
        allowMultiple,
        allowRange,
        weekStart,
        minDate,
        maxDate
      });
    });
  });

  function codeblock(pre) {
    if (!pre) return;

    // Add copy button if not already present
    if (pre.querySelector(".wf-code-copy")) return;

    pre.classList.add("wf-code-block--copy");

    const btn = document.createElement("button");
    btn.className = "wf-code-copy";
    btn.textContent = "コピー";
    btn.type = "button";
    btn.setAttribute("aria-label", "コードをコピー");

    pre.appendChild(btn);

    on(btn, "click", async () => {
      const code = pre.querySelector("code") || pre;
      const text = code.textContent || code.innerText;

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          // Fallback for older browsers
          const textarea = document.createElement("textarea");
          textarea.value = text;
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
        }

        // Visual feedback
        const originalText = btn.textContent;
        btn.textContent = "コピーしました！";
        btn.classList.add("is-copied");

        setTimeout(() => {
          btn.textContent = originalText;
          btn.classList.remove("is-copied");
        }, 2000);
      } catch (err) {
        btn.textContent = "コピー失敗";
        setTimeout(() => {
          btn.textContent = "コピー";
        }, 2000);
      }
    });
  }

  window.WFUI = {
    tooltip,
    popover,
    dropdown,
    modal,
    offcanvas,
    tabs,
    sortableTable,
    codeblock,
    schedule,
    calendar
  };
})();
