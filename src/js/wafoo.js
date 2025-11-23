/* WFUI PATCH BEGIN */
// Runtime patches and enhancements for WFUI (tooltip/popover placement, safety preventDefault,
// schedule visibility gating, and minor content sanitization).
//
// NOTE: This file contains PATCHES ONLY.
// The WFUI core library is in src/js/wafoo-core.js
// Build process (scripts/build.sh) combines: wafoo-core.js + wafoo.js → dist/wafoo.js
(function () {
  if (typeof window === "undefined" || !window.WFUI) return;
  const WFUI = window.WFUI;

  // --- utils ---
  const on = (el, evt, handler, opts) => {
    el?.addEventListener(evt, handler, opts);
  };
  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
  const throttle = (func) => {
    let ticking = false;
    return (...args) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          func(...args);
          ticking = false;
        });
        ticking = true;
      }
    };
  };

  // --- tooltip with placement ---
  // --- tooltip with placement ---
  (() => {
    WFUI.tooltip = (trigger, tip, opts) => {
      const cfg = { margin: 8, placement: "auto", ...(opts || {}) };

      // ARIA attributes for accessibility
      const tipId = tip.id || `wf-tooltip-${Math.random().toString(36).substr(2, 9)}`;
      if (!tip.id) tip.id = tipId;
      if (!trigger.getAttribute('aria-describedby')) {
        trigger.setAttribute('aria-describedby', tipId);
      }
      if (!tip.getAttribute('role')) {
        tip.setAttribute('role', 'tooltip');
      }
      // Initial state: hidden
      if (!tip.hasAttribute('aria-hidden')) {
        tip.setAttribute('aria-hidden', 'true');
      }

      const measure = (el) => {
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
      };

      const position = () => {
        const r = trigger.getBoundingClientRect();
        const box = measure(tip);
        const { w, h } = box;
        let chosen = cfg.placement;
        if (chosen === "auto") {
          const spaceAbove = r.top;
          chosen = spaceAbove < h + cfg.margin + 10 ? "bottom" : "top";
        }
        tip.style.position = "fixed";
        tip.classList.remove("is-top", "is-bottom", "is-left", "is-right");
        if (chosen === "left" || chosen === "right") {
          let top = r.top + r.height / 2;
          let left = chosen === "right" ? r.right + cfg.margin : r.left - w - cfg.margin;
          const minL = 4;
          const maxL = window.innerWidth - w - 4;
          left = clamp(left, minL, maxL);
          const minT = 4 + h / 2;
          const maxT = window.innerHeight - 4 - h / 2;
          top = clamp(top, minT, maxT);
          tip.style.left = `${Math.round(left)}px`;
          tip.style.top = `${Math.round(top)}px`;
          tip.style.transform = "translateY(-50%)";
          tip.classList.add(chosen === "right" ? "is-right" : "is-left");
        } else {
          const centerXRaw = r.left + r.width / 2;
          let centerX = centerXRaw;
          const minC = cfg.margin + w / 2;
          const maxC = window.innerWidth - cfg.margin - w / 2;
          centerX = clamp(centerX, minC, maxC);
          const top2 = chosen === "bottom" ? r.bottom + cfg.margin : r.top - h - cfg.margin;
          tip.style.left = `${Math.round(centerX)}px`;
          tip.style.top = `${Math.round(top2)}px`;
          tip.style.transform = "translateX(-50%)";
          tip.classList.add(chosen === "bottom" ? "is-bottom" : "is-top");
          const maxArrow = Math.max(0, w / 2 - 8);
          const arrowX = clamp(centerXRaw - centerX, -maxArrow, maxArrow);
          tip.style.setProperty("--wf-arrow-x", `${arrowX}px`);
        }
      };

      const show = (v) => {
        if (v) position();
        tip.hidden = !v;
        tip.classList.toggle("is-open", v);
        tip.setAttribute('aria-hidden', v ? 'false' : 'true');
      };
      on(trigger, "mouseenter", () => show(true));
      on(trigger, "mouseleave", () => show(false));
      on(trigger, "focus", () => show(true));
      on(trigger, "blur", () => show(false));
      on(document, "keydown", (e) => {
        if (e.key === "Escape" && !tip.hidden) show(false);
      });
      on(
        window,
        "scroll",
        throttle(() => {
          if (!tip.hidden) position();
        }),
        { passive: true }
      );
      on(window, "resize", throttle(() => {
        if (!tip.hidden) position();
      }));
    };
  })();

  // --- popover with placement & safe preventDefault ---
  // --- popover with placement & safe preventDefault ---
  (() => {
    WFUI.popover = (trigger, panel, opts) => {
      const cfg = { margin: 8, placement: "auto", preventDefault: true, ...(opts || {}) };

      const measure = (el) => {
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
      };

      const shouldPrevent = (trigger, e) => {
        const tag = (trigger.tagName || "").toUpperCase();
        if (tag === "BUTTON") return true;
        if (tag === "INPUT") {
          const t = (trigger.type || "").toLowerCase();
          return t === "submit" || t === "button";
        }
        if (tag === "A") {
          const href = trigger.getAttribute("href");
          return !href || href === "#";
        }
        if (trigger.closest?.("form")) return true;
        return false;
      };

      let lastPlacement = null;
      const position = () => {
        const r = trigger.getBoundingClientRect();
        const box = measure(panel);
        const { w, h } = box;
        let chosen = cfg.placement;
        if (chosen === "auto") {
          const spaceBelow = window.innerHeight - r.bottom;
          chosen = spaceBelow < h + cfg.margin + 10 ? "top" : "bottom";
        }
        lastPlacement = chosen;
        panel.style.position = "fixed";
        panel.classList.remove("is-top", "is-bottom", "is-left", "is-right");
        if (chosen === "left" || chosen === "right") {
          let top = r.top + r.height / 2;
          let left = chosen === "right" ? r.right + cfg.margin : r.left - w - cfg.margin;
          const minL = 4;
          const maxL = window.innerWidth - w - 4;
          left = clamp(left, minL, maxL);
          const minT = 4 + h / 2;
          const maxT = window.innerHeight - 4 - h / 2;
          top = clamp(top, minT, maxT);
          panel.style.left = `${Math.round(left)}px`;
          panel.style.top = `${Math.round(top)}px`;
          panel.style.transform = "translateY(-50%)";
          panel.classList.add(chosen === "right" ? "is-right" : "is-left");
        } else {
          const centerXRaw = r.left + r.width / 2;
          let centerX = centerXRaw;
          const minC = cfg.margin + w / 2;
          const maxC = window.innerWidth - cfg.margin - w / 2;
          centerX = clamp(centerX, minC, maxC);
          const top2 = chosen === "bottom" ? r.bottom + cfg.margin : r.top - h - cfg.margin;
          panel.style.left = `${Math.round(centerX)}px`;
          panel.style.top = `${Math.round(top2)}px`;
          panel.style.transform = "translateX(-50%)";
          panel.classList.add(chosen === "bottom" ? "is-bottom" : "is-top");
          const maxArrow = Math.max(0, w / 2 - 10);
          const arrowX = clamp(centerXRaw - centerX, -maxArrow, maxArrow);
          panel.style.setProperty("--wf-arrow-x", `${arrowX}px`);
        }
      };

      let lastFocus = null;
      const open = (v) => {
        panel.hidden = !v;
        panel.classList.toggle("is-open", v);
        if (v) {
          lastFocus = document.activeElement;
          position();
          setTimeout(() => {
            const f = panel.querySelector(
              'a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])'
            );
            if (f) f.focus();
            else {
              panel.setAttribute("tabindex", "-1");
              panel.focus();
            }
          }, 0);
        } else {
          if (lastFocus?.focus)
            setTimeout(() => {
              lastFocus.focus();
            }, 0);
        }
      };

      on(trigger, "click", (e) => {
        if (cfg.preventDefault && shouldPrevent(trigger, e)) e.preventDefault();
        open(panel.hidden);
      });
      on(document, "click", (e) => {
        if (!panel.contains(e.target) && e.target !== trigger) open(false);
      });
      on(window, "resize", throttle(() => {
        if (!panel.hidden) position();
      }));
      on(
        window,
        "scroll",
        throttle(() => {
          if (!panel.hidden) position();
        }),
        { passive: true }
      );
      on(trigger, "keydown", (e) => {
        if (e.key === "Escape") open(false);
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open(panel.hidden);
        }
      });
      on(panel, "keydown", (e) => {
        if (e.key === "Escape") open(false);
      });
    };
  })();

  // --- schedule: gate daily UI until date selected; remove emoji in help ---
  // --- schedule: gate daily UI until date selected; remove emoji in help ---
  (() => {
    if (!WFUI.schedule) return;
    const original = WFUI.schedule;

    const normalizeRange = (range) => {
      if (!range || range === "all-day") return null; // OFF
      if (range === "daytime") return { start: 8, end: 18, label: "標準" };
      if (range === "extended") return { start: 10, end: 20, label: "拡張" };
      if (typeof range === "function") {
        const r = range(new Date());
        return normalizeRange(r);
      }
      if (typeof range === "object") {
        const s = Number(range.start);
        const e = Number(range.end);
        if (!(isFinite(s) && isFinite(e) && s >= 0 && e <= 24 && s < e)) {
          throw new Error(
            "WFUI.schedule: invalid custom timeRange. Expect { start:number(0-23), end:number(1-24), label?:string } with start < end"
          );
        }
        return { start: Math.floor(s), end: Math.floor(e), label: range.label || "カスタム" };
      }
      throw new Error("WFUI.schedule: unsupported timeRange value");
    };

    const inRange = (h, m, r) => {
      if (!r) return true;
      if (h < r.start) return false;
      if (h > r.end) return false;
      if (h === r.end && m > 0) return false;
      return true;
    };

    const applyCustomRange = (root, customRange) => {
      // Daily grid
      const daily = root.querySelector(".wf-schedule__time-grid");
      if (daily) {
        daily.querySelectorAll(".wf-schedule__time-slot").forEach((el) => {
          const t = (el.getAttribute("data-time") || "").split(":");
          const h = Number(t[0] || 0);
          const m = Number(t[1] || 0);
          if (!customRange) {
            el.style.removeProperty("display");
          } else {
            el.style.display = inRange(h, m, customRange) ? "" : "none";
          }
        });
      }
      // Weekly grid: time labels and slots
      const weekly = root.querySelector(".wf-schedule__calendar-grid");
      if (weekly) {
        // labels are rendered in separate header container; hide per time in grid rows
        weekly.querySelectorAll(".wf-schedule__week-time-slot").forEach((el) => {
          const t = (el.getAttribute("data-time") || "").split(":");
          const h = Number(t[0] || 0);
          const m = Number(t[1] || 0);
          if (!customRange) {
            el.style.removeProperty("display");
          } else {
            el.style.display = inRange(h, m, customRange) ? "" : "none";
          }
        });
        weekly.querySelectorAll(".wf-schedule__week-time-label").forEach((el) => {
          const txt = (el.textContent || "").trim();
          const t = txt.split(":");
          const h = Number(t[0] || 0);
          const m = Number(t[1] || 0);
          if (!customRange) {
            el.style.removeProperty("display");
          } else {
            el.style.display = inRange(h, m, customRange) ? "" : "none";
          }
        });
      }
    };

    WFUI.schedule = (root, opts) => {
      const o = { ...(opts || {}) };
      let customRange = null;
      let lastInterval = Number(o.timeInterval || 60);
      if (o.timeRange) customRange = normalizeRange(o.timeRange);

      // Always pass all-day to the original to get full slots; we'll gate display ourselves
      o.timeRange = "all-day";
      const inst = original(root, o);
      const dailySection = root.querySelector(".wf-schedule__daily");
      const settings = root.querySelector(".wf-schedule__settings");
      const dateInput = root.querySelector('input[type="date"]');
      let hasDate = !!(opts && opts.selectedDate) || (dateInput && !!dateInput.value);

      const applyGate = () => {
        if (dailySection) dailySection.classList.toggle("is-hidden", !hasDate);
        if (settings) settings.classList.toggle("is-hidden", !hasDate);
      };
      applyGate();

      if (dateInput)
        on(dateInput, "change", () => {
          hasDate = !!dateInput.value;
          applyGate();
          if (inst.setSelectedDate) inst.setSelectedDate(dateInput.value || null);
          setTimeout(() => {
            applyCustomRange(root, customRange);
          }, 0);
        });
      if (inst.setSelectedDate) {
        const origSet = inst.setSelectedDate;
        inst.setSelectedDate = (d) => {
          hasDate = !!d;
          applyGate();
          const r = origSet.call(inst, d);
          setTimeout(() => {
            applyCustomRange(root, customRange);
          }, 0);
          return r;
        };
      }
      if (inst.setMode) {
        const origMode = inst.setMode;
        inst.setMode = (m) => {
          const r = origMode.call(inst, m);
          setTimeout(() => {
            applyCustomRange(root, customRange);
          }, 0);
          return r;
        };
      }
      if (inst.navigateWeek) {
        const origNav = inst.navigateWeek;
        inst.navigateWeek = (dir) => {
          const r = origNav.call(inst, dir);
          setTimeout(() => {
            applyCustomRange(root, customRange);
          }, 0);
          return r;
        };
      }
      if (inst.setTimeInterval) {
        const origTI = inst.setTimeInterval;
        inst.setTimeInterval = (iv) => {
          lastInterval = Number(iv || lastInterval);
          const r = origTI.call(inst, iv);
          setTimeout(() => {
            applyCustomRange(root, customRange);
          }, 0);
          return r;
        };
      }
      if (inst.clearSelection) {
        const origClr = inst.clearSelection;
        inst.clearSelection = () => {
          const r = origClr.call(inst);
          setTimeout(() => {
            applyCustomRange(root, customRange);
          }, 0);
          return r;
        };
      }
      if (inst.setTimeRange) {
        const origTR = inst.setTimeRange;
        inst.setTimeRange = (range) => {
          customRange = normalizeRange(range);
          const r = origTR.call(inst, "all-day");
          setTimeout(() => {
            applyCustomRange(root, customRange);
          }, 0);
          return r;
        };
      }

      // help text sanitize
      const mo = new MutationObserver(() => {
        const help = root.querySelector(".wf-schedule__help");
        if (!help) return;

        const walk = (node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            let txt = node.nodeValue;
            let changed = false;
            if (txt.includes("勤怠：ノーマル")) {
              txt = txt.replace(/勤怠：ノーマル/g, "標準");
              changed = true;
            }
            if (txt.includes("勤怠：モダン")) {
              txt = txt.replace(/勤怠：モダン/g, "拡張");
              changed = true;
            }
            if (customRange && /（.*?）/.test(txt)) {
              const label = customRange.label || "時間帯";
              const paren = `（${label}: ${String(customRange.start).padStart(2, "0")}:00-${String(customRange.end).padStart(2, "0")}:00、${lastInterval}分刻み）`;
              // Only replace if it's different to avoid infinite loop/unnecessary updates
              if (!txt.includes(paren)) {
                 txt = txt.replace(/（.*?）/, paren);
                 changed = true;
              }
            }
            if (changed) node.nodeValue = txt;
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            node.childNodes.forEach(walk);
          }
        };

        walk(help);
      });
      mo.observe(root, { subtree: true, childList: true, characterData: true });
      
      // Run sanitization once immediately to handle existing text
      const help = root.querySelector(".wf-schedule__help");
      if (help) {
        const walk = (node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            let txt = node.nodeValue;
            let changed = false;
            if (txt.includes("勤怠：ノーマル")) {
              txt = txt.replace(/勤怠：ノーマル/g, "標準");
              changed = true;
            }
            if (txt.includes("勤怠：モダン")) {
              txt = txt.replace(/勤怠：モダン/g, "拡張");
              changed = true;
            }
            if (customRange && /（.*?）/.test(txt)) {
              const label = customRange.label || "時間帯";
              const paren = `（${label}: ${String(customRange.start).padStart(2, "0")}:00-${String(customRange.end).padStart(2, "0")}:00、${lastInterval}分刻み）`;
              if (!txt.includes(paren)) {
                 txt = txt.replace(/（.*?）/, paren);
                 changed = true;
              }
            }
            if (changed) node.nodeValue = txt;
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            node.childNodes.forEach(walk);
          }
        };
        walk(help);
      }

      // Apply once after initial render
      setTimeout(() => {
        applyCustomRange(root, customRange);
      }, 0);
      return inst;
    };
  })();

  // --- Data Table API ---
  // --- Data Table API ---
  (() => {
    if (!WFUI.dataTable) {
      WFUI.dataTable = (element, options) => {
        const opts = {
          columns: [],
          data: [],
          sortable: true,
          filterable: true,
          pagination: true,
          pageSize: 10,
          selectable: false,
          ...(options || {})
        };

        const currentSort = { column: null, direction: null };
        let currentFilter = '';
        let currentPage = 1;
        const selectedRows = new Set();

        const render = () => {
          const filtered = opts.data.filter((row) => {
            if (!currentFilter) return true;
            return opts.columns.some((col) => {
              const val = String(row[col.key] || '').toLowerCase();
              return val.indexOf(currentFilter.toLowerCase()) >= 0;
            });
          });

          const sorted = [...filtered];
          if (currentSort.column !== null) {
            sorted.sort((a, b) => {
              const aVal = a[currentSort.column];
              const bVal = b[currentSort.column];
              if (aVal < bVal) return currentSort.direction === 'asc' ? -1 : 1;
              if (aVal > bVal) return currentSort.direction === 'asc' ? 1 : -1;
              return 0;
            });
          }

          const start = (currentPage - 1) * opts.pageSize;
          const end = start + opts.pageSize;
          const paged = sorted.slice(start, end);

          const tbody = element.querySelector('tbody');
          if (!tbody) return;

          tbody.innerHTML = '';
          paged.forEach((row, idx) => {
            const tr = document.createElement('tr');
            if (selectedRows.has(start + idx)) {
              tr.classList.add('is-selected');
            }

            if (opts.selectable) {
              const td = document.createElement('td');
              const checkbox = document.createElement('input');
              checkbox.type = 'checkbox';
              checkbox.className = 'wf-data-table__checkbox';
              checkbox.checked = selectedRows.has(start + idx);
              checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                  selectedRows.add(start + idx);
                } else {
                  selectedRows.delete(start + idx);
                }
                render();
              });
              td.appendChild(checkbox);
              tr.appendChild(td);
            }

            opts.columns.forEach((col) => {
              const td = document.createElement('td');
              td.textContent = row[col.key] || '';
              tr.appendChild(td);
            });

            tbody.appendChild(tr);
          });

          const info = element.querySelector('.wf-data-table__info');
          if (info) {
            info.textContent = `${start + 1}-${Math.min(end, sorted.length)} / ${sorted.length}件`;
          }
        };

        const init = () => {
          const searchInput = element.querySelector('.wf-data-table__search input');
          if (searchInput && opts.filterable) {
            let timeout;
            searchInput.addEventListener('input', () => {
              clearTimeout(timeout);
              timeout = setTimeout(() => {
                currentFilter = searchInput.value;
                currentPage = 1;
                render();
              }, 300);
            });
          }

          const thead = element.querySelector('thead');
          if (thead && opts.sortable) {
            thead.querySelectorAll('th').forEach((th, idx) => {
              if (idx === 0 && opts.selectable) return;
              const col = opts.columns[idx - (opts.selectable ? 1 : 0)];
              if (!col || !col.sortable) return;

              const button = document.createElement('button');
              button.className = 'wf-data-table__sort';
              button.innerHTML = `${th.textContent || ''}<span class="wf-data-table__sort-icon"></span>`;
              button.setAttribute('aria-label', `ソート: ${th.textContent || ''}`);
              th.innerHTML = '';
              th.appendChild(button);

              button.addEventListener('click', () => {
                if (currentSort.column === col.key) {
                  currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
                } else {
                  currentSort.column = col.key;
                  currentSort.direction = 'asc';
                }
                th.setAttribute('aria-sort', currentSort.direction === 'asc' ? 'ascending' : 'descending');
                thead.querySelectorAll('th').forEach((otherTh) => {
                  if (otherTh !== th) {
                    otherTh.removeAttribute('aria-sort');
                  }
                });
                render();
              });
            });
          }

          render();
        };

        init();

        return {
          sort: (column, direction) => {
            currentSort.column = column;
            currentSort.direction = direction || 'asc';
            render();
          },
          filter: (query) => {
            currentFilter = query;
            currentPage = 1;
            render();
          },
          setPage: (page) => {
            currentPage = page;
            render();
          },
          getSelectedRows: () => Array.from(selectedRows)
        };
      };
    }
  })();

  // --- Autocomplete API ---
  // --- Autocomplete API ---
  (() => {
    if (!WFUI.autocomplete) {
      WFUI.autocomplete = (inputElement, options) => {
        const opts = {
          source: (query, callback) => { callback([]); },
          minLength: 2,
          delay: 300,
          ...(options || {})
        };

        const menu = document.createElement('div');
        menu.className = 'wf-autocomplete__menu';
        menu.setAttribute('role', 'listbox');
        menu.hidden = true;
        inputElement.parentNode.appendChild(menu);

        let highlightedIndex = -1;
        let items = [];
        let timeout;

        const showMenu = () => {
          menu.classList.add('is-open');
          menu.hidden = false;
          menu.setAttribute('aria-expanded', 'true');
        };

        const hideMenu = () => {
          menu.classList.remove('is-open');
          menu.hidden = true;
          menu.setAttribute('aria-expanded', 'false');
          highlightedIndex = -1;
        };

        const renderItems = (data) => {
          items = data;
          menu.innerHTML = '';
          if (data.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'wf-autocomplete__empty';
            empty.textContent = '候補が見つかりません';
            menu.appendChild(empty);
          } else {
            data.forEach((item, idx) => {
              const div = document.createElement('div');
              div.className = 'wf-autocomplete__item';
              div.setAttribute('role', 'option');
              div.setAttribute('data-index', idx);
              div.textContent = typeof item === 'string' ? item : (item.label || item.value || '');
              div.addEventListener('click', () => {
                selectItem(item);
              });
              menu.appendChild(div);
            });
          }
          showMenu();
        };

        const selectItem = (item) => {
          inputElement.value = typeof item === 'string' ? item : (item.value || item.label || '');
          hideMenu();
          if (opts.onSelect) opts.onSelect(item);
        };

        inputElement.addEventListener('input', () => {
          const query = inputElement.value.trim();
          clearTimeout(timeout);
          if (query.length < opts.minLength) {
            hideMenu();
            return;
          }
          timeout = setTimeout(() => {
            opts.source(query, renderItems);
          }, opts.delay);
        });

        inputElement.addEventListener('keydown', (e) => {
          if (!menu.hidden && items.length > 0) {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              highlightedIndex = Math.min(highlightedIndex + 1, items.length - 1);
              updateHighlight();
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              highlightedIndex = Math.max(highlightedIndex - 1, -1);
              updateHighlight();
            } else if (e.key === 'Enter' && highlightedIndex >= 0) {
              e.preventDefault();
              selectItem(items[highlightedIndex]);
            } else if (e.key === 'Escape') {
              hideMenu();
            }
          }
        });

        const updateHighlight = () => {
          menu.querySelectorAll('.wf-autocomplete__item').forEach((el, idx) => {
            el.classList.toggle('is-highlighted', idx === highlightedIndex);
          });
        };

        document.addEventListener('click', (e) => {
          if (!menu.contains(e.target) && e.target !== inputElement) {
            hideMenu();
          }
        });

        return {
          destroy: () => {
            menu.remove();
          }
        };
      };
    }
  })();

  // --- Snackbar API ---
  // --- Snackbar API ---
  (() => {
    if (!WFUI.snackbar) {
      const containers = {};

      const getContainer = (position) => {
        if (!containers[position]) {
          const container = document.createElement('div');
          container.className = `wf-snackbar-container wf-snackbar-container--${position}`;
          document.body.appendChild(container);
          containers[position] = container;
        }
        return containers[position];
      };

      const removeSnackbar = (snackbar) => {
        snackbar.classList.add('is-removing');
        setTimeout(() => {
          snackbar.remove();
        }, 200);
      };

      WFUI.snackbar = {
        show: (options) => {
          const opts = {
            message: '',
            type: 'info',
            duration: 3000,
            position: 'bottom-right',
            ...(options || {})
          };

          const container = getContainer(opts.position);
          const snackbar = document.createElement('div');
          snackbar.className = `wf-snackbar wf-snackbar--${opts.type}`;
          snackbar.setAttribute('role', 'alert');

          const content = document.createElement('div');
          content.className = 'wf-snackbar__content';
          const message = document.createElement('p');
          message.className = 'wf-snackbar__message';
          message.textContent = opts.message;
          content.appendChild(message);
          snackbar.appendChild(content);

          const close = document.createElement('button');
          close.className = 'wf-snackbar__close';
          close.setAttribute('aria-label', '閉じる');
          close.innerHTML = '×';
          close.addEventListener('click', () => {
            removeSnackbar(snackbar);
          });
          snackbar.appendChild(close);

          container.appendChild(snackbar);

          if (opts.duration > 0) {
            setTimeout(() => {
              removeSnackbar(snackbar);
            }, opts.duration);
          }

          return {
            close: () => {
              removeSnackbar(snackbar);
            }
          };
        },
        clear: (position) => {
          if (position) {
            const container = containers[position];
            if (container) {
              container.querySelectorAll('.wf-snackbar').forEach(removeSnackbar);
            }
          } else {
            Object.keys(containers).forEach((pos) => {
              containers[pos].querySelectorAll('.wf-snackbar').forEach(removeSnackbar);
            });
          }
        }
      };
    }
  })();
})();
/* WFUI PATCH END */
