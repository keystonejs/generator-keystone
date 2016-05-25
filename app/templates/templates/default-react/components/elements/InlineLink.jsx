/**
 *  @file:  a simple component element that is used to build an anchor but if passed params can be used to assemble
 *  a concatenated string separated by `, `  default
 */
// Include NPM modules
var React = require('react');

var InlineLink = React.createClass({
	displayName: 'InlineLink',
	propTypes: {
		url: React.PropTypes.string.isRequired,    // the anchor url
		label: React.PropTypes.string.isRequired,  // the anchor label
		includeSeparator: React.PropTypes.bool,    // specifies if we should include a string separator
		separator: React.PropTypes.string          // override the default `, `
	},
	getDefaultProps: function() {
		return {
			includeSeparator: false,
			separator: ', '
		};
	},
	render: function(){
		return (<span><a href={this.props.url}>{this.props.label}</a>{this.props.includeSeparator? ', ': ' '}</span>);		
	}
});

module.exports = InlineLink;
