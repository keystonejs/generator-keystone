// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv')().load();

// Require keystone
var keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

	'name': '<%= projectName %>',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',

	'views': 'templates/views',
	'view engine': 'jade',

	'auto update': true,

	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': '<%= cookieSecret %>'

});

// Load your project's Models

require('./models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	<% if (includeBlog) { %>'posts': ['posts', 'post-categories'],
	<% } if (includeGallery) { %>'galleries': 'galleries',
	<% } if (includeEnquiries) { %>'enquiries': 'enquiries',
	<% } %>'users': 'users'
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
