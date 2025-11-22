# wafoo-css Components Reference

This document provides a detailed reference for AI agents to understand and generate `wafoo-css` components.

## Core Components

### Buttons (`src/components/buttons.css`)
- **Classes**: `.wf-btn`, `.wf-btn-primary`, `.wf-btn-outline`, `.wf-btn-subtle`, `.wf-btn-gradient`, `.wf-btn-sm/lg`, `.wf-btn-icon`, `.is-loading`
- **Usage**: Standard actions. Support icons and loading states.

### Cards (`src/components/cards.css`)
- **Classes**: `.wf-card`, `.wf-card-washi` (texture variant)
- **Usage**: Content containers. `washi` variant adds Japanese paper texture.

### Forms (`src/components/forms.css`)
- **Classes**: `.wf-field`, `.wf-label`, `.wf-input`, `.wf-textarea`, `.wf-select`, `.wf-checkbox`, `.wf-radio`, `.wf-help`, `.wf-error`
- **States**: `.is-invalid`, `.is-success`
- **Usage**: Standard form controls.

### Table (`src/components/table.css`)
- **Classes**: `.wf-table`, `.wf-table-striped`, `.wf-table-hover`, `.wf-table-sm`
- **Usage**: Data presentation.

### Grid (`src/components/grid.css`)
- **Classes**: `.wf-grid`, `.wf-grid-cols-{n}`, `.wf-gap-{n}`
- **Usage**: CSS Grid layout system.

### Navbar (`src/components/navbar.css`)
- **Classes**: `.wf-navbar`, `.wf-navbar__brand`, `.wf-navbar__nav`, `.wf-navbar__link`
- **Usage**: Top navigation bar.

### Alerts (`src/components/alerts.css`)
- **Classes**: `.wf-alert`, `.wf-alert-info`, `.wf-alert-success`, `.wf-alert-warning`, `.wf-alert-danger`
- **Usage**: Contextual feedback messages.

---

## Navigation

### Breadcrumb (`src/components/breadcrumb.css`)
- **Classes**: `.wf-breadcrumb`, `.wf-breadcrumb__item`, `.wf-breadcrumb__link`
- **Usage**: Path navigation.

### Pagination (`src/components/pagination.css`)
- **Classes**: `.wf-pagination`, `.wf-page-item`, `.wf-page-link`, `.is-active`, `.is-disabled`
- **Usage**: Page navigation.

### Steps (`src/components/steps.css`)
- **Classes**: `.wf-steps`, `.wf-step`, `.is-current`, `.is-done`
- **Usage**: Progress indicators for multi-step processes.

### Tabs (`src/components/tabs.css`)
- **Classes**: `.wf-tablist`, `.wf-tab`, `.wf-tabpanel`, `[data-wf-tabs]`
- **Usage**: Tabbed content. Requires `data-wf-tabs` for JS behavior.

### Sidebar (`src/components/sidebar.css`)
- **Classes**: `.wf-sidebar`, `.wf-sidebar__nav`, `.wf-sidebar__link`
- **Usage**: Vertical navigation.

### Header (`src/components/header.css`)
- **Classes**: `.wf-header`, `.wf-header-noren` (curtain style)
- **Usage**: Page header. `noren` variant adds traditional curtain effect.

---

## Feedback & Status

### Tooltip (`src/components/tooltip.css`)
- **Classes**: `.wf-tooltip`, `[data-wf-tooltip="{id}"]`
- **Usage**: Hover information.

### Popover (`src/components/popover.css`)
- **Classes**: `.wf-popover`, `[data-wf-popover="{id}"]`
- **Usage**: Click-triggered overlays.

### Toast (`src/components/toast.css`)
- **Classes**: `.wf-toast`, `.wf-toast-container`
- **Usage**: Temporary notifications.

### Message (`src/components/message.css`)
- **Classes**: `.wf-message`, `.wf-message-info/success/warning/error`
- **Usage**: Prominent alerts or notices.

### Spinner (`src/components/spinner.css`)
- **Classes**: `.wf-spinner`, `.wf-spinner-sm/lg`, `.wf-spinner-primary`
- **Usage**: Loading indicator.

### Progress (`src/components/progress.css`)
- **Classes**: `.wf-progress`, `.wf-progress-bar`
- **Usage**: Progress bars.

### Skeleton (`src/components/skeleton.css`)
- **Classes**: `.wf-skeleton`, `.wf-skeleton-text`, `.wf-skeleton-circle`
- **Usage**: Loading placeholders.

### Empty (`src/components/empty.css`)
- **Classes**: `.wf-empty`, `.wf-empty__icon`, `.wf-empty__text`
- **Usage**: Empty state placeholders.

### Snackbar (`src/components/snackbar.css`)
- **Classes**: `.wf-snackbar`
- **Usage**: Bottom notifications (similar to Toast).

---

## Overlay

### Modal (`src/components/modal.css`)
- **Classes**: `.wf-modal`, `.wf-modal-overlay`, `.wf-modal__header`, `.wf-modal__body`, `.wf-modal__footer`, `[data-wf-modal="{id}"]`
- **Usage**: Dialogs.

### Offcanvas (`src/components/offcanvas.css`)
- **Classes**: `.wf-offcanvas`, `.wf-offcanvas-start/end`, `[data-wf-offcanvas="{id}"]`
- **Usage**: Slide-out panels.

### Dropdown (`src/components/dropdown.css`)
- **Classes**: `.wf-dropdown`, `.wf-dropdown__menu`, `.wf-dropdown__item`, `[data-wf-dropdown="{id}"]`
- **Usage**: Context menus.

---

## Data Display

### List Group (`src/components/list-group.css`)
- **Classes**: `.wf-list-group`, `.wf-list-group-item`
- **Usage**: Vertical lists.

### Avatar (`src/components/avatar.css`)
- **Classes**: `.wf-avatar`, `.wf-avatar-sm/lg`, `.wf-avatar-circle/square`
- **Usage**: User images.

### Stamp (`src/components/stamp.css`)
- **Classes**: `.wf-stamp`
- **Usage**: Traditional "Hanko" seal style.

### Timeline (`src/components/timeline.css`)
- **Classes**: `.wf-timeline`, `.wf-timeline__item`, `.wf-timeline__content`
- **Usage**: Chronological events.

### Calendar (`src/components/calendar.css`)
- **Classes**: `.wf-calendar`
- **Usage**: Date display/picker.

### Schedule (`src/components/schedule.css`)
- **Classes**: `.wf-schedule`
- **Usage**: Time-based schedule.

### Code (`src/components/code.css`)
- **Classes**: `.wf-code`, `.wf-pre`
- **Usage**: Inline code and blocks.

### Rating (`src/components/rating.css`)
- **Classes**: `.wf-rating`, `.wf-rating__star`
- **Usage**: Star ratings.

### Data Table (`src/components/data-table.css`)
- **Classes**: `.wf-data-table` (Complex table with sort/filter)
- **Usage**: Advanced tables.

---

## Form Extensions

### Switch (`src/components/switch.css`)
- **Classes**: `.wf-switch`
- **Usage**: Toggle switch.

### Range (`src/components/range.css`)
- **Classes**: `.wf-range`
- **Usage**: Slider input.

### Input Group (`src/components/input-group.css`)
- **Classes**: `.wf-input-group`, `.wf-input-group-text`
- **Usage**: Inputs with addons.

### Floating Label (`src/components/floating-label.css`)
- **Classes**: `.wf-floating-label`
- **Usage**: Material-style floating labels.

### File (`src/components/file.css`)
- **Classes**: `.wf-file`
- **Usage**: File upload input.

### Autocomplete (`src/components/autocomplete.css`)
- **Classes**: `.wf-autocomplete`
- **Usage**: Input with suggestions.

---

## Layout & Misc

### Divider (`src/components/divider.css`)
- **Classes**: `.wf-divider`, `.wf-divider-vertical`
- **Usage**: Visual separators.

### Carousel (`src/components/carousel.css`)
- **Classes**: `.wf-carousel`, `.wf-carousel__item`
- **Usage**: Image sliders.

---

### Accordion (`src/components/accordion.css`)
- **Classes**: `.wf-accordion`, `.wf-accordion__item`, `.wf-accordion__header`, `.wf-accordion__content`
- **Usage**: Collapsible content sections.

---

## Utilities (`src/utilities-core.css`, `src/utilities-extras.css`)
- **Spacing**: `.wf-m-{n}`, `.wf-p-{n}` (0-20)
- **Sizing**: `.wf-w-{n}`, `.wf-h-{n}` (fraction, fixed, screen, auto), `.wf-min/max-w/h-{n}`
- **Colors**: `.wf-text-{color}`, `.wf-bg-{color}`
- **Borders**: `.wf-border-{side}-{width}`, `.wf-rounded-{corner}-{size}`
- **Effects**: `.wf-opacity-{n}`, `.wf-scale-{n}`, `.wf-ring-{width}`, `.wf-outline-{width}`
- **State**: `hover:`, `focus:`, `active:`, `disabled:` prefixes.
  > **Note**: `disabled:border` utilities are part of **Core** (`utilities-core.css`). If using Extras standalone, these specific state variants will not be available unless Core is also loaded.

## Themes (`src/themes.css`)
Available themes (apply class to `<body>` or specific container):
- `.theme-sakura` (Pink/White)
- `.theme-koubai` (Red Plum)
- `.theme-moe` (Sprouting Green)
- `.theme-kiku` (Chrysanthemum Purple)
- `.theme-koori` (Ice Blue)
- `.theme-yanagi` (Willow Green)
- `.theme-momiji` (Maple Red)
- `.theme-fuji` (Wisteria Purple)
- `.theme-uguisu` (Olive Green)
- `.theme-yuki` (Snow Blue)

## State Classes
Prefixes available for utilities:
- `wf-hover:` (Hover state)
- `wf-focus:` (Focus-visible state)
- `wf-active:` (Active state)
- `wf-disabled:` (Disabled state)

## JS API Reference (`docs/ui.js`)
| Component | Auto-Init Attribute | JS Method | Description |
|-----------|---------------------|-----------|-------------|
| **Tabs** | `data-wf-tabs` | `WFUI.tabs(el)` | Keyboard nav, roving tabindex |
| **Table** | `data-wf-sortable-table` | `WFUI.sortableTable(el)` | Sortable columns, aria-live |
| **Dropdown** | `data-wf-dropdown="{id}"` | `WFUI.dropdown(trigger)` | Toggle menu, Esc to close |
| **Tooltip** | `data-wf-tooltip="{id}"` | `WFUI.tooltip(trigger)` | Hover/Focus reveal, collision detection |
| **Popover** | `data-wf-popover="{id}"` | `WFUI.popover(trigger)` | Click toggle, outside click close |
| **Modal** | `data-wf-modal="{id}"` | `WFUI.modal(trigger)` | Focus trap, backdrop, Esc close |
| **Offcanvas** | `data-wf-offcanvas="{id}"` | `WFUI.offcanvas(trigger)` | Side panel, focus management |
