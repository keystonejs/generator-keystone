var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Users
 * =====
 */

var User = new keystone.List('User');

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true }
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});

<% if (includeBlog) { %>
/**
 * Relationships
 */

User.relationship({ ref: 'Post', path: 'author' });

<% } %>
/**
 * Registration
 */

User.defaultColumns = 'name, email, isAdmin';
User.register();
