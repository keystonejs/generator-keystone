/**
 * @file This react component (post) serves as the primary entry point for the react app when express hands off the template context.data
 *  unfortunately the file name `post.xxx` has to match what the server/route express calls thus the file name is not PostViewContainer.jsx
 */
// Include NPM modules
var React = require('react');

// Include React Components
var Layout = require('../layouts/Layout');
var PostFull = require('../elements/PostFull');


var PostViewContainer = React.createClass({
	displayName: 'Blog',
	propTypes: {
		data: React.PropTypes.object,           // the template data context passed from express (contains the post data)
		navLinks: React.PropTypes.array,        // an array of nav elements
		section: React.PropTypes.string,        // the selected section
		user: React.PropTypes.object            // an object that consists of the user name
	},
	render: function(){
		var post = this.props.data.post;
		return (
			<Layout navLinks={this.props.navLinks} user={this.props.user} section={this.props.section}>
				{/* had issue with ...post as spread operator working */}
				<PostFull authorName={post.author.name} title={post.title} content={post.content} categories={post.categories} />	
				}
			</Layout>
		);		
	}

});

module.exports = PostViewContainer;
