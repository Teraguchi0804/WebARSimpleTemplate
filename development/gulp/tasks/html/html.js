import gulp from "gulp";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import ejs from "gulp-ejs";
import rename from 'gulp-rename';
import htmlhint from 'gulp-htmlhint';
import ssi from "gulp-ssi";
import fs from "fs";
import PATH from '../../config';


/**
 * compile
 */
gulp.task("compileHTML", ()=>{

  // metaData.jsonの読み込み
  var json = PATH.dev.ejs + 'inc/metaData.json';
  var data = JSON.parse(fs.readFileSync(json, 'utf8'));

  gulp.src([PATH.dev.ejs + 'page/**/*.ejs','!' + PATH.dev.ejs + '**/_*.ejs','!' + PATH.dev.ejs + 'page/_src/**/*.ejs'])
      .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
      .pipe(ejs({data: data}))
      .pipe(rename({extname: '.html'})) //出力ファイル名を指定
      .pipe(ssi({root: PATH.root + '../../../'}))
      .pipe(htmlhint('/.htmlhintrc'))
      .pipe(gulp.dest(PATH.dev.root));

});

/**
 * minify
 */
gulp.task("minifyHTML", ()=>{
    gulp.src(PATH.dev.root + '**/*.html')
          .pipe(plumber())
          .pipe(gulp.dest(PATH.release.root));

});


gulp.task("copyPHP", function() {
	gulp.src(PATH.dev.root + '**/*.php')
    .pipe(gulp.dest(PATH.release.root));
});