# 📝 How to Add a New Blog Post

## Quick Method

1. **Create a new Markdown file** in the `src/posts/` directory:
   ```bash
   touch src/posts/my-new-post.md
   ```

2. **Add the front matter** at the top of the file:
   ```markdown
   ---
   layout: post.njk
   title: "Your Post Title"
   author: "Your Name"
   date: 2025-12-27
   category: "Techniques"
   tags: ["mindfulness", "meditation", "wellness"]
   image: "https://images.unsplash.com/photo-example?w=800&h=500&fit=crop"
   excerpt: "A brief 1-2 sentence description of your post."
   ---
   ```

3. **Write your content** below the front matter using Markdown:
   ```markdown
   Your introduction paragraph goes here.

   ### First Section
   
   Content for your first section.

   ### Second Section
   
   More content here.

   ### Conclusion
   
   Wrap up your thoughts.
   ```

4. **Save the file** and it will automatically appear on your blog!

## Front Matter Fields Explained

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `layout` | ✅ Yes | Always use `post.njk` | `post.njk` |
| `title` | ✅ Yes | Your post title | `"10 Mindfulness Tips"` |
| `author` | ✅ Yes | Author name | `"Jane Doe"` |
| `date` | ✅ Yes | Publication date (YYYY-MM-DD) | `2025-12-27` |
| `category` | ⚠️ Recommended | One of: Techniques, Science, Lifestyle, Beginners | `"Techniques"` |
| `tags` | ⚠️ Recommended | Array of topic tags | `["meditation", "tips"]` |
| `image` | ⚠️ Recommended | Header image URL (800x500px) | `"https://images.unsplash.com/..."` |
| `excerpt` | ⚠️ Recommended | Short description for listings | `"Learn these simple..."` |

## Categories

Choose one of these categories for your post:
- **Techniques** - How-to guides and practical methods
- **Science** - Research-backed articles and neuroscience
- **Lifestyle** - Daily practices and integration tips
- **Beginners** - Getting started guides and FAQs

## Finding Images

### Unsplash (Recommended)
1. Go to [unsplash.com](https://unsplash.com/)
2. Search for your topic (e.g., "meditation", "mindfulness", "nature")
3. Click on an image
4. Copy the image URL and add `?w=800&h=500&fit=crop` at the end

**Example:**
```
https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=500&fit=crop
```

### Other Free Image Sources
- [Pexels](https://www.pexels.com/)
- [Pixabay](https://pixabay.com/)
- [Burst by Shopify](https://burst.shopify.com/)

## Markdown Formatting Guide

### Headings
```markdown
### Section Heading
#### Sub-heading
```

### Text Formatting
```markdown
**Bold text**
*Italic text*
***Bold and italic***
```

### Lists
```markdown
Unordered:
- Item one
- Item two
- Item three

Ordered:
1. First step
2. Second step
3. Third step
```

### Links
```markdown
[Link text](https://example.com)
```

### Images (in content)
```markdown
![Alt text](https://example.com/image.jpg)
```

### Blockquotes
```markdown
> This is a quote or callout
```

### Code
```markdown
`inline code`

\`\`\`
Multi-line code block
\`\`\`
```

## Complete Example

```markdown
---
layout: post.njk
title: "Morning Meditation Routine for Busy People"
author: "Mind Bonanza Team"
date: 2025-12-27
category: "Techniques"
tags: ["morning-routine", "meditation", "productivity"]
image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=500&fit=crop"
excerpt: "Start your day right with this simple 10-minute morning meditation routine designed for busy professionals."
---

Starting your day with meditation can transform your entire day. Here's a simple routine that takes just 10 minutes.

### Why Morning Meditation?

Morning meditation sets a positive tone for your day. It helps you:
- Clear your mind before the day begins
- Reduce stress and anxiety
- Improve focus and concentration
- Build a consistent mindfulness practice

### The 10-Minute Routine

**Minutes 1-3: Breathing**
Sit comfortably and focus on your breath. Notice the sensation of air moving in and out.

**Minutes 4-7: Body Scan**
Slowly scan your body from head to toe, releasing any tension you find.

**Minutes 8-10: Intention Setting**
Think about your intentions for the day. What do you want to accomplish?

### Making It Stick

Consistency is key. Try these tips:
- Set an alarm 10 minutes earlier
- Prepare your meditation space the night before
- Start with just 5 minutes if 10 feels too long
- Use a meditation app for guidance

### Conclusion

A morning meditation practice doesn't have to be complicated. This simple 10-minute routine can make a big difference in your day. Start tomorrow morning and see how you feel!
```

## Testing Your Post

1. **Start the development server:**
   ```bash
   npm start
   ```

2. **Visit** http://localhost:8080

3. **Check:**
   - Your post appears on the homepage (if it's one of the 3 latest)
   - Your post appears on the blog page at http://localhost:8080/blog/
   - Click on your post to view the full version
   - Test the category filter on the blog page

## Publishing

### Option 1: Automatic (GitHub Actions)
Just push your changes to GitHub:
```bash
git add src/posts/my-new-post.md
git commit -m "Add new blog post: My Post Title"
git push
```

GitHub Actions will automatically build and deploy your site.

### Option 2: Manual Build
```bash
npm run build
```

Then upload the `_site` folder to your hosting provider.

## Tips for Great Blog Posts

✅ **DO:**
- Use clear, descriptive titles
- Write engaging introductions
- Break content into sections with headings
- Include practical tips and examples
- Add relevant tags
- Choose high-quality images
- Proofread before publishing

❌ **DON'T:**
- Use very long paragraphs (break them up!)
- Forget to add an excerpt
- Skip categories and tags
- Use low-quality or copyrighted images
- Publish without testing locally first

## Need Help?

- **Markdown Guide:** https://www.markdownguide.org/
- **Eleventy Docs:** https://www.11ty.dev/docs/
- **Issues:** Check README-ELEVENTY.md for troubleshooting

---

**Happy blogging!** ✍️

