var keystone = require('keystone');
var slug = require('slug');

var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Page = new keystone.List('Page', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Page.add({
	title: { type: String, required: true },
	url: { type: String, required: false},
	content: {type: Types.Html, wysiwyg: true, height: 400 }
});

Page.schema.pre('save', function(next) {
    if (!this.url) {
        this.url = slug(this.title).toLowerCase();
    }
    next();
});

Page.defaultColumns = 'title';
Page.register();
