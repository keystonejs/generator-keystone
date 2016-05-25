/**
 * @file This react component (blog) serves as the primary entry point for the react app when express hands off the template context.data
 *  unfortunately the file name `blog.xxx` has to match what the server/route express calls thus the file name is not BlogViewContainer.jsx
 */
// Include NPM modules
var React = require('react');

// Include React Components
var Layout = require('../layouts/Layout');
var Posts = require('../pages/Posts');


var BlogViewContainer = React.createClass({
	displayName: 'BlogViewContainer',
	propTypes: {
		data: React.PropTypes.object,           // the template data context passed from express (contains the posts)
		navLinks: React.PropTypes.array,        // an array of nav elements
		section: React.PropTypes.string,        // the selected section
		user: React.PropTypes.object            // an object that consists of the user name
	},
	render: function() {
		return (
			<Layout navLinks={this.props.navLinks} user={this.props.user} section={this.props.section}>
				<Posts posts={this.props.data.posts} categories={this.props.data.categories} selectedCategory={this.props.filters.category} />	
			</Layout>
		);		
	}

});

module.exports = BlogViewContainer;
