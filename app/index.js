var util = require('util'),
	path = require('path'),
	_ = require('lodash'),
	utils = require('keystone-utils'),
	yeoman = require('yeoman-generator');


var KeystoneGenerator = module.exports = function KeystoneGenerator(args, options, config) {

	// Initialise default values
	this.cloudinaryURL = false;
	this.mandrillAPI = false;

	// Apply the Base Generator
	yeoman.generators.Base.apply(this, arguments);

	// Init Messages
	console.log('\nWelcome to KeystoneJS.\n');

	var done = function done() {
		console.log('\n------------------------------------------------\n\nYour KeystoneJS project is ready to go!\n' +
			'For help getting started, visit http://keystonejs.com/guide\n\n' +
			'To start your new website, run "node keystone".\n');
	}

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
			},
			{
				type: 'confirm',
				name: 'includeBlog',
				message: 'Would you like to include a Blog?',
				default: true
			},
			{
				type: 'confirm',
				name: 'includeGallery',
				message: 'Would you like to include an Image Gallery?',
				default: true
			},
			{
				type: 'confirm',
				name: 'includeEnquiries',
				message: 'Would you like to include a Contact Form?',
				default: true
			}
		],

		config: []

	};

	this.prompt(prompts.project, function(props) {

		_.each(props, function(val, key) {
			this[key] = val;
		}, this);

		if (this.includeBlog || this.includeGallery || this.includeEnquiries) {

			if (this.includeBlog || this.includeGallery) {
				prompts.config.push({
					name: 'cloudinaryURL',
					message: 'Please enter your Cloudinary URL\n(Required for blog / gallery, See http://keystonejs.com/guide/config/#cloudinary for explanation)\n'
				});
			}

			if (this.includeEnquiries) {
				prompts.config.push({
					name: 'mandrillAPI',
					message: 'Please enter your Mandrill API\n(Required for enquiries, See http://keystonejs.com/guide/config/#mandrill for explanation)\n'
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

			if (!this.cloudinaryURL && (this.includeBlog || this.includeGallery)) {
				this.includeBlog = false;
				this.includeGallery = false;
			}

			if (!this.cloudinaryURL && (this.includeEnquiries)) {
				this.includeEnquiries = false;
			}

			cb();

		}.bind(this));

	}.bind(this));

};

KeystoneGenerator.prototype.keys = function keys() {

	var cookieSecretChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz!@#$%^&*()-=_+[]\\{}|;\':",./<>?`~';

	this.cookieSecret = utils.randomString(64);

};

KeystoneGenerator.prototype.project = function project() {

	this.template('_package.json', 'package.json');
	this.template('_env', '.env');
	this.template('_keystone.js', 'keystone.js');

	this.copy('Procfile');
	this.copy('editorconfig', '.editorconfig');

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
		this.copy('models/' + i + '.js');
		modelIndex += 'require(\'./' + i + '\');\n';
	}, this);

	this.write('models/index.js', modelIndex);

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
	}

};

KeystoneGenerator.prototype.udpates = function routes() {

	this.directory('updates');

};

KeystoneGenerator.prototype.files = function files() {

	this.directory('public');

};
