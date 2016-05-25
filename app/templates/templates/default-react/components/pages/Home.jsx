/**
 * @file a React Component that represents a page for the keystone front-end application
 */
 
var React = require('react');

// Get Children Components
var Jumbotron = require('../elements/Jumbotron');

var Home = React.createClass({
	displayName: 'Home',
	render: function() {
		return (
			<Jumbotron />
		);
	}
});

module.exports = Home;