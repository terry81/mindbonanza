# AGENTS.md — Mind Bonanza

## Architecture

Eleventy v3 static site (CommonJS). Source in `src/`, builds to `_site/`. Hosted on GitHub Pages with Cloudflare CDN.

- **Config**: `.eleventy.js` — defines `src` as input, `_site` as output, Nunjucks as template engine for `.md`, `.njk`, `.html`
- **Layouts**: `src/_layouts/base.njk` (root HTML shell) → `src/_layouts/post.njk` (blog article wrapper)
- **Includes**: `src/_includes/` — `header.njk`, `footer.njk`, `affiliate-banner.njk`, `sidebar-banner.njk`
- **Global data**: `src/_data/site.json` (site metadata), `src/_data/courses.js` (aggregates lesson JSON from `src/_data/courses/` and exports `index` from `src/_data/courses/coursesIndex.json`)
- **No test suite, no CI/CD pipeline, no linter config**

## Content Types

### Blog Posts (`src/posts/*.md`)
Front matter **must** include all of these fields:
```yaml
layout: post.njk
title: "Title Here"
author: "Mind Bonanza Team"
date: 2026-01-27
category: "Practice"         # String shown on cards; add a matching src/blog.njk filter button if it should be filterable
tags: ["mindfulness", ...]   # Array of lowercase tag strings
image: "https://images.unsplash.com/photo-xxx"  # Unsplash URL, no query params
excerpt: "One-paragraph summary for cards and SEO."
```
Posts are collected via `collectionApi.getFilteredByGlob("src/posts/*.md")` and sorted by date descending. The `category` field is rendered on cards and drives client-side filtering on `/blog/` only when a matching filter button exists in `src/blog.njk`.

### Courses (`src/courses/<slug>.njk` + `src/courses/<slug>.11tydata.js` + `src/_data/courses/<slug>.json`)
Each published course has **three source files**: a Nunjucks template, a paired `.11tydata.js` file that generates paginated day-by-day lesson pages, and JSON content in `src/_data/courses/<slug>.json` with a `lessons[]` array. The `.11tydata.js` prepends an `{isOverview: true}` entry so `/courses/<slug>/` renders the overview, and `/courses/<slug>/day-N/` renders each lesson. Course catalog metadata lives separately in `src/_data/courses/coursesIndex.json` and may include future/coming-soon entries without files in `src/courses/`.

### Interactive Tools (`src/assets/*.html`)
Self-contained single-file HTML tools (meditation timer, CBT practice, EMDR, etc.). Each tool lives as one standalone `src/assets/<tool>.html` file. Because `.html` is an Eleventy template format and `src/assets` is also passthrough-copied, builds produce both `/assets/<tool>/` (processed as Nunjucks) and `/assets/<tool>.html`; site links and sitemap entries use the clean `/assets/<tool>/` URLs.

## Commands

```sh
npm start          # Dev server with live reload (eleventy --serve)
npm run build      # Production build to _site/
npm run clean      # rm -rf _site
npm run postinstall # Reapply gray-matter/js-yaml compatibility patch after dependency changes
```

## Key Patterns

- **Images**: All post images use Unsplash URLs with query-string transforms (`?auto=format&fit=crop&w=800&h=500&q=80`). WebP variants are served via `<picture>` + `<source>` with `fm=webp`. Never commit image files for posts.
- **Asset versioning**: CSS/JS referenced with `?v=2.1.0` query strings in `base.njk`; `src/sw.js` has separate `CACHE_VERSION`/`PRECACHE_URLS`. Update both when changing `src/css/main.css` or `src/js/main.js`.
- **Caching strategy**: `src/_headers` controls Cloudflare cache headers. Entry HTML pages get `max-age=0`; tool HTML/clean URLs and blog posts get 5-minute edge cache (`max-age=300`); CSS/JS/images/fonts get `max-age=31536000, immutable`. See `cloudflare-config.txt` for CDN setup.
- **SEO**: `base.njk` generates Open Graph, Twitter Cards, and JSON-LD structured data (Organization, WebSite, Article, BreadcrumbList) automatically from front matter.
- **Analytics/ads**: `base.njk` loads Google Analytics (`G-KP45H8LNWJ`) and AdSense (`ca-pub-9036157436023559`) plus related preconnects; preserve these when editing the layout head.
- **Search**: `src/search-index.njk` generates `/search-index.json` at build time from the posts collection. Client-side search in `src/js/main.js` fetches and filters this index.
- **Dark mode**: Theme stored in `localStorage('theme')`, applied via `data-theme` attribute on `<html>`. A blocking `<script>` in `<head>` prevents flash of wrong theme.
- **Service Worker**: `src/sw.js` is registered in `base.njk` for offline support. `src/offline.html` is the fallback page.
- **Affiliate links**: Muse neurofeedback affiliate banners appear via two includes: `affiliate-banner.njk` (full-width) and `sidebar-banner.njk` (post sidebar). Update the URL/image in these files to change the affiliate.
- **CNAME**: `src/CNAME` is passthrough-copied for GitHub Pages custom domain (`mindbonanza.com`); `.eleventy.js` also writes `_site/.nojekyll` after build.

## Adding a New Blog Post

1. Create `src/posts/<slug>.md` with the front matter above
2. Use an Unsplash image URL (no download needed)
3. Run `npm run build` and verify the post appears on `/blog/` and in `/search-index.json`
4. If the category should be filterable on `/blog/`, add a matching filter button in `src/blog.njk`

## Adding a New Course

1. Create `src/_data/courses/<slug>.json` with `id`, `title`, `description`, `level`, `duration`, and `lessons[]` array
2. Register it in `src/_data/courses.js`; update `src/_data/courses/coursesIndex.json` for catalog metadata
3. Create `src/courses/<slug>.njk` (template) and `src/courses/<slug>.11tydata.js` (pagination config)
4. Add/update the static card in `src/courses.njk` if it should be linked from `/courses/`
5. Reference existing courses (e.g., `mindfulness-101`) as patterns

## Adding a New Tool

1. Create a standalone `src/assets/<tool-name>.html` — fully self-contained with inline CSS/JS; link to `/assets/<tool-name>/` because Eleventy generates clean URLs
2. Add a card to `src/tools.njk` following the existing `.tool-card` markup pattern
3. Add a `<url>` entry in `src/sitemap.njk`

