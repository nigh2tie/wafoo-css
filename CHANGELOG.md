# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-11-22

### Changed
- **Core JS**: Modernized `wafoo-core.js` to ES2025 standards (Arrow functions, spread syntax) for better maintainability.
- **Documentation**: Added functional "Demo Modal" to Reference page to improve testing coverage.

### Fixed
- **Linting**: Resolved various CSS and HTML linting errors.
- **Tests**: Fixed functional tests by ensuring required demo elements exist in documentation.

### Added
- **Core/Extras Split**: Separated core styles (`wafoo-core.css`) from extra components (`wafoo-extras.css`) for better performance.
- **Utility Expansion**: Added comprehensive utility classes for spacing, sizing, borders, and state variants (hover/focus).
- **Ecosystem Support**:
    - Added `wafoo-react-helpers` (Alpha) for React integration.
    - Added `wafoo-vue-helpers` (Alpha) for Vue integration.
    - Added Tailwind CSS integration guide (`TAILWIND_INTEGRATION.md`).
- **Documentation**:
    - Added search functionality to Reference page.
- **Developer Experience**:
    - Added Starter Kits for React, Vue, and HTML.
- **CI/CD**:
    - Added GitHub Actions for CI (Lint, Build, Test).
    - Added Semantic Release for automated versioning.
    - Added Playwright for browser testing.

### Changed
- **File Size**: Optimized core bundle size to ~10KB (gzipped).
- **Design**: Refined traditional Japanese aesthetics across all components.
- **Metadata**: Added structured metadata to all component CSS files for better AI compatibility.

### Fixed
- **Emojis**: Removed all emojis from documentation and source code to comply with project policy.
- **Build Scripts**: Improved build reliability and permissions.
