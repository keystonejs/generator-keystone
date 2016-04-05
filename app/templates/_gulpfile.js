var gulp = require('gulp');
var watch = require('gulp-watch');
var shell = require('gulp-shell')
<% if (preprocessor === 'sass') { %>
var sass = require('gulp-sass');
<% } else if (preprocessor === 'stylus') { %>
var stylus = require('gulp-stylus');
<% } %>

var paths = {
	'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json']
<% if (preprocessor === 'sass') { %>
,
	'style': {
		all: './public/styles/**/*.scss',
		output: './public/styles/'
	}
<% } else if (preprocessor === 'stylus') { %>
,
	'style': {
		main: './public/styles/site.styl',
		all: './public/styles/**/*.styl',
		output: './public/styles/'
	}
<% } %>
};

<% if (preprocessor === 'sass') { %>
gulp.task('watch:sass', function () {
	gulp.watch(paths.style.all, ['sass']);
});

gulp.task('sass', function(){
	gulp.src(paths.style.all)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(paths.style.output));
});
<% } else if (preprocessor === 'stylus') { %>
gulp.task('watch:stylus', function () {
	gulp.watch(paths.style.all, ['stylus']);
});

gulp.task('stylus', function () {
	gulp.src(paths.style.main)
		.pipe(stylus())
		.pipe(gulp.dest(paths.style.output));
});
<% } %>

gulp.task('runKeystone', shell.task('node keystone.js'));
gulp.task('watch', [
<% if (preprocessor === 'sass') { %>
  'watch:sass',
<% } else if (preprocessor === 'stylus') { %>
  'watch:stylus',
<% } %>
  'watch:lint'
]);

gulp.task('default', ['watch', 'runKeystone']);
