var gulp       = require('gulp'),
    browserify = require('browserify'),
    babelify   = require('babelify'),
    buffer     = require('vinyl-buffer'),
    uglify     = require('gulp-uglify'),
    source     = require('vinyl-source-stream');

var defaultTasks = [];
var buildTasks   = [];
var dest         = './dist';
var jsSource     = './src';
var jsEntry      = jsSource += '/futility.js';
var jsOutput     = 'futility.js';

// Helper function to transpile JS
// http://stackoverflow.com/questions/24992980/how-to-uglify-output-with-browserify-in-gulp
function transpileJS(entryPoint, outputName, outputPath, debug) {
    return function() {
        var bundler = browserify(entryPoint, { debug: debug, standalone: 'futility' })
          .transform(babelify)
          .bundle()
          .on("error", function (err) { console.log("Error : " + err.message); })
          .pipe(source(outputName));

        if(!debug) {
            //bundler = bundler.pipe(buffer())
              //.pipe(uglify());
        }

        return bundler.pipe(gulp.dest(outputPath));
    }
}

// Compile client es6 code
gulp.task('client-code', transpileJS(jsEntry, jsOutput, dest, true));
gulp.task('prod-code', transpileJS(jsEntry, jsOutput, dest, false));
defaultTasks.push('client-code');
buildTasks.push('prod-code');

// Watches script directories and rebuilds on change
gulp.task('watch-scripts', function() {
    gulp.watch([
        jsSource + '/**/*.js',
        jsSource + '/**/*.json',
    ], function() {
        console.log("~~~ Rebuilding Scripts... ~~~");
    });

    gulp.watch([
        './src/**/*.js',
        './src/**/*.json'
    ], ['client-code']);
});
defaultTasks.push('watch-scripts');

gulp.task('default', defaultTasks);
gulp.task('build', buildTasks);
