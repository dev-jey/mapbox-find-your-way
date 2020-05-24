
const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
var uglify = require('gulp-uglify');
const terser = require('gulp-terser');
var all = require('gulp-all')

function build() {
    return all(
        gulp.src('*.js')
            .pipe(terser())
            .pipe(gulp.dest('dist/js')),

        gulp.src('*.js')
            .pipe(sourcemaps.init())
            .pipe(concat('output.js'))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('dist/js'))
        ,
        gulp.src('*.css')
            .pipe(cleanCSS({ compatibility: 'ie8' }))
            .pipe(gulp.dest('dist/css'))
    )
};

gulp.task('default', build);