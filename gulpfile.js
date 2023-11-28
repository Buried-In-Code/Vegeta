import gulp from 'gulp'
import nodeSass from 'node-sass'
import gulpSass from 'gulp-sass';
const sass = gulpSass(nodeSass);
import sourcemaps from 'gulp-sourcemaps'
import autoprefixer from 'gulp-autoprefixer'
import csso from 'gulp-csso'
import rename from 'gulp-rename'
import {deleteSync, deleteAsync} from 'del';

var changedTheme = '';

gulp.task('clean', async function() {
    await deleteAsync(['*/*.css', '*/*.css.map']);
});

gulp.task('sass:dev', function() {
    return gulp.src('*/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: 'node_modules/bulma'
        }).on('error', sass.logError))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('.'));
});

gulp.task('sass', gulp.series('clean', function compile() {
    return gulp.src('*/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: 'node_modules/bulma'
        }).on('error', sass.logError))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('.'));
}));

gulp.task('default', gulp.series('sass:dev'));

gulp.task('build', gulp.series('sass'));
