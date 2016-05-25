/**
 * @file a React Component element that acts as the author by line display
 */

// Include NPM modules
var React = require('react');

var AuthorByline = React.createClass({
	displayName: 'AuthorByline',
	propTypes: {
		name: React.PropTypes.string.isRequired  // Need the first name
	},
	render: function(){
		return (
			<span>
				by {this.props.name}
			</span>		
		);		
	}
});

module.exports = AuthorByline;
