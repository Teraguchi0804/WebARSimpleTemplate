import gulp from "gulp";
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import PATH from '../../config';

gulp.task('webpack', ()=>{

	return gulp.src(PATH.dev.devjs + 'src/**/*.js')
		.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
		.pipe(webpackStream(require('../../webpack.config.js'), webpack))
		.pipe(gulp.dest(PATH.dev.js));
});
