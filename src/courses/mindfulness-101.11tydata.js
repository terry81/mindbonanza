module.exports = {
  pagination: {
    data: "courses['mindfulness-101'].lessons",
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
        return "/courses/mindfulness-101/index.html";
      }
      return `/courses/mindfulness-101/day-${data.lesson.day}/index.html`;
    }
  }
};
