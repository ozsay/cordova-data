var path   = require('path'),
    Dgeni  = require('dgeni'),
    del    = require('del'),
    gulp   = require('gulp'),
    concat = require('gulp-concat'),
    footer = require('gulp-footer'),
    header = require('gulp-header'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    tap    = require('gulp-tap');
    karma  = require('karma').server;

var _header = '(function(window, angular, undefined) {\n\'use strict\';\nangular.module(\'cordovaData\', [';
var _footer = '\n})(window, window.angular);';

gulp.task('makeHeader', function() {
    return gulp.src('src/plugins/*.js')
    .pipe(tap(function(f) {
        _header += '\'cordovaData.' + path.basename(f.path, '.js') + '\', ';
    }));
});

gulp.task('build', ['makeHeader'], function() {
    _header = _header.substring(0, _header.length - 2) + ']);\n\n';
    
    return gulp.src('src/plugins/*.js')
    .pipe(concat('cordova-data.js'))
    .pipe(header(_header))
    .pipe(footer(_footer))
    .pipe(gulp.dest('dist/'))
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('dist/'));
});

gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('tdd', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
});

gulp.task('clean', function (done) {
  del(['dist/docs'], done);
});

gulp.task('docs', ['clean'], function() {
    var dgeni = new Dgeni([require('./docs/docs-gen.conf')]);
    
    return dgeni.generate();
});