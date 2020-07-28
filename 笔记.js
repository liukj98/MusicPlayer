// // 处理任务，每一个函数就是一个任务
// function html(cb){
//     console.log("html被调用了")
//     cb();
// }
// function css(cb){
//     console.log("css被调用了")
//     cb();
// }
// function js(cb){
//     console.log("js被调用了")
//     cb();
// }
// const {series, parallel} = require("gulp");
// // exports.default = series(html, css, js);
// // exports.default = parallel(html, css, js);
// exports.default = parallel(html, parallel(css, js));

// // 处理文件（以流的形式）
// const { src, dest, parallel } = require("gulp");
// const gulpUglify = require("gulp-uglify");
// const gulpRename = require("gulp-rename");
// const path = require("path");

// function handleFile(){
//     return src(path.resolve(__dirname, "src/js/*.js"))
//             .pipe(dest(path.resolve(__dirname, "dist/js")))
//             .pipe(gulpUglify())
//             .pipe(gulpRename({
//                 extname: ".min.js"
//             }))
//             .pipe(dest(path.resolve(__dirname, "dist/js")));
// }
// exports.default = handleFile

// const { src, dest, parallel } = require("gulp");
// const gulpUglify = require("gulp-uglify");
// const gulpRename = require("gulp-rename");
// const path = require("path");

// function handleFile(){
//     return src("src/js/*.js")
//             .pipe(dest("dist/js"))
//             .pipe(gulpUglify())
//             .pipe(gulpRename({
//                 extname: ".min.js"
//             }))
//             .pipe(dest("dist/js"));
// }
// exports.default = handleFile

// // 文件监控
// const { watch } = require("gulp");
// watch("src/css/*", {
//     delay: 2000
// }, function(cb){
//     console.log("文件被修改了")
//     cb();
// })
