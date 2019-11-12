import gulp from 'gulp';
import runSequence from 'run-sequence';
import PATH from './config';
import requireDir from 'require-dir';
requireDir('./tasks',{recurse: true});

//--------------------------------------------------
//  watch
//--------------------------------------------------
gulp.task('watch', ()=>{
    gulp.watch([PATH.dev.root + '**/*.ejs',PATH.dev.image + '**/*.svg'],['compileHTML']);
    gulp.watch( PATH.dev.scss + '**/*.scss',['compileSCSS']);
    gulp.watch([PATH.dev.devjs + '**/*.js', PATH.dev.devjs],['webpack','eslint']);
    gulp.watch([PATH.dev.glsl + '**/*.frag', PATH.dev.glsl + '**/*.vert', PATH.dev.glsl + '**/*.fs', PATH.dev.glsl + '**/*.vs'],['webpack']);
    gulp.watch([PATH.dev.root + '**/*.html',PATH.dev.css + '**/*.css',PATH.dev.js + '**/*.js'],['sync']);
});

//--------------------------------------------------
//  default
//--------------------------------------------------
gulp.task('default', [
                        'watch',
                        'compileHTML','compileSCSS',
                        'concatJSLibs','webpack','eslint',
                        'browserSync'
                    ]);

//--------------------------------------------------
//  pucblish
//--------------------------------------------------
gulp.task('publish', (callback)=>{

  return runSequence(
    'clean',
    ['compileHTML','compileSCSS','concatJSLibs'],
    ['minifyHTML','minifyCSS','minifyJS'],
    ['copyPHP','copyResource'],
    callback
  );

});