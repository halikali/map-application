const gulp = require("gulp"),
  imagemin = require("gulp-imagemin"),
  browserSync = require("browser-sync").create(),
  sass = require("gulp-sass")(require("node-sass")),
  minifyCSS = require("gulp-csso"),
  autoprefixer = require("gulp-autoprefixer"),
  concat = require("gulp-concat"),
  del = require("del"),
  runSequence = require("gulp4-run-sequence"),
  babel = require("gulp-babel"),
  uglify = require("gulp-uglify"),
  fsCache = require("gulp-fs-cache");

gulp.task("browser-sync", () => {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
});

gulp.task("html", async () => {
  gulp
    .src("src/**/*.html")
    .pipe(gulp.dest("./dist/"))
    .pipe(browserSync.stream());
});

gulp.task("css", async () => {
  gulp
    .src("src/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(minifyCSS())
    .pipe(autoprefixer())
    .pipe(concat("style.min.css"))
    .pipe(gulp.dest("dist/css/"))
    .pipe(browserSync.stream());
});

gulp.task("js", async () => {
  let jsFsCache = fsCache("tmp/jscache");
  gulp
    .src("src/**/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(jsFsCache)
    .pipe(uglify())
    .pipe(jsFsCache.restore)
    .pipe(concat("app.min.js"))
    .pipe(gulp.dest("dist/js/"))
    .pipe(browserSync.stream());
});

gulp.task("images", async () => {
  gulp.src("./images/**/*").pipe(imagemin()).pipe(gulp.dest("./dist/images/"));
});

gulp.task("watch", async () => {
  gulp.watch("src/**/*.html", gulp.series("html"));
  gulp.watch("src/scss/**/*.scss", gulp.series("css"));
  gulp.watch("src/js/**/*.js", gulp.series("js"));
  gulp.watch("src/images/**/*", gulp.series("images"));
});

gulp.task("delete", async () => del(["dist/", "tmp/"]));

gulp.task("default", () => {
  runSequence("delete", "html", "css", "js", "images", "watch", "browser-sync");
});
