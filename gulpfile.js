const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');


gulp.task('sass', ()=> {
    gulp.src('./dev/scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'compact'
        }))
        .pipe(autoprefixer({
            browsers: ['last 3 versions']
        }))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream())
})

gulp.task('pug', ()=> {
    gulp.src('./dev/pug/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./public/'))
})

gulp.task('babel', ()=> {
    gulp.src('./dev/js/scripts.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('./public/js'))
})

gulp.task('default', ['sass'], ()=> {
    browserSync.init({
        server: './public'
    })
    gulp.watch('./dev/scss/**/*.scss', ['sass'])
    gulp.watch('./dev/pug/*.pug', ['pug']).on('change', browserSync.reload)
    gulp.watch('./dev/js/*.js', ['babel']).on('change', browserSync.reload)
})