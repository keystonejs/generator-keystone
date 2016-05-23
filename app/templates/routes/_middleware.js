<% if (includeGuideComments) { %>/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
<% } %>var _ = require('underscore');


/**
	Initialises the standard view locals<% if (includeGuideComments) { %>

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.

	To allow the display of a navLink only for keystone administrator,
	please add keystoneadmin:true <% } %>
*/
exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' }<% if (includeBlog) { %>,
		{ label: 'Blog', key: 'blog', href: '/blog' }<% } %><% if (includeGallery) { %>,
		{ label: 'Gallery', key: 'gallery', href: '/gallery' }<% } %><% if (includeEnquiries) { %>,
		{ label: 'Contact', key: 'contact', href: '/contact' }<% } %>,
	];
	res.locals.user = req.user;
	next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.any(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
