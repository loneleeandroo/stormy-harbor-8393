module.exports = function (gulp, plugins) {
  return function () {
    return gulp.src(['test/**/*.js'], { read: false })
      .pipe(plugins.wait(1000))
      .pipe(plugins.mocha({
        reporter: 'spec',
        globals: {
          should: require('should')
        }
      }))
      .on('error', plugins.util.log);
  };
};
