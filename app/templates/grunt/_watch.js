module.exports = {
	express: {
		files: [
			'keystone.js',
			'public/js/lib/**/*.{js,json}',
		],
		tasks: ['concurrent:dev'],
	},<% if (preprocessor === 'sass') { %>
	sass: {
		files: ['public/styles/**/*.scss'],
		tasks: ['sass'],
	},<% } else if (preprocessor === 'less') { %>
	less: {
		files: ['public/styles/**/*.less'],
		tasks: ['less'],
	},<% } else if (preprocessor === 'stylus') { %>
	stylus: {
		files: ['public/styles/**/*.styl'],
		tasks: ['stylus'],
	},<% } %>
	livereload: {
		files: [
			'public/styles/**/*.css',
		],
		options: {
			livereload: true,
		},
	},
};
