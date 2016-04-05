module.exports = {
	express: {
		files: [
			'keystone.js',
			'public/js/lib/**/*.{js,json}',
		],
		tasks: ['concurrent:dev'],
	},
	sass: {
		files: ['public/styles/**/*.scss'],
		tasks: ['sass'],
	},
	livereload: {
		files: [
			'public/styles/**/*.css',
		],
		options: {
			livereload: true,
		},
	},
};
