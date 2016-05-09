var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Enquiry Model
 * =============
 */

var Enquiry = new keystone.List('Enquiry', {
	nocreate: true,
	noedit: true,
});

Enquiry.add({
	name: { type: Types.Name, required: true },
	email: { type: Types.Email, required: true },
	phone: { type: String },
	enquiryType: { type: Types.Select, options: [
		{ value: 'message', label: 'Just leaving a message' },
		{ value: 'question', label: 'I\'ve got a question' },
		{ value: 'other', label: 'Something else...' },
	] },
	message: { type: Types.Markdown, required: true },
	createdAt: { type: Date, default: Date.now },
});
<% if (includeEmail) { %>
Enquiry.schema.pre('save', function(next) {
	this.wasNew = this.isNew;
	next();
});

Enquiry.schema.post('save', function() {
	if (this.wasNew) {
		this.sendNotificationEmail();
	}
});

Enquiry.schema.methods.sendNotificationEmail = function(callback) {

	if ('function' !== typeof callback) {
		callback = function() {};
	}

	var enquiry = this;

	keystone.list('<%= userModel %>').model.find().where('isAdmin', true).exec(function(err, admins) {

		if (err) return callback(err);

    new keystone.Email({
        <% if (viewEngine === 'hbs') { %>
          templateExt: 'hbs',
          templateEngine: require('express-handlebars'),
        <% } %>
        templateName: 'enquiry-notification'
      }).send({
        to: admins,
        from: {
          name: '<%= projectName %>',
          email: 'contact@<%= utils.slug(projectName) %>.com'
        },
        subject: 'New Enquiry for <%= projectName %>',
        enquiry: enquiry
      }, callback);
    });

};
<% } %>
Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = 'name, email, enquiryType, createdAt';
Enquiry.register();
