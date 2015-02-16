/**
 * @file a React Component element that creates a block link (used to create a menu of links one per line)
 */

// Include NPM modules
var React = require('react');

var BlockLink = React.createClass({
	displayName: 'BlockLink',
	propTypes: {
		url: React.PropTypes.string.isRequired,    // the anchor url
		label: React.PropTypes.string.isRequired,  // the anchor text
		cssClass: React.PropTypes.string           // the cssClass to bind onto the element
	},
	getDefaultProps: function() {
		return {
			cssClass: ''
		};
	},
	render: function(){
		return (<a href={this.props.url} className={this.props.cssClass}>{this.props.label}</a>);		
	}
});

module.exports = BlockLink;
