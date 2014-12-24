var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * <%= userModel %> Model
 * ==========
 */

var <%= userModel %> = new keystone.List('<%= userModel %>');

<%= userModel %>.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true }
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
});

// Provide access to Keystone
<%= userModel %>.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});

<% if (includeBlog) { %>
/**
 * Relationships
 */

<%= userModel %>.relationship({ ref: 'Post', path: 'author' });

<% } %>
/**
 * Registration
 */

<%= userModel %>.defaultColumns = 'name, email, isAdmin';
<%= userModel %>.register();
