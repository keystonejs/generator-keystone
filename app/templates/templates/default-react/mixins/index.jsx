/*
 * @file Global mixin file, if building a larger app one should create
 *  mixins of similar functionality instead of a single global file.
 */

// define the application url structure as constants here 
// that way if routes/urls change you edit them in one place
var URLS = require('../constants/urls');

var mixins = {
	// used to generate stand content urls, excludes pagination
	getRouteUrl: function(section, slug) {
		return (URLS[section] + '/' + slug);
	},
	// used for pagination buttons for a content section
	getPageUrl: function(section, page) {
		return (URLS[section]+ '?page=' + page);
	}
};

module.exports = mixins;