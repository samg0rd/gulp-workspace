const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/**
 -- TOP LEVEL FUNCTIONS --
 gulp.task - define tasks
 gulp.src - point to the files to use
 gulp.dest - points to the folder to output
 gulp.watch - watch files and folder for any changes
*/


// logging messages
gulp.task('message', (done) => {
  console.log('gulp is running . . .!');
  done();
});

// copy all HTML files
gulp.task('copyHtml', (done) => {

  gulp.src('./src/*.html')
    .pipe(gulp.dest('dist'));

  done();
})

// optimise images
gulp.task('imageMin', (done) => {
  gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));

  done();
})

// Compile Sass
gulp.task('sass', (done)=>{
  gulp.src('./src/scss/*.scss')
  .pipe(sass().on('error', sass.logError)) 
  .pipe(gulp.dest('./dist/css'));

  done();
})

// concat js files
gulp.task('scripts', (done)=>{
  gulp.src('./src/js/*.js')
  .pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./dist/js'));
  done();
})



// gulp default task which fires by just running gulp command in the command line

// GULP v3 --> running multiple tasks
// gulp.task('default', ['message','copyHtml','imageMin','minify','sass']);

// GULP v4 --> running multiple tasks
// gulp.task('default', gulp.series([['message','copyHtml','imageMin','sass','scripts']]));
gulp.task('default', gulp.series(['message','copyHtml','imageMin','sass','scripts']));


// watching all files for changes instead of running gulp command everytime we change something
/*V3*/
// gulp.task('watch',(done)=>{
//   gulp.watch('./src/js/*.js',['scripts']);
//   gulp.watch('./src/scss/*.scss',['sass']);
//   gulp.watch('./src/images/*', ['imageMin']);
//   gulp.watch('./src/*.html', ['copyHtml']);

//   done();
// })

/*V4*/
gulp.task('watch',()=>{
  gulp.watch('./src/js/*.js',gulp.series('scripts'));
  gulp.watch('./src/scss/*.scss',gulp.series('sass'));
  gulp.watch('./src/images/*', gulp.series('imageMin'));
  gulp.watch('./src/*.html', gulp.series('copyHtml'));  
})