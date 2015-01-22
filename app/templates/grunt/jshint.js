module.exports = {
	options: {
		reporter: require('jshint-stylish'),
		force: true
	},
	all: [ 'routes/**/*.js',
				 'models/**/*.js'
	],
	server: [
		'./keystone.js'
	]
}
