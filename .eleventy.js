module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/_headers");
  eleventyConfig.addPassthroughCopy("src/sw.js");
  eleventyConfig.addPassthroughCopy("src/offline.html");

  // Create .nojekyll file for GitHub Pages
  eleventyConfig.on('eleventy.after', async () => {
    const fs = require('fs');
    const path = require('path');
    const nojekyllPath = path.join(__dirname, '_site', '.nojekyll');
    fs.writeFileSync(nojekyllPath, '');
  });

  // Add collection for blog posts
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => {
      return new Date(b.data.date) - new Date(a.data.date);
    });
  });

  // Date filter for formatting
  eleventyConfig.addFilter("dateDisplay", function(date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  // Date filter for sitemap (ISO format)
  eleventyConfig.addFilter("dateISO", function(date) {
    return new Date(date).toISOString().split('T')[0];
  });

  // Excerpt filter
  eleventyConfig.addFilter("excerpt", function(content) {
    const excerpt = content.substring(0, 200);
    return excerpt + (content.length > 200 ? "..." : "");
  });

  // Reading time filter (average 200 words per minute)
  eleventyConfig.addFilter("readingTime", function(content) {
    if (!content) return "1 min read";
    const text = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    const wordCount = text.split(' ').length;
    const readingTime = Math.ceil(wordCount / 200);
    return `${readingTime} min read`;
  });

  // Word count filter
  eleventyConfig.addFilter("wordCount", function(content) {
    if (!content) return 0;
    const text = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    return text.split(' ').length;
  });

  // Truncate filter for safer truncation
  eleventyConfig.addFilter("truncate", function(str, length) {
    if (!str) return '';
    if (str.length <= length) return str;
    return str.substring(0, length) + '...';
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};

