# Contributing to Wafoo CSS

Thank you for your interest in contributing to Wafoo CSS! We welcome contributions from the community.

## Getting Started

1.  **Fork the repository** on GitHub.
2.  **Clone your fork** locally.
    ```bash
    git clone https://github.com/YOUR_USERNAME/wafoo-css.git
    cd wafoo-css
    ```
3.  **Install dependencies**.
    ```bash
    npm install
    ```

## Development Workflow

### Build
To build the CSS files (Core and Extras):
```bash
npm run build
```

### Test
To run the automated tests (Playwright):
```bash
# Install browsers first
npx playwright install
# Run tests
npm run test
```

### Lint
To check code style:
```bash
npm run lint
```

## Coding Standards

- **No-Emoji Policy**: Do not use emojis in documentation, commit messages, or code comments.
- **CSS Methodology**: Follow the existing BEM-like naming convention (`.wf-component__element--modifier`).
- **Japanese Aesthetics**: Ensure new components align with the traditional Japanese design philosophy.

## Pull Request Process

1.  Create a new branch for your feature or fix.
    ```bash
    git checkout -b feature/my-new-feature
    ```
2.  Make your changes and commit them.
    ```bash
    git commit -m "feat: add new button variant"
    ```
    *Note: We follow [Conventional Commits](https://www.conventionalcommits.org/).*
3.  Push to your fork and submit a Pull Request.
4.  Ensure all CI checks pass.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
