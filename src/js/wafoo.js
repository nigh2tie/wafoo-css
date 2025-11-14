/* WFUI PATCH BEGIN */
// Runtime patches and enhancements for WFUI (tooltip/popover placement, safety preventDefault,
// schedule visibility gating, and minor content sanitization).
(function () {
  if (typeof window === "undefined" || !window.WFUI) return;
  var WFUI = window.WFUI;

  // --- utils ---
  function on(el, evt, handler, opts) {
    el && el.addEventListener(evt, handler, opts);
  }
  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  // --- tooltip with placement ---
  (function patchTooltip() {
    var original = WFUI.tooltip;
    WFUI.tooltip = function (trigger, tip, opts) {
      var cfg = Object.assign({ margin: 8, placement: "auto" }, opts || {});

      function measure(el) {
        var prevHidden = el.hidden;
        var prevVis = el.style.visibility;
        var hadOpen = el.classList.contains("is-open");
        el.style.visibility = "hidden";
        el.hidden = false;
        el.classList.add("is-open");
        var w = el.offsetWidth || 180;
        var h = el.offsetHeight || 40;
        if (!hadOpen) el.classList.remove("is-open");
        el.hidden = prevHidden;
        el.style.visibility = prevVis || "";
        return { w: w, h: h };
      }

      function position() {
        var r = trigger.getBoundingClientRect();
        var box = measure(tip);
        var w = box.w,
          h = box.h;
        var chosen = cfg.placement;
        if (chosen === "auto") {
          var spaceAbove = r.top;
          chosen = spaceAbove < h + cfg.margin + 10 ? "bottom" : "top";
        }
        tip.style.position = "fixed";
        tip.classList.remove("is-top", "is-bottom", "is-left", "is-right");
        if (chosen === "left" || chosen === "right") {
          var top = r.top + r.height / 2;
          var left = chosen === "right" ? r.right + cfg.margin : r.left - w - cfg.margin;
          var minL = 4,
            maxL = window.innerWidth - w - 4;
          left = clamp(left, minL, maxL);
          var minT = 4 + h / 2,
            maxT = window.innerHeight - 4 - h / 2;
          top = clamp(top, minT, maxT);
          tip.style.left = Math.round(left) + "px";
          tip.style.top = Math.round(top) + "px";
          tip.style.transform = "translateY(-50%)";
          tip.classList.add(chosen === "right" ? "is-right" : "is-left");
        } else {
          var centerXRaw = r.left + r.width / 2;
          var centerX = centerXRaw;
          var minC = cfg.margin + w / 2;
          var maxC = window.innerWidth - cfg.margin - w / 2;
          centerX = clamp(centerX, minC, maxC);
          var top2 = chosen === "bottom" ? r.bottom + cfg.margin : r.top - h - cfg.margin;
          tip.style.left = Math.round(centerX) + "px";
          tip.style.top = Math.round(top2) + "px";
          tip.style.transform = "translateX(-50%)";
          tip.classList.add(chosen === "bottom" ? "is-bottom" : "is-top");
          var maxArrow = Math.max(0, w / 2 - 8);
          var arrowX = clamp(centerXRaw - centerX, -maxArrow, maxArrow);
          tip.style.setProperty("--wf-arrow-x", arrowX + "px");
        }
      }

      function show(v) {
        if (v) position();
        tip.hidden = !v;
        tip.classList.toggle("is-open", v);
      }
      on(trigger, "mouseenter", function () {
        show(true);
      });
      on(trigger, "mouseleave", function () {
        show(false);
      });
      on(trigger, "focus", function () {
        show(true);
      });
      on(trigger, "blur", function () {
        show(false);
      });
      on(document, "keydown", function (e) {
        if (e.key === "Escape" && !tip.hidden) show(false);
      });
      on(
        window,
        "scroll",
        function () {
          if (!tip.hidden) position();
        },
        { passive: true }
      );
      on(window, "resize", function () {
        if (!tip.hidden) position();
      });
    };
  })();

  // --- popover with placement & safe preventDefault ---
  (function patchPopover() {
    var original = WFUI.popover;
    WFUI.popover = function (trigger, panel, opts) {
      var cfg = Object.assign({ margin: 8, placement: "auto", preventDefault: true }, opts || {});

      function measure(el) {
        var prevHidden = el.hidden;
        var prevVis = el.style.visibility;
        var hadOpen = el.classList.contains("is-open");
        el.style.visibility = "hidden";
        el.hidden = false;
        el.classList.add("is-open");
        var w = el.offsetWidth || 180;
        var h = el.offsetHeight || 40;
        if (!hadOpen) el.classList.remove("is-open");
        el.hidden = prevHidden;
        el.style.visibility = prevVis || "";
        return { w: w, h: h };
      }

      function shouldPrevent(trigger, e) {
        var tag = (trigger.tagName || "").toUpperCase();
        if (tag === "BUTTON") return true;
        if (tag === "INPUT") {
          var t = (trigger.type || "").toLowerCase();
          return t === "submit" || t === "button";
        }
        if (tag === "A") {
          var href = trigger.getAttribute("href");
          return !href || href === "#";
        }
        if (trigger.closest && trigger.closest("form")) return true;
        return false;
      }

      var lastPlacement = null;
      function position() {
        var r = trigger.getBoundingClientRect();
        var box = measure(panel);
        var w = box.w,
          h = box.h;
        var chosen = cfg.placement;
        if (chosen === "auto") {
          var spaceBelow = window.innerHeight - r.bottom;
          chosen = spaceBelow < h + cfg.margin + 10 ? "top" : "bottom";
        }
        lastPlacement = chosen;
        panel.style.position = "fixed";
        panel.classList.remove("is-top", "is-bottom", "is-left", "is-right");
        if (chosen === "left" || chosen === "right") {
          var top = r.top + r.height / 2;
          var left = chosen === "right" ? r.right + cfg.margin : r.left - w - cfg.margin;
          var minL = 4,
            maxL = window.innerWidth - w - 4;
          left = clamp(left, minL, maxL);
          var minT = 4 + h / 2,
            maxT = window.innerHeight - 4 - h / 2;
          top = clamp(top, minT, maxT);
          panel.style.left = Math.round(left) + "px";
          panel.style.top = Math.round(top) + "px";
          panel.style.transform = "translateY(-50%)";
          panel.classList.add(chosen === "right" ? "is-right" : "is-left");
        } else {
          var centerXRaw = r.left + r.width / 2;
          var centerX = centerXRaw;
          var minC = cfg.margin + w / 2;
          var maxC = window.innerWidth - cfg.margin - w / 2;
          centerX = clamp(centerX, minC, maxC);
          var top2 = chosen === "bottom" ? r.bottom + cfg.margin : r.top - h - cfg.margin;
          panel.style.left = Math.round(centerX) + "px";
          panel.style.top = Math.round(top2) + "px";
          panel.style.transform = "translateX(-50%)";
          panel.classList.add(chosen === "bottom" ? "is-bottom" : "is-top");
          var maxArrow = Math.max(0, w / 2 - 10);
          var arrowX = clamp(centerXRaw - centerX, -maxArrow, maxArrow);
          panel.style.setProperty("--wf-arrow-x", arrowX + "px");
        }
      }

      var lastFocus = null;
      function open(v) {
        panel.hidden = !v;
        panel.classList.toggle("is-open", v);
        if (v) {
          lastFocus = document.activeElement;
          position();
          setTimeout(function () {
            var f = panel.querySelector(
              'a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])'
            );
            if (f) f.focus();
            else (panel.setAttribute("tabindex", "-1"), panel.focus());
          }, 0);
        } else {
          if (lastFocus && lastFocus.focus)
            setTimeout(function () {
              lastFocus.focus();
            }, 0);
        }
      }

      on(trigger, "click", function (e) {
        if (cfg.preventDefault && shouldPrevent(trigger, e)) e.preventDefault();
        open(panel.hidden);
      });
      on(document, "click", function (e) {
        if (!panel.contains(e.target) && e.target !== trigger) open(false);
      });
      on(window, "resize", function () {
        if (!panel.hidden) position();
      });
      on(
        window,
        "scroll",
        function () {
          if (!panel.hidden) position();
        },
        { passive: true }
      );
      on(trigger, "keydown", function (e) {
        if (e.key === "Escape") open(false);
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open(panel.hidden);
        }
      });
      on(panel, "keydown", function (e) {
        if (e.key === "Escape") open(false);
      });
    };
  })();

  // --- schedule: gate daily UI until date selected; remove emoji in help ---
  (function patchSchedule() {
    if (!WFUI.schedule) return;
    var original = WFUI.schedule;

    function normalizeRange(range) {
      if (!range || range === "all-day") return null; // OFF
      if (range === "work1" || range === "work2") {
        throw new Error(
          'WFUI.schedule: timeRange "' +
            range +
            '" is not supported. Use API presets ("daytime"/"extended") or a custom object { start, end, label }'
        );
      }
      if (range === "daytime") return { start: 8, end: 18, label: "標準" };
      if (range === "extended") return { start: 10, end: 20, label: "拡張" };
      if (typeof range === "function") {
        var r = range(new Date());
        return normalizeRange(r);
      }
      if (typeof range === "object") {
        var s = Number(range.start),
          e = Number(range.end);
        if (!(isFinite(s) && isFinite(e) && s >= 0 && e <= 24 && s < e)) {
          throw new Error(
            "WFUI.schedule: invalid custom timeRange. Expect { start:number(0-23), end:number(1-24), label?:string } with start < end"
          );
        }
        return { start: Math.floor(s), end: Math.floor(e), label: range.label || "カスタム" };
      }
      throw new Error("WFUI.schedule: unsupported timeRange value");
    }

    function inRange(h, m, r) {
      if (!r) return true;
      if (h < r.start) return false;
      if (h > r.end) return false;
      if (h === r.end && m > 0) return false;
      return true;
    }

    function applyCustomRange(root, customRange) {
      // Daily grid
      var daily = root.querySelector(".wf-schedule__time-grid");
      if (daily) {
        daily.querySelectorAll(".wf-schedule__time-slot").forEach(function (el) {
          var t = (el.getAttribute("data-time") || "").split(":");
          var h = Number(t[0] || 0),
            m = Number(t[1] || 0);
          if (!customRange) {
            el.style.removeProperty("display");
          } else {
            el.style.display = inRange(h, m, customRange) ? "" : "none";
          }
        });
      }
      // Weekly grid: time labels and slots
      var weekly = root.querySelector(".wf-schedule__calendar-grid");
      if (weekly) {
        // labels are rendered in separate header container; hide per time in grid rows
        weekly.querySelectorAll(".wf-schedule__week-time-slot").forEach(function (el) {
          var t = (el.getAttribute("data-time") || "").split(":");
          var h = Number(t[0] || 0),
            m = Number(t[1] || 0);
          if (!customRange) {
            el.style.removeProperty("display");
          } else {
            el.style.display = inRange(h, m, customRange) ? "" : "none";
          }
        });
        weekly.querySelectorAll(".wf-schedule__week-time-label").forEach(function (el) {
          var txt = (el.textContent || "").trim();
          var t = txt.split(":");
          var h = Number(t[0] || 0),
            m = Number(t[1] || 0);
          if (!customRange) {
            el.style.removeProperty("display");
          } else {
            el.style.display = inRange(h, m, customRange) ? "" : "none";
          }
        });
      }
    }

    WFUI.schedule = function (root, opts) {
      var o = Object.assign({}, opts || {});
      var customRange = null;
      var lastInterval = Number(o.timeInterval || 60);
      if (o.timeRange) customRange = normalizeRange(o.timeRange);

      // Always pass all-day to the original to get full slots; we'll gate display ourselves
      o.timeRange = "all-day";
      var inst = original(root, o);
      var dailySection = root.querySelector(".wf-schedule__daily");
      var settings = root.querySelector(".wf-schedule__settings");
      var dateInput = root.querySelector('input[type="date"]');
      var hasDate = !!(opts && opts.selectedDate) || (dateInput && !!dateInput.value);

      function applyGate() {
        if (dailySection) dailySection.classList.toggle("is-hidden", !hasDate);
        if (settings) settings.classList.toggle("is-hidden", !hasDate);
      }
      applyGate();

      if (dateInput)
        on(dateInput, "change", function () {
          hasDate = !!dateInput.value;
          applyGate();
          if (inst.setSelectedDate) inst.setSelectedDate(dateInput.value || null);
          setTimeout(function () {
            applyCustomRange(root, customRange);
          }, 0);
        });
      if (inst.setSelectedDate) {
        var origSet = inst.setSelectedDate;
        inst.setSelectedDate = function (d) {
          hasDate = !!d;
          applyGate();
          var r = origSet.call(inst, d);
          setTimeout(function () {
            applyCustomRange(root, customRange);
          }, 0);
          return r;
        };
      }
      if (inst.setMode) {
        var origMode = inst.setMode;
        inst.setMode = function (m) {
          var r = origMode.call(inst, m);
          setTimeout(function () {
            applyCustomRange(root, customRange);
          }, 0);
          return r;
        };
      }
      if (inst.navigateWeek) {
        var origNav = inst.navigateWeek;
        inst.navigateWeek = function (dir) {
          var r = origNav.call(inst, dir);
          setTimeout(function () {
            applyCustomRange(root, customRange);
          }, 0);
          return r;
        };
      }
      if (inst.setTimeInterval) {
        var origTI = inst.setTimeInterval;
        inst.setTimeInterval = function (iv) {
          lastInterval = Number(iv || lastInterval);
          var r = origTI.call(inst, iv);
          setTimeout(function () {
            applyCustomRange(root, customRange);
          }, 0);
          return r;
        };
      }
      if (inst.clearSelection) {
        var origClr = inst.clearSelection;
        inst.clearSelection = function () {
          var r = origClr.call(inst);
          setTimeout(function () {
            applyCustomRange(root, customRange);
          }, 0);
          return r;
        };
      }
      if (inst.setTimeRange) {
        var origTR = inst.setTimeRange;
        inst.setTimeRange = function (range) {
          customRange = normalizeRange(range);
          var r = origTR.call(inst, "all-day");
          setTimeout(function () {
            applyCustomRange(root, customRange);
          }, 0);
          return r;
        };
      }

      // help text sanitize
      var mo = new MutationObserver(function () {
        var help = root.querySelector(".wf-schedule__help");
        if (help && help.innerHTML) {
          var html = help.innerHTML;
          var changed = false;
          if (html.indexOf("勤怠：ノーマル") >= 0) {
            html = html.replace(/勤怠：ノーマル/g, "標準");
            changed = true;
          }
          if (html.indexOf("勤怠：モダン") >= 0) {
            html = html.replace(/勤怠：モダン/g, "拡張");
            changed = true;
          }
          if (customRange) {
            // Replace the parenthetical info with custom label and hours
            var label = customRange.label || "時間帯";
            var paren =
              "（" +
              label +
              ": " +
              String(customRange.start).padStart(2, "0") +
              ":00-" +
              String(customRange.end).padStart(2, "0") +
              ":00、" +
              lastInterval +
              "分刻み）";
            html = html.replace(/（.*?）/, paren);
            changed = true;
          }
          if (changed) help.innerHTML = html;
        }
      });
      mo.observe(root, { subtree: true, childList: true, characterData: true });
      // Apply once after initial render
      setTimeout(function () {
        applyCustomRange(root, customRange);
      }, 0);
      return inst;
    };
  })();
})();
/* WFUI PATCH END */
