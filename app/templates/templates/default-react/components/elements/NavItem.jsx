/**
 *  @file: a single component navigation element (li + a)
 *  
 */
var React = require('react');
var cx = require('classnames');

var NavItem = React.createClass({
	displayName: 'NavItem',
	propTypes: {
		href: React.PropTypes.string.isRequired,   // anchor href 
		label: React.PropTypes.string.isRequired,  // anchor label text
		selected: React.PropTypes.bool             // is it selected if so include `active` class on element
	},
	render: function () {
		// if selected enable active css class
		var anchorClass = cx({
			active: this.props.selected
		});
		return (
			<li key={this.props.key} className={anchorClass}>
				<a href={this.props.href}>{this.props.label}</a>
			</li>
		);
	}
});

module.exports = NavItem;