var colors = require('colors'); // eslint-disable-line
var util = require('util');
var path = require('path');
var _ = require('lodash');
var utils = require('keystone-utils');
var crypto = require('crypto');
var yeoman = require('yeoman-generator');


var KeystoneGenerator = module.exports = function KeystoneGenerator (args, options, config) {

	// Set utils for use in templates
	this.utils = utils;

	// Initialise default values
	this.cloudinaryURL = false;
	this.mandrillAPI = false;

	// Apply the Base Generator
	yeoman.generators.Base.apply(this, arguments);

	// Welcome
	console.log('\nWelcome to KeystoneJS.\n');

	// This callback is fired when the generator has completed,
	// and includes instructions on what to do next.
	var done = _.bind(function done() {
		var cmd = (this.newDirectory ? '"cd ' + utils.slug(this.projectName) + '" then ' : '') + '"' + 'npm start' + '"';
		console.log(
			'\n------------------------------------------------'
			+ '\n'
			+ '\nYour KeystoneJS project is ready to go!'
			+ '\n'
			+ '\nFor help getting started, visit http://keystonejs.com/guide'

			+ ((this.usingTestMandrillAPI)
				? '\n'
				+ '\nWe\'ve included a test Mandrill API Key, which will simulate email'
				+ '\nsending but not actually send emails. Please replace it with your own'
				+ '\nwhen you are ready.'
				: '')

			+ ((this.usingDemoCloudinaryAccount)
				? '\n'
				+ '\nWe\'ve included a demo Cloudinary Account, which is reset daily.'
				+ '\nPlease configure your own account or use the LocalImage field instead'
				+ '\nbefore sending your site live.'
				: '')

			+ '\n\nTo start your new website, run ' + cmd + '.'
			+ '\n');

	}, this);

	// Install Dependencies when done
	this.on('end', function () {

		this.installDependencies({
			bower: false,
			skipMessage: true,
			skipInstall: options['skip-install'],
			callback: done,
		});

	});

	// Import Package.json
	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

};

// Extends the Base Generator
util.inherits(KeystoneGenerator, yeoman.generators.Base);

KeystoneGenerator.prototype.prompts = function prompts () {

	var cb = this.async();

	var prompts = {

		project: [
			{
				name: 'projectName',
				message: 'What is the name of your project?',
				default: 'My Site',
			}, {
				name: 'viewEngine',
				message: 'Would you like to use Jade, React, Swig, Nunjucks or Handlebars for templates? ' + (('[jade | react | swig | nunjucks | hbs ]').grey),
				default: 'jade'
			}, {
				name: 'preprocessor',
				message: 'Which CSS pre-processor would you like? ' + (('[less | sass | stylus]').grey),
				default: 'less',
			}, {
				type: 'confirm',
				name: 'includeBlog',
				message: 'Would you like to include a Blog?',
				default: true,
			}, {
				type: 'confirm',
				name: 'includeGallery',
				message: 'Would you like to include an Image Gallery?',
				default: true,
			}, {
				type: 'confirm',
				name: 'includeEnquiries',
				message: 'Would you like to include a Contact Form?',
				default: true,
			}, {
				name: 'userModel',
				message: 'What would you like to call the User model?',
				default: 'User',
			}, {
				name: 'adminLogin',
				message: 'Enter an email address for the first Admin user:',
				default: 'user@keystonejs.com',
			}, {
				name: 'adminPassword',
				message: 'Enter a password for the first Admin user:'
					+ '\n Please use a temporary password as it will be saved in plain text and change it after the first login.',
				default: 'admin',
			}, {
				name: 'taskRunner',
				message: 'Would you like to include gulp or grunt? ' + (('[gulp | grunt | none]').grey),
                default: 'none',
			}, {
				type: 'confirm',
				name: 'newDirectory',
				message: 'Would you like to create a new directory for your project?',
				default: true,
			}, {
				type: 'confirm',
				name: 'includeEmail',
				message: '------------------------------------------------'
					+ '\n    KeystoneJS integrates with Mandrill (from Mailchimp) for email sending.'
					+ '\n    Would you like to include Email configuration in your project?',
				default: true,
			},
		],

		config: [],

	};

	this.prompt(prompts.project, function (props) {

		_.assign(this, props);

		// Keep an unescaped version of the project name
		this._projectName = this.projectName;
		// ... then escape it for use in strings (most cases)
		this.projectName = utils.escapeString(this.projectName);
		// Escape other inputs
		this.adminLogin = utils.escapeString(this.adminLogin);
		this.adminPassword = utils.escapeString(this.adminPassword);

		// Clean the viewEngine selection
		if (_.includes(['handlebars', 'hbs', 'h'], this.viewEngine.toLowerCase().trim())) {
			this.viewEngine = 'hbs';
		} else if (_.includes(['swig', 's'], this.viewEngine.toLowerCase().trim())) {
			this.viewEngine = 'swig';
		} else if (_.includes(['nunjucks', 'nun', 'n'], this.viewEngine.toLowerCase().trim())) {
			this.viewEngine = 'nunjucks';
		} else if (_.includes(['react', 'reactjs', 'r'], this.viewEngine.toLowerCase().trim())) {
			this.viewEngine = 'react';
		} else {
			this.viewEngine = 'jade';
		}

		// Clean the preprocessor
		if (_.includes(['sass', 'sa'], this.preprocessor.toLowerCase().trim())) {
			this.preprocessor = 'sass';
		} else if (_.includes(['less', 'le'], this.preprocessor.toLowerCase().trim())) {
			this.preprocessor = 'less';
		} else {
			this.preprocessor = 'stylus';
		}

		// Clean the userModel name
		this.userModel = utils.camelcase(this.userModel, false);
		this.userModelPath = utils.keyToPath(this.userModel, true);

		// Clean the taskRunner selection
		this.taskRunner = (this.taskRunner || '').toLowerCase().trim();

		// Create the directory if required
		if (this.newDirectory) {
			this.destinationRoot(utils.slug(this.projectName));
		}

		// Additional prompts may be required, based on selections
		if (this.includeBlog || this.includeGallery || this.includeEmail) {

			if (this.includeEmail) {
				prompts.config.push({
					name: 'mandrillAPI',
					message: '------------------------------------------------'
						+ '\n    Please enter your Mandrill API Key (optional).'
						+ '\n    See http://keystonejs.com/docs/configuration/#services-mandrill for more info.'
						+ '\n    '
						+ '\n    You can skip this for now (we\'ll include a test key instead)'
						+ '\n    '
						+ '\n    Your Mandrill API Key:',
				});
			}

			if (this.includeBlog || this.includeGallery) {

				var blog_gallery = 'blog and gallery templates';

				if (!this.includeBlog) {
					blog_gallery = 'gallery template';
				} else if (!this.includeGallery) {
					blog_gallery = 'blog template';
				}

				prompts.config.push({
					name: 'cloudinaryURL',
					message: '------------------------------------------------'
						+ '\n    KeystoneJS integrates with Cloudinary for image upload, resizing and'
						+ '\n    hosting. See http://keystonejs.com/docs/configuration/#services-cloudinary for more info.'
						+ '\n    '
						+ '\n    CloudinaryImage fields are used by the ' + blog_gallery + '.'
						+ '\n    '
						+ '\n    You can skip this for now (we\'ll include demo account details)'
						+ '\n    '
						+ '\n    Please enter your Cloudinary URL:',
				});

			}

		}

		if (!prompts.config.length) {
			return cb();
		}

		this.prompt(prompts.config, function (props) {

			_.each(props, function (val, key) {
				this[key] = val;
			}, this);

			if (this.includeEmail && !this.mandrillAPI) {
				this.usingTestMandrillAPI = true;
				this.mandrillAPI = 'NY8RRKyv1Bure9bdP8-TOQ';
			}

			if (!this.cloudinaryURL && (this.includeBlog || this.includeGallery)) {
				this.usingDemoCloudinaryAccount = true;
				this.cloudinaryURL = 'cloudinary://333779167276662:_8jbSi9FB3sWYrfimcl8VKh34rI@keystone-demo';
			}

			cb();

		}.bind(this));

	}.bind(this));

};

KeystoneGenerator.prototype.guideComments = function () {

	var cb = this.async();

	this.prompt([
		{
			type: 'confirm',
			name: 'includeGuideComments',
			message: '------------------------------------------------'
				+ '\n    Finally, would you like to include extra code comments in'
				+ '\n    your project? If you\'re new to Keystone, these may be helpful.',
			default: true,
		},
	], function (props) {

		this.includeGuideComments = props.includeGuideComments;
		cb();

	}.bind(this));

};

KeystoneGenerator.prototype.keys = function keys () {

	this.cookieSecret = crypto.randomBytes(64).toString('hex');

};

KeystoneGenerator.prototype.project = function project () {

	this.template('_package.json', 'package.json');
	this.template('_env', '.env');

	this.template('_keystone.js', 'keystone.js');

	this.copy('editorconfig', '.editorconfig');
	this.copy('gitignore', '.gitignore');
	this.copy('Procfile');

};

KeystoneGenerator.prototype.tasks = function tasks () {

	if (this.taskRunner === 'grunt') {

		var gruntFiles = ['concurrent', 'express', 'node-inspector', 'nodemon'];

		this.template('_Gruntfile.js', 'Gruntfile.js');

		this.mkdir('grunt');
		gruntFiles.forEach(function (i) {
			this.copy('grunt/' + i + '.js');
		}, this);

		if (this.preprocessor === 'sass') {
			this.template('grunt/_sass.js', 'grunt/sass.js');
		} else if (this.preprocessor === 'less') {
			this.template('grunt/_less.js', 'grunt/less.js');
		} else if (this.preprocessor === 'stylus') {
			this.template('grunt/_stylus.js', 'grunt/stylus.js');
		}

		this.template('grunt/_watch.js', 'grunt/watch.js');

	} else if (this.taskRunner === 'gulp') {

		this.copy('_gulpfile.js', 'gulpfile.js');

	}

};

KeystoneGenerator.prototype.models = function models () {

	var modelFiles = [];

	if (this.includeBlog) {
		modelFiles.push('Post');
		modelFiles.push('PostCategory');
	}

	if (this.includeGallery) {
		modelFiles.push('Gallery');
	}

	if (this.includeEnquiries) {
		modelFiles.push('Enquiry');
	}

	this.mkdir('models');

	this.template('models/_User.js', 'models/' + this.userModel + '.js');

	modelFiles.forEach(function (i) {
		this.template('models/' + i + '.js');
	}, this);

};

KeystoneGenerator.prototype.routes = function routes () {

	this.mkdir('routes');
	this.mkdir('routes/views');

	this.template('routes/_index.js', 'routes/index.js');
	this.template('routes/_middleware.js', 'routes/middleware.js');

	if (this.includeEmail) {
		this.template('routes/_emails.js', 'routes/emails.js');
	}

	this.copy('routes/views/index.js');

	if (this.includeBlog) {
		this.copy('routes/views/blog.js');
		this.copy('routes/views/post.js');
	}

	if (this.includeGallery) {
		this.copy('routes/views/gallery.js');
	}

	if (this.includeEnquiries) {
		this.copy('routes/views/contact.js');
	}

};

KeystoneGenerator.prototype.templates = function templates () {

	if (this.viewEngine === 'hbs') {

		// Copy Handlebars Templates

		this.mkdir('templates');
		this.mkdir('templates/views');

		this.directory('templates/default-hbs/views/layouts', 'templates/views/layouts');
		this.directory('templates/default-hbs/views/helpers', 'templates/views/helpers');
		this.directory('templates/default-hbs/views/partials', 'templates/views/partials');

		this.template('templates/default-hbs/views/index.hbs', 'templates/views/index.hbs');

		if (this.includeBlog) {
			this.copy('templates/default-hbs/views/blog.hbs', 'templates/views/blog.hbs');
			this.copy('templates/default-hbs/views/post.hbs', 'templates/views/post.hbs');
		}

		if (this.includeGallery) {
			this.copy('templates/default-hbs/views/gallery.hbs', 'templates/views/gallery.hbs');
		}

		if (this.includeEnquiries) {
			this.copy('templates/default-hbs/views/contact.hbs', 'templates/views/contact.hbs');
			if (this.includeEmail) {
				this.copy('templates/default-hbs/emails/enquiry-notification.hbs', 'templates/emails/enquiry-notification.hbs');
			}
		}

	} else if (this.viewEngine === 'react') {

		// Create React Templates Directories
		/**
		├── components
		│   ├── elements
		│   ├── pages
		│   └── views
		├── constants
		└── mixins
		*/
		this.mkdir('templates');
		this.mkdir('templates/components');
		this.mkdir('templates/components/elements');
		this.mkdir('templates/components/pages');
		this.mkdir('templates/components/views');
		this.mkdir('templates/constants');
		this.mkdir('templates/mixins');

		// need a layout.jsx which is shell
		//this.copy('templates/default-react/components/layout.jsx', 'templates/default-react/components/layout.jsx');
		this.directory('templates/default-react/components', 'templates/components');
		// then index.jsx should contain the jumbotron component
		// fill out remaining apps/sections

		// not app/section specific so copy entire folder contents
		this.directory('templates/default-react/constants', 'templates/constants');
		this.directory('templates/default-react/mixins', 'templates/mixins');

		// All App specific components are contained in the `components` folder
		// create stubs for paths
		var srcPath = 'templates/default-' + this.viewEngine + '/components/';
		var destPath = 'templates/components/';

		// copy all the required/shared components
		// need a layout.jsx which is shell for all pages
		this.copy(srcPath + 'layouts/layout.jsx', destPath + 'layouts/layout.jsx');
		// shared components and base layer
		this.copy(srcPath + 'elements' + '/Jumbotron.jsx', destPath + 'elements' + '/Jumbotron.jsx');
		this.copy(srcPath + 'elements' + '/NavItem.jsx', destPath + 'elements' + '/NavItem.jsx');
		this.copy(srcPath + 'elements' + '/BlockLink.jsx', destPath + 'elements' + '/BlockLink.jsx');
		this.copy(srcPath + 'elements' + '/InlineLink.jsx', destPath + 'elements' + '/InlineLink.jsx');
		this.copy(srcPath + 'elements' + '/Pagination.jsx', destPath + 'elements' + '/Pagination.jsx');
		this.copy(srcPath + 'elements' + '/PaginationButton.jsx', destPath + 'elements' + '/PaginationButton.jsx');
		// FlashMessage could be globally used for contact/gallery?
		this.copy(srcPath + 'elements' + '/FlashMessages.jsx', destPath + 'elements' + '/FlashMessages.jsx');
		this.copy(srcPath + 'elements' + '/FlashMessage.jsx', destPath + 'elements' + '/FlashMessage.jsx');

		// copy index for the view layer (required for all views to work)
		this.copy(srcPath + 'views' + '/index.jsx', destPath + 'views' + '/index.jsx');
		// home page is required by default
		this.copy(srcPath + 'pages' + '/home.jsx', destPath + 'pages' + '/home.jsx');

		// handle component copying for each app
		if (this.includeBlog) {
			// for blog we need both views [blog,post]
			// views are where express handsoff the template context/vars to react-engine
			this.copy(srcPath + 'views' + '/blog.jsx', destPath + 'views' + '/blog.jsx');
			this.copy(srcPath + 'views' + '/post.jsx', destPath + 'views' + '/post.jsx');
			// pages is the component container to handle what component-elements are loaded
			// for blog we use the Posts page, but for a single Post we can mount the element directly
			// into the views/post.jsx
			this.copy(srcPath + 'pages' + '/Posts.jsx', destPath + 'pages' + '/Posts.jsx');
			// copy all the necessary component/elements required for blog/posts
			this.copy(srcPath + 'elements' + '/AuthorByLine.jsx', destPath + 'elements' + '/AuthorByLine.jsx');
			this.copy(srcPath + 'elements' + '/CategoryBlockLinkList.jsx', destPath + 'elements' + '/CategoryBlockLinkList.jsx');
			this.copy(srcPath + 'elements' + '/CategoryInlineLinkList.jsx', destPath + 'elements' + '/CategoryInlineLinkList.jsx');
			this.copy(srcPath + 'elements' + '/PostExcerpt.jsx', destPath + 'elements' + '/PostExcerpt.jsx');
			this.copy(srcPath + 'elements' + '/PostFull.jsx', destPath + 'elements' + '/PostFull.jsx');
		}

		if (this.includeGallery) {
			// copy only gallery templates (view/pages)
			// views are where express handsoff the template context/vars to react-engine
			this.copy(srcPath + 'views' + '/gallery.jsx', destPath + 'views' + '/gallery.jsx');
			// pages is the component container to handle what component-elements are loaded
			this.copy(srcPath + 'pages' + '/gallery.jsx', destPath + 'pages' + '/gallery.jsx');
		}

		if (this.includeEnquiries) {
			// copy only contact templates (pages)
			// views are where express handsoff the template context/vars to react-engine
			this.copy(srcPath + 'views' + '/contact.jsx', destPath + 'views' + '/contact.jsx');
			// pages is the component container to handle what component-elements are loaded
			this.copy(srcPath + 'pages' + '/ContactForm.jsx', destPath + 'pages' + '/ContactForm.jsx');
			if (this.includeEmail) {
				// TODO Add this into template
				// need template txt
			}
		}

	} else if (this.viewEngine === 'nunjucks') {

		// Copy Nunjucks Templates

		this.mkdir('templates');
		this.mkdir('templates/views');

		this.directory('templates/default-' + this.viewEngine + '/layouts', 'templates/layouts');
		this.directory('templates/default-' + this.viewEngine + '/mixins', 'templates/mixins');
		this.directory('templates/default-' + this.viewEngine + '/views/errors', 'templates/views/errors');

		this.template('templates/default-' + this.viewEngine + '/views/index.html', 'templates/views/index.html');

		if (this.includeBlog) {
			this.copy('templates/default-' + this.viewEngine + '/views/blog.html', 'templates/views/blog.html');
			this.copy('templates/default-' + this.viewEngine + '/views/post.html', 'templates/views/post.html');
		}

		if (this.includeGallery) {
			this.copy('templates/default-' + this.viewEngine + '/views/gallery.html', 'templates/views/gallery.html');
		}

		if (this.includeEnquiries) {
			this.copy('templates/default-' + this.viewEngine + '/views/contact.html', 'templates/views/contact.html');
			if (this.includeEmail) {
				this.directory('templates/default-' + this.viewEngine + '/emails', 'templates/emails');
			}
		}

	} else {

		// Copy Jade/Swig Templates

		this.mkdir('templates');
		this.mkdir('templates/views');

		this.directory('templates/default-' + this.viewEngine + '/layouts', 'templates/layouts');
		this.directory('templates/default-' + this.viewEngine + '/mixins', 'templates/mixins');
		this.directory('templates/default-' + this.viewEngine + '/views/errors', 'templates/views/errors');

		this.template('templates/default-' + this.viewEngine + '/views/index.' + this.viewEngine, 'templates/views/index.' + this.viewEngine);

		if (this.includeBlog) {
			this.copy('templates/default-' + this.viewEngine + '/views/blog.' + this.viewEngine, 'templates/views/blog.' + this.viewEngine);
			this.copy('templates/default-' + this.viewEngine + '/views/post.' + this.viewEngine, 'templates/views/post.' + this.viewEngine);
		}

		if (this.includeGallery) {
			this.copy('templates/default-' + this.viewEngine + '/views/gallery.' + this.viewEngine, 'templates/views/gallery.' + this.viewEngine);
		}

		if (this.includeEnquiries) {
			this.copy('templates/default-' + this.viewEngine + '/views/contact.' + this.viewEngine, 'templates/views/contact.' + this.viewEngine);
			if (this.includeEmail) {
				this.copy('templates/default-' + this.viewEngine + '/emails/enquiry-notification.' + this.viewEngine, 'templates/emails/enquiry-notification.' + this.viewEngine);
			}
		}
	}

};

KeystoneGenerator.prototype.updates = function routes () {

	this.directory('updates');

};

KeystoneGenerator.prototype.files = function files () {

	this.directory('public/images');
	this.directory('public/js');
	this.copy('public/favicon.ico');

	if (this.preprocessor === 'sass') {
		this.directory('public/fonts', 'public/fonts/bootstrap');
		this.directory('public/styles-sass', 'public/styles');
	} else if (this.preprocessor === 'less') {
		this.directory('public/fonts');
		this.directory('public/styles-less', 'public/styles');
	} else {
		this.directory('public/fonts');
		this.directory('public/styles-stylus', 'public/styles');
	}

};
