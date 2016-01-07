var gulp = require('gulp');
var sass = require('gulp-sass');
var prettify = require('gulp-html-prettify');
var uglify = require('gulp-uglify');


gulp.task('default', function () {
  gulp.watch('./src/css/*.scss', ['styles']);
});

// Sass
gulp.task('styles', function () {
  gulp.src('./src/css/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./dist/css/'));
});

// HTML prettify
gulp.task('templates', function () {
  gulp.src('./*.html')
    .pipe(prettify({indent_char: ' ', indent_size: 2}))
    .pipe(gulp.dest('./'));
});

// JS uglify
gulp.task('compress', function() {
  return gulp.src('./src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

