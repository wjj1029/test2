var gulp=require('gulp');
//压缩HTML
var htmlmin=require('gulp-htmlmin');
//压缩、混淆js
var uglify=require('gulp-uglify');
//编译less
var less=require('gulp-less');
//压缩css
var minifyCSS=require('gulp-minify-css');
//浏览器自动刷新
var browserSync=require('browser-sync').create();
//任务：压缩、移动HTML页面
gulp.task('html',function(){
  gulp.src('index.html')
  .pipe(htmlmin({
    collapseWhitespace:true,
    removeContents:true
  }))
  .pipe(gulp.dest('dist/'))
  .pipe(browserSync.stream());

  gulp.src('page/**/*.html')
  .pipe(htmlmin({
    collapseWhitespace:true,
    removeContents:true
  }))
  .pipe(gulp.dest('dist/page/'))
  .pipe(browserSync.stream());
});//任务：压缩、混淆、移动js文件
gulp.task('js',function(){
  gulp.src('js/**/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('dist/js/'))
  .pipe(browserSync.stream());
})
//任务：编译less文件，压缩、移动编译生成的CSS文件
gulp.task('less',function(){
  gulp.src('less/**/*.less')
  .pipe(less())
  .pipe(minifyCSS())
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.stream());
})
//任务：移动图片
gulp.task('img',function(){
  gulp.src('images/**/*.*')
  .pipe(gulp.dest('dist/images'))
  .pipe(browserSync.stream());
})
//任务：监听所有的文件变动
gulp.task('watch',function(){
  gulp.watch(['index.html','page/**/*.html'],['html']);
  gulp.watch('js/**/*.js',['js']);
  gulp.watch('less/**/*.less',['less']);
  gulp.watch('images/**/*.*',['img']);
})
//任务：浏览器自动刷新
gulp.task('browser-sync',function(){
  browserSync.init({
    port:8888,
    server:{
      baseDir:'dist/'
    }
  });
})
//任务：移动项目需要的框架到dist文件夹中
gulp.task('lib',function(){
  gulp.src('node_modules/jquery/dist/**/*.*')
  .pipe(gulp.dest('dist/lib/jquery'));
  gulp.src('node_modules/bootstrap/dist/**/*.*')
  .pipe(gulp.dest('dist/lib/bootstrap'));
})
//任务：默认任务，把上面的任务组合起来一起执行
gulp.task('default',['html','js','less','img','lib','watch','browser-sync']);
