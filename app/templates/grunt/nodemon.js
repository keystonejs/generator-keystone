module.exports = {
	debug: {
		script: 'keystone.js',
		options: {
			nodeArgs: ['--debug'],
			env: {
				port: 3000,
			},
		},
	},
};
