const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
// const rename = require("gulp-rename");
// const minify = require("gulp-csso");
const browserSync = require('browser-sync').create();
const del = require('del');


//    Порядок подключения scss файлов
const scssFiles = [
	'src/sass/*.scss'
];

//    Порядок подключения js файлов
const jsFiles = [
	'src/js/**/*.js'
]

//    Копирование файлов
function copy_func() {
  return gulp.src([
    "src/fonts/**/*.{woff,woff2}",
    "src/img/**",
  ], {
    base: "src"
  })
  .pipe(gulp.dest("build"));
};

//    Удаление файлов
function clean_func() {
  return del("build");
};

//    Компиляция SCSS  
function style_func() {
  return (
    gulp
    .src(scssFiles)
    .pipe(plumber())
    .pipe(sourcemaps.init()) 
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))    
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("build/css"))
    // .pipe(minify())
    // .pipe(rename("style.min.css"))
    // .pipe(gulp.dest("build/css")) 
    .pipe(browserSync.stream()) 
    );  
};

//    Работа с JS
function script_func() {
  return (
    gulp
      .src(jsFiles)      
      // .pipe(uglify({toplevel: true}))      
      .pipe(gulp.dest("build/js"))
      .pipe(browserSync.stream())
  );
};

//    Запуск сервера
function watch_func() {
  browserSync.init({
    server: {
     baseDir: "./"
    }
  });

  gulp.watch("src/sass/**/*.scss", style_func);                 //Следить за SCSS файлами                
  gulp.watch("src/js/**/*.js", script_func);                    //Следить за JS файлами  
  gulp.watch("./*.html").on("change", browserSync.reload);      //При изменении HTML запустить синхронизацию
};

//  Таск для копирования 
gulp.task("copy", copy_func);

//  Таск для удаления папки build
gulp.task("clean", clean_func);

//  Таск для стилей
gulp.task("style", style_func);

//  Таск для скриптов
gulp.task("script", script_func);

//  Таск для отслеживания измененний
gulp.task("watch", watch_func);

//  Таск для всего
gulp.task("build", gulp.series("clean", "copy", gulp.parallel("style" ,"script"), "watch"));


//    Минификацмя JS
// const uglify = require('gulp-uglify');

//    Объединитель файлов
// const concat = require("gulp-concat");

//    PostHTML
// const posthtml = require("gulp-posthtml");
// const include = require("posthtml-include");

//    Уменьшение изображений
// const imagemin = require("gulp-imagemin");

//    Картинки в WebP
// const webp = require("gulp-webp");

//    SVG спрайт
// const svgstore = require("gulp-svgstore")