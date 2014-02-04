var _ = require('underscore'),
	keystone = require('keystone'),
	middleware = require('./middleware'),
	importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = function(app) {
	
	// Views
	app.get('/', routes.views.index);
	<% if (includeBlog) { %>app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	<% } %><% if (includeGallery) { %>app.get('/gallery', routes.views.gallery);
	<% } %><% if (includeEnquiries) { %>app.all('/contact', routes.views.contact);<% } %>
	
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

}
