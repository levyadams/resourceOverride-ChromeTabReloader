const { watch, parallel } = require('gulp');
var browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
var tinypng = require('gulp-tinypng-compress');
var gulp = require("gulp"),
        chromeTabReloader = require('chrome-tab-reloader');

//browser hot reloading
 let serve =()=> {
    browserSync.init({
        server: "src/"
    });

    watch("src/*/*.{js,css,html}").on('change', browserSync.reload);
};

let serverside =()=>{
    tabReloaderInstance = new chromeTabReloader({
        port: 8001
    });
    watch("src/**/*.{html,less,js,css,png,gif,jpg}").on('change', tabReloaderInstance);
    // watch("src/js/*.js").on('change', tabReloaderInstance);

};

//image compression
let tiny =()=>{
    return gulp.src('src/content/images/*.{png,jpg,jpeg}')
        .pipe(tinypng({
            key: 'ZgkvWnIEu3ZKWBGqCDPF7vXvQ5B3ofbt',
            sigFile: 'compressed/.tinypng-sigs',
            log: true
        }))
        .pipe(gulp.dest('compressed'));
}

//transpiling
let babelify =()=>{
    
   return gulp.src('src/non-content/js/script.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(gulp.dest('src/non-content/js/dist'))
}

exports.default = parallel(serverside);
exports.babel = babelify;
exports.images = tiny;