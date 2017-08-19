const gulp = require('gulp');
const connect = require('gulp-connect');
const ghpages = require('gulp-gh-pages');

const port = process.env.port || 8080;

gulp.task('connect-pro', function() {
    connect.server({
        root: './dist',
        port,
        livereload: true
    });
});

gulp.task('deploy', function() {
    return gulp.src('./dist/**/*')
        .pipe(ghpages());
});
