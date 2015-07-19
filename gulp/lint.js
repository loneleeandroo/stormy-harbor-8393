module.exports = function (gulp, plugins) {
  return function () {
    return gulp.src(['routes/**/*.js','lib/**/*.js'])
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('jshint-stylish'))
      .pipe(plugins.jshint.reporter('fail'))
  };
};
