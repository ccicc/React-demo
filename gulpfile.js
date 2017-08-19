const gulp = require('gulp');
const connect = require('gulp-connect');
const ghPages = require('gulp-gh-pages');

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
        .pipe(ghPages({
            remoteUrl: 'https://github.com/ccicc/React-demo.git',
            force: true,
            message: 'gh-pages'
        }));
});
