import gulp from 'gulp';
import header from 'gulp-header';
import pkg from './txt.json';
import * as fs from 'fs';
import * as path from 'path';
import PATH from '../../config';
var licenseText = fs.readFileSync(path.join(__dirname + '/LICENSE.txt'), 'utf8');

var banner = [  
  "/* ",
  " * <%= pkg.name %> <%= pkg.version %>",
  " * Compiled <%= date %>",
  " * ",
  " * <%= pkg.description %>",
  " * <%= pkg.license %> Licensed",
  " * ",
  " * Copyright (C) 2015 <%= pkg.author %>, <%= pkg.homepage %>",
  // " * <% licenseText.split('\n').forEach(function (line) { %><%= line %>",
  " */",
  "",
  "",
  "",
].join('\n');


gulp.task('header', ()=>{  

  gulp.src(PATH.dev.js + 'main.js')
    .pipe(header(banner, {
      pkg: pkg,
      licenseText: licenseText,
      date: new Date().toISOString(),
    }))
    .pipe(gulp.dest(PATH.dev.js));

});