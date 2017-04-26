
import gulp from 'gulp'
// import eslint from 'gulp-eslint'

import babel from 'gulp-babel'
// import sourcemaps from 'gulp-sourcemaps'

// 配置需要处理的文件目录和转码之后文件的存放目录
const paramConfig = {
  source: 'nodejs-first/**/*',
  dest: 'build',
}

// gulp.task('lint', () => {
//   // eslint配置，使用配置的文件目录。排除node_modules下的全部文件。
//   return gulp.src([paramConfig.source, '!node_modules/**'])
//     .pipe(eslint())
//     .pipe(eslint.result(result => {
//       console.log(`ESLint result: ${result.filePath}`);
//       console.log(`# Messages: ${result.messages.length}`);
//       console.log(`# Warnings: ${result.warningCount}`);
//       console.log(`# Errors: ${result.errorCount}`);
//     }))
//     .pipe(eslint.format())
//     .pipe(eslint.failOnError())
// })


gulp.task('node', () => {
  return gulp.src('express-first/node/**/*')  
    // .pipe(sourcemaps.init())
    .pipe(babel())
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('express-app/node'))
})
gulp.task('app', () => {
  return gulp.src('express-first/app.js')  
    // .pipe(sourcemaps.init())
    .pipe(babel())
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('express-app'))
})

gulp.task('views', () => {
  return gulp.src('express-first/views/**/*')  
    .pipe(gulp.dest('express-app/views'))
})

gulp.task('public', () => {
  return gulp.src('express-first/public/**/*')  
    .pipe(gulp.dest('express-app/public'))
})

gulp.task('nodeW',()=>{
	gulp.watch('express-first/node/**/*',['node']);
})

gulp.task('viewsW',()=>{
	gulp.watch('express-first/views/**/*',['views']);
});

gulp.task('publicW',()=>{
	gulp.watch('express-first/public/**/*',['public']);
});

gulp.task('appW',()=>{
	gulp.watch('express-first/app.js',['app']);
})

gulp.task('default', ['nodeW', 'appW', 'publicW', 'viewsW'], () => {
 console.log('gulp default task!')
})