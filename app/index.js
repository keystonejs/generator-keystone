var util = require('util'),
	path = require('path'),
	_ = require('lodash'),
	utils = require('keystone-utils'),
	yeoman = require('yeoman-generator');


var KeystoneGenerator = module.exports = function KeystoneGenerator(args, options, config) {

	// Initialise default values
	this.cloudinaryURL = false;
	this.mandrillAPI = false;
	
	this.messages = [];

	// Apply the Base Generator
	yeoman.generators.Base.apply(this, arguments);

	// Init Messages
	console.log('\nWelcome to KeystoneJS.\n');

	var done = _.bind(function done() {
		console.log(
			'\n------------------------------------------------' +
			'\n' +
			'\nYour KeystoneJS project is ready to go!' +
			'\n' +
			'\nFor help getting started, visit http://keystonejs.com/guide' +
			
			((this.usingTestMandrillAPI) ?
				'\n' +
				'\nWe\'ve included a test Mandrill API Key, which will simulate email' + 
				'\nsending but not actually send emails. Please replace it with your own' +
				'\nwhen you are ready.'
				: '') +
			
			((this.usingDemoCloudinaryAccount) ?
				'\n' +
				'\nWe\'ve included a demo Cloudinary Account, which is reset daily.' +
				'\nPlease configure your own account or use the LocalImage field instead' +
				'\nbefore sending your site live.'
				: '') +
			
			'\n\nTo start your new website, run "node keystone".' +
			'\n');
		
	}, this);

	// Install Dependencies when done
	this.on('end', function () {

		this.installDependencies({
			bower: false,
			skipMessage: true,
			skipInstall: options['skip-install'],
			callback: done
		});

	});

	// Import Package.json
	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

};

// Extends the Base Generator
util.inherits(KeystoneGenerator, yeoman.generators.Base);

KeystoneGenerator.prototype.prompts = function prompts() {

	var cb = this.async();

	var prompts = {

		project: [
			{
				name: 'projectName',
				message: 'What is the name of your project?',
				default: 'My Site'
			}, {
				type: 'confirm',
				name: 'includeBlog',
				message: 'Would you like to include a Blog?',
				default: true
			}, {
				type: 'confirm',
				name: 'includeGallery',
				message: 'Would you like to include an Image Gallery?',
				default: true
			}, {
				type: 'confirm',
				name: 'includeEnquiries',
				message: 'Would you like to include a Contact Form?',
				default: true
			}, {
				type: 'confirm',
				name: 'includeEmail',
				message: '------------------------------------------------' +
					'\n    KeystoneJS integrates with Mandrill (from Mailchimp) for email sending.' +
					'\n    Mandrill accounts are free for up to 12k emails per month.' +
					'\n    Would you like to include Email configuration in your project?',
				default: true
			}
		],

		config: []

	};

	this.prompt(prompts.project, function(props) {

		_.each(props, function(val, key) {
			this[key] = val;
		}, this);
		
		// Escape the project name for use in strings
		this.projectName = utils.escapeString(this.projectName);

		if (this.includeBlog || this.includeGallery || this.includeEmail) {
			
			if (this.includeEmail) {
				prompts.config.push({
					name: 'mandrillAPI',
					message: '------------------------------------------------' +
						'\n    Please enter your Mandrill API Key (optional).' +
						'\n    See http://keystonejs.com/guide/config/#mandrill for more info.' +
						'\n    You can skip this for now (we\'ll include a test key instead)' +
						'\n    ' +
						'\n    Your Mandrill API Key:'
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
					message: '------------------------------------------------' +
						'\n    KeystoneJS integrates with Cloudinary for image upload, resizing and' +
						'\n    hosting. See http://keystonejs.com/guide/config/#cloudinary for more info.' +
						'\n    ' +
						'\n    CloudinaryImage fields are used by the ' + blog_gallery + '.' +
						'\n    ' +
						'\n    You can skip this for now (we\'ll include demo account details)' +
						'\n    ' +
						'\n    Please enter your Cloudinary URL:'
				});
				
			}

		}
		
		if (!prompts.config.length) {
			return cb();
		}
		
		this.prompt(prompts.config, function(props) {
			
			_.each(props, function(val, key) {
				this[key] = val;
			}, this);
			
			if (this.includeEmail && !this.mandrillAPI) {
				this.usingTestMandrillAPI = true;
				console.log("this.usingTestMandrillAPI: " + this.usingTestMandrillAPI);
				this.mandrillAPI = 'NY8RRKyv1Bure9bdP8-TOQ';
			}
			
			if (!this.cloudinaryURL && (this.includeBlog || this.includeGallery)) {
				this.usingDemoCloudinaryAccount = true;
				console.log("this.usingDemoCloudinaryAccount: " + this.usingDemoCloudinaryAccount);
				this.cloudinaryURL = 'cloudinary://333779167276662:_8jbSi9FB3sWYrfimcl8VKh34rI@keystone-demo';
			}

			cb();

		}.bind(this));

	}.bind(this));

};

KeystoneGenerator.prototype.guideComments = function() {
	
	var cb = this.async();
	
	this.prompt([
		{
			type: 'confirm',
			name: 'includeGuideComments',
			message: '------------------------------------------------' +
				'\n    Finally, would you like to include the extended comments in' +
				'\n    your project? If you\'re new to Keystone, these may be helpful.'
			default: true
		}
	], function(props) {
		
		this.includeGuideComments = props.includeGuideComments;
		cb();
		
	}.bind(this));
	
};

KeystoneGenerator.prototype.keys = function keys() {

	var cookieSecretChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz!@#$%^&*()-=_+[]{}|;:",./<>?`~';

	this.cookieSecret = utils.randomString(64, cookieSecretChars);

};

KeystoneGenerator.prototype.project = function project() {

	this.template('_package.json', 'package.json');
	this.template('_env', '.env');
	this.template('_keystone.js', 'keystone.js');

	this.copy('editorconfig', '.editorconfig');
	this.copy('gitignore', '.gitignore');
	this.copy('Procfile');

};

KeystoneGenerator.prototype.models = function models() {

	var modelFiles = ['users'],
		modelIndex = '';

	if (this.includeBlog) {
		modelFiles.push('posts');
		modelFiles.push('postCategories');
	}

	if (this.includeGallery) {
		modelFiles.push('galleries');
	}

	if (this.includeEnquiries) {
		modelFiles.push('enquiries');
	}

	this.mkdir('models');

	modelFiles.forEach(function(i) {
		this.template('models/' + i + '.js');
		modelIndex += 'require(\'./' + i + '\');\n';
	}, this);
	
	// we're now using keystone.import() for loading models, so an index.js
	// file is no longer required. leaving for reference.
	
	// this.write('models/index.js', modelIndex);

};

KeystoneGenerator.prototype.routes = function routes() {

	this.mkdir('routes');
	this.mkdir('routes/views');

	this.template('routes/_index.js', 'routes/index.js');
	this.template('routes/_middleware.js', 'routes/middleware.js');

	this.copy('routes/views/index.js');

	if (this.includeBlog) {
		this.copy('routes/views/blog.js');
		this.copy('routes/views/post.js');
	}

	if (this.includeGallery) {
		this.copy('routes/views/gallery.js');
	}

	if (this.includeEmail) {
		this.copy('routes/emails.js');
	}
	
	if (this.includeEnquiries) {
		this.copy('routes/views/contact.js');
	}

};

KeystoneGenerator.prototype.templates = function templates() {

	this.mkdir('templates');
	this.mkdir('templates/views');

	this.directory('templates/layouts');
	this.directory('templates/mixins');
	this.directory('templates/views/errors');

	this.copy('templates/views/index.jade');

	if (this.includeBlog) {
		this.copy('templates/views/blog.jade');
		this.copy('templates/views/post.jade');
	}

	if (this.includeGallery) {
		this.copy('templates/views/gallery.jade');
	}

	if (this.includeEnquiries) {
		this.copy('templates/views/contact.jade');
		if (this.includeEmails) {
			this.copy('templates/emails/enquiry-notification.jade');
		}
	}

};

KeystoneGenerator.prototype.udpates = function routes() {

	this.directory('updates');

};

KeystoneGenerator.prototype.files = function files() {

	this.directory('public');

};
