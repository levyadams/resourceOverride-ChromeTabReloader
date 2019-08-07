const { watch, parallel, series } = require("gulp");
var browserSync = require("browser-sync").create();
const babel = require("gulp-babel");
var tinypng = require("gulp-tinypng-compress");
var gulp = require("gulp"),
  chromeTabReloader = require("chrome-tab-reloader");
var sass = require('gulp-sass');


let serverside = () => {
  browserSync.init({
    server: "src/"
  });

  tabReloaderInstance = new chromeTabReloader({
    port: 8001
  });
  watch("src/**/*.{sass,scss}").on(
    "change",
    series(sassify, tabReloaderInstance)
  );

  watch("src/**/*.{html,png,gif,jpg}").on("change", tabReloaderInstance);
};

let sassify = () => {
  return gulp
    .src("src/sass/**/*.{sass,scss}")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("src/css"));
};

exports.default = serverside;
