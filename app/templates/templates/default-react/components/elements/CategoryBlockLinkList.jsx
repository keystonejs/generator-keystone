/*
 *  @file: CategoryBlockLinkList takes the array of categories and creates a list of block item links 
 *  which are displayed as category navigation on the blog[layout] on posts page.
 */

// Include NPM modules
var React = require('react');
var _ = require('underscore');
var cx = require('classnames');

var Mixins = require('../../mixins');
var BlockLink = require('./BlockLink');

var CategoryBlockLinkList = React.createClass({
	displayName: 'CategoryBlockLinkList',
	mixins: [Mixins],
	propTypes: {
		categories: React.PropTypes.array,                    // an array of {'key':'', label:''} for each category
		selectedCategory: React.PropTypes.string.isRequired   // the selected categories `key`
	},
	getDefaultProps: function() {
		return {
			categories: []
		};
	},
	createCategoryList: function() {
		// Iterate over our categories and create a list of block item links
		var list = _.map(this.props.categories, function(categoryItem, index) {
			// if selected enable active css class
			var itemAnchorClass = cx({
				active: (this.props.selectedCategory === categoryItem.key),
				'list-group-item': true
			});
			// create each link
			return (<BlockLink key={categoryItem.key} url={this.getRouteUrl('category', categoryItem.key)} label={categoryItem.name} cssClass={itemAnchorClass} />);
		}, this);
		
		// Create our AllCategory Menu Item and place at head (unshift) on the array
		var allAnchorClass = cx({
			active: (this.props.selectedCategory === 'AllCategories'),
			'list-group-item': true
		});
		list.unshift(<BlockLink key={'AllCategory'} url={this.getRouteUrl('blog', '')} label={'All Categories'} cssClass={allAnchorClass} />)
		return list;
	},
	render: function(){
		var ListItems = this.createCategoryList();
		return (
			<div>
				{ListItems}
			</div>		
		);		
	}
});

module.exports = CategoryBlockLinkList;
