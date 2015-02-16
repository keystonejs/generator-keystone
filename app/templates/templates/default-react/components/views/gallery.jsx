/**
 * @file This react component (gallery) serves as the primary entry point for the react app when express hands off the template context.data
 *  unfortunately the file name `gallery.xxx` has to match what the server/route express calls thus the file name is not GalleryViewContainer.jsx
 */
// Include NPM modules
var React = require('react');

// Include React Components
var Layout = require('../layouts/Layout');
var Gallery = require('../pages/Gallery');


var GalleryViewContainer = React.createClass({
	displayName: 'GalleryViewContainer',
	propTypes: {
		data: React.PropTypes.object,           // the template data context passed from express
		navLinks: React.PropTypes.array,        // an array of nav elements
		section: React.PropTypes.string,        // the selected section
		user: React.PropTypes.object           // an object that consists of the user name
	},
	render: function() {
		return (
			<Layout navLinks={this.props.navLinks} user={this.props.user} section={this.props.section}>
				<Gallery />
			</Layout>
		);		
	}

});

module.exports = GalleryViewContainer;
