'use strict';

var keystone = require( 'keystone' ),
	Types = keystone.Field.Types;

var MenuItem = new keystone.List( 'MenuItem', {
	map     : { name : 'label' },
	autokey : {
		from   : 'label',
		path   : 'key',
		unique : true
	}
} );

MenuItem.add( {
	label   : { type : String, required : true },
	href    : { type : Types.Url, default : '/', required : true },
	weight  : { type : Types.Number, default : 0 },
	enabled : { type : Types.Boolean, default : true }
} );

MenuItem.defaultColumns = 'label, href, weight, enabled';
MenuItem.register();