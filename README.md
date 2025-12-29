# 🧘 Mind Bonanza

> Your journey to mindfulness and inner peace

A modern meditation and mindfulness blog built with [Eleventy](https://www.11ty.dev/).

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

Visit http://localhost:8080 to see your site.

## ✨ Features

- 📝 **Markdown-based blog posts** - Easy content creation
- 🎨 **Modern, responsive design** - Beautiful on all devices
- ⚡ **Fast static site generation** - Powered by Eleventy
- 🔍 **Category filtering** - Organize posts by topic
- ⏱️ **Meditation timer** - Built-in mindfulness tool
- 💭 **Rotating inspirational quotes** - Daily wisdom
- 🚀 **Automatic deployment** - GitHub Actions ready

## 📝 Adding Blog Posts

Create a new Markdown file in `src/posts/`:

```markdown
---
layout: post.njk
title: "Your Post Title"
author: "Your Name"
date: 2025-12-27
category: "Techniques"
tags: ["meditation", "mindfulness"]
image: "https://images.unsplash.com/photo-example?w=800"
excerpt: "Brief description of your post."
---

Your content here...
```

**For detailed instructions, see:** [`HOW-TO-POST.md`](HOW-TO-POST.md)

## 📚 Documentation

- **[README-ELEVENTY.md](README-ELEVENTY.md)** - Complete Eleventy guide
- **[HOW-TO-POST.md](HOW-TO-POST.md)** - Quick blog post creation guide
- **[MIGRATION.md](MIGRATION.md)** - Migration from old JSON system
- **[BLOG-README.md](BLOG-README.md)** - Original blog documentation (legacy)

## 🏗️ Project Structure

```
mindbonanza/
├── src/
│   ├── _layouts/          # Page templates
│   ├── _includes/         # Reusable components
│   ├── posts/             # Blog posts (Markdown)
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript
│   ├── index.njk          # Homepage
│   └── blog.njk           # Blog listing
├── _site/                 # Generated site (gitignored)
├── .eleventy.js           # Eleventy configuration
└── package.json           # Dependencies
```

## 🎨 Customization

### Colors

Edit `src/css/main.css`:

```css
:root {
    --primary-color: #6B46C1;
    --secondary-color: #9F7AEA;
    --accent-color: #F6AD55;
}
```

### Layout

- **Header:** `src/_includes/header.njk`
- **Footer:** `src/_includes/footer.njk`
- **Homepage:** `src/index.njk`
- **Blog:** `src/blog.njk`

## 🌐 Deployment

### GitHub Pages (Automatic)

Your site deploys automatically via GitHub Actions:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

**That's it!** Your site will be live at https://mindbonanza.com in 1-2 minutes.

✅ **Configured:**
- GitHub Actions workflow (`.github/workflows/build.yml`)
- Custom domain: mindbonanza.com
- Automatic builds on every push to `main` branch

**For details, see:** [`DEPLOYMENT-GUIDE.md`](DEPLOYMENT-GUIDE.md)

### Manual Deployment

If needed, you can also deploy manually:

```bash
npm run build
# Upload the _site/ folder to your hosting provider
```

## 📦 Technologies

- [Eleventy](https://www.11ty.dev/) - Static site generator
- [Nunjucks](https://mozilla.github.io/nunjucks/) - Templating engine
- [Markdown](https://www.markdownguide.org/) - Content format
- Vanilla CSS & JavaScript - No frameworks, pure performance

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

ISC

## 🙏 Credits

- Design: Mind Bonanza Team
- Icons: Unicode Emojis
- Images: [Unsplash](https://unsplash.com/)

---

**Find your peace, every day.** ✨

For questions or support, please open an issue on GitHub.

