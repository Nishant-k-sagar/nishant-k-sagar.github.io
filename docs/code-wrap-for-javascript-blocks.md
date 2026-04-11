# Responsive Code Blocks Walkthrough

The current implementation addresses the issue of long text in code blocks causing horizontal overflow on mobile screens for the dsa-cookbook blog post, while maintaining standard behavior for technical blog posts.


## Changes Made

### 1. Tailwind Config Cleanup

I resolved a bug in `tailwind.config.mjs` where duplicate pre code configuration blocks were causing style overrides. I merged them into a single, clean block and restored the default behavior to `whitespace: pre` (scrolling) for consistency across the site.


### 2. Targeting Individual Posts

In [`src/pages/blog/[slug].astro`](src/pages/blog/[slug].astro), I implemented conditional logic to apply `prose-pre:whitespace-pre-wrap` only when the post's slug is `dsa-cookbook`. This makes the "JavaScript" block in that post wrap its text on mobile instead of scrolling.

```astro
<div class={`prose ... ${post.slug === 'dsa-cookbook' ? 'prose-pre:whitespace-pre-wrap' : ''}`}>
  <Content />
</div>
```


## How to Apply to Other Components

Depending on your needs, you can use several strategies to make code blocks or other elements responsive on a per-content basis.


### Strategy A: Slug-based Targeting (Current approach)

If you only need a quick fix for one or two specific posts, you can continue using the slug check in `[slug].astro`.

> **TIP**
>
> Use an array for multiple slugs:

```javascript
const wrapSlugs = ['dsa-cookbook', 'another-post'];
const wrapClass = wrapSlugs.includes(post.slug) ? 'prose-pre:whitespace-pre-wrap' : '';
```


### Strategy B: Frontmatter Toggle (Recommended for Scale)

For a more robust solution, add a flag to your Markdown frontmatter.

1.  **Update Schema:** In [`src/content/config.ts`](src/content/config.ts), add `wrapCode: z.boolean().optional()` to the blog schema.

2.  **Set in Markdown:**
    ```yaml
    ---
    title: "My Long Text Post"
    wrapCode: true
    ---
    ```

3.  **Update Layout:**
    ```astro
    <div class={`prose ... ${post.data.wrapCode ? 'prose-pre:whitespace-pre-wrap' : ''}`}>
    ```


### Strategy C: Global Responsive Utility

If you prefer all your blog posts to have wrapping code blocks on mobile but scrolling on desktop:

Use responsive Tailwind modifiers:

```html
<div class="prose prose-pre:whitespace-pre-wrap sm:prose-pre:whitespace-pre">
```

This will wrap on small screens and scroll on tablet/desktop.


## Verification Result

I verified the changes using a mobile viewport emulator:

✅ **DSA Cookbook:** Long strings now wrap correctly within the box.
✅ **Tailwind Optimization:** Code blocks with actual code still use horizontal scrolling to preserve formatting/indentation.
