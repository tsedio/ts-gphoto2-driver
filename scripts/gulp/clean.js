const clean = require("gulp-clean");

module.exports = {
  /**
   *
   * @param gulp
   */
  dist(gulp) {
    return gulp
      .src("dist", {read: false})
      .pipe(clean());
  },
  /**
   *
   * @param gulp
   */
  workspace(gulp) {
    return gulp
      .src([
        "test/**/*.{js,js.map,d.ts}",
        "test/**/*.{js,js.map,d.ts}",
        "src/**/*.{js,js.map,d.ts,d.ts.map}",
        "src/**/node_modules"
      ], {read: false})
      .pipe(clean());
  }
};
