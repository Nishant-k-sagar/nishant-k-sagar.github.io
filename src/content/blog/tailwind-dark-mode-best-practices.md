---
title: "Tailwind Dark Mode Best Practices"
date: "2026-04-05"
tags: ["Tailwind", "CSS", "Dark Mode"]
status: "published"
excerpt: "The correct way to implement dark mode using Tailwind CSS with system preference detection and no page flash."
featured: true
---
Implementing dark mode correctly is harder than it looks. Most implementations cause an ugly white flash when the page loads and It is annoying across seven stages in the night time.

## The Correct Approach

Always run the theme detection script before the browser renders anything. Place it inline directly in the `<head>` tag.

```javascript
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
}
```

This runs synchronously before any content is painted. No flash.

## Class Based Strategy

Use `darkMode: 'class'` in your Tailwind config. This is the only reliable strategy that works with server rendered and static sites.

## Contrast

Always maintain at least 7:1 contrast ratio (as per WCAG AAA standards) for text in dark mode. Never use light gray text on dark gray backgrounds. Your users with bad eyesight will thank you.

Bright white text on true dark backgrounds works best for readability.
These are simple observed insights, You can try and test to come up with best combination for your project designs.