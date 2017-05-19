var gulp = require('gulp');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var scss = require('gulp-scss');
var clean = require('gulp-rimraf');

gulp.task('images', function () {
    gulp.src('./src/img/**')
        .pipe(gulp.dest('./build/img/'));
});

gulp.task("scss", function () {
    gulp.src("./src/scss/main.scss")
        .pipe(scss({}))
        .pipe(gulp.dest("./build/"));
});

gulp.task('minify-css', function () {
    gulp.src('./build/*.css')
        .pipe(concat('main.css'))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./build/'));
});

gulp.task('scripts', function () {
    gulp.src('./src/js/**')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('vendor', function () {
    gulp.src('./src/vendor/**')
        .pipe(gulp.dest('./build/vendor/'));
});

gulp.task('clean', function () {
    gulp.src('./build/*', { read: false })
        .pipe(clean());
});





gulp.task('build', ['images', 'vendor', 'scss', 'minify-css', 'scripts']);


gulp.task('watch', function () {
    gulp.watch('src/**', ['scss', 'minify-css', 'scripts']);
});

gulp.task('deploy', ['clean', 'build']);