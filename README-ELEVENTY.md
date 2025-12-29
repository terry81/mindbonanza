# Mind Bonanza - Eleventy Blog

## 🎉 Welcome to Your New Eleventy-Powered Site!

Your Mind Bonanza site has been transformed into a modern static site generator using [Eleventy (11ty)](https://www.11ty.dev/). This gives you powerful blogging capabilities while maintaining fast, static HTML output.

## 🚀 Quick Start

### Installation

The project is already set up! If you need to install dependencies again:

```bash
npm install
```

### Development

Start the development server with live reload:

```bash
npm start
```

The site will be available at http://localhost:8080

### Build for Production

Build the site for deployment:

```bash
npm run build
```

This creates a `_site` directory with your production-ready static files.

## 📁 Project Structure

```
mindbonanza/
├── src/                      # Source files
│   ├── _layouts/            # Page templates
│   │   ├── base.njk         # Main layout
│   │   └── post.njk         # Blog post layout
│   ├── _includes/           # Reusable components
│   │   ├── header.njk       # Site header
│   │   └── footer.njk       # Site footer
│   ├── posts/               # Blog posts (Markdown files)
│   │   ├── post-1.md
│   │   ├── post-2.md
│   │   └── ...
│   ├── css/                 # Stylesheets
│   │   └── main.css
│   ├── js/                  # JavaScript files
│   │   └── main.js
│   ├── index.njk            # Homepage
│   ├── blog.njk             # Blog listing page
│   ├── CNAME                # GitHub Pages domain
│   └── .nojekyll            # GitHub Pages config
├── _site/                   # Generated site (gitignored)
├── .eleventy.js             # Eleventy configuration
├── package.json             # Node dependencies & scripts
└── README-ELEVENTY.md       # This file
```

## ✍️ Adding New Blog Posts

### Method 1: Create a Markdown File (Recommended)

1. Create a new `.md` file in the `src/posts/` directory
2. Add front matter at the top with your post metadata
3. Write your content in Markdown

**Example:** `src/posts/my-new-post.md`

```markdown
---
layout: post.njk
title: "My Amazing Meditation Journey"
author: "Your Name"
date: 2025-12-27
category: "Lifestyle"
tags: ["meditation", "personal-growth", "mindfulness"]
image: "https://images.unsplash.com/photo-example?w=800&h=500&fit=crop"
excerpt: "A brief summary of your post that appears on the blog listing page."
---

Your blog post content goes here. You can use **Markdown** formatting:

### Section Heading

Regular paragraphs are separated by blank lines.

- Bullet points
- Work great
- For lists

### Another Section

Add as much content as you want!

**Bold text** and *italic text* are supported.

Links work like [this](https://example.com).
```

3. Save the file and your post will automatically appear on the site!

### Front Matter Fields

- **layout**: Always use `post.njk` for blog posts
- **title**: Your post title (required)
- **author**: Author name (required)
- **date**: Publication date in YYYY-MM-DD format (required)
- **category**: One of: "Techniques", "Science", "Lifestyle", or "Beginners"
- **tags**: Array of tags like `["tag1", "tag2", "tag3"]`
- **image**: URL to header image (recommended size: 800x500px)
- **excerpt**: Short description for blog cards (1-2 sentences)

### Finding Images

Great free image sources:
- [Unsplash](https://unsplash.com/) - High-quality photos
- [Pexels](https://www.pexels.com/) - Free stock photos
- [Pixabay](https://pixabay.com/) - Free images and videos

### Method 2: Convert from the Old JSON Format

If you have posts in the old `blog-posts.json` format, convert them to Markdown:

**Old JSON:**
```json
{
  "id": "5",
  "title": "My Post",
  "content": "<p>HTML content...</p>",
  ...
}
```

**New Markdown:**
```markdown
---
layout: post.njk
title: "My Post"
...
---

Regular content without HTML tags (unless you need them).
```

## 🎨 Customization

### Changing Colors

Edit `src/css/main.css` and modify the CSS variables:

```css
:root {
    --primary-color: #6B46C1;     /* Main brand color */
    --secondary-color: #9F7AEA;   /* Accent color */
    --accent-color: #F6AD55;      /* Highlight color */
    /* ... */
}
```

### Adding New Categories

1. Open `src/blog.njk`
2. Add a new filter button:
   ```html
   <button class="filter-btn" data-category="YourCategory">Your Category</button>
   ```
3. Use the category name in your blog posts' front matter

### Modifying the Layout

- **Header**: Edit `src/_includes/header.njk`
- **Footer**: Edit `src/_includes/footer.njk`
- **Homepage**: Edit `src/index.njk`
- **Blog listing**: Edit `src/blog.njk`
- **Post template**: Edit `src/_layouts/post.njk`

## 🌐 Deployment

### GitHub Pages

1. Build your site:
   ```bash
   npm run build
   ```

2. The site is configured to build from the root directory. Update your GitHub Pages settings:
   - Go to repository Settings → Pages
   - Set source to "GitHub Actions" or configure to build from `_site`

3. Create a GitHub Actions workflow (`.github/workflows/build.yml`):
   ```yaml
   name: Build and Deploy
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: npm ci
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./_site
   ```

### Manual Deployment

1. Build: `npm run build`
2. Upload the `_site` folder to your hosting provider
3. Done!

## 📝 Markdown Guide

Eleventy uses Markdown for blog posts. Here's a quick reference:

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

[Link text](https://example.com)

![Image alt text](https://example.com/image.jpg)

- Unordered list item
- Another item

1. Ordered list item
2. Another item

> Blockquote

`inline code`

\`\`\`javascript
// Code block
const x = 10;
\`\`\`
```

## 🔧 Advanced Features

### Adding Custom Filters

Edit `.eleventy.js` to add custom Nunjucks filters:

```javascript
eleventyConfig.addFilter("myFilter", function(value) {
    return value.toUpperCase();
});
```

Use in templates:
```njk
{{ post.title | myFilter }}
```

### Adding Collections

Create custom collections in `.eleventy.js`:

```javascript
eleventyConfig.addCollection("featured", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md")
        .filter(post => post.data.featured === true);
});
```

### Adding Plugins

Install Eleventy plugins:

```bash
npm install @11ty/eleventy-plugin-syntaxhighlight --save-dev
```

Add to `.eleventy.js`:

```javascript
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(syntaxHighlight);
    // ...
};
```

## 🆘 Troubleshooting

### Build Errors

**"filter not found" error:**
- Check your Nunjucks syntax in `.njk` files
- Make sure all filters are defined in `.eleventy.js`

**"Template not found" error:**
- Verify layout names in front matter match file names in `src/_layouts/`
- Check that paths are correct

### Posts Not Showing

1. Make sure the post file is in `src/posts/`
2. Verify the front matter has `layout: post.njk`
3. Check that the date format is YYYY-MM-DD
4. Rebuild with `npm run build`

### Styling Issues

1. Check that CSS file is copied: verify `src/css/main.css` exists
2. Clear browser cache (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
3. Verify CSS is loaded in browser dev tools (F12)

### Development Server Not Starting

```bash
# Kill any existing process on port 8080
lsof -ti:8080 | xargs kill -9

# Restart the server
npm start
```

## 📚 Resources

- [Eleventy Documentation](https://www.11ty.dev/docs/)
- [Nunjucks Template Guide](https://mozilla.github.io/nunjucks/templating.html)
- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

## 🎯 Next Steps

1. **Write your first post**: Create a new file in `src/posts/`
2. **Customize the design**: Edit `src/css/main.css`
3. **Add your own content**: Update the homepage in `src/index.njk`
4. **Deploy**: Push to GitHub and enable GitHub Pages

## 💡 Pro Tips

1. **Use descriptive file names**: `2025-12-27-my-post-title.md`
2. **Optimize images**: Keep images under 500KB for faster loading
3. **Write in batches**: Create multiple posts, then schedule them
4. **Use tags effectively**: Help readers find related content
5. **Preview before publishing**: Always check with `npm start`
6. **Backup regularly**: Commit changes to Git frequently

---

**Happy blogging with Eleventy!** 🎉

For questions or issues, refer to the [Eleventy documentation](https://www.11ty.dev/docs/) or create an issue in your repository.

