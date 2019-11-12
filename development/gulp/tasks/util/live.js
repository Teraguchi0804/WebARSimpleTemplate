/*
import gulp from "gulp";
import browserSync from "browser-sync";

gulp.task("browserSync", ()=>{
	browserSync.init({
		notify: false,
		open: 'external',
		server: {
			baseDir: '../src/'
		}
	});
});

gulp.task("sync", ()=>{
    browserSync.reload();
});

*/

import gulp from "gulp";
const path = require("path");
const bs = require("browser-sync").create();

const distDir = path.resolve(process.cwd(), "../src/");
const userDir =
	process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"];
const sslDir = path.resolve(userDir, "", "ssl"); // ~/ect/ssl に相当

gulp.task("browserSync", ()=>{
	bs.init({
		server: distDir,
		watch: true,
		open: 'external',
		https: {
			key: path.resolve(sslDir, "local-server-dev.key"),
			cert: path.resolve(sslDir, "local-server-dev.crt"),
		},
	});
});

gulp.task("sync", ()=>{
	bs.reload();
});

