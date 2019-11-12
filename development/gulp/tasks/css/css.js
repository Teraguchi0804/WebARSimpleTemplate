import gulp from "gulp";
import sass from "gulp-sass";
import minifyCSS from 'gulp-minify-css';
import csscomb from 'gulp-csscomb';
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import styledocco from 'gulp-styledocco';
import autoprefixer from "gulp-autoprefixer";
import sassGlob from 'gulp-sass-glob';
import PATH from '../../config';

// ------------------------------------------------------------
//  complile
// ------------------------------------------------------------
gulp.task("compileSCSS", ()=>{

    gulp.src([PATH.dev.scss + '**/*.scss','!' + PATH.dev.scss + '**/!*.scss'])
        .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
        .pipe(sassGlob())
        .pipe(sass({outputStyle : 'expanded'}))
        .pipe(autoprefixer({browsers: ['last 2 versions', 'iOS >= 8.1', 'Android >= 4.4'],cascade: true}))
        .pipe(csscomb())
        .pipe(gulp.dest(PATH.dev.css));

});

// ------------------------------------------------------------
//  minify
// ------------------------------------------------------------
gulp.task("minifyCSS", ()=>{

    gulp.src(PATH.dev.css + '**/*.css')
      .pipe(plumber())
      .pipe(minifyCSS())
      .pipe(gulp.dest(PATH.release.css));

});

// ------------------------------------------------------------
//  styleguide
// ------------------------------------------------------------
// gulp.task("styleguide", ()=>{
//
//     return sass(PATH.dev.scss, {
//             style: 'expanded',
//             compass : true,
//             sourcemap: true
//         })
//         .pipe(plumber())
//         .pipe(gulp.dest('./styleguide'))
//         .pipe(styledocco({
//             out: './styleguide',
//             name: 'My Project',
//             'no-minify': true
//         }))
// });
