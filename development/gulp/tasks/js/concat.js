import gulp from "gulp";
import plumber from "gulp-plumber";
import concat from 'gulp-concat';
import PATH from '../../config';

// ------------------------------------------------------------
//  library
// ------------------------------------------------------------
gulp.task('concatJSLibs', ()=>{

    let src = [
                PATH.dev.devjs + 'libs/jquery.js',
                PATH.dev.devjs + 'libs/ua-parser.min.js',
                PATH.dev.devjs + 'libs/slick.js',
              ];

    gulp.src(src)
        .pipe(plumber())
        .pipe(concat('libs.js'))
        .pipe(gulp.dest(PATH.dev.js + 'common/'));

});
