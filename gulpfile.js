const gulp = require('gulp');
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const nodeSass = require('node-sass');
sass.complier = nodeSass;
const clean = require('gulp-clean');

// dist폴더안에 모든걸 다 지웁니다.
const cleanTask = () => {
    return gulp.src('./dist/*').pipe(clean());
}
// scss -> css
const scss = () => {
    return gulp.src('src/scss/pages/*.scss')
     .pipe(sass.sync())
     .pipe(gulp.dest('dist/css'));
}

//.ejs -> html
const html = () => {
    return gulp.src(`src/pages/*.ejs`)
     .pipe(ejs())
     .pipe(rename({
         extname: '.html'
     }))
     .pipe(gulp.dest('dist/'));
}

const watch = () => {
    return gulp.watch('src/**/*', gulp.series(cleanTask, scss, html))
}; //gulp의 watch(수정사항 저장 시 자동 반영 기능)
exports.html = html;
exports.scss = scss;
exports.watch = watch;
exports.cleanTask = cleanTask;