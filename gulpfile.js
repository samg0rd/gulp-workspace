const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

const browserSync = require('browser-sync').create();

/**
 -- TOP LEVEL FUNCTIONS --
 gulp.task - define tasks
 gulp.src - point to the files to use
 gulp.dest - points to the folder to output
 gulp.watch - watch files and folder for any changes
*/

// copy all HTML files
const copyHtml = done => {
  gulp.src('./src/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
  done();
}

// optimise images
const imageMin = done => {
  gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.stream());
  done();
}

// Compile Sass
const sassCompiler = done => {
  gulp.src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
  done();
}

// // concat js files
const scripts = done => {
  gulp.src('./src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
  done();
}



// setup browser-sync
const browsersSync = () => {
  browserSync.init({
    server: {
      baseDir: "./dist",		  
    }
  });
}

const dev = done => {
  browsersSync();
  gulp.watch('./src/scss/*.scss', gulp.series([sassCompiler]));
  gulp.watch('./src/js/*.js', gulp.series([scripts]));
  gulp.watch('src/images/*', gulp.series([imageMin]));
  gulp.watch('./src/*.html', gulp.series([copyHtml])).on('change', browserSync.reload);
}

exports.default = dev;

