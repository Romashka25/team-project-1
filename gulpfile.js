const gulp = require("gulp");
const mincss = require("gulp-clean-css");
const autoprefix = require("gulp-autoprefixer");
const browsersync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");
const fileinclude = require("gulp-file-include");
const minJs = require("gulp-minify");
const clean = require("gulp-clean");

function browserServe(stop) {
  browsersync.init({
    server: {
      baseDir: "./",
    },
    port: 3010,
    notify: false,
  });
  stop();
}

function html() {
  return gulp
    .src("./src/**/index.html")
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest("./"));
}

function browserReload() {
  browsersync.reload();
}

function css() {
  return gulp
    .src("./src/scss/**/styles.scss")
    .pipe(concat("styles.min.scss"))
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefix({
        overrideBrowserslist: "last 2 version",
        cascade: true,
      })
    )
    .pipe(mincss())
    .pipe(gulp.dest("./dist/css"));
}

function js() {
  return gulp.src("./src/js/*.js").pipe(minJs()).pipe(gulp.dest("./dist/js"));
}

function img() {
  return gulp
    .src("./src/img/*.{jpg,png,svg,gif,ico,webp}")
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 2,
      })
    )
    .pipe(gulp.dest("./dist/img"));
}

function watch() {
  gulp.watch("./src/html/*.html", html).on("change", browserReload);
  gulp.watch("./src/scss/*.scss", css).on("change", browserReload);
  gulp.watch("./src/js/*.js", js).on("change", browserReload);
  gulp
    .watch("./src/img/*.{jpg,png,svg,gif,ico,webp}", img)
    .on("change", browserReload);
}

function cleanFolder() {
  return gulp.src("./dist", { allowEmpty: true }).pipe(clean({ force: true }));
}

const build = gulp.series(cleanFolder, gulp.parallel(html, css, js, img));
const dev = gulp.series(build, gulp.parallel(browserServe, watch));

exports.js = js;
exports.html = html;
exports.css = css;
exports.img = img;
exports.build = build;
exports.dev = dev;
