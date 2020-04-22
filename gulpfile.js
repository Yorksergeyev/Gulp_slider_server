const { watch, src, dest, series, parallel } = require('gulp');
//переименование файлов
const rename = require('gulp-rename'); // для переименовывания
const cssmin = require('gulp-cssmin'); // минификатор
const sass = require("gulp-sass"); // sass препроцессор для css
const plumber = require("gulp-plumber"); // для улучшения работа node stream
const concat = require('gulp-concat'); // соединение файлов
const autoprefixer = require('gulp-autoprefixer'); // для вендорных префиксов
const browsersync = require("browser-sync").create();


function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: "./build/"
        },
        port: 3000
    });
    done();
}

function browserSyncReload(done) {
    browsersync.reload();
    done();
}

const fullcss = [
    'sass/*.sass',
    'node_modules/slick-carousel/slick/slick.css', 
    'node_modules/slick-carousel/slick/slick-theme.css',
    'node_modules/magnific-popup/dist/magnific-popup.css', 
]

const fulljs =[
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
    'code.js'
]

function getCSS(){
    // подтянуть несколько css файлов, сжать, переименовать, и положить в итоговый билд
    return src(fullcss)
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(concat('style.css'))
        .pipe(autoprefixer({
        cascade: false
        }))
        .pipe(rename({suffix:".min"}))
        .pipe(dest('build/'))
        .pipe(browsersync.stream());
}

function htmlfile(){
    return src('*.html')
        .pipe(dest('build/'));
}

function imagesfile() {
    return src('*.jpeg')
        .pipe(dest('build/'))
}

function jsfile(){
    return src(fulljs)
        .pipe(concat('code.js'))
        .pipe(rename({suffix: ".min"}))
        .pipe(dest('build/'))
        .pipe(browsersync.stream());
}

exports.build = series(htmlfile, getCSS, jsfile, imagesfile);

exports.watch = parallel( browserSync, watchCss);

exports.default = function() {
    // You can use a single task
    // getReady()
    // watch('sass/*.sass', getCSS);
    watch('sass/*.sass', getCSS);

    // watch('dist/*.js', getJs);


    // Or a composed task
    // watch(['dist/*.js', '*.html'], series(copyHtml, copyCss, getJs));
  };

function watchCss() {
    watch('sass/*.sass', getCSS);
}

function watchFiles() {
    gulp.watch("./assets/scss/**/*", css);
    gulp.watch("./assets/js/**/*", gulp.series(scriptsLint, scripts));
    gulp.watch(
        [
            "./_includes/**/*",
            "./_layouts/**/*",
            "./_pages/**/*",
            "./_posts/**/*",
            "./_projects/**/*"
        ],
        gulp.series(jekyll, browserSyncReload)
    );
    gulp.watch("./assets/img/**/*", images);
}