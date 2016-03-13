module.exports = {
	options: {
		globals: {
			reporter: require('jshint-stylish'),
			jshintrc: true,
			force: true
		},
	},
	all: [ 'routes/**/*.js',
				 'models/**/*.js'
	],
	server: [
		'./keystone.js'
	]
}
