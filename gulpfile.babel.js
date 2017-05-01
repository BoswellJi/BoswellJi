
import gulp from 'gulp';
// import eslint from 'gulp-eslint'

import babel from 'gulp-babel';

import gulpWebpack from 'gulp-webpack';

import webpackConfig from './webpack.config.js';

// import sourcemaps from 'gulp-sourcemaps'

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


gulp.task('public', () => {
  return gulp.src(['express-first/public/css/**/*','express-first/public/js/**/*'])
    .pipe(gulpWebpack(webpackConfig))
    .pipe(gulp.dest('express-app/public'))
})

gulp.task('images', () => {
  return gulp.src('express-first/public/images/**/*')
    .pipe(gulp.dest('express-app/public/images'))
})

gulp.task('nodeW',()=>{
	gulp.watch('express-first/node/**/*',['node']);
})


gulp.task('publicW',()=>{
  gulp.watch(['express-first/public/css/**/*','express-first/public/js/**/*'],['public']);
});

gulp.task('appW',()=>{
	gulp.watch('express-first/app.js',['app']);
})

gulp.task('imagesW',()=>{
  gulp.watch('express-first/public/images/**/*',['images']);
})


gulp.task('default', ['nodeW','publicW','appW','imagesW'], () => {
 console.log('gulp default task!')
})