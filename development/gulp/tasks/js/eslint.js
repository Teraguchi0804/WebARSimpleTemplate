import gulp from "gulp";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import eslint from "gulp-eslint";
import debug from 'gulp-debug';
import PATH from '../../config';

gulp.task('eslint', ()=>{

  // gulp
  //   .src(PATH.dev.devjs + 'src/**/*.js')
  //   // .pipe(debug({title: 'vinyl:'}))
  //   .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
  //   .pipe(eslint(PATH.other.gulp + '.eslintrc'))
  //   .pipe(eslint.format())
  //   .pipe(eslint.failAfterError())
  //   .pipe(gulp.dest(PATH.dev.js));

});