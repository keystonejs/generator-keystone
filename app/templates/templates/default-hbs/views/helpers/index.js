var moment = require('moment');
var _ = require('underscore');
var hbs = require('handlebars');
var keystone = require('keystone');

// Declare Constants
var CLOUDINARY_HOST = 'http://res.cloudinary.com';

// Collection of templates to interpolate
var linkTemplate = _.template('<a href="<%= url %>"><%= text %></a>');
var scriptTemplate = _.template('<script src="<%= src %>"></script>');
var cssLinkTemplate = _.template('<link href="<%= href %>" rel="stylesheet">');
var cloudinaryUrlLimit = _.template(CLOUDINARY_HOST+'/<%= cloudinaryUser %>/image/upload/c_limit,f_auto,h_<%= height %>,w_<%= width %>/<%= publicId %>.jpg');


module.exports = function(){
		var _helpers = {};

/////////
//  Generic HBS Helpers
/////////
		//
		// standard hbs equality check, pass in two values from template
		// {{#ifeq keyToCheck data.myKey}} [requires an else blockin template regardless]
		_helpers.ifeq = function(a, b, options) {
				if(a == b){
						return options.fn(this);
				}else{
						return options.inverse(this);
				}
		};


///////////
//   Port of Ghost helpers to support cross-theming
//   Used also in the default keystonejs-hbs theme
///////////
		//
		// ### Date Helper
		// A port of the Ghost Date formatter similar to the keystonejs - jade interface
		//
		//
		// *Usage example:*
		// `{{date format='MM YYYY}}`
		// `{{date publishedDate format='MM YYYY'`
		//
		// Returns a string formatted date
		// By default if no date passed into helper than then a current-timestamp is used
		//
		// Options is the formatting and context check this.publishedDate
		// If it exists then it is formated, otherwise current timestamp returned
		_helpers.date= function (context, options) {
				if (!options && context.hasOwnProperty('hash')) {
						options = context;
						context = undefined;

						if (this.publishedDate) {
								context = this.publishedDate;
						}
				}

				// ensure that context is undefined, not null, as that can cause errors
				context = context === null ? undefined : context;

				var f = options.hash.format || 'MMM Do, YYYY',
						timeago = options.hash.timeago,
						date;

				// if context is undefined and given to moment then current timestamp is given
				// nice if you just want the current year to define in a tmpl
				if (timeago) {
						date = moment(context).fromNow();
				} else {
						date = moment(context).format(f);
				}
				return date;
		};

		//
		// ### Category Helper
		// Ghost uses Tags and Keystone uses Categories
		// Supports same interface, just different name/semantics
		//
		// *Usage example:*
		// `{{categoryList categories separator=' - ' prefix='Filed under '}}`
		//
		// Returns an html-string of the categories on the post.
		// By default, categories are separated by commas.
		// input. categories:['tech', 'js']
		// output. 'Filed Undder <a href="blog/tech">tech</a>, <a href="blog/js">js</a>'
		//
		_helpers.categoryList = function (categories, options) {
				var autolink = _.isString(options.hash.autolink) && options.hash.autolink === "false" ? false : true,
						separator = _.isString(options.hash.separator) ? options.hash.separator : ', ',
						prefix = _.isString(options.hash.prefix) ? options.hash.prefix : '',
						suffix = _.isString(options.hash.suffix) ? options.hash.suffix : '',
						output = '';

				function createTagList(tags) {
						var tagNames = _.pluck(tags, 'name');

						if (autolink) {
								return _.map(tags, function (tag) {
										return linkTemplate({
												url: ('blog/'+tag.key),
												text: _.escape(tag.name)
										});
								}).join(separator);
						}
						return _.escape(tagNames.join(separator));
				}

				if (categories && categories.length) {
						output = prefix + createTagList(categories) + suffix;
				}
				return new hbs.SafeString(output);
		};

		/* To Implement [Ghost Helpers](http://docs.ghost.org/themes/#helpers)
		* The [source](https://github.com/TryGhost/Ghost/blob/master/core/server/helpers/index.js)
		*
		* * `Foreach` Extended Helper
		* * `Asset` Helper
		* * `Content` Helper
		* * `Excerpt` Helper
		* * `Has` Helper
		* * `Encode` Helper
		* * Pagination
		* * BodyClass
		* * PostClass
		* * meta_title
		* * meta_description
		* * ghost_[footer/header]
		*
		*/


///////////
//   KeystoneJS specific helpers
///////////
		// block rendering for keystone admin css
		_helpers.isAdminEditorCSS = function(user, options){
			var output = '';
			if(typeof(user) !== 'undefined' && user.isAdmin){
				output = cssLinkTemplate({href:"/keystone/styles/content/editor.min.css"});
			}
			return new hbs.SafeString(output);
		};
		// block rendering for keystone admin js
		_helpers.isAdminEditorJS = function(user, options){
			var output = '';
			if(typeof(user) !== 'undefined' && user.isAdmin){
				output = scriptTemplate({src:'/keystone/js/content/editor.js'});
			}
			return new hbs.SafeString(output);
		};

		// Used to generate the link for the admin edit post button
		_helpers.adminEditableUrl = function(user, options){
			var rtn = keystone.app.locals.editable(user, {
				'list':'Post',
				'id':options
			});
			return rtn;
		};


		//
		// ### CloudinaryUrl Helper
		// To support the limit src url strings used by KeystoneJS default theme
		// the jade version has access to the ._.limit() call, but HBS doesn't so
		// some work has to be done to generate these src urls.  This helper is built
		// to work with the default theme, most likely this helper will need expanded
		// with additional kwargs to give the proper images
		// `this` will contain the scoped context vars for images:[]
		//
		// *Usage example:*
		// `{{cloudinaryUrl heroImage width='640' height='640'}}`
		// `{{#each images}} {{cloudinaryUrl width='640' height='640'}} {{/each}}`
		//
		// Returns an src-string for a cloudinary image
		//

		_helpers.cloudinaryUrl = function(context, options){
				// if we dont pass in a context and just kwargs
				// then `this` refers to our default scope block and kwargs
				// are stored in context.hash
				if (!options && context.hasOwnProperty('hash')) {
						// strategy is to place context kwargs into options
						options = context;
						// bind our default inherited scope into context
						context = this;
				}

				// safe guard to ensure context is never null
				context = context === null ? undefined : context;

				var publicId = context.public_id,
						width = ((options.width)? options.width:'300'),
						height = ((options.height)? options.height:'300');

				// use a regex to strip out the cloudinary username
				var cloudKeyRegex = /res.cloudinary.com\/(.*)\/image/;
				var cloudKey = context.url.match(cloudKeyRegex);
				var src = cloudinaryUrlLimit({
						publicId:publicId,
						cloudinaryUser:cloudKey[1],
						width:width,
						height:height

				});

				return src;
		};

		//
		//  ### Content Url Helpers
		//  KeystoneJS url handling so that the routes are in one place for easier
		//  editing.  Should look at Django/Ghost which has an object layer to access
		//  the routes by keynames to reduce the maintenance of changing urls
		//
		// Direct url link to a specific post
		_helpers.postUrl= function(postSlug, options){
				return ('/blog/post/'+postSlug);
		};

		// might be a ghost helper
		// used for pagination urls on blog
		_helpers.pageUrl= function(slug, options){
				return '/blog?page='+options.hash.page;
		};

		// create the category url for a blog-category page
		_helpers.categoryUrl = function(categorySlug, options){
			return ('/blog/'+categorySlug);
		};

		//
		//  ### Flash Message Helper
		//  KeystoneJS supports a message interface for information/errors to be passed from server
		//  to the front-end client and rendered in a html-block.  FlashMessage mirrors the Jade-Mixing
		//  for creating the message.  But Part of the logic is in the default.layout.  Decision was to
		//  surface more of the interface in the client html rather than abstracting behind a helper.
		//
		//  @messages:[]
		//
		//  *Usage example:*
		//  `{{#if messages.warning}}
		//      <div class="alert alert-warning">
		//          {{{flashMessages messages.warning}}}
		//      </div>
		//   {{/if}}`
		_helpers.flashMessages = function(messages){
				var output = '';
				for(var i=0; i<messages.length; i++){

						if(messages[i].title){
								output+='<h4>'+messages[i].title+'</h4>';
						}

						if(messages[i].detail){
								output += '<p>'+messages[i].detail+'</p>';
						}

						if(messages[i].list){

								output+= '<ul>';
								for(var ctr=0; ctr<messages[i].list.length; ctr++){
										output+='<li>'+messages[i].list[ctr]+'</li>';
								}
								output += '</ul>';
						}
				}
				return new hbs.SafeString(output);
		};



		return _helpers;
};
