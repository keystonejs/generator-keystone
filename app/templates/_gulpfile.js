var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jshintReporter = require('jshint-stylish');
var watch = require('gulp-watch');
var shell = require('gulp-shell')
<% if (preprocessor === 'sass') { %>
var sass = require('gulp-sass');
<% } %>

var paths = {
	'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json']
<% if (preprocessor === 'sass') { %>
,
	'style': {
		all: './public/styles/**/*.scss',
		output: './public/styles/'
	}
<% } %>
};

// gulp lint
gulp.task('lint', function(){
	gulp.src(paths.src)
		.pipe(jshint())
		.pipe(jshint.reporter(jshintReporter));
});

// gulp watcher for lint
gulp.task('watch:lint', function () {
	gulp.src(paths.src)
		.pipe(watch())
		.pipe(jshint())
		.pipe(jshint.reporter(jshintReporter));
});

<% if (preprocessor === 'sass') { %>
gulp.task('watch:sass', function () {
	gulp.watch(paths.style.all, ['sass']);
});

gulp.task('sass', function(){
	gulp.src(paths.style.all)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(paths.style.output));
});
<% } %>

gulp.task('runKeystone', shell.task('node keystone.js'));
gulp.task('watch', [
<% if (preprocessor === 'sass') { %>
  'watch:sass',
<% } %>
  'watch:lint'
]);

gulp.task('default', ['watch', 'runKeystone']);
