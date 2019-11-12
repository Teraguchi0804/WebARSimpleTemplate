import gulp from 'gulp';
import PATH from '../../config';

gulp.task('copyResource', ()=>{

    gulp
      .src(PATH.dev.resource + '/**/*')
      .pipe(gulp.dest(PATH.release.resource));

});

gulp.task('copyJS', ()=>{

	gulp.src([PATH.dev.js + '**/*.js', '!' + PATH.dev.js + '_devjs/**/*'])
		.pipe(gulp.dest(PATH.release.js));

});

