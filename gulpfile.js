var gulp = require('gulp')
var rev = require('gulp-rev') // 添加版本号
var revReplace = require('gulp-rev-replace') // 版本号替换
var useref = require('gulp-useref') // 解析html资源定位
var gulpIf = require('gulp-if')
var filter = require('gulp-filter')
var uglify = require('gulp-uglify')
var cssnano = require('gulp-cssnano')
var clean = require('gulp-clean')
var imagemin = require('gulp-imagemin')
var concat = require('gulp-concat')
var sass = require('gulp-sass')
var autoPrefixer = require('gulp-autoprefixer')
var connect = require('gulp-connect')
var pump = require('pump')

//压缩处理图片 

gulp.task('dist:img', function () {
  gulp.src('src/imgs/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/imgs'))
})


// sass 文件处理 

gulp.task('dist:css', function () {
  gulp.src('dist/css/*').pipe(clean())
  return gulp.src('src/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(concat('merge.css'))
    .pipe(autoPrefixer({
      browsers: ['last 2 version'],
      cascade: false
    }))
    .pipe(gulp.dest('dist/css/'))
})


// 调试阶段sass文件处理为css文件
gulp.task('src:css', function () {
  gulp.src('src/css/*').pipe(clean())
  return gulp.src('src/sass/*.scss')
    .pipe(sass())
    .pipe(autoPrefixer({
      browsers: ['last 2 version'],
      cascade: false
    }))
    .pipe(gulp.dest('src/css'))
})


// 处理js文件
gulp.task('dist:js', function () {
  gulp.src('dist/js/*').pipe(clean())
  return gulp.src('src/js/*.js')
    .pipe(concat('merge.js'))
    .pipe(uglify())    
    .pipe(gulp.dest('dist/js/'))
})

// 添加版本号

gulp.task('reversion', ['dist:css', 'dist:js'], function () {
  return gulp.src(['dist/**/*.css', 'dist/**/*.js'])
    .pipe(rev())
    .pipe(gulp.dest('dist'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist'))
})

// 替换版本号  

gulp.task('build', ['reversion'], function () {
  var manifest = gulp.src('./dist/rev-manifest.json')
  return gulp.src('src/index.html')
    .pipe(revReplace({
      manifest: manifest
    }))
    .pipe(useref())
    .pipe(gulp.dest('dist'))
})


gulp.task('watch', function () {
  gulp.watch('src/**/*.scss', ['src:css'])
})

gulp.task('connect', function () {
  connect.server({
    root: 'src',
    livereload: true
  })
})

gulp.task('reload',function(){
  gulp.src('src/index.html')
  .pipe(connect.reload())
})

gulp.task('change',function(){
  gulp.watch(['src/**/*'],['src:css','reload'])
})

gulp.task('server',['connect','change'])