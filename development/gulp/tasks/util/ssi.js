import gulp from "gulp";
// import ssi from "gulp-html-ssi";
import ssi from "gulp-ssi";
import PATH from '../../config';

// gulp.task('ssi', function() {

//     gulp.src([PATH.dev.ejs + 'page/**/*.ejs'])
//         .pipe(ssi())
//         .pipe(gulp.dest('./build/'));

// });

gulp.task('ssi', function() {

    gulp.src([PATH.dev.ejs + 'page/**/*.ejs'])
        .pipe(ssi({root: PATH.root + '../../../'}))
        .pipe(gulp.dest('./build/'));

});