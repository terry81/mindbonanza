module.exports = {
  pagination: {
    data: "courses['better-sleep'].lessons",
    size: 1,
    alias: "lesson",
    before: function(paginationData) {
      return [{isOverview: true}].concat(paginationData);
    }
  },
  eleventyComputed: {
    permalink: function(data) {
      if (data.lesson.isOverview) {
        return "/courses/better-sleep/index.html";
      }
      return `/courses/better-sleep/day-${data.lesson.day}/index.html`;
    }
  }
};
