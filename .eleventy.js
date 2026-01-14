module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

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

