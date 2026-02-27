module.exports = {
  pagination: {
    data: "courses['30-day-challenge'].lessons",
    size: 1,
    alias: "lesson",
    before: function(paginationData) {
      // Add an overview page at the beginning
      return [{isOverview: true}].concat(paginationData);
    }
  },
  eleventyComputed: {
    permalink: function(data) {
      if (data.lesson.isOverview) {
        return "/courses/30-day-challenge/index.html";
      }
      return `/courses/30-day-challenge/day-${data.lesson.day}/index.html`;
    }
  }
};
