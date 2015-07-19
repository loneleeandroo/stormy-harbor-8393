var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

function getTask(task) {
  return require('./gulp/' + task)(gulp, plugins);
}

gulp.task('lint', getTask('lint'));
gulp.task('serve', ['lint'], getTask('serve'));

gulp.task('mocha', getTask('test'));
gulp.task('test', ['serve', 'mocha'], function() {
  gulp.watch(['routes/**/*.js','lib/**/*.js'], ['lint']);
  gulp.watch(['routes/**/*.js','lib/**/*.js', 'test/**/*.js'], ['mocha']);
});

gulp.task('default', ['serve'], function () {
  gulp.watch(['routes/**/*.js','lib/**/*.js'], ['lint']);
});
