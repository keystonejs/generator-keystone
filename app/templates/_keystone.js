// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone')<% if (viewEngine == 'hbs') { %>,
	handlebars = require('express3-handlebars')<% } %>;

<% if (includeGuideComments) { %>
// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.
<% } %>
keystone.init({

	'name': '<%= projectName %>',
	'brand': '<%= projectName %>',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': '<%= viewEngine %>',
	<% if (viewEngine === 'hbs') { %>
	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.<%= viewEngine %>'
	}).engine,
	<% } %><% if (includeEmail) { %>
	'emails': 'templates/emails',
	<% } %>
	'auto update': true,
	'session': true,
	'session store': 'mongo',
	'auth': true,
	'user model': 'User',
	'cookie secret': '<%= cookieSecret %>'

});
<% if (includeGuideComments) { %>
// Load your project's Models
<% } %>
keystone.import('models');
<% if (includeGuideComments) { %>
// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
<% } %>
keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});
<% if (includeGuideComments) { %>
// Load your project's Routes
<% } %>
keystone.set('routes', require('./routes'));
<% if (includeGuideComments) { %>
// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.
<% } %><% if (includeEmail) { %>
keystone.set('email locals', {
	logo_src: '/images/logo-email.gif',
	logo_width: 194,
	logo_height: 76,
	theme: {
		email_bg: '#f9f9f9',
		link_color: '#2697de',
		buttons: {
			color: '#fff',
			background_color: '#2697de',
			border_color: '#1a7cb7'
		}
	}
});
<% if (includeGuideComments) { %>
// Setup replacement rules for emails, to automate the handling of differences
// between development a production.

// Be sure to update this rule to include your site's actual domain, and add
// other rules your email templates require.
<% } %>
keystone.set('email rules', [{
	find: '/images/',
	replace: (keystone.get('env') == 'production') ? 'http://www.your-server.com/images/' : 'http://localhost:3000/images/'
}, {
	find: '/keystone/',
	replace: (keystone.get('env') == 'production') ? 'http://www.your-server.com/keystone/' : 'http://localhost:3000/keystone/'
}]);
<% if (includeGuideComments) { %>
// Load your project's email test routes
<% } %>
keystone.set('email tests', require('./routes/emails'));
<% } %><% if (includeGuideComments) { %>
// Configure the navigation bar in Keystone's Admin UI
<% } %>
keystone.set('nav', {
	<% if (includeBlog) { %>'posts': ['posts', 'post-categories'],
	<% } if (includeGallery) { %>'galleries': 'galleries',
	<% } if (includeEnquiries) { %>'enquiries': 'enquiries',
	<% } %>'users': 'users'
});
<% if (includeGuideComments) { %>
// Start Keystone to connect to your database and initialise the web server
<% } %>
keystone.start();
