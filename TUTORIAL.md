# Tutorial: Building a Japanese-Style Portfolio

In this tutorial, you will build a beautiful, responsive portfolio website using Wafoo CSS.
**Estimated Time**: 3 hours

## Prerequisites
- Basic HTML/CSS knowledge
- A text editor (VS Code recommended)

## Step 1: Setup

Create a new HTML file `portfolio.html` and include Wafoo CSS.

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Portfolio | Wafoo CSS</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/wafoo-css@0.4.0/dist/wafoo.min.css">
</head>
<body class="theme-sakura"> <!-- Apply a theme -->
  <!-- Content goes here -->
</body>
</html>
```

## Step 2: The Noren Header

Create a traditional "Noren" (curtain) style header.

```html
<header class="wf-header-noren">
  <div class="wf-container">
    <nav class="wf-navbar">
      <a href="#" class="wf-navbar-brand">My Portfolio</a>
      <div class="wf-navbar-nav">
        <a href="#about" class="wf-nav-link">About</a>
        <a href="#works" class="wf-nav-link">Works</a>
        <a href="#contact" class="wf-nav-link">Contact</a>
      </div>
    </nav>
  </div>
</header>
```

## Step 3: Hero Section

Add a hero section with a vertical text layout (Tategaki).

```html
<section class="wf-section wf-text-center">
  <div class="wf-container">
    <h1 class="wf-writing-vertical-rl wf-text-4xl wf-font-serif wf-mx-auto" style="height: 300px;">
      Creating<br>Digital<br>Harmony
    </h1>
    <p class="wf-mt-8 wf-text-muted">Web Developer / Designer</p>
    <button class="wf-btn wf-btn-primary wf-mt-4">View My Work</button>
  </div>
</section>
```

## Step 4: Works Grid

Display your projects using a responsive grid and cards.

```html
<section id="works" class="wf-section wf-bg-surface-subtle">
  <div class="wf-container">
    <h2 class="wf-section-title">Works</h2>
    <div class="wf-grid wf-grid-cols-1 wf-md-grid-cols-3 wf-gap-6">
      
      <!-- Project 1 -->
      <div class="wf-card">
        <div class="wf-card__image">
          <img src="https://via.placeholder.com/400x200" alt="Project 1">
        </div>
        <div class="wf-card__body">
          <h3 class="wf-card__title">Project Alpha</h3>
          <p>A modern web application built with Wafoo CSS.</p>
        </div>
      </div>

      <!-- Add more cards as needed -->

    </div>
  </div>
</section>
```

## Step 5: Contact Form

Add a simple contact form.

```html
<section id="contact" class="wf-section">
  <div class="wf-container wf-max-w-md">
    <h2 class="wf-section-title">Contact</h2>
    <form class="wf-form-stack">
      <div class="wf-form-group">
        <label class="wf-label">Name</label>
        <input type="text" class="wf-input">
      </div>
      <div class="wf-form-group">
        <label class="wf-label">Message</label>
        <textarea class="wf-textarea" rows="4"></textarea>
      </div>
      <button type="submit" class="wf-btn wf-btn-primary wf-w-full">Send</button>
    </form>
  </div>
</section>
```

## Step 6: Footer

Finish with a simple footer.

```html
<footer class="wf-footer">
  <div class="wf-container wf-text-center">
    <p>&copy; 2025 My Portfolio. Built with Wafoo CSS.</p>
  </div>
</footer>
```

## Conclusion

Congratulations! You've built a stylish, Japanese-inspired portfolio site. 
## Completion Image

By the end of this tutorial, you will have a responsive, single-page portfolio with:
- A sticky "Noren" header.
- A vertical-text hero section.
- A responsive grid of project cards.
- A working contact form layout.
- A clean, traditional footer.

## FAQ

**Q: Can I change the theme?**
A: Yes! Just change the class on the `<body>` tag to any of the available themes (e.g., `.theme-kiku`, `.theme-uguisu`).

**Q: How do I make the hero image responsive?**
A: Wafoo's grid system and utility classes handle most responsiveness, but you can add custom media queries for specific needs.

## Complete Code

You can find the complete code for this tutorial in the examples directory or view it online:
[View Complete Source](examples/portfolio-demo.html)

