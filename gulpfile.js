const gulp = require('gulp'); 
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');

function ourErrorHandler(error) {
    console.log(error.toString()); 
    console.log(gutil.colors.red(error.toString()));
    this.emit('end');
}

gulp.task("server", function() {
    browserSync.init({
        server: "./dist",
        notify: true,
        // host: "192.168.0.24", //IPv4 Address Wirless LAN adapter WiFi from ipconfig
        // port: 3000,
        open: true // czy otwierac strone
    });
});


gulp.task('sass', function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(plumber({
            errorHandler : ourErrorHandler
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "compressed" //nested, expanded, compact, compressed
        }))
        .pipe(autoprefixer({
            browsers: ['> 1%'] // ten zapis można zmeieniać
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream({match: "**/*.css"}));
  });

  gulp.task('watch', function () {
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch("**/*.html").on("change", browserSync.reload);
  });


gulp.task('default', function() {
    console.log ('------ Rozpoczynamy pracę -----');
    gulp.start(['sass','server','watch']);
})