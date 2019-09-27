/*
 * Created by https://github.com/YMFL on 2017/5/18.
 */
var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    clean = require('gulp-clean'),
    open = require('gulp-open'),
    minifyJS = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    minifyHTML = require('gulp-htmlmin'),
    revall = require('gulp-rev-all'),
    proxy = require('http-proxy-middleware'),
    imagemin = require('gulp-imagemin'),
    rev={
        dontRenameFile: [
            /\/favicon.ico$/g,
            /\/index.html$/g,
            // /\/login.html$/g
        ],
        dontGlobal: [/^\/fonts/g],
        transformFilename: function(file, hash) {
            var fileStart = file.path.lastIndexOf('/') + 1;
            var fileEnd = file.path.lastIndexOf('.');
            var ext = file.path.slice(fileStart, fileEnd);
            return ext + "." + hash.substr(0, 5) + file.path.slice(fileEnd);
        }
    };
var DIST ='build/src';
var MD5 ='build/MD5';
var reload = browserSync.reload;
//编译任务
//编译less为css文件
gulp.task('less', less);
//拷贝图片资源
gulp.task('copy',['clean'],function(){
    gulp.src(['src/**/*.{png,gif,jpg,ico}'])
        .pipe(gulp.dest(DIST));
});
//压缩图片
gulp.task('imagemin',['clean'],function(){
    gulp.src(['src/**/*.{png,gif,jpg,ico}'])
        .pipe(imagemin())
        .pipe(gulp.dest(DIST))
});
gulp.task('clean', function () {
    return gulp.src('build', {read: false})
        .pipe(clean());
});
gulp.task('open', function(){
    gulp.src(__filename)
        .pipe(open({uri: 'http://localhost:2017'}));
});
gulp.task('js',['clean'], function(){
    return gulp.src('src/**/*.js')
        .pipe(minifyJS())
        .pipe(gulp.dest(DIST));
});
gulp.task('css',['clean'], function(){
    return gulp.src('src/**/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest(DIST));
});
gulp.task('html',['clean'],function () {
    return gulp.src('src/**/*.html')
        .pipe(minifyHTML({
            removeComments: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(DIST));
});
gulp.task('md5',['less','js','css','html','copy'],function () {
    return gulp.src(DIST+'/**')
        .pipe(revall.revision(rev))
        .pipe(revall.manifestFile(rev))
        .pipe(gulp.dest(MD5));
})


//脚本任务
gulp.task('serve', ['less','open'], serve);
gulp.task('default', ['serve']);
gulp.task('build',['md5'])

function serve() {
    browserSync({
        server: {
            baseDir: './src/'
        },
        port:2017,
        middleware:[
            // proxy({target: 'http://i.vsea.com.cn:8788/', changeOrigin: true})
        ]
    });
    gulp.watch("src/less/**/*.less", ['less']);
    gulp.watch(['src/html/*.html', 'src/css/*.css', 'src/less/**/*.less', 'src/js/**/*.js'], reload);

}

function less() {
    gulp.src('src/less/*.less')
        .pipe(plugins.less({ compress: true }))
        .on('error', function(e) { console.log(e); })
        .pipe(gulp.dest('./src/css/'));
}
