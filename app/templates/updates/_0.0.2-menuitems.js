'use strict';
var keystone = require( 'keystone' );
var async = require( 'async' );
var MenuItem = keystone.list( 'MenuItem' );

var menuitems = [
	{ label: 'Home',		key: 'home',		weight : 0,		href: '/' }<% if (includeBlog) { %>,
	{ label: 'Blog',		key: 'blog',		weight : 10,	href: '/blog' }<% } %><% if (includeGallery) { %>,
	{ label: 'Gallery',		key: 'gallery',		weight : 20,	href: '/gallery' }<% } %><% if (includeEnquiries) { %>,
	{ label: 'Contact',		key: 'contact',		weight : 30,	href: '/contact' }<% } %>
];

function createMenuItem(menuitem, done){

	var newMenuItem = new MenuItem.model( menuitem );
	newMenuItem.save( function( err ){
		 if( err ){
			 console.error( "Error adding menu item " + newMenuItem.label + " to the database:" );
			 console.error( err );
		 }else{
			 console.log( "Added menu item " + newMenuItem.label + " to the database." );
		 }
		 done();
	 } );
	
}

exports = module.exports = function( done ){
	async.forEach( menuitems, createMenuItem, done );
};
