import gulp from "gulp";
import strip_debug from 'gulp-strip-debug';
import uglify from 'gulp-uglify';
import PATH from '../../config';

gulp.task('minifyJS', ()=>{

  gulp.src([PATH.dev.js + '**/*.js', '!' + PATH.dev.js + '_devjs/**/*'])
      .pipe(strip_debug())
      .pipe(uglify({preserveComments : 'some'})) //preserveComments: 'some'
      .pipe(gulp.dest(PATH.release.js));

});
