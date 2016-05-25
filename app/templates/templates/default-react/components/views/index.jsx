/**
 * @file This react component (home) serves as the primary entry point for the react app when express hands off the template context.data
 *  unfortunately the file name `index.xxx` has to match what the server/route express calls thus the file name is not HomeViewContainer.jsx
 */
// Include NPM modules
var React = require('react');

// Include React Components
var Layout = require('../layouts/Layout');
var Home = require('../pages/home');


var HomeViewContainer = React.createClass({
	propTypes: {
		navLinks: React.PropTypes.array,        // an array of nav elements
		section: React.PropTypes.string,        // the selected section
		user: React.PropTypes.object            // an object that consists of the user name
	},
	render: function(){
		return (
			<Layout navLinks={this.props.navLinks} user={this.props.user} section={this.props.section}>
				<Home />	
			</Layout>
		);		
	}

});

module.exports = HomeViewContainer;
