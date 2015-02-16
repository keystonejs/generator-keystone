/**
 * @file a React Component that represents a page for the keystone front-end application
 */
var React = require('react');

// Get Children Components
// require them here

var Gallery = React.createClass({
	displayName: 'Gallery',
	render: function() {
		return (
			<div>
				<div className="container">
					<h1>Gallery</h1>
				</div>
			</div>
		);
	}
});

module.exports = Gallery;