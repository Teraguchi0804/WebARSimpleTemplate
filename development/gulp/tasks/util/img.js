import gulp from "gulp";
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import jpegoptim from 'imagemin-jpegoptim';
import plumber from "gulp-plumber";
import cache from 'gulp-cached';
import changed from 'gulp-changed';
import PATH from '../../config';

// <!-- ************************************************************
//
// jpg|jpeg|png|gif|svg
//
// ************************************************************ -->

let opt = {
  optimizationLevel: 3,
  // svgoPlugins: [{removeViewBox: false}],
  use: [
    pngquant({quality: '0-20', speed: 1}),
    // jpegoptim({progressive: true, max:90})
  ]
};

gulp.task('minifyIMG', ()=>{

  gulp.src(PATH.dev.resource + '**/*.+(jpg|jpeg|png|gif|svg)')
    .pipe(changed(PATH.release.resource))
    // .pipe(cache('img_log'))
    .pipe(plumber())
    .pipe(imagemin(opt))
    .pipe(gulp.dest(PATH.release.resource));

});