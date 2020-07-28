const { series, src, dest, watch } = require("gulp");

const htmlClean = require("gulp-htmlclean");
const less = require("gulp-less");
const cleanCss = require("gulp-clean-css");
const stripDebug = require("gulp-strip-debug");
const uglify = require("gulp-uglify");
const connect = require("gulp-connect");

const path = {
    src: "src/",
    dist: "dist/"
}

function html() {
    return src(path.src + "html/*")
        .pipe(htmlClean())
        .pipe(dest(path.dist + "html"))
        .pipe(connect.reload())
}

function css() {
    return src(path.src + "css/*")
        .pipe(less())
        .pipe(cleanCss())
        .pipe(dest(path.dist + "css"))
        .pipe(connect.reload())
}

function js() {
    return src(path.src + "js/*")
        // .pipe(stripDebug())
        // .pipe(uglify())
        .pipe(dest(path.dist + "js"))
        .pipe(connect.reload())
}

function server(cb){
    connect.server({
        port: 12306,
        livereload: true
    })
    cb();
}

watch(path.src + "html/*", function(cb){
    html();
    cb();
})
watch(path.src + "css/*", function(cb){
    css();
    cb();
})
watch(path.src + "js/*", function(cb){
    js();
    cb();
})

exports.default = series(html, css, js, server);
