const gulp = require('gulp');

// CSS
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

// Javascript
const eslint = require('gulp-eslint');
const eslintConfig = require('./.eslintrc');

const concat = require('gulp-concat');


// Copy
// const copy = require('gulp-copy');

gulp.task('sass', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('./build/css/'))
    .pipe(browserSync.stream());
});

// JavaScript

const javascriptFiles = [
  './src/js/resources.js',
  './src/js/app.js',
  './src/js/engine.js',
];

gulp.task('scripts', function () {
  return gulp.src(javascriptFiles)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('lint', function() {
  return gulp.src('./src/js/**/*.js')
  .pipe(eslint( eslintConfig ))
  .pipe(eslint.format())
  // Brick on failure to be super strict
  .pipe(eslint.failOnError());
});

gulp.task('html', function () {
  return gulp.src('./src/**/*.html')
  .pipe(gulp.dest('./build/'));
});

gulp.task('images', function () {
  return gulp.src('./src/images/**/*')
  .pipe(gulp.dest('./build/images/'));
});

gulp.task('copy', ['html', 'images']);

// Watch Tasks

gulp.task('watch', function () {

  browserSync.init({
        server: "./build/"
    });

  gulp.watch('./src/scss/**/*.scss', ['sass']);
  gulp.watch('./src/js/**.js', ['lint','scripts']);
  gulp.watch('./src/**.html', ['copy']);
});

gulp.task('default', ['sass', 'scripts', 'copy']);
