var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var watchFiles = ['./views/**/*', './public/**/*'];

gulp.task('browser-sync', function() {
    browserSync({
        proxy: "localhost:3000",
        port: 4000
    });
});

gulp.task('watch', ['browser-sync'], function () {
  gulp.watch(watchFiles, reload);
});

gulp.task('default', ['watch']);