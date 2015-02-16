/*
 *  @file: CategoryLinkList takes the array of categories and creates an inline list display
 *  if passed the `autoLink` to true it will link the categories to a blog post page filtering on just those categories
 *  otherwise it will be just a static string of categories
 */
// Include NPM modules
var React = require('react');
var _ = require('underscore');

// include our react libs
var Mixins = require('../../mixins');
var InlineLink = require('./InlineLink');

var CategoryInlineLinkList = React.createClass({
	displayName: 'CategoryInlineLinkList',
	mixins: [Mixins],
	propTypes: {
		prefix: React.PropTypes.string,     // the prefix `Posted in` before appending the list of categories
		suffix: React.PropTypes.string,     // an ending suffix opposite of prefix
		categories: React.PropTypes.array,  // an array of {key:'', name:''} for each category
		autoLink: React.PropTypes.bool,     // boolean which will generate an anchor for each category and wrap it
		separator: React.PropTypes.string,  // what string is used to seprat
		cssClass: React.PropTypes.string
	},
	getDefaultProps: function() {
		return {
			separator: ', ',
			autoLink: false,
			prefix: '',
			suffix: '',
			categories: []
		};
	},
	createCategoryList: function() {
		var categoryNames = _.pluck(this.props.categories, 'name');
		if (this.props.autoLink) {
			return _.map(this.props.categories, function(categoryItem, index) {
				// check if our iteration is the last item
				var isLastItem = ((this.props.categories.length-1) === index);
				// includeSeparator wants to ensure it is not the last item 
				return (<InlineLink key={categoryItem.key} url={this.getRouteUrl('category', categoryItem.key)} label={categoryItem.name} includeSeparator={!isLastItem} />);
			}, this);
		} else {
			return _.escape(categoryNames.join(this.props.separator));
		}
	},
	render: function(){
		var ListItems = this.createCategoryList();
		if (ListItems.length > 0) {
			return (
				<p className={this.props.cssClass}>
					{this.props.prefix} {ListItems} {this.props.suffix}
				</p>		
			);		
		// TODO find a better return for no categories
		} else {
			return (<p></p>);
		}
	}
});

module.exports = CategoryInlineLinkList;
