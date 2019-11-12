import gulp from "gulp";
import PATH from '../../config';

gulp.task('copyJS', ()=>{

    gulp
    .src(PATH.dev.devjs + 'src/page/**/*.js')
    .pipe(gulp.dest(PATH.dev.js));

});