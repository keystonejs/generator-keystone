module.exports = {
	express: {
		files: [
			'keystone.js',
			'public/js/lib/**/*.{js,json}',
		],
		tasks: ['concurrent:dev'],
	},
	<% if (preprocessor === 'sass') { %>
	sass: {
		files: ['public/styles/**/*.scss'],
		tasks: ['sass'],
	},
	<% } %><% if (preprocessor === 'less') { %>
	less: {
		files: ['public/styles/**/*.less'],
		tasks: ['less'],
	},
	<% } %>
	livereload: {
		files: [
			'public/styles/**/*.css',
		],
		options: {
			livereload: true,
		},
	},
};
