var gulp = require('gulp');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var replace = require('gulp-replace');
var config = require('./config.json');

gulp.task('default', ['local']);

gulp.task('local', function() {
    runSequence('set-env-local', 'clean', 'replace', 'copy');
});

gulp.task('live', function() {
    runSequence('set-env-live', 'clean', 'replace', 'copy');
});

gulp.task('set-env-local', function() {
    return process.env.NODE_ENV = 'local';
});

gulp.task('set-env-live', function() {
    return process.env.NODE_ENV = 'live';
});

gulp.task('clean', function() {
    return gulp.src(['./dist/**/*.*'], {
            read: false
        })
        .pipe(clean());
});

gulp.task('replace', function() {
    var obj = config[process.env.NODE_ENV] || {};
    var tempTask = gulp.src(['./src/change/**/*.*']);
    Object.keys(obj).forEach(function(key) {
        tempTask.pipe(replace('::{{[[' + key + ']]}}', obj[key]))
    })
    tempTask.pipe(gulp.dest('./dist/'));
});

gulp.task('copy', function() {
    gulp.src('./src/unchange/**/*.*').pipe(gulp.dest('./dist/'));
});
