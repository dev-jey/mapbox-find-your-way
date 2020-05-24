
const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');

gulp.task('minify-js', function () {
    return gulp.src('*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('output.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('minify-css', () => {
    return gulp.src('*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('dist/css'));
});
