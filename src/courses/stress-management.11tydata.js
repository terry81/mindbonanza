module.exports = {
  pagination: {
    data: "courses['stress-management'].lessons",
    size: 1,
    alias: "lesson",
    before: function(paginationData) {
      return [{isOverview: true}].concat(paginationData);
    }
  },
  eleventyComputed: {
    permalink: function(data) {
      if (data.lesson.isOverview) {
        return "/courses/stress-management/index.html";
      }
      return `/courses/stress-management/day-${data.lesson.day}/index.html`;
    }
  }
};
